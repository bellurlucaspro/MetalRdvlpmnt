import { motion } from "motion/react";
import { useState, useRef } from "react";
import { useInView } from "motion/react";
import { Filter } from "lucide-react";
import { Link } from "react-router-dom";

export default function RealisationsPage() {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const filters = ["Tous", "Agriculture", "Photovoltaïque", "Industrie", "Ouvrages d'art"];

  const projects = [
    {
      title: "Stabulation 180 vaches",
      category: "Agriculture",
      location: "Normandie, France",
      year: "2024",
      surface: "1200 m²",
      image: "https://images.unsplash.com/photo-1653233532156-327bf57aab82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3clMjBiYXJuJTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzY4ODIwMDc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      link: "/realisations/stabulation",
    },
    {
      title: "Centrale solaire 5 MW",
      category: "Photovoltaïque",
      location: "Occitanie, France",
      year: "2024",
      surface: "30,000 m²",
      image: "https://images.unsplash.com/photo-1719256383688-305c0c00d179?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm91bmQlMjBtb3VudGVkJTIwc29sYXIlMjBmYXJtfGVufDF8fHx8MTc2ODgyMDE0NXww&ixlib=rb-4.1.0&q=80&w=1080",
      link: "/realisations/stabulation",
    },
    {
      title: "Hall industriel",
      category: "Industrie",
      location: "Hauts-de-France",
      year: "2023",
      surface: "5000 m²",
      image: "https://images.unsplash.com/photo-1731847999830-6f71b78d720e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWN0b3J5JTIwd2FyZWhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY4ODA4ODUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      link: "/realisations/stabulation",
    },
    {
      title: "Passerelle piétonne",
      category: "Ouvrages d'art",
      location: "Île-de-France",
      year: "2023",
      surface: "120 ml",
      image: "https://images.unsplash.com/photo-1696759106449-70e7d2ea67d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVlbCUyMGJyaWRnZSUyMGNvbnN0cnVjdGlvbnxlbnwxfHx8fDE3Njg4MjAyMDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      link: "/realisations/stabulation",
    },
    {
      title: "Ombrières parking",
      category: "Photovoltaïque",
      location: "Lyon, France",
      year: "2024",
      surface: "2500 m²",
      image: "https://images.unsplash.com/photo-1690793122620-7d0eeb8d0cab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMGNhcnBvcnQlMjBwYXJraW5nfGVufDF8fHx8MTc2ODgyMDE0NXww&ixlib=rb-4.1.0&q=80&w=1080",
      link: "/realisations/stabulation",
    },
    {
      title: "Bâtiment agricole",
      category: "Agriculture",
      location: "Beauce, France",
      year: "2023",
      surface: "2500 m²",
      image: "https://images.unsplash.com/photo-1761488387594-887b29fdaa1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwc3RvcmFnZSUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2ODgyMDA3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      link: "/realisations/stabulation",
    },
  ];

  const filteredProjects = activeFilter === "Tous" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="pt-32 pb-20">
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-[56px] text-[#000000] mb-6 relative inline-block font-rajdhani font-bold uppercase">
            Nos réalisations
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-[#E40714] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h1>
          <p className="text-[20px] text-[#1B1B1B] max-w-3xl mx-auto leading-relaxed mt-8">
            Découvrez nos projets à travers l'Europe et l'Afrique
          </p>
        </motion.div>
      </section>

      {/* Filtres */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Filter size={20} color="#1B1B1B" />
          {filters.map((filter) => (
            <motion.button
              key={filter}
              className={`px-6 py-3 rounded-xl transition-all duration-300 font-bold ${
                activeFilter === filter
                  ? "bg-[#E40714] text-white shadow-lg"
                  : "bg-white text-[#1B1B1B] border-2 border-[#C6C6C6]/30 hover:border-[#E40714]"
              }`}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Grille projets */}
      <section ref={ref} className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Link key={index} to={project.link}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden border-2 border-[#C6C6C6]/30 hover:border-[#E40714] transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                whileHover={{ y: -8 }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="inline-block px-3 py-1 bg-[#E40714] text-white text-[12px] rounded-lg mb-2 font-bold uppercase tracking-wide">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-[22px] text-[#000000] mb-3 font-rajdhani font-bold uppercase">{project.title}</h3>
                  <div className="space-y-1 text-[14px] text-[#1B1B1B]/70">
                    <p>{project.location}</p>
                    <p>{project.year} • {project.surface}</p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}