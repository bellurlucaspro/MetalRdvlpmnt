import { motion } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";
import { Link } from "react-router-dom";
import { Factory, Building2, Wrench, TrendingUp } from "lucide-react";

export default function IndustrielPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const solutions = [
    { icon: Building2, title: "Bâtiments neufs", description: "Construction de halls industriels clé en main" },
    { icon: Wrench, title: "Rénovation", description: "Modernisation et extension de bâtiments existants" },
    { icon: Factory, title: "Structures spéciales", description: "Plateformes, mezzanines et structures sur mesure" },
  ];

  const capacities = [
    { title: "5 sites de production", value: "Europe & Afrique" },
    { title: "Capacité annuelle", value: "50,000 tonnes" },
    { title: "Certification", value: "EN 1090 + ISO 9001" },
    { title: "Délais", value: "Respectés à 98%" },
  ];

  return (
    <div className="pt-32 pb-20">
      <section className="relative h-[60vh] mb-20 overflow-hidden rounded-3xl max-w-7xl mx-auto">
        <img
          src="https://images.unsplash.com/photo-1731847999830-6f71b78d720e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWN0b3J5JTIwd2FyZWhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY4ODA4ODUxfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Industriel"
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
              <Factory size={48} color="#E40714" className="mb-6" />
              <h1 className="text-[56px] text-white mb-6">Industriel & Bâtiments métalliques</h1>
              <p className="text-white/90 text-[20px] leading-relaxed">
                Constructions métalliques robustes pour l'industrie moderne
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
            Solutions proposées
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-[#E40714] rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {solutions.map((sol, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white rounded-2xl p-8 border-2 border-[#C6C6C6]/30 hover:border-[#E40714] transition-all duration-300 shadow-lg"
            >
              <sol.icon size={40} color="#E40714" className="mb-6" strokeWidth={1.5} />
              <h3 className="text-[24px] text-[#1B1B1B] mb-4">{sol.title}</h3>
              <p className="text-[#1B1B1B]/70 text-[15px]">{sol.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#1B1B1B] to-[#000000] rounded-3xl p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[48px] text-white mb-4 relative inline-block">
              Capacités de production
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-[#E40714] rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capacities.map((cap, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center text-white border-2 border-white/20"
              >
                <div className="text-[28px] text-[#E40714] mb-2">{cap.value}</div>
                <div className="text-[14px] text-white/80">{cap.title}</div>
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
          <h3 className="text-[36px] mb-6">Projet industriel ?</h3>
          <p className="text-[18px] mb-8 max-w-2xl mx-auto">
            Discutons de votre projet de construction ou rénovation industrielle
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
