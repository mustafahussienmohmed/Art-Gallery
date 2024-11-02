import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const decodeToken = (token) => {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  };

  const fetchUserData = async (userId, isAdmin) => {
    const endpoint =
      isAdmin === 1
        ? `http://localhost:5000/admins/${userId}`
        : `http://localhost:5000/users/${userId}`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error fetching user data");
      }
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
      setUserData(null);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid credentials.");
      }

      const data = await response.json();
      const decodedToken = decodeToken(data.accessToken);
      setCurrentUser(decodedToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      await fetchUserData(decodedToken.user_id, decodedToken.is_admin);

      const redirectPath = decodedToken.is_admin === 0 ? "/Profile" : "/admin";
      router.push(redirectPath);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      try {
        await fetch("http://localhost:5000/logout", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: refreshToken }),
        });
      } catch (error) {
        console.error("Error logging out:", error);
      }

      localStorage.removeItem("refreshToken");
      setCurrentUser(null);
      setUserData(null);
      router.push("/customer/login");
    }
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      console.warn("No refresh token found, logging out...");
      logout();
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: refreshToken }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to refresh access token.");
      }

      const data = await response.json();
      const decodedToken = decodeToken(data.accessToken);
      setCurrentUser(decodedToken);

      await fetchUserData(decodedToken.user_id, decodedToken.is_admin);
    } catch (err) {
      console.error("Error refreshing access token:", err);
      logout();
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        setLoading(false);
        return;
      }

      if (!currentUser) {
        await refreshAccessToken();
      }

      setLoading(false);
    };

    fetchUser();
  }, [currentUser]);

  const value = {
    currentUser,
    userData,
    loading,
    error,
    login,
    logout,
    refreshAccessToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
