import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Wheat, Home, PackageCheck, Sun, Download, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function AgricolePage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const buildingTypes = [
    {
      icon: Home,
      title: "Bâtiments d'élevage",
      description: "Stabulations, poulaillers et structures adaptées à tous types d'élevage",
    },
    {
      icon: PackageCheck,
      title: "Stockage agricole",
      description: "Hangars de stockage pour céréales, matériel et fourrage",
    },
    {
      icon: Wheat,
      title: "Structures polyvalentes",
      description: "Bâtiments modulables selon vos besoins d'exploitation",
    },
  ];

  const benefits = [
    "Structures robustes et durables conçues pour résister aux conditions agricoles",
    "Ventilation optimale pour le bien-être animal et la conservation",
    "Conception sur mesure adaptée à votre exploitation",
    "Respect des normes environnementales et sanitaires",
    "Installation rapide avec minimum d'interruption de votre activité",
    "Maintenance réduite grâce à la qualité des matériaux",
  ];

  const projects = [
    {
      title: "Stabulation moderne",
      location: "Normandie, France",
      specs: "1200m² - 180 vaches laitières",
      image: "https://images.unsplash.com/photo-1653233532156-327bf57aab82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3clMjBiYXJuJTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzY4ODIwMDc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Hangar de stockage",
      location: "Beauce, France",
      specs: "2500m² - Stockage céréales",
      image: "https://images.unsplash.com/photo-1761488387594-887b29fdaa1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwc3RvcmFnZSUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2ODgyMDA3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Structure AgriPV",
      location: "Occitanie, France",
      specs: "3000m² - Ombrières photovoltaïques",
      image: "https://images.unsplash.com/photo-1670519808965-16b9b2f724af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3Jpdm9sdGFpYyUyMHNvbGFyJTIwZmFybXxlbnwxfHx8fDE3Njg4MjAwNzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] mb-20 overflow-hidden rounded-3xl max-w-7xl mx-auto">
        <img
          src="https://images.unsplash.com/photo-1761013333528-c023ed62e784?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBiYXJuJTIwc3RydWN0dXJlfGVufDF8fHx8MTc2ODgyMDAyNHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Secteur Agricole"
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
                <Wheat size={48} color="#E40714" strokeWidth={1.5} />
              </div>
              <h1 className="text-[56px] text-white mb-6">
                Secteur Agricole
              </h1>
              <p className="text-white/90 text-[20px] leading-relaxed">
                Des structures métalliques robustes et adaptées aux exigences 
                de l'agriculture moderne
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Types de bâtiments */}
      <section ref={ref} className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-[48px] text-[#000000] mb-4 relative inline-block">
            Nos types de bâtiments
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-[#E40714] rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {buildingTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-gradient-to-br from-[#C6C6C6]/10 to-white/80 rounded-2xl p-8 border-2 border-[#C6C6C6]/30 hover:border-[#E40714] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <motion.div
                className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-md mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <type.icon size={32} color="#E40714" strokeWidth={1.5} />
              </motion.div>
              <h3 className="text-[24px] text-[#1B1B1B] mb-4">{type.title}</h3>
              <p className="text-[#1B1B1B]/70 text-[15px] leading-relaxed">
                {type.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Focus AgriPV */}
      <section className="bg-gradient-to-br from-[#1B1B1B] to-[#000000] py-20 mb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Sun size={40} color="#E40714" strokeWidth={1.5} />
                <h2 className="text-[48px] text-white">AgriPV</h2>
              </div>
              <p className="text-white/90 text-[18px] leading-relaxed mb-6">
                Combinez production agricole et production d'énergie solaire avec nos 
                structures photovoltaïques adaptées au monde agricole.
              </p>
              <ul className="space-y-4">
                {[
                  "Protection des cultures et des animaux",
                  "Revenu complémentaire garanti",
                  "Optimisation de l'espace disponible",
                  "Solutions clé en main avec accompagnement",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-white/80">
                    <span className="w-6 h-6 bg-[#E40714] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-[14px]">✓</span>
                    </span>
                    <span className="text-[16px]">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1670519808965-16b9b2f724af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3Jpdm9sdGFpYyUyMHNvbGFyJTIwZmFybXxlbnwxfHx8fDE3Njg4MjAwNzd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="AgriPV"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bénéfices pour exploitants */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-[48px] text-[#000000] mb-4 relative inline-block">
            Bénéfices pour les exploitants
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-[#E40714] rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 border-2 border-[#C6C6C6]/30 hover:border-[#E40714] transition-all duration-300 shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#E40714] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-[16px]">✓</span>
                </div>
                <p className="text-[#1B1B1B] text-[16px] leading-relaxed">{benefit}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Galerie de réalisations */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-[48px] text-[#000000] mb-4 relative inline-block">
            Nos réalisations agricoles
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
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-2xl overflow-hidden border-2 border-[#C6C6C6]/30 hover:border-[#E40714] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-[22px] text-[#000000] mb-2">{project.title}</h3>
                <p className="text-[#1B1B1B]/70 text-[14px] mb-2">{project.location}</p>
                <p className="text-[#E40714] text-[14px]">{project.specs}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/realisations">
            <motion.button
              className="bg-[#E40714] text-white px-8 py-4 rounded-xl hover:bg-[#C00612] transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Voir toutes nos réalisations</span>
              <ArrowRight size={20} />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* CTA Download + Contact */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#C6C6C6]/10 to-white/80 rounded-3xl p-10 text-center border-2 border-[#C6C6C6]/30"
          >
            <Download size={48} color="#E40714" className="mx-auto mb-6" />
            <h3 className="text-[28px] text-[#000000] mb-4">
              Fiche technique
            </h3>
            <p className="text-[16px] text-[#1B1B1B] mb-6">
              Téléchargez notre documentation complète sur nos solutions agricoles
            </p>
            <motion.button
              className="bg-white text-[#E40714] border-2 border-[#E40714] px-8 py-3 rounded-xl hover:bg-[#E40714] hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Télécharger le PDF
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#E40714] to-[#C00612] rounded-3xl p-10 text-center"
          >
            <h3 className="text-[28px] text-white mb-4">
              Un projet agricole ?
            </h3>
            <p className="text-white/90 text-[16px] mb-6">
              Nos experts étudient votre projet et vous accompagnent de A à Z
            </p>
            <Link to="/contact">
              <motion.button
                className="bg-white text-[#E40714] px-8 py-3 rounded-xl hover:bg-white/90 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Demander un devis
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
