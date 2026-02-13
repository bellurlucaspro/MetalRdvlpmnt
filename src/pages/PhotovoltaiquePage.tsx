import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Sun, TreeDeciduous, Factory as FactoryIcon, ParkingCircle, Shield, TrendingUp, Award, ArrowRight } from "lucide-react";

export default function PhotovoltaiquePage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const projectTypes = [
    {
      icon: ParkingCircle,
      title: "Ombrières photovoltaïques",
      description: "Parkings solaires pour collectivités et entreprises",
      image: "https://images.unsplash.com/photo-1690793122620-7d0eeb8d0cab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMGNhcnBvcnQlMjBwYXJraW5nfGVufDF8fHx8MTc2ODgyMDE0NXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      icon: TreeDeciduous,
      title: "Centrales au sol",
      description: "Parcs solaires de grande envergure",
      image: "https://images.unsplash.com/photo-1719256383688-305c0c00d179?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm91bmQlMjBtb3VudGVkJTIwc29sYXIlMjBmYXJtfGVufDF8fHx8MTc2ODgyMDE0NXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      icon: FactoryIcon,
      title: "Toitures photovoltaïques",
      description: "Équipement de bâtiments industriels et commerciaux",
      image: "https://images.unsplash.com/photo-1635424709961-f3a150459ad4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMHJvb2Z0b3AlMjBpbnN0YWxsYXRpb258ZW58MXx8fHwxNzY4ODIwMTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const process = [
    { step: "Étude de faisabilité", description: "Analyse technique et financière de votre projet" },
    { step: "Conception & ingénierie", description: "Dimensionnement et études structurelles" },
    { step: "Fabrication", description: "Production des structures dans nos usines" },
    { step: "Installation", description: "Montage et raccordement électrique" },
    { step: "Mise en service", description: "Tests et mise en exploitation" },
    { step: "Maintenance", description: "Suivi et optimisation des performances" },
  ];

  const certifications = [
    {
      icon: Shield,
      title: "Normes CE",
      description: "Conformité européenne garantie",
    },
    {
      icon: Award,
      title: "Certifications ISO",
      description: "Qualité et sécurité certifiées",
    },
    {
      icon: TrendingUp,
      title: "Garantie performance",
      description: "Rendement garanti 25 ans",
    },
  ];

  const keyNumbers = [
    { value: "250 MW", label: "Puissance installée" },
    { value: "+500", label: "Projets photovoltaïques" },
    { value: "98%", label: "Taux de disponibilité" },
    { value: "25 ans", label: "Garantie structure" },
  ];

  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] mb-20 overflow-hidden rounded-3xl max-w-7xl mx-auto">
        <img
          src="https://images.unsplash.com/photo-1761494666841-dec7dc336e83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVsJTIwY2FycG9ydHxlbnwxfHx8fDE3Njg4MjAwMjR8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Photovoltaïque"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/80 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <Sun size={48} color="#E40714" strokeWidth={1.5} />
              </div>
              <h1 className="text-[56px] text-white mb-6">
                Photovoltaïque
              </h1>
              <p className="text-white/90 text-[20px] leading-relaxed">
                Solutions solaires complètes : de la conception à l'exploitation
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {keyNumbers.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-[#E40714] to-[#C00612] rounded-2xl p-6 text-center text-white shadow-xl"
            >
              <div className="text-[36px] mb-2">{stat.value}</div>
              <div className="text-[14px] text-white/90">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Types de projets */}
      <section ref={ref} className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-[48px] text-[#000000] mb-4 relative inline-block">
            Types de projets
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-[#E40714] rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projectTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group bg-white rounded-2xl overflow-hidden border-2 border-[#C6C6C6]/30 hover:border-[#E40714] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={type.image}
                  alt={type.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 to-transparent" />
                <motion.div
                  className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <type.icon size={24} color="#E40714" strokeWidth={1.5} />
                </motion.div>
              </div>
              <div className="p-6">
                <h3 className="text-[22px] text-[#000000] mb-3">{type.title}</h3>
                <p className="text-[#1B1B1B]/70 text-[15px] leading-relaxed">
                  {type.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process photovoltaïque */}
      <section className="bg-gradient-to-br from-[#C6C6C6]/10 to-white py-20 mb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[48px] text-[#000000] mb-4 relative inline-block">
              Notre processus photovoltaïque
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
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 border-2 border-[#C6C6C6]/30 hover:border-[#E40714] transition-all duration-300 shadow-lg relative"
              >
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#E40714] rounded-full flex items-center justify-center text-white shadow-lg">
                  {index + 1}
                </div>
                <h3 className="text-[20px] text-[#1B1B1B] mb-3 mt-2">{item.step}</h3>
                <p className="text-[#1B1B1B]/70 text-[14px] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Normes et certifications */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-[48px] text-[#000000] mb-4 relative inline-block">
            Normes et certifications
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-[#E40714] rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#1B1B1B] to-[#000000] rounded-2xl p-8 text-center text-white shadow-xl"
            >
              <motion.div
                className="flex justify-center mb-6"
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 bg-[#E40714] rounded-xl flex items-center justify-center shadow-lg">
                  <cert.icon size={32} color="white" strokeWidth={1.5} />
                </div>
              </motion.div>
              <h3 className="text-[22px] mb-3">{cert.title}</h3>
              <p className="text-white/80 text-[14px]">{cert.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#E40714] to-[#C00612] rounded-3xl p-12 text-center text-white"
        >
          <h3 className="text-[36px] mb-6">
            Projet photovoltaïque ?
          </h3>
          <p className="text-[18px] text-white/90 mb-8 max-w-2xl mx-auto">
            Nos experts vous accompagnent dans votre transition énergétique
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <motion.button
                className="bg-white text-[#E40714] px-8 py-4 rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Demander un devis
              </motion.button>
            </Link>
            <Link to="/realisations">
              <motion.button
                className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-xl hover:bg-white hover:text-[#E40714] transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Voir nos réalisations
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
