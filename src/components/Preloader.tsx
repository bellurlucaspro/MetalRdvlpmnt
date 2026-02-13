import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress >= 100 ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Logo avec animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="flex items-center gap-2"
            animate={{
              filter: [
                "drop-shadow(0 0 0px #E40714)",
                "drop-shadow(0 0 20px #E40714)",
                "drop-shadow(0 0 0px #E40714)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="text-[48px] uppercase tracking-tight">
              <span className="text-[#000000]">METAL</span>
              <span className="text-[#E40714]">R</span>
            </div>
          </motion.div>
          <motion.div
            className="text-[10px] tracking-[0.2em] text-[#1B1B1B] text-center uppercase mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Structures métalliques • Énergies renouvelables
          </motion.div>
        </motion.div>

        {/* Barre de progression */}
        <div className="w-64 h-1 bg-[#C6C6C6] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#E40714]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Pourcentage */}
        <motion.div
          className="text-[#1B1B1B] text-[24px] tabular-nums"
          key={progress}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {progress}%
        </motion.div>
      </div>
    </motion.div>
  );
}
