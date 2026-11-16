import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Rituals from "./pages/Rituals";
import Purohits from "./pages/Purohits";
import Book from "./pages/Book";
import Track from "./pages/Track";
import Account from "./pages/Account";
import PurohitPortal from "./pages/PurohitPortal";
import Dashboard from "./pages/admin/Dashboard";
import { languages, translation } from "./content";
import { LanguageContext } from "./language";

function initialLanguage() {
  try {
    const saved = localStorage.getItem("purohit-language");
    if (Object.hasOwn(languages, saved)) return saved;
  } catch {
    // A private browsing session can still switch language in memory.
  }
  return "bn";
}

export default function App() {
  const [language, setLanguage] = useState(initialLanguage);
  const t = translation(language);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = translation(language)("brand");
    try {
      localStorage.setItem("purohit-language", language);
    } catch {
      // Language switching remains available without storage.
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rituals" element={<Rituals />} />
            <Route path="/purohits" element={<Purohits />} />
            <Route path="/purohit/:id" element={<Purohits />} />
            <Route path="/book" element={<Book />} />
            <Route path="/track/:id?" element={<Track />} />
            <Route path="/account" element={<Account />} />
            <Route path="/purohit-portal" element={<PurohitPortal />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="*" element={<h1>{t("missing")}</h1>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </LanguageContext.Provider>
  );
}
