import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Rituals from "./pages/Rituals";
import Purohits from "./pages/Purohits";
import PurohitProfile from "./pages/PurohitProfile";
import Book from "./pages/Book";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rituals" element={<Rituals />} />
          <Route path="/purohits" element={<Purohits />} />
          <Route path="/purohit/:id" element={<PurohitProfile />} />
          <Route path="/book" element={<Book />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
