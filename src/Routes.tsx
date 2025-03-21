import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/UI/Layout";
import Home from "./views/Home";
import MoviePage from "./views/MoviePage";
import ListsPage from "./views/Lists";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/lists" element={<ListsPage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
      </Route>

      {/* 404 page */}
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  </Router>
);

export default AppRoutes;
