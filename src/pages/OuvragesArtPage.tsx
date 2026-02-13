import { motion } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";
import { Link } from "react-router-dom";
import { Landmark, Mountain, Building, Cog } from "lucide-react";

export default function OuvragesArtPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const typologies = [
    { icon: Landmark, title: "Passerelles", description: "Passerelles piétonnes et cyclables" },
    { icon: Mountain, title: "Ouvrages complexes", description: "Structures métalliques spéciales" },
    { icon: Building, title: "Génie civil", description: "Support de bâtiments et infrastructures" },
  ];

  const expertise = [
    "Calcul de structures complexes",
    "Études sismiques et dynamiques",
    "Optimisation des matériaux",
    "Respect des eurocodes",
    "Suivi de chantier dédié",
    "Contrôle qualité rigoureux",
  ];

  return (
    <div className="pt-32 pb-20">
      <section className="relative h-[60vh] mb-20 overflow-hidden rounded-3xl max-w-7xl mx-auto">
        <img
          src="https://images.unsplash.com/photo-1696759106449-70e7d2ea67d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVlbCUyMGJyaWRnZSUyMGNvbnN0cnVjdGlvbnxlbnwxfHx8fDE3Njg4MjAyMDV8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Ouvrages d'art"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/80 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <Landmark size={48} color="#E40714" className="mb-6" />
              <h1 className="text-[56px] text-white mb-6">Ouvrages d'art & Génie civil</h1>
              <p className="text-white/90 text-[20px] leading-relaxed">
                Expertise en structures métalliques complexes et ouvrages d'art
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={ref} className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-[48px] text-[#000000] mb-4 relative inline-block">
            Typologies d'ouvrages
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-[#E40714] rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {typologies.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-gradient-to-br from-[#C6C6C6]/10 to-white rounded-2xl p-8 border-2 border-[#C6C6C6]/30 hover:border-[#E40714] transition-all duration-300 shadow-lg"
            >
              <type.icon size={40} color="#E40714" className="mb-6" strokeWidth={1.5} />
              <h3 className="text-[24px] text-[#1B1B1B] mb-4">{type.title}</h3>
              <p className="text-[#1B1B1B]/70 text-[15px]">{type.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#1B1B1B] to-[#000000] py-20 mb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Cog size={48} color="#E40714" className="mx-auto mb-6" />
            <h2 className="text-[48px] text-white mb-4 relative inline-block">
              Expertise du bureau d'études
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-[#E40714] rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertise.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20 hover:border-[#E40714] transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#E40714] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[16px]">✓</span>
                  </div>
                  <p className="text-white text-[16px]">{item}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#E40714] to-[#C00612] rounded-3xl p-12 text-center text-white"
        >
          <h3 className="text-[36px] mb-6">Projet d'ouvrage d'art ?</h3>
          <p className="text-[18px] mb-8 max-w-2xl mx-auto">
            Confiez-nous votre projet de structure complexe
          </p>
          <Link to="/contact">
            <motion.button
              className="bg-white text-[#E40714] px-10 py-5 rounded-xl hover:bg-white/90 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Nous contacter
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}