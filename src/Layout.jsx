import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import CategoryFilter from "./Components/CategoryFilter";
import { useLocation } from "react-router-dom";
import Footer from "./Components/Footer";

const Layout = ({ onSearch, onCategorySelect }) => {
  const location = useLocation();
  const isEventDetailsPage = location.pathname.startsWith("/event");  
  return (
    <div>
      <Header onSearch={onSearch} />
      {!isEventDetailsPage && (
        <>
          <Hero onSearch={onSearch}  />
           <CategoryFilter onCategorySelect={onCategorySelect} />
        </>
      )}
      <main>
        <Outlet /> {/* Route-specific content will be rendered here */}
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
