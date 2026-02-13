import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect, useState } from "react";

export function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  const solarImages = [
    "https://images.unsplash.com/photo-1626251376234-8bc112f0bcd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMGZpZWxkfGVufDF8fHx8MTc2Mjc5Mjk1NXww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1635424709845-3a85ad5e1f5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwc29sYXIlMjBpbnN0YWxsYXRpb258ZW58MXx8fHwxNzYyODc0MzI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1725308659447-bf1b10f6635a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMGZhcm0lMjBhZXJpYWx8ZW58MXx8fHwxNzYyODMwMzIzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1743352476730-056502fba10b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2Mjg0NzUyNnww&ixlib=rb-4.1.0&q=80&w=1080",
  ];

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => (prev + 1) % 400);
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20 px-6 bg-gradient-to-b from-white via-[#C6C6C6]/10 to-white"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <motion.h1
                className="text-[#000000] uppercase mb-6 text-[56px] lg:text-[72px] leading-[1.1] tracking-tight"
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Concevoir et bâtir
                <br />
                <span className="text-[#E40714] relative inline-block">
                  l'énergie de demain
                  <motion.div
                    className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#E40714] to-transparent rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                  />
                </span>
              </motion.h1>

              <motion.p
                className="text-[#1B1B1B] mb-8 max-w-xl text-[18px] leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                MetalR combine excellence industrielle et innovation durable pour créer
                des structures métalliques de haute performance et des solutions énergétiques renouvelables.
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
              >
                <motion.a
                  href="#realisations"
                  className="px-8 py-4 bg-[#E40714] text-white rounded-xl hover:bg-[#E40714]/90 transition-all duration-300 inline-flex items-center justify-center"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(228, 7, 20, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Découvrir nos projets
                </motion.a>

                <motion.a
                  href="#contact"
                  className="px-8 py-4 bg-white/80 backdrop-blur-sm text-[#1B1B1B] rounded-xl border-2 border-[#C6C6C6] hover:border-[#E40714] transition-all duration-300 inline-flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Nous contacter
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Content - Main Image & Scrolling Gallery */}
          <div className="relative h-[600px] lg:h-[700px]">
            {/* Main Large Image */}
            <motion.div
              className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              style={{ y }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/30 via-transparent to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1628206554160-63e8c921e398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHJlbmV3YWJsZSUyMGVuZXJneXxlbnwxfHx8fDE3NjI4NzI5Njh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Panneaux solaires"
                className="w-full h-full object-cover"
              />
              
              {/* Overlay text on image */}
              <motion.div
                className="absolute bottom-8 left-8 right-8 z-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border-2 border-white/40">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#E40714] rounded-xl flex items-center justify-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                      >
                        <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[#000000] text-[14px]">Énergie renouvelable</div>
                      <div className="text-[#E40714] text-[12px]">Solutions photovoltaïques</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Scrolling Image Gallery - Right Side */}
            <motion.div
              className="absolute -right-24 top-0 bottom-0 w-48 hidden xl:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="relative h-full overflow-hidden rounded-3xl">
                <motion.div
                  className="absolute w-full space-y-4"
                  style={{
                    transform: `translateY(-${scrollPosition}px)`,
                  }}
                >
                  {/* Double the images for seamless loop */}
                  {[...solarImages, ...solarImages, ...solarImages].map((image, index) => (
                    <motion.div
                      key={index}
                      className="w-full h-40 rounded-2xl overflow-hidden border-4 border-white shadow-xl"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={image}
                        alt={`Installation solaire ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              
              {/* Gradient overlays for smooth appearance */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-2 h-2 bg-[#E40714] rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 right-20 w-3 h-3 bg-[#E40714] rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />
    </section>
  );
}
