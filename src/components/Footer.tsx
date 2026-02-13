import { motion } from "motion/react";
import { Facebook, Linkedin, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  const footerLinks = {
    company: {
      title: "Entreprise",
      links: [
        { label: "À propos", href: "/a-propos" },
        { label: "Implantations", href: "/implantations" },
        { label: "Bureau & Production", href: "/bureau-production" },
        { label: "Contact", href: "/contact" },
      ],
    },
    services: {
      title: "Solutions",
      links: [
        { label: "Agricole", href: "/solutions/agricole" },
        { label: "Photovoltaïque", href: "/solutions/photovoltaique" },
        { label: "Industriel", href: "/solutions/industriel" },
        { label: "Ouvrages d'art", href: "/solutions/ouvrages-art" },
      ],
    },
    resources: {
      title: "Ressources",
      links: [
        { label: "Réalisations", href: "/realisations" },
        { label: "Actualités", href: "/#actualites" },
        { label: "Documentation", href: "#" },
        { label: "FAQ", href: "#" },
      ],
    },
    legal: {
      title: "Légal",
      links: [
        { label: "Mentions légales", href: "#" },
        { label: "Politique de confidentialité", href: "#" },
        { label: "CGV", href: "#" },
        { label: "Cookies", href: "#" },
        { label: "Admin", href: "/admin" },
      ],
    },
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#C6C6C6]/20 to-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <motion.div
              className="mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="uppercase tracking-tight mb-2">
                <span className="text-[#000000]">METAL</span>
                <span className="text-[#E40714]">R</span>
              </div>
              <div className="text-[10px] tracking-[0.2em] text-[#1B1B1B] uppercase">
                Structures métalliques
                <br />
                Énergies renouvelables
              </div>
            </motion.div>
            <p className="text-[#1B1B1B] text-sm mb-4">
              Concevoir et bâtir l'énergie de demain avec innovation et durabilité.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white border-2 border-[#C6C6C6] rounded-xl flex items-center justify-center text-[#1B1B1B] hover:border-[#E40714] hover:text-[#E40714] transition-all duration-300"
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={18} strokeWidth={1.5} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="text-[#000000] uppercase mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>
                    {link.href.startsWith('#') ? (
                      <motion.a
                        href={link.href}
                        className="text-[#1B1B1B] hover:text-[#E40714] transition-colors duration-300 text-sm inline-block"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {link.label}
                      </motion.a>
                    ) : (
                      <Link to={link.href}>
                        <motion.span
                          className="text-[#1B1B1B] hover:text-[#E40714] transition-colors duration-300 text-sm inline-block"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {link.label}
                        </motion.span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#C6C6C6] to-transparent mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#1B1B1B] text-sm text-center md:text-left">
            © {new Date().getFullYear()} MetalR. Tous droits réservés.
          </p>

          <div className="flex items-center gap-6 text-sm">
            <motion.a
              href="#"
              className="text-[#1B1B1B] hover:text-[#E40714] transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              Plan du site
            </motion.a>
            <motion.a
              href="#"
              className="text-[#1B1B1B] hover:text-[#E40714] transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              Accessibilité
            </motion.a>
            <Link to="/contact">
              <motion.span
                className="px-4 py-2 bg-[#E40714] text-white rounded-lg hover:bg-[#E40714]/90 transition-all duration-300 inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact
              </motion.span>
            </Link>
          </div>
        </div>

        {/* Back to top button */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-[#E40714] text-white rounded-full flex items-center justify-center shadow-lg"
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 30px rgba(228, 7, 20, 0.5)",
          }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </motion.button>
      </div>
    </footer>
  );
}