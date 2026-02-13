import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Lightbulb, Factory, Wrench, CheckCircle } from "lucide-react";

export function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const steps = [
    {
      icon: Lightbulb,
      title: "Ingénierie",
      description: "Conception et études techniques sur mesure pour chaque projet",
    },
    {
      icon: Factory,
      title: "Fabrication",
      description: "Production industrielle dans nos 5 usines certifiées",
    },
    {
      icon: Wrench,
      title: "Installation",
      description: "Mise en œuvre par nos équipes expertes sur site",
    },
    {
      icon: CheckCircle,
      title: "Contrôle & livraison",
      description: "Vérification qualité et garantie de conformité",
    },
  ];

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
            Processus clé en main
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-[#E40714] rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h2>
          <p className="text-[#1B1B1B] text-[18px] max-w-3xl mx-auto mt-6">
            De la conception à la livraison, nous maîtrisons chaque étape de votre projet
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Ligne de connexion */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#C6C6C6]/50 via-[#E40714]/50 to-[#C6C6C6]/50 -translate-y-1/2 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative z-10"
            >
              <div className="bg-gradient-to-br from-[#C6C6C6]/10 to-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-[#C6C6C6]/30 hover:border-[#E40714] transition-all duration-300 shadow-lg hover:shadow-xl group h-full">
                {/* Numéro de l'étape */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#E40714] rounded-full flex items-center justify-center text-white text-[20px] shadow-lg">
                  {index + 1}
                </div>

                <motion.div
                  className="flex justify-center mb-6 mt-4"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                    <step.icon size={32} color="#E40714" strokeWidth={1.5} />
                  </div>
                </motion.div>

                <h3 className="text-[20px] text-[#1B1B1B] mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-[#1B1B1B]/70 text-[14px] text-center leading-relaxed">
                  {step.description}
                </p>

                {/* Effet glass au hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#E40714]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ pointerEvents: "none" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
