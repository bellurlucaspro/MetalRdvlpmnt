import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Wheat, Sun, Factory, Landmark } from "lucide-react";
import { Link } from "react-router-dom";

export function ExpertiseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const expertises = [
    {
      icon: Wheat,
      title: "Agricole",
      description: "Bâtiments d'élevage, stockage agricole, stabulations et structures AgriPV",
      features: ["Bâtiments d'élevage", "Stockage", "Stabulations", "AgriPV"],
      link: "/solutions/agricole",
      gradient: "from-green-500/10 to-green-600/5",
    },
    {
      icon: Sun,
      title: "Photovoltaïque",
      description: "Ombrières solaires, centrales au sol et toitures photovoltaïques",
      features: ["Ombrières", "Centrales au sol", "Toitures PV", "Clé en main"],
      link: "/solutions/photovoltaique",
      gradient: "from-yellow-500/10 to-orange-500/5",
    },
    {
      icon: Factory,
      title: "Bâtiments industriels",
      description: "Constructions métalliques industrielles et extensions",
      features: ["Halls industriels", "Usines", "Rénovation", "Extensions"],
      link: "/solutions/industriel",
      gradient: "from-blue-500/10 to-blue-600/5",
    },
    {
      icon: Landmark,
      title: "Ouvrages d'art / Génie civil",
      description: "Structures métalliques complexes et ouvrages d'infrastructure",
      features: ["Passerelles", "Ponts", "Génie civil", "Structures spéciales"],
      link: "/solutions/ouvrages-art",
      gradient: "from-gray-500/10 to-gray-600/5",
    },
  ];

  return (
    <section
      id="expertise"
      ref={ref}
      className="py-24 px-6 bg-gradient-to-b from-white to-[#C6C6C6]/20"
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
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Nos domaines d'expertise
            <motion.div
              className="absolute -bottom-3 left-0 h-1 bg-[#E40714] rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </motion.h2>
          <motion.p
            className="text-[#1B1B1B] text-[18px] max-w-3xl mx-auto leading-relaxed mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Des solutions complètes et innovantes pour tous vos projets de structures métalliques
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {expertises.map((expertise, index) => (
            <Link key={index} to={expertise.link}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="group relative bg-white rounded-3xl p-8 border-2 border-[#C6C6C6]/30 hover:border-[#E40714] transition-all duration-500 shadow-lg hover:shadow-2xl cursor-pointer overflow-hidden h-full"
                whileHover={{ y: -8 }}
              >
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${expertise.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-br from-[#E40714] to-[#C00612] rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <expertise.icon size={40} color="white" strokeWidth={1.5} />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-[28px] text-[#000000] mb-4 group-hover:text-[#E40714] transition-colors duration-300">
                    {expertise.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#1B1B1B] text-[16px] mb-6 leading-relaxed">
                    {expertise.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {expertise.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-[#1B1B1B] text-[14px]"
                      >
                        <div className="w-1.5 h-1.5 bg-[#E40714] rounded-full" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.div
                    className="flex items-center gap-2 text-[#E40714] group-hover:gap-4 transition-all duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-[16px]">Découvrir</span>
                    <motion.svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="group-hover:translate-x-1 transition-transform"
                    >
                      <path
                        d="M4 10h12m0 0l-4-4m4 4l-4 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  </motion.div>
                </div>

                {/* Hover effect overlay */}
                <motion.div
                  className="absolute inset-0 border-2 border-[#E40714] rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ pointerEvents: "none" }}
                />
              </motion.div>
            </Link>
          ))}
        </div>

        {/* CTA vers page Solutions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link to="/solutions">
            <motion.button
              className="bg-[#E40714] text-white px-10 py-5 rounded-xl hover:bg-[#C00612] transition-all duration-300 shadow-lg hover:shadow-xl text-[18px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Voir toutes nos solutions
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}