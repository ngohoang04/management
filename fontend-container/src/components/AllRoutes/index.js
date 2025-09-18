import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home page</div>} />
      </Routes>
    </BrowserRouter>
  );
}
