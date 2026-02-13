import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Award, Building2, Clock } from "lucide-react";

export function CertificationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const certifications = [
    {
      icon: Award,
      title: "Qualité européenne",
      description: "Certifications ISO et normes CE pour tous nos produits",
    },
    {
      icon: Building2,
      title: "Production multi-sites",
      description: "5 usines de fabrication en Europe et Afrique",
    },
    {
      icon: Clock,
      title: "Maîtrise des délais",
      description: "Respect garanti des plannings de livraison",
    },
  ];

  return (
    <section ref={ref} className="py-16 bg-gradient-to-b from-[#C6C6C6]/10 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-br from-[#1B1B1B] to-[#000000] rounded-3xl p-12 relative overflow-hidden">
          {/* Pattern background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`
            }} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 relative z-10"
          >
            <h2 className="text-[48px] text-white mb-4 relative inline-block">
              Certifications & Garanties
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-[#E40714] rounded-full"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20 hover:border-[#E40714] transition-all duration-300 hover:bg-white/15 h-full">
                  <motion.div
                    className="flex justify-center mb-6"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-16 h-16 bg-[#E40714] rounded-xl flex items-center justify-center shadow-lg">
                      <cert.icon size={32} color="white" strokeWidth={1.5} />
                    </div>
                  </motion.div>

                  <h3 className="text-[20px] text-white mb-3 text-center">
                    {cert.title}
                  </h3>
                  <p className="text-white/70 text-[14px] text-center leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
