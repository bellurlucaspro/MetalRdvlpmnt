import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "Complexe industriel Europort",
      category: "Structure métallique",
      image: "https://images.unsplash.com/photo-1576241738506-3c76ac230419?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWV0YWwlMjBzdHJ1Y3R1cmV8ZW58MXx8fHwxNzYyNzg3OTI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 2,
      title: "Centrale solaire Helios",
      category: "Énergie renouvelable",
      image: "https://images.unsplash.com/photo-1628206554160-63e8c921e398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHJlbmV3YWJsZSUyMGVuZXJneXxlbnwxfHx8fDE3NjI4NzI5Njh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 3,
      title: "Bâtiment commercial Nexus",
      category: "Structure métallique",
      image: "https://images.unsplash.com/photo-1602819604554-4eeace2aacda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdGVlbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2Mjg3Mjk2OHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 4,
      title: "Parc éolien Ventus",
      category: "Énergie renouvelable",
      image: "https://images.unsplash.com/photo-1599405032290-29d6e9e7274c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5kJTIwdHVyYmluZSUyMGVuZXJneXxlbnwxfHx8fDE3NjI4NTQyNDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 5,
      title: "Site industriel TechnoMétal",
      category: "Structure métallique",
      image: "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZmFjdG9yeXxlbnwxfHx8fDE3NjI4NTE2MjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 6,
      title: "Chantier métallique Atlas",
      category: "Construction",
      image: "https://images.unsplash.com/photo-1695651832926-66591245a88c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMGNvbnN0cnVjdGlvbiUyMHNpdGV8ZW58MXx8fHwxNzYyODcyOTY4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  return (
    <section
      id="realisations"
      ref={ref}
      className="py-24 px-6 bg-white"
    >
      <div className="max-w-7xl mx-auto">
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
            Nos réalisations
            <motion.div
              className="absolute -bottom-3 left-0 w-32 h-1 bg-[#E40714] rounded-full"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.h2>
          <p className="text-[#1B1B1B] max-w-2xl mx-auto text-[18px] mt-8">
            Découvrez nos projets emblématiques alliant performance et innovation
          </p>
        </motion.div>

        {/* Grille Masonry */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="relative group overflow-hidden rounded-2xl cursor-pointer"
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.03 }}
              style={{
                height: index % 3 === 0 ? "400px" : index % 3 === 1 ? "350px" : "450px",
              }}
            >
              {/* Image */}
              <ImageWithFallback
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0.6 }}
                transition={{ duration: 0.3 }}
              />

              {/* Contenu */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{
                    y: hoveredIndex === index ? 0 : 20,
                    opacity: hoveredIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="mb-4"
                >
                  <span className="inline-block px-3 py-1 bg-[#E40714] text-white rounded-full text-sm">
                    {project.category}
                  </span>
                </motion.div>

                <h3 className="text-[#000000] mb-4">
                  {project.title}
                </h3>

                <motion.button
                  className="px-6 py-3 bg-[#E40714] text-white rounded-xl"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{
                    y: hoveredIndex === index ? 0 : 20,
                    opacity: hoveredIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(228, 7, 20, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Voir le projet
                </motion.button>
              </div>

              {/* Border effet hover */}
              <motion.div
                className="absolute inset-0 border-2 border-[#E40714] rounded-2xl pointer-events-none"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  scale: hoveredIndex === index ? 1 : 0.9,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA voir plus */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link to="/realisations">
            <motion.button
              className="px-8 py-4 bg-white border-2 border-[#C6C6C6] text-[#1B1B1B] rounded-xl hover:border-[#E40714] hover:text-[#E40714] transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Voir tous nos projets
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}