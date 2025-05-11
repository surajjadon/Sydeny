import React, { useState, useEffect } from "react";

export default function CategoryFilter({ onCategorySelect }) {
   console.log("onCategorySelect prop:", onCategorySelect);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://app.ticketmaster.com/discovery/v2/classifications.json?apikey=jdCpz1WN0JvFtKEyAIe290mrYOGejNA9"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // Extract relevant categories from the API response
        const mainCategories = data._embedded?.classifications
          ?.filter(c => c.segment)
          ?.map(category => ({
            id: category.segment.id,
            name: category.segment.name
          })) || [];

        setCategories([{ id: "all", name: "All Events" }, ...mainCategories]);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    onCategorySelect(categoryId);
  };

  if (loading) {
    return <div className="text-center py-4">Loading categories...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">Error: {error}</div>;
  }

  return (
    <div className="mb-8 py-8 px-10">
      <h2 className="text-4xl font-medium mb-1 py-1">Upcoming Events</h2>
      <p className="text-gray-600 mb-4">Explore the best events happening in Sydney</p>
      
      <h3 className="text-lg font-semibold mb-3">Filter by Category</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition 
              ${selectedCategory === category.id 
                ? "bg-purple-800 text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
    </div>
  );
}
