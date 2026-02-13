import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { TrendingUp, Zap, Users, MapPin } from "lucide-react";

export function KeyStatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const stats = [
    { 
      icon: TrendingUp, 
      number: "+1000", 
      label: "Projets réalisés",
      color: "#E40714"
    },
    { 
      icon: Zap, 
      number: "250 MW", 
      label: "Installés",
      color: "#E40714"
    },
    { 
      icon: Users, 
      number: "280", 
      label: "Employés",
      color: "#E40714"
    },
    { 
      icon: MapPin, 
      number: "5", 
      label: "Implantations internationales",
      color: "#E40714"
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-white to-[#C6C6C6]/10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[48px] text-[#000000] mb-4 relative inline-block">
            Chiffres clés
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-[#E40714] rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-[#C6C6C6]/30 hover:border-[#E40714]/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                <motion.div
                  className="flex justify-center mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <stat.icon size={48} color={stat.color} strokeWidth={1.5} />
                </motion.div>
                
                <div className="text-center">
                  <motion.div
                    className="text-[40px] text-[#000000] mb-2"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1, type: "spring" }}
                  >
                    {stat.number}
                  </motion.div>
                  <p className="text-[#1B1B1B] text-[15px]">{stat.label}</p>
                </div>

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
