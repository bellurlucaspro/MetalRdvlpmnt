import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Calendar, MapPin, X } from "lucide-react";

export function NewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [showEventPopup, setShowEventPopup] = useState(false);

  return (
    <section
      id="actualites"
      ref={ref}
      className="py-24 px-6 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-[#000000] uppercase mb-6 text-[48px] lg:text-[56px] leading-[1.1] tracking-tight relative inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            Actualités & Événements
            <motion.div
              className="absolute -bottom-3 left-0 w-32 h-1 bg-[#E40714] rounded-full"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.h2>
          <p className="text-[#1B1B1B] max-w-2xl mx-auto text-[18px] mt-8">
            Restez informé de nos dernières réalisations et événements
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* À la une */}
          <motion.div
            className="bg-gradient-to-br from-[#C6C6C6]/20 to-white rounded-2xl p-8 border-2 border-[#C6C6C6]"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            whileHover={{
              borderColor: "#E40714",
              boxShadow: "0 20px 60px rgba(228, 7, 20, 0.1)",
            }}
          >
            <motion.div
              className="inline-block px-4 py-2 bg-[#E40714] text-white rounded-full mb-6"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              À la une
            </motion.div>

            <h3 className="text-[#000000] uppercase mb-4">
              MetalR remporte le Prix de l'Innovation Industrielle 2025
            </h3>

            <p className="text-[#1B1B1B] mb-6">
              Notre nouveau système de structures photovoltaïques auto-portantes
              a été récompensé lors du Salon International de la Métallurgie pour
              son innovation et son efficacité énergétique exceptionnelle.
            </p>

            <div className="flex items-center gap-4 text-[#1B1B1B] mb-6">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[#E40714]" />
                <span>15 octobre 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#E40714]" />
                <span>Paris Expo</span>
              </div>
            </div>

            <motion.button
              className="px-6 py-3 bg-[#E40714] text-white rounded-xl"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(228, 7, 20, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Lire l'article complet
            </motion.button>
          </motion.div>

          {/* Prochain événement */}
          <motion.div
            className="bg-gradient-to-br from-white to-[#C6C6C6]/20 rounded-2xl p-8 border-2 border-[#C6C6C6] relative overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            whileHover={{
              borderColor: "#E40714",
              boxShadow: "0 20px 60px rgba(228, 7, 20, 0.1)",
            }}
          >
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
              <svg viewBox="0 0 200 200" className="text-[#E40714]">
                <pattern
                  id="grid"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </pattern>
                <rect width="200" height="200" fill="url(#grid)" />
              </svg>
            </div>

            <motion.div
              className="inline-block px-4 py-2 bg-[#000000] text-white rounded-full mb-6 relative z-10"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Prochain événement
            </motion.div>

            <h3 className="text-[#000000] uppercase mb-4 relative z-10">
              Journée Portes Ouvertes
            </h3>

            <p className="text-[#1B1B1B] mb-6 relative z-10">
              Découvrez nos installations, rencontrez nos équipes et explorez nos
              dernières innovations lors de notre journée portes ouvertes annuelle.
            </p>

            <div className="space-y-3 mb-6 relative z-10">
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                <Calendar size={20} className="text-[#E40714]" />
                <span className="text-[#1B1B1B]">Samedi 23 novembre 2025</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                <MapPin size={20} className="text-[#E40714]" />
                <span className="text-[#1B1B1B]">
                  Site de production MetalR, Zone Industrielle Nord
                </span>
              </div>
            </div>

            <motion.button
              onClick={() => setShowEventPopup(true)}
              className="px-6 py-3 bg-[#E40714] text-white rounded-xl relative z-10"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(228, 7, 20, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              S'inscrire à l'événement
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Event Popup */}
      {showEventPopup && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#000000]/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowEventPopup(false)}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 max-w-md w-full relative"
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowEventPopup(false)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-[#1B1B1B] hover:text-[#E40714] transition-colors rounded-full hover:bg-[#C6C6C6]/20"
            >
              <X size={24} />
            </button>

            <h3 className="text-[#000000] uppercase mb-4">
              Inscription - Journée Portes Ouvertes
            </h3>

            <p className="text-[#1B1B1B] mb-6">
              Remplissez le formulaire pour confirmer votre participation.
            </p>

            <form className="space-y-4">
              <div>
                <label className="block text-[#1B1B1B] mb-2">Nom complet</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-[#C6C6C6] rounded-xl focus:border-[#E40714] focus:outline-none transition-colors"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label className="block text-[#1B1B1B] mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border-2 border-[#C6C6C6] rounded-xl focus:border-[#E40714] focus:outline-none transition-colors"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label className="block text-[#1B1B1B] mb-2">
                  Nombre de participants
                </label>
                <select className="w-full px-4 py-3 border-2 border-[#C6C6C6] rounded-xl focus:border-[#E40714] focus:outline-none transition-colors">
                  <option>1 personne</option>
                  <option>2 personnes</option>
                  <option>3 personnes</option>
                  <option>4+ personnes</option>
                </select>
              </div>

              <motion.button
                type="submit"
                className="w-full px-6 py-4 bg-[#E40714] text-white rounded-xl"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(228, 7, 20, 0.5)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Confirmer mon inscription
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}