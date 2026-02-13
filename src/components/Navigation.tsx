import { motion, useScroll, useTransform } from "motion/react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("FR");
  const { scrollY } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0.7)", "rgba(255, 255, 255, 0.9)"]
  );

  // Fonction pour gérer le scroll vers une section sur la page d'accueil
  const handleScrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      // Si on n'est pas sur la page d'accueil, naviguer d'abord
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // Si on est déjà sur la page d'accueil, scroller directement
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: "Accueil", href: "/" },
    { 
      label: "Nos solutions", 
      href: "/solutions",
      submenu: [
        { label: "Agricole", href: "/solutions/agricole" },
        { label: "Photovoltaïque", href: "/solutions/photovoltaique" },
        { label: "Industriel", href: "/solutions/industriel" },
        { label: "Ouvrages d'art", href: "/solutions/ouvrages-art" },
      ]
    },
    { label: "Réalisations", href: "/realisations" },
    { label: "Actualités", href: "/actualites" },
    { label: "À propos", href: "/a-propos" },
    { label: "Contact", href: "/contact" },
  ];

  const languages = [
    { code: "FR", label: "Français", flag: "🇫🇷" },
    { code: "EN", label: "English", flag: "🇬🇧" },
    { code: "ZH", label: "中文", flag: "🇨🇳" },
    { code: "AR", label: "العربية", flag: "🇸🇦" },
  ];

  return (
    <>
      <motion.nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-7xl"
        style={{ backgroundColor }}
      >
        <div className="backdrop-blur-xl bg-white/80 rounded-2xl border-2 border-white/40 shadow-xl px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link to="/" className="text-[24px] uppercase tracking-tight">
                <span className="text-[#000000]">METAL</span>
                <span className="text-[#E40714]">R</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((item, index) => (
                <div key={item.href} className="relative">
                  {item.submenu ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setIsSolutionsOpen(true)}
                      onMouseLeave={() => setIsSolutionsOpen(false)}
                    >
                      <motion.div
                        className="flex items-center gap-1 text-[#1B1B1B] hover:text-[#E40714] transition-colors duration-300 cursor-pointer text-[15px]"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Link to={item.href}>{item.label}</Link>
                        <ChevronDown 
                          size={16} 
                          className={`transition-transform duration-300 ${isSolutionsOpen ? 'rotate-180' : ''}`}
                        />
                      </motion.div>

                      {isSolutionsOpen && (
                        <motion.div
                          className="absolute top-full left-0 mt-2 bg-white/95 backdrop-blur-xl rounded-xl border-2 border-white/40 shadow-xl overflow-hidden min-w-[200px]"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          {item.submenu.map((subItem) => (
                            <Link key={subItem.href} to={subItem.href}>
                              <motion.div
                                className="px-4 py-3 text-[#1B1B1B] hover:bg-[#E40714]/10 transition-colors duration-200"
                                whileHover={{ x: 5 }}
                              >
                                {subItem.label}
                              </motion.div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <Link to={item.href}>
                      <motion.div
                        className={`text-[#1B1B1B] hover:text-[#E40714] transition-colors duration-300 relative text-[15px] ${
                          location.pathname === item.href ? 'text-[#E40714]' : ''
                        }`}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {item.label}
                        <motion.div
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#E40714] rounded-full"
                          initial={{ scaleX: location.pathname === item.href ? 1 : 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Language Selector */}
              <div className="relative">
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-xl border border-[#C6C6C6] text-[#1B1B1B] hover:border-[#E40714] transition-all duration-300"
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Globe size={18} />
                  <span>{currentLang}</span>
                </motion.button>

                {isLangMenuOpen && (
                  <motion.div
                    className="absolute top-full right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-xl border-2 border-white/40 shadow-xl overflow-hidden min-w-[150px]"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {languages.map((lang) => (
                      <motion.button
                        key={lang.code}
                        className="w-full px-4 py-3 text-left hover:bg-[#E40714]/10 transition-colors duration-200 flex items-center gap-3"
                        onClick={() => {
                          setCurrentLang(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        whileHover={{ x: 5 }}
                      >
                        <span className="text-[20px]">{lang.flag}</span>
                        <span className="text-[#1B1B1B]">{lang.label}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden text-[#1B1B1B] p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        className="fixed inset-0 z-30 bg-white/95 backdrop-blur-xl lg:hidden"
        initial={{ x: "100%" }}
        animate={{ x: isMenuOpen ? "0%" : "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, index) => (
            <div key={item.href} className="text-center">
              <Link to={item.href} onClick={() => setIsMenuOpen(false)}>
                <motion.div
                  className="text-[#1B1B1B] hover:text-[#E40714] transition-colors duration-300 text-[20px]"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : 50 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                </motion.div>
              </Link>
              {item.submenu && (
                <div className="mt-2 space-y-2">
                  {item.submenu.map((subItem) => (
                    <Link key={subItem.href} to={subItem.href} onClick={() => setIsMenuOpen(false)}>
                      <motion.div
                        className="text-[#1B1B1B]/70 hover:text-[#E40714] transition-colors duration-300 text-[16px]"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : 50 }}
                        transition={{ delay: (index + 0.5) * 0.1 }}
                      >
                        {subItem.label}
                      </motion.div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <div className="flex gap-4 mt-4">
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                className="px-4 py-2 bg-white rounded-xl border-2 border-[#C6C6C6] hover:border-[#E40714] transition-all"
                onClick={() => {
                  setCurrentLang(lang.code);
                  setIsMenuOpen(false);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {lang.flag} {lang.code}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#E40714] origin-left z-50"
        style={{
          scaleX: useTransform(scrollY, [0, document.body.scrollHeight - window.innerHeight], [0, 1]),
        }}
      />
    </>
  );
}