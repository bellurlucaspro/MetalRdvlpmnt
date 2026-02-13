import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { WorldMapComponent } from "./WorldMapComponent";

export function MapSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[48px] text-[#000000] mb-4 relative inline-block">
            Carte du groupe
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-[#E40714] rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h2>
          <p className="text-[#1B1B1B] text-[18px] max-w-3xl mx-auto mt-6">
            Une présence internationale pour mieux vous servir
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-gradient-to-br from-[#C6C6C6]/10 to-white/80 rounded-3xl p-12 border-2 border-[#C6C6C6]/30 shadow-xl"
        >
          {/* Globe interactif 3D */}
          <div className="relative w-full min-h-[600px] flex items-center justify-center">
            <WorldMapComponent />
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-8 text-center"
          >
            <Link to="/implantations">
              <motion.button
                className="bg-[#E40714] text-white px-8 py-4 rounded-xl hover:bg-[#C00612] transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Découvrir nos implantations
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
