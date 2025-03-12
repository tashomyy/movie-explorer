import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/UI/Layout";
import Home from "./views/Home";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>

      {/* 404 page */}
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  </Router>
);

export default AppRoutes;
