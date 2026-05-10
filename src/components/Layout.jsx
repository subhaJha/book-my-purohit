import { motion } from "framer-motion";
import TopBar from "./TopBar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#FFF8EE]">
      <TopBar />
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-6xl mx-auto px-4 py-6"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
