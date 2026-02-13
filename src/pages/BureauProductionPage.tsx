import { motion } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";
import { Cpu, Award, Factory, Cog } from "lucide-react";

export default function BureauProductionPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const bureauServices = [
    { icon: Cpu, title: "Logiciels CAO/DAO", description: "AutoCAD, Tekla Structures, Robot Structural" },
    { icon: Award, title: "Certifications", description: "EN 1090 EXC3, ISO 9001, CE Marking" },
    { icon: Cog, title: "Méthodologies", description: "Calculs aux eurocodes, BIM, ingénierie collaborative" },
  ];

  const usines = [
    { name: "France", location: "Beauvais", capacity: "15,000 tonnes/an" },
    { name: "Roumanie", location: "Bucarest", capacity: "12,000 tonnes/an" },
    { name: "Balkans", location: "Serbie", capacity: "10,000 tonnes/an" },
    { name: "Tunisie", location: "Tunis", capacity: "8,000 tonnes/an" },
    { name: "Guinée", location: "Conakry", capacity: "5,000 tonnes/an" },
  ];

  return (
    <div className="pt-32 pb-20">
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-[56px] text-[#000000] mb-6 relative inline-block">
            Bureau d'études & Production
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-[#E40714] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h1>
          <p className="text-[20px] text-[#1B1B1B] max-w-3xl mx-auto leading-relaxed mt-8">
            De la conception à la fabrication, une maîtrise complète de votre projet
          </p>
        </motion.div>
      </section>

      <section ref={ref} className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-[48px] text-[#000000] mb-4 relative inline-block">
            Notre bureau d'études
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-[#E40714] rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {bureauServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white rounded-2xl p-8 border-2 border-[#C6C6C6]/30 hover:border-[#E40714] transition-all duration-300 shadow-lg"
            >
              <service.icon size={40} color="#E40714" className="mb-6" strokeWidth={1.5} />
              <h3 className="text-[24px] text-[#1B1B1B] mb-4">{service.title}</h3>
              <p className="text-[#1B1B1B]/70 text-[15px]">{service.description}</p>
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
            <Factory size={48} color="#E40714" className="mx-auto mb-6" />
            <h2 className="text-[48px] text-white mb-4 relative inline-block">
              Nos 5 sites de production
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-[#E40714] rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {usines.map((usine, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center text-white border-2 border-white/20 hover:border-[#E40714] transition-all duration-300"
              >
                <div className="text-[24px] text-[#E40714] mb-2">{usine.name}</div>
                <div className="text-[14px] mb-2">{usine.location}</div>
                <div className="text-[12px] text-white/70">{usine.capacity}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 border-2 border-white/20">
              <div className="text-[36px] text-[#E40714] mb-2">50,000 tonnes</div>
              <div className="text-white text-[16px]">Capacité totale annuelle</div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-[48px] text-[#000000] mb-4 relative inline-block">
            Ligne du processus industriel
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-[#E40714] rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {["Découpe laser", "Pliage & formage", "Soudage robotisé", "Galvanisation"].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#C6C6C6]/10 to-white rounded-2xl p-6 border-2 border-[#C6C6C6]/30 text-center relative"
            >
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#E40714] rounded-full flex items-center justify-center text-white shadow-lg">
                {index + 1}
              </div>
              <p className="text-[18px] text-[#1B1B1B] mt-4">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
