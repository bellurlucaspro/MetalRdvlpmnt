import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { FileText } from "lucide-react";

export function QuoteBanner() {
  const location = useLocation();
  
  // Ne pas afficher sur la page de contact
  if (location.pathname === "/contact") return null;

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-r from-[#E40714] to-[#C00612] py-4 px-6 shadow-2xl"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-white">
          <FileText size={24} strokeWidth={1.5} />
          <div>
            <p className="text-[16px]">Un projet en tête ?</p>
            <p className="text-[12px] text-white/80">Obtenez un devis gratuit sous 48h</p>
          </div>
        </div>
        
        <Link to="/contact">
          <motion.button
            className="bg-white text-[#E40714] px-8 py-3 rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Demander un devis
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
