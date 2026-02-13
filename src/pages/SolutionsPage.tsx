import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Wheat, Sun, Factory, Landmark } from "lucide-react";

export default function SolutionsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const solutions = [
    {
      title: "Agricole",
      icon: Wheat,
      description: "Bâtiments d'élevage, stockage agricole, stabulations et hangars sur mesure",
      image: "https://images.unsplash.com/photo-1761013333528-c023ed62e784?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBiYXJuJTIwc3RydWN0dXJlfGVufDF8fHx8MTc2ODgyMDAyNHww&ixlib=rb-4.1.0&q=80&w=1080",
      link: "/solutions/agricole",
      features: ["Bâtiments d'élevage", "Stockage", "Stabulations"],
    },
    {
      title: "Photovoltaïque",
      icon: Sun,
      description: "Ombrières solaires, centrales au sol et toitures photovoltaïques clé en main",
      image: "https://images.unsplash.com/photo-1761494666841-dec7dc336e83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVsJTIwY2FycG9ydHxlbnwxfHx8fDE3Njg4MjAwMjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      link: "/solutions/photovoltaique",
      features: ["Ombrières", "Centrales au sol", "Toitures PV"],
    },
    {
      title: "Industriel",
      icon: Factory,
      description: "Bâtiments métalliques industriels, rénovation d'usines et extensions",
      image: "https://images.unsplash.com/photo-1543847036-8e67e0c526f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWV0YWwlMjBidWlsZGluZ3xlbnwxfHx8fDE3Njg4MjAwMjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      link: "/solutions/industriel",
      features: ["Bâtiments métalliques", "Rénovation", "Extensions"],
    },
    {
      title: "Ouvrages d'art",
      icon: Landmark,
      description: "Structures métalliques pour génie civil, passerelles et ouvrages complexes",
      image: "https://images.unsplash.com/photo-1696759106449-70e7d2ea67d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkZ2UlMjBjb25zdHJ1Y3Rpb24lMjBzdGVlbHxlbnwxfHx8fDE3Njg4MjAwMjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      link: "/solutions/ouvrages-art",
      features: ["Passerelles", "Génie civil", "Structures complexes"],
    },
  ];

  const advantages = [
    "Expertise technique reconnue depuis 2018",
    "Bureau d'études intégré pour des solutions sur mesure",
    "5 sites de production certifiés en Europe et Afrique",
    "Maîtrise complète de la chaîne de valeur",
    "Respect des délais et engagement qualité",
    "Support technique et SAV dédié",
  ];

  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-[56px] text-[#000000] mb-6 relative inline-block">
            Nos solutions
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-[#E40714] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h1>
          <p className="text-[20px] text-[#1B1B1B] max-w-3xl mx-auto leading-relaxed mt-8">
            Des structures métalliques innovantes et durables pour l'agriculture, 
            l'énergie solaire, l'industrie et le génie civil
          </p>
        </motion.div>
      </section>

      {/* Solutions Grid */}
      <section ref={ref} className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link to={solution.link}>
                <div className="group relative bg-white rounded-3xl overflow-hidden border-2 border-[#C6C6C6]/30 hover:border-[#E40714] transition-all duration-500 shadow-xl hover:shadow-2xl h-full">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 to-transparent" />
                    
                    {/* Icon */}
                    <motion.div
                      className="absolute top-6 right-6 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <solution.icon size={32} color="#E40714" strokeWidth={1.5} />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-[28px] text-[#000000] mb-4">
                      {solution.title}
                    </h3>
                    <p className="text-[#1B1B1B] text-[16px] mb-6 leading-relaxed">
                      {solution.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {solution.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-[#C6C6C6]/20 text-[#1B1B1B] text-[13px] rounded-lg border border-[#C6C6C6]/40"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                      className="flex items-center gap-2 text-[#E40714] group-hover:gap-4 transition-all duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-[16px]">Découvrir</span>
                      <ArrowRight size={20} />
                    </motion.div>
                  </div>

                  {/* Effet glass au hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#E40714]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pourquoi choisir MetalR */}
      <section className="bg-gradient-to-br from-[#1B1B1B] to-[#000000] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[48px] text-white mb-4 relative inline-block">
              Pourquoi choisir METALR ?
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
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20 hover:border-[#E40714] transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#E40714] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-[16px]">✓</span>
                  </div>
                  <p className="text-white text-[16px] leading-relaxed">{advantage}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Contact */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#C6C6C6]/10 to-white/80 rounded-3xl p-12 text-center border-2 border-[#C6C6C6]/30"
        >
          <h3 className="text-[36px] text-[#000000] mb-6">
            Un projet en tête ?
          </h3>
          <p className="text-[18px] text-[#1B1B1B] mb-8 max-w-2xl mx-auto">
            Nos experts sont à votre disposition pour étudier votre projet et vous proposer 
            une solution adaptée à vos besoins
          </p>
          <Link to="/contact">
            <motion.button
              className="bg-[#E40714] text-white px-10 py-5 rounded-xl hover:bg-[#C00612] transition-all duration-300 shadow-lg hover:shadow-xl text-[18px]"
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