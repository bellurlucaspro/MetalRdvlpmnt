import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import {
  Target,
  Award,
  Users,
  TrendingUp,
  Zap,
  Globe,
  Shield,
  Sparkles,
  ChevronRight,
  Factory,
  Leaf,
  Building2,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroRef = useRef(null);
  const valuesRef = useRef(null);
  const statsRef = useRef(null);
  const teamRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.2 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const teamInView = useInView(teamRef, { once: true, amount: 0.2 });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const stats = [
    { value: "7+", label: "Pays", suffix: "", icon: Globe },
    { value: "250", label: "MW installés", suffix: "+", icon: Zap },
    { value: "500", label: "Projets réalisés", suffix: "+", icon: Building2 },
    { value: "150", label: "Collaborateurs", suffix: "+", icon: Users },
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence technique",
      description:
        "Innovation et expertise de pointe dans chaque projet métallique",
      color: "from-blue-500 to-blue-600",
      delay: 0,
    },
    {
      icon: Award,
      title: "Qualité certifiée",
      description: "Normes ISO 9001 et EN 1090 pour une garantie absolue",
      color: "from-red-500 to-red-600",
      delay: 0.1,
    },
    {
      icon: Leaf,
      title: "Développement durable",
      description: "Solutions éco-responsables pour un avenir énergétique vert",
      color: "from-green-500 to-green-600",
      delay: 0.2,
    },
    {
      icon: Shield,
      title: "Fiabilité totale",
      description: "Engagement et accompagnement sur toute la durée de vie",
      color: "from-purple-500 to-purple-600",
      delay: 0.3,
    },
  ];

  const timeline = [
    {
      year: "2018",
      title: "Création de METALR",
      description: "Lancement des activités en France avec une vision claire",
      image: "https://images.unsplash.com/photo-1734864220078-c7354732aa7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwc3RlZWwlMjBmYWN0b3J5fGVufDF8fHx8MTc2OTA1NTY0MXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      year: "2019",
      title: "Première usine",
      description: "Ouverture du site de production high-tech à Beauvais",
      image: "https://images.unsplash.com/photo-1685376594043-844022374fe6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMGNvbnN0cnVjdGlvbiUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2OTA3NDcwOHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      year: "2020",
      title: "Expansion Balkans",
      description: "Implantation stratégique en Serbie et Europe de l'Est",
      image: "https://images.unsplash.com/photo-1548513911-163fbb0d1e23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBzdGVlbHxlbnwxfHx8fDE3NjkwNzQ3MDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      year: "2021",
      title: "Cap des 100 projets",
      description: "Croissance exponentielle du portefeuille clients",
      image: "https://images.unsplash.com/photo-1734864220078-c7354732aa7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwc3RlZWwlMjBmYWN0b3J5fGVufDF8fHx8MTc2OTA1NTY0MXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      year: "2022",
      title: "Expansion Afrique",
      description: "Ouvertures Tunisie et Guinée, développement continental",
      image: "https://images.unsplash.com/photo-1685376594043-844022374fe6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMGNvbnN0cnVjdGlvbiUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2OTA3NDcwOHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      year: "2023",
      title: "Certification ISO",
      description: "Obtention ISO 9001 et EN 1090, excellence reconnue",
      image: "https://images.unsplash.com/photo-1548513911-163fbb0d1e23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBzdGVlbHxlbnwxfHx8fDE3NjkwNzQ3MDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      year: "2024",
      title: "Roumanie",
      description: "5ème implantation internationale, leadership européen",
      image: "https://images.unsplash.com/photo-1734864220078-c7354732aa7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwc3RlZWwlMjBmYWN0b3J5fGVufDF8fHx8MTc2OTA1NTY0MXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      year: "2025",
      title: "250 MW installés",
      description: "Leader photovoltaïque, objectif 500 MW en 2026",
      image: "https://images.unsplash.com/photo-1685376594043-844022374fe6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMGNvbnN0cnVjdGlvbiUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2OTA3NDcwOHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const team = [
    {
      name: "Jean Dupont",
      role: "Président & Fondateur",
      expertise: "25 ans dans la construction métallique",
      image: "https://images.unsplash.com/photo-1709715357520-5e1047a2b691?w=400",
    },
    {
      name: "Marie Laurent",
      role: "Directrice Technique",
      expertise: "Ingénieure structures, 15 ans d'expérience",
      image: "https://images.unsplash.com/photo-1709715357520-5e1047a2b691?w=400",
    },
    {
      name: "Ahmed Benali",
      role: "Directeur Commercial",
      expertise: "Expert en développement international",
      image: "https://images.unsplash.com/photo-1709715357520-5e1047a2b691?w=400",
    },
  ];

  return (
    <div ref={containerRef} className="overflow-hidden bg-white">
      {/* Hero Section - Immersive avec parallaxe */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#C6C6C6]/5 via-white to-[#C6C6C6]/10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Texture overlay */}
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMC00Yy01LjUyMyAwLTEwIDQuNDc3LTEwIDEwczQuNDc3IDEwIDEwIDEwIDEwLTQuNDc3IDEwLTEwLTQuNDc3LTEwLTEwLTEweiIgZmlsbD0iIzFCMUIxQiIgb3BhY2l0eT0iLjUiLz48L2c+PC9zdmc+')] " />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#E40714] rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        <motion.div
          className="relative z-10 max-w-6xl mx-auto px-6 text-center"
          style={{ y: y1, opacity: opacity1, scale }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C6C6C6]/10 backdrop-blur-xl rounded-full border-2 border-[#C6C6C6]/30 mb-8"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(228, 7, 20, 0.05)", borderColor: "rgba(228, 7, 20, 0.3)" }}
            >
              <Sparkles className="text-[#E40714]" size={20} />
              <span className="text-[#1B1B1B] text-sm font-rajdhani font-bold uppercase tracking-wider">
                Leader des structures métalliques
              </span>
            </motion.div>

            <motion.h1
              className="text-[80px] md:text-[120px] font-rajdhani font-black uppercase leading-none mb-8 bg-gradient-to-r from-[#000000] via-[#1B1B1B] to-[#000000] bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                textShadow: "0 0 80px rgba(228, 7, 20, 0.1)",
              }}
            >
              METALR
            </motion.h1>

            <motion.p
              className="text-[28px] text-[#1B1B1B] max-w-3xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Depuis 2018, nous{" "}
              <span className="text-[#E40714] font-bold">révolutionnons</span>{" "}
              l'industrie métallique avec des solutions durables et innovantes
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/contact">
                <motion.button
                  className="group px-10 py-5 bg-[#E40714] text-white rounded-2xl font-rajdhani font-bold text-[18px] uppercase tracking-wide flex items-center gap-3 shadow-2xl"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 40px rgba(228, 7, 20, 0.6)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Demander un devis
                  <ChevronRight
                    className="group-hover:translate-x-1 transition-transform duration-300"
                    size={24}
                  />
                </motion.button>
              </Link>

              <Link to="/realisations">
                <motion.button
                  className="px-10 py-5 bg-white text-[#1B1B1B] rounded-2xl font-rajdhani font-bold text-[18px] uppercase tracking-wide border-2 border-[#C6C6C6]/50 hover:border-[#E40714] transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Nos réalisations
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-[#1B1B1B]/30 rounded-full p-1"
          >
            <motion.div
              className="w-1.5 h-3 bg-[#E40714] rounded-full mx-auto"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section - Animated counters */}
      <section
        ref={statsRef}
        className="relative py-32 bg-gradient-to-br from-white via-[#C6C6C6]/5 to-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#E40714]/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <motion.div
                  className="relative bg-white rounded-3xl p-8 text-center border-2 border-[#C6C6C6]/20 shadow-xl hover:shadow-2xl transition-all duration-500"
                  whileHover={{
                    y: -10,
                    borderColor: "rgba(228, 7, 20, 0.5)",
                  }}
                  style={{
                    transform: `perspective(1000px) rotateX(${mousePosition.y * 0.05}deg) rotateY(${mousePosition.x * 0.05}deg)`,
                  }}
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#E40714] to-[#C00612] rounded-2xl mb-4 shadow-lg"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="text-white" size={28} />
                  </motion.div>

                  <motion.div
                    className="text-[56px] font-rajdhani font-black text-[#000000] mb-2"
                    initial={{ opacity: 0 }}
                    animate={statsInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                  >
                    {stat.value}
                    <span className="text-[#E40714]">{stat.suffix}</span>
                  </motion.div>

                  <p className="text-[16px] text-[#1B1B1B] font-bold uppercase tracking-wide">
                    {stat.label}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section - 3D Cards */}
      <section
        ref={valuesRef}
        className="relative py-32 bg-gradient-to-br from-white via-[#C6C6C6]/5 to-white overflow-hidden"
      >
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, #E40714 1px, transparent 1px),
              linear-gradient(to bottom, #E40714 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C6C6C6]/10 backdrop-blur-xl rounded-full border-2 border-[#C6C6C6]/30 mb-6"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(228, 7, 20, 0.05)", borderColor: "rgba(228, 7, 20, 0.3)" }}
            >
              <Target className="text-[#E40714]" size={20} />
              <span className="text-[#1B1B1B] text-sm font-rajdhani font-bold uppercase tracking-wider">
                Nos valeurs fondamentales
              </span>
            </motion.div>

            <h2 className="text-[64px] font-rajdhani font-black uppercase text-[#000000] mb-6">
              L'excellence au{" "}
              <span className="text-[#E40714]">cœur de tout</span>
            </h2>

            <p className="text-[20px] text-[#1B1B1B]/70 max-w-3xl mx-auto">
              Des principes qui guident chacune de nos actions pour des
              résultats exceptionnels
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: value.delay }}
              >
                {/* Glow effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${value.color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                />

                <motion.div
                  className="relative bg-white rounded-3xl p-8 border-2 border-[#C6C6C6]/30 hover:border-[#E40714] transition-all duration-500 h-full shadow-xl hover:shadow-2xl"
                  whileHover={{
                    y: -15,
                    scale: 1.02,
                  }}
                  style={{
                    transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg)`,
                  }}
                >
                  <motion.div
                    className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl mb-6 shadow-2xl`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    <value.icon className="text-white" size={36} />
                  </motion.div>

                  <h3 className="text-[24px] font-rajdhani font-bold text-[#000000] mb-4 uppercase">
                    {value.title}
                  </h3>

                  <p className="text-[16px] text-[#1B1B1B]/70 leading-relaxed">
                    {value.description}
                  </p>

                  {/* Hover indicator */}
                  <motion.div
                    className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <ChevronRight className="text-[#E40714]" size={24} />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section - Interactive */}
      <section className="py-32 bg-gradient-to-br from-white via-[#C6C6C6]/5 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B1B1B]/5 rounded-full border border-[#C6C6C6]/30 mb-6"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(228, 7, 20, 0.05)" }}
            >
              <Factory className="text-[#E40714]" size={20} />
              <span className="text-[#1B1B1B] text-sm font-rajdhani font-bold uppercase tracking-wider">
                Notre parcours
              </span>
            </motion.div>

            <h2 className="text-[64px] font-rajdhani font-black uppercase text-[#000000] mb-6">
              Une croissance{" "}
              <span className="text-[#E40714]">exceptionnelle</span>
            </h2>

            <p className="text-[20px] text-[#1B1B1B]/70 max-w-3xl mx-auto">
              7 ans d'innovation et d'expansion continue à travers le monde
            </p>
          </motion.div>

          <div className="relative">
            {/* Central line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#E40714] via-[#C6C6C6] to-[#E40714] -translate-x-1/2 hidden lg:block" />

            <div className="space-y-24">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div
                    className={`flex flex-col lg:flex-row gap-8 items-center ${
                      index % 2 === 0 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Year badge */}
                    <motion.div
                      className="relative z-10 flex-shrink-0"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="w-32 h-32 bg-gradient-to-br from-[#E40714] to-[#C00612] rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
                        <span className="text-[28px] font-rajdhani font-black text-white">
                          {item.year}
                        </span>
                      </div>
                    </motion.div>

                    {/* Content card */}
                    <motion.div
                      className="flex-1 group"
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-[#C6C6C6]/20 hover:border-[#E40714]/50 transition-all duration-500">
                        <div className="relative h-64 overflow-hidden">
                          <motion.img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 to-transparent" />
                        </div>

                        <div className="p-8">
                          <h3 className="text-[32px] font-rajdhani font-bold text-[#000000] mb-3 group-hover:text-[#E40714] transition-colors duration-300">
                            {item.title}
                          </h3>
                          <p className="text-[18px] text-[#1B1B1B]/70 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden lg:block flex-1" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Modern cards */}
      <section
        ref={teamRef}
        className="py-32 bg-gradient-to-br from-[#C6C6C6]/10 via-white to-[#C6C6C6]/10"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B1B1B]/5 rounded-full border border-[#C6C6C6]/30 mb-6"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(228, 7, 20, 0.05)" }}
            >
              <Users className="text-[#E40714]" size={20} />
              <span className="text-[#1B1B1B] text-sm font-rajdhani font-bold uppercase tracking-wider">
                Leadership
              </span>
            </motion.div>

            <h2 className="text-[64px] font-rajdhani font-black uppercase text-[#000000] mb-6">
              L'équipe <span className="text-[#E40714]">dirigeante</span>
            </h2>

            <p className="text-[20px] text-[#1B1B1B]/70 max-w-3xl mx-auto">
              Une expertise reconnue au service de votre réussite
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#E40714] to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                />

                <motion.div
                  className="relative bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-[#C6C6C6]/20 hover:border-[#E40714]/50 transition-all duration-500"
                  whileHover={{ y: -15, scale: 1.02 }}
                  style={{
                    transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg)`,
                  }}
                >
                  {/* Image */}
                  <div className="relative h-80 overflow-hidden bg-gradient-to-br from-[#1B1B1B] to-[#000000]">
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent" />

                    {/* Floating icon */}
                    <motion.div
                      className="absolute top-6 right-6 w-12 h-12 bg-[#E40714] rounded-full flex items-center justify-center shadow-lg"
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Users className="text-white" size={24} />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-[28px] font-rajdhani font-bold text-[#000000] mb-2 group-hover:text-[#E40714] transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-[16px] font-bold text-[#E40714] uppercase tracking-wide mb-4">
                      {member.role}
                    </p>
                    <p className="text-[16px] text-[#1B1B1B]/70 leading-relaxed">
                      {member.expertise}
                    </p>

                    {/* LinkedIn link simulation */}
                    <motion.div
                      className="mt-6 flex items-center gap-2 text-[#1B1B1B]/50 group-hover:text-[#E40714] transition-colors duration-300 cursor-pointer"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm font-bold uppercase tracking-wide">
                        Voir le profil
                      </span>
                      <ChevronRight size={16} />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Epic finale */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-[#E40714] via-[#C00612] to-[#E40714]">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#E40714] via-[#C00612] to-[#E40714]"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Texture overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMC00Yy01LjUyMyAwLTEwIDQuNDc3LTEwIDEwczQuNDc3IDEwIDEwIDEwIDEwLTQuNDc3IDEwLTEwLTQuNDc3LTEwLTEwLTEweiIgZmlsbD0iI0ZGRiIgb3BhY2l0eT0iLjUiLz48L2c+PC9zdmc+')] " />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-xl rounded-full border border-white/40 mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="text-white" size={20} />
              <span className="text-white text-sm font-rajdhani font-bold uppercase tracking-wider">
                Rejoignez l'aventure
              </span>
            </motion.div>

            <motion.h2
              className="text-[56px] md:text-[72px] font-rajdhani font-black uppercase text-white mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Construisons ensemble
              <br />
              <span className="text-white/80">l'énergie de demain</span>
            </motion.h2>

            <motion.p
              className="text-[24px] text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Rejoignez les centaines d'entreprises qui nous font confiance pour
              leurs projets métalliques et photovoltaïques
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/contact">
                <motion.button
                  className="group px-12 py-6 bg-white text-[#E40714] rounded-2xl font-rajdhani font-black text-[20px] uppercase tracking-wide flex items-center gap-3 shadow-2xl"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 60px rgba(255, 255, 255, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Démarrer un projet
                  <ChevronRight
                    className="group-hover:translate-x-1 transition-transform duration-300"
                    size={28}
                  />
                </motion.button>
              </Link>

              <Link to="/realisations">
                <motion.button
                  className="px-12 py-6 bg-white/10 backdrop-blur-xl text-white rounded-2xl font-rajdhani font-black text-[20px] uppercase tracking-wide border-2 border-white/40 hover:border-white/80 transition-all duration-300 shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Voir nos projets
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </section>
    </div>
  );
}
