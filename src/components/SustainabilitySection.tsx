import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Leaf, Recycle, Zap, Award } from "lucide-react";

export function SustainabilitySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const commitments = [
    {
      icon: Leaf,
      title: "Matériaux durables",
      value: "95%",
      description: "de nos matériaux sont recyclables",
    },
    {
      icon: Recycle,
      title: "Économie circulaire",
      value: "85%",
      description: "de réduction des déchets de production",
    },
    {
      icon: Zap,
      title: "Énergie verte",
      value: "100%",
      description: "d'énergie renouvelable dans nos usines",
    },
    {
      icon: Award,
      title: "Certification ISO",
      value: "14001",
      description: "Management environnemental certifié",
    },
  ];

  return (
    <section
      id="engagements"
      ref={ref}
      className="py-24 px-6 bg-gradient-to-b from-[#C6C6C6]/20 to-white relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern
              id="sustainability-grid"
              x="0"
              y="0"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="5" cy="5" r="1" fill="#E40714" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#sustainability-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
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
            Engagements durables
            <motion.div
              className="absolute -bottom-3 left-0 w-32 h-1 bg-[#E40714] rounded-full"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.h2>
          <p className="text-[#1B1B1B] max-w-2xl mx-auto text-[18px] mt-8">
            Notre responsabilité environnementale au cœur de notre activité
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {commitments.map((commitment, index) => {
            const Icon = commitment.icon;
            return (
              <motion.div
                key={index}
                className="group bg-white rounded-2xl p-8 border-2 border-[#C6C6C6] hover:border-[#E40714] transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 60px rgba(228, 7, 20, 0.15)",
                }}
              >
                {/* Icon */}
                <motion.div
                  className="mb-6"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#C6C6C6]/30 to-[#C6C6C6]/10 rounded-2xl flex items-center justify-center group-hover:from-[#E40714]/20 group-hover:to-[#E40714]/5 transition-all duration-500">
                    <Icon
                      className="text-[#1B1B1B] group-hover:text-[#E40714] transition-colors duration-500"
                      size={32}
                      strokeWidth={1.5}
                    />
                  </div>
                </motion.div>

                {/* Value */}
                <motion.div
                  className="text-[#E40714] mb-2"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  {commitment.value}
                </motion.div>

                {/* Title */}
                <h4 className="text-[#000000] uppercase mb-3">
                  {commitment.title}
                </h4>

                {/* Description */}
                <p className="text-[#1B1B1B]">
                  {commitment.description}
                </p>

                {/* Hover indicator */}
                <motion.div
                  className="mt-6 pt-4 border-t border-[#C6C6C6]"
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileHover={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-1 bg-gradient-to-r from-[#E40714] to-transparent rounded-full" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-white to-[#C6C6C6]/30 rounded-2xl p-8 md:p-12 text-center border-2 border-[#C6C6C6]"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className="text-[#000000] uppercase mb-4">
            Notre politique RSE
          </h3>
          <p className="text-[#1B1B1B] max-w-2xl mx-auto mb-8">
            Découvrez en détail nos actions concrètes pour un avenir plus durable
            et notre engagement envers les générations futures.
          </p>
          <motion.button
            className="px-8 py-4 bg-[#E40714] text-white rounded-xl inline-flex items-center gap-2"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(228, 7, 20, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Télécharger notre rapport RSE
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8 1v10M4 8l4 4 4-4M2 15h12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}