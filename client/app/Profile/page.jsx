"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Nav from "../ui/navbar";
import Footer from "../ui/Footer";

const Profile = () => {
  const { loading, error, userData, logout } = useAuth();
  const router = useRouter();

  if (loading) {
    return <div className="text-center mt-20 text-lg">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-lg text-red-600">{error}</div>
    );
  }

  if (!userData) {
    return (
      <div className="text-center mt-20 text-lg">User data not found.</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Nav />
      <div className="flex-grow flex justify-center items-center">
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg">
          <div className="relative flex justify-center mb-6">
            <div className="absolute -top-16">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/59/User-avatar.svg"
                alt="Profile"
                className="rounded-full w-32 h-32 border-4 border-blue-600 shadow-md"
              />
            </div>
          </div>
          <div className="mt-12 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {userData.name}
            </h1>
            <p className="text-gray-600">Profile Overview</p>
          </div>
          <div className="border-t border-gray-200 my-6"></div>
          <div className="text-gray-700 text-lg space-y-4">
            <p>
              <span className="font-semibold">📧 Email:</span> {userData.email}
            </p>
            <p>
              <span className="font-semibold">🏡 Address:</span> {userData.address}
            </p>
            <p>
              <span className="font-semibold">📞 Phone:</span> {userData.phone_number}
            </p>
            <p>
              <span className="font-semibold">⚧ Gender:</span> {userData.gender}
            </p>
          </div>
          <div className="border-t border-gray-200 my-6"></div>
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => router.push("/")}
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              aria-label="Go to Home"
            >
              Go to Home
            </button>
            <button
              onClick={logout}
              className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
              aria-label="Log Out"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
