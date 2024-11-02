// pages/search/[query].js

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const router = useRouter();
  const { query } = router.query; // الحصول على الاستعلام من الرابط
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      // محاكاة طلب بيانات البحث
      const fetchResults = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/search?query=${query}`
          );
          if (!response.ok) {
            throw new Error("Error fetching search results");
          }
          const data = await response.json();
          setResults(data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchResults();
    }
  }, [query]);

  if (loading)
    return <div className="text-center mt-20 text-lg">Loading...</div>;
  if (results.length === 0)
    return (
      <div className="text-center mt-20 text-lg">
        No results found for "{query}"
      </div>
    );

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      <ul>
        {results.map((item) => (
          <li key={item.id} className="border-b py-2">
            <h2 className="font-semibold">{item.name}</h2>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
