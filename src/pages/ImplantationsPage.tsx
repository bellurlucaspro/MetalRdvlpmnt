import { motion } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";
import { MapPin, Factory, Users, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function ImplantationsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const implantations = [
    {
      country: "France",
      flag: "🇫🇷",
      city: "Beauvais",
      capacity: "15,000 tonnes/an",
      employees: "120",
      activities: ["Conception", "Fabrication", "Installation", "Siège social"],
    },
    {
      country: "Roumanie",
      flag: "🇷🇴",
      city: "Bucarest",
      capacity: "12,000 tonnes/an",
      employees: "85",
      activities: ["Fabrication", "Installation", "Bureau d'études"],
    },
    {
      country: "Balkans",
      flag: "🇷🇸",
      city: "Belgrade, Serbie",
      capacity: "10,000 tonnes/an",
      employees: "60",
      activities: ["Fabrication", "Installation"],
    },
    {
      country: "Tunisie",
      flag: "🇹🇳",
      city: "Tunis",
      capacity: "8,000 tonnes/an",
      employees: "45",
      activities: ["Fabrication", "Installation", "Afrique du Nord"],
    },
    {
      country: "Guinée",
      flag: "🇬🇳",
      city: "Conakry",
      capacity: "5,000 tonnes/an",
      employees: "30",
      activities: ["Fabrication", "Installation", "Afrique de l'Ouest"],
    },
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
            Implantations internationales
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-[#E40714] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h1>
          <p className="text-[20px] text-[#1B1B1B] max-w-3xl mx-auto leading-relaxed mt-8">
            Une présence stratégique en Europe et en Afrique pour mieux vous servir
          </p>
        </motion.div>
      </section>

      {/* Carte du monde simplifiée */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-[#1B1B1B] to-[#000000] rounded-3xl p-12 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(to right, white 1px, transparent 1px),
                linear-gradient(to bottom, white 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="relative text-center text-white">
            <MapPin size={48} color="#E40714" className="mx-auto mb-6" />
            <h2 className="text-[36px] mb-6">5 implantations stratégiques</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {implantations.map((impl, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-[40px] mb-2">{impl.flag}</span>
                  <span className="text-[16px]">{impl.country}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Fiches pays */}
      <section ref={ref} className="max-w-7xl mx-auto px-6 mb-20">
        <div className="space-y-8">
          {implantations.map((impl, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white rounded-3xl overflow-hidden border-2 border-[#C6C6C6]/30 hover:border-[#E40714] transition-all duration-300 shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-8">
                <div className="flex items-center gap-4">
                  <span className="text-[64px]">{impl.flag}</span>
                  <div>
                    <h3 className="text-[32px] text-[#000000]">{impl.country}</h3>
                    <p className="text-[18px] text-[#1B1B1B]/70">{impl.city}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Factory size={20} color="#E40714" />
                    <span className="text-[#1B1B1B]">{impl.capacity}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users size={20} color="#E40714" />
                    <span className="text-[#1B1B1B]">{impl.employees} employés</span>
                  </div>
                </div>

                <div>
                  <p className="text-[14px] text-[#1B1B1B]/70 mb-2">Activités :</p>
                  <div className="flex flex-wrap gap-2">
                    {impl.activities.map((activity, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#C6C6C6]/20 text-[#1B1B1B] text-[13px] rounded-lg border border-[#C6C6C6]/40"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats globales */}
      <section className="bg-gradient-to-br from-[#E40714] to-[#C00612] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-[48px] mb-2">5</div>
              <div className="text-[16px] text-white/90">Pays</div>
            </div>
            <div>
              <div className="text-[48px] mb-2">340</div>
              <div className="text-[16px] text-white/90">Collaborateurs</div>
            </div>
            <div>
              <div className="text-[48px] mb-2">50K</div>
              <div className="text-[16px] text-white/90">Tonnes/an</div>
            </div>
            <div>
              <div className="text-[48px] mb-2">24/7</div>
              <div className="text-[16px] text-white/90">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#C6C6C6]/10 to-white rounded-3xl p-12 text-center border-2 border-[#C6C6C6]/30"
        >
          <Phone size={48} color="#E40714" className="mx-auto mb-6" />
          <h3 className="text-[36px] text-[#000000] mb-6">
            Contactez votre implantation locale
          </h3>
          <p className="text-[18px] text-[#1B1B1B] mb-8 max-w-2xl mx-auto">
            Nos équipes locales sont à votre disposition pour répondre à vos besoins
          </p>
          <Link to="/contact">
            <motion.button
              className="bg-[#E40714] text-white px-10 py-5 rounded-xl hover:bg-[#C00612] transition-all duration-300 shadow-lg"
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
