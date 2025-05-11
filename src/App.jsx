import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import EventList from "./Components/EventList";
import EventDetails from "./Components/EventDetails";
import EventDetailsMobile from "./Components/EventDetailsMobile";
import { fetchEvents } from "./Components/Apiii";
import { useMediaQuery } from "react-responsive";

export default function App() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const isMobile = useMediaQuery({ maxWidth: 767 }); // Adjust as needed

  const loadEvents = async (
  page = 0,
  reset = true,
  categoryParam = selectedCategory,
  searchTermParam = searchKeyword
) => {
  const { events: newEvents, totalPages: tp, totalElements: te } = await fetchEvents({
    page,
    searchTerm: searchTermParam,
    category: categoryParam,
  });
  setEvents(prev => reset ? newEvents : [...prev, ...newEvents]);
  setTotalPages(tp);
  setTotalElements(te);
  setCurrentPage(page);
};


 
  const handleSearch = (keyword) => {
  setSearchKeyword(keyword);
  setSelectedCategory("all");
  loadEvents(0, true, "all", keyword); // <-- Pass both explicitly
};

const handleCategorySelect = (category) => {
  setSelectedCategory(category);
  setSearchKeyword("");
  loadEvents(0, true, category, ""); // <-- Pass both explicitly
};

  const handleLoadMore = () => {
    loadEvents(currentPage + 1, false);
  };

  useEffect(() => {
    console.log(`useEffect triggered: searchKeyword=${searchKeyword}, selectedCategory=${selectedCategory}`);
    loadEvents(0, true, selectedCategory);  // Reset events when search or category changes
    // eslint-disable-next-line
  }, [selectedCategory, searchKeyword]);

  return (
    <Router>
      <Routes>
        <Route path="/" element= {<Layout
      onSearch={handleSearch}
      onCategorySelect={handleCategorySelect}
    />}>
      <Route
            index
            element={
              <EventList
                events={events}
                totalElements={totalElements}
                currentPage={currentPage}
                totalPages={totalPages}
                onLoadMore={handleLoadMore}
              />
            }
          />
          <Route
            path="/event/:id"
            element={isMobile ? <EventDetailsMobile /> : <EventDetails />}
          />
        </Route>
      </Routes>
    </Router>
  );
}
