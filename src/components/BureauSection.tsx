import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function BureauSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Bureau d'études",
      subtitle: "Conception technique avancée",
      description:
        "Notre bureau d'études maîtrise les dernières technologies pour concevoir des structures optimisées et conformes aux normes les plus strictes.",
      image: "https://images.unsplash.com/photo-1602819604554-4eeace2aacda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdGVlbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2Mjg3Mjk2OHww&ixlib=rb-4.1.0&q=80&w=1080",
      features: [
        "Modélisation 3D BIM",
        "Calculs de structures",
        "Plans d'exécution",
        "Assistance technique",
      ],
    },
    {
      id: 2,
      title: "Usine de fabrication",
      subtitle: "Production haute technologie",
      description:
        "Nos installations modernes permettent la fabrication de composants métalliques de précision avec un contrôle qualité rigoureux à chaque étape.",
      image: "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZmFjdG9yeXxlbnwxfHx8fDE3NjI4NTE2MjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      features: [
        "Découpe laser CNC",
        "Pliage robotisé",
        "Soudage certifié",
        "Traitement de surface",
      ],
    },
    {
      id: 3,
      title: "Atelier de montage",
      subtitle: "Assemblage et finition",
      description:
        "Nos équipes spécialisées assurent l'assemblage final et la finition des structures avec une attention particulière aux détails et à la qualité.",
      image: "https://images.unsplash.com/photo-1695651832926-66591245a88c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMGNvbnN0cnVjdGlvbiUyMHNpdGU8ZW58MXx8fHwxNzYyODcyOTY4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      features: [
        "Montage sur site",
        "Contrôle qualité",
        "Installation complète",
        "Maintenance préventive",
      ],
    },
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section
      id="bureau"
      ref={ref}
      className="py-24 px-6 bg-gradient-to-b from-[#C6C6C6]/20 to-white"
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
            Bureau d'étude & Usines
            <motion.div
              className="absolute -bottom-3 left-0 w-32 h-1 bg-[#E40714] rounded-full"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.h2>
          <p className="text-[#1B1B1B] max-w-2xl mx-auto text-[18px] mt-8">
            Des installations de pointe pour une excellence opérationnelle
          </p>
        </motion.div>

        <div className="relative">
          {/* Carousel */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <motion.div
              className="relative rounded-2xl overflow-hidden h-[500px]"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <ImageWithFallback
                  src={slides[activeSlide].image}
                  alt={slides[activeSlide].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/50 to-transparent" />
              </motion.div>

              {/* Navigation buttons */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center z-10">
                <motion.button
                  onClick={prevSlide}
                  className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#1B1B1B] hover:bg-[#E40714] hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft size={24} />
                </motion.button>

                <div className="flex gap-2">
                  {slides.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setActiveSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === activeSlide
                          ? "w-8 bg-[#E40714]"
                          : "w-2 bg-white/60"
                      }`}
                      whileHover={{ scale: 1.2 }}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={nextSlide}
                  className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#1B1B1B] hover:bg-[#E40714] hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight size={24} />
                </motion.button>
              </div>
            </motion.div>

            {/* Contenu */}
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div>
                <motion.div
                  className="inline-block px-4 py-2 bg-[#E40714]/10 rounded-full mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span className="text-[#E40714]">
                    {slides[activeSlide].subtitle}
                  </span>
                </motion.div>

                <h3 className="text-[#000000] uppercase mb-4">
                  {slides[activeSlide].title}
                </h3>

                <p className="text-[#1B1B1B]">
                  {slides[activeSlide].description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {slides[activeSlide].features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#C6C6C6]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{
                      scale: 1.05,
                      borderColor: "#E40714",
                    }}
                  >
                    <div className="w-2 h-2 bg-[#E40714] rounded-full" />
                    <span className="text-[#1B1B1B]">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                className="px-8 py-4 bg-[#E40714] text-white rounded-xl inline-flex items-center gap-2"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(228, 7, 20, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Visiter nos installations
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M1 8h14M8 1l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}