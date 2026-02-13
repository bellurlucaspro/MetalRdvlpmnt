import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Téléphone",
      value: "+33 1 23 45 67 89",
      link: "tel:+33123456789",
    },
    {
      icon: Mail,
      title: "Email",
      value: "contact@metalr.fr",
      link: "mailto:contact@metalr.fr",
    },
    {
      icon: MapPin,
      title: "Adresse",
      value: "Zone Industrielle Nord, 75000 Paris",
      link: "#",
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 px-6 bg-gradient-to-b from-white to-[#C6C6C6]/20"
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
            Contactez-nous
            <motion.div
              className="absolute -bottom-3 left-0 w-32 h-1 bg-[#E40714] rounded-full"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.h2>
          <p className="text-[#1B1B1B] max-w-2xl mx-auto text-[18px] mt-8">
            Notre équipe est à votre écoute pour répondre à vos projets
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={index}
                  href={info.link}
                  className="group flex items-start gap-4 p-6 bg-white rounded-2xl border-2 border-[#C6C6C6] hover:border-[#E40714] transition-all duration-300"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 10px 30px rgba(228, 7, 20, 0.1)",
                  }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#C6C6C6]/30 to-[#C6C6C6]/10 rounded-xl flex items-center justify-center group-hover:from-[#E40714]/20 group-hover:to-[#E40714]/5 transition-all duration-300 flex-shrink-0">
                    <Icon
                      className="text-[#1B1B1B] group-hover:text-[#E40714] transition-colors duration-300"
                      size={24}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <div className="text-[#1B1B1B] mb-1">
                      {info.title}
                    </div>
                    <div className="text-[#000000]">{info.value}</div>
                  </div>
                </motion.a>
              );
            })}

            {/* Additional info */}
            <motion.div
              className="p-6 bg-gradient-to-br from-[#E40714]/5 to-white rounded-2xl border-2 border-[#E40714]/20"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h4 className="text-[#000000] uppercase mb-3">
                Horaires d'ouverture
              </h4>
              <div className="space-y-2 text-[#1B1B1B]">
                <div className="flex justify-between">
                  <span>Lundi - Vendredi</span>
                  <span>8h00 - 18h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span>9h00 - 12h00</span>
                </div>
                <div className="flex justify-between text-[#C6C6C6]">
                  <span>Dimanche</span>
                  <span>Fermé</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 border-2 border-[#C6C6C6]"
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[#1B1B1B] mb-2">
                    Nom complet *
                  </label>
                  <motion.input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#C6C6C6] rounded-xl focus:border-[#E40714] focus:outline-none transition-all duration-300"
                    placeholder="Votre nom"
                    whileFocus={{
                      scale: 1.01,
                      boxShadow: "0 0 0 3px rgba(228, 7, 20, 0.1)",
                    }}
                  />
                </div>

                <div>
                  <label className="block text-[#1B1B1B] mb-2">
                    Email *
                  </label>
                  <motion.input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#C6C6C6] rounded-xl focus:border-[#E40714] focus:outline-none transition-all duration-300"
                    placeholder="votre@email.com"
                    whileFocus={{
                      scale: 1.01,
                      boxShadow: "0 0 0 3px rgba(228, 7, 20, 0.1)",
                    }}
                  />
                </div>

                <div>
                  <label className="block text-[#1B1B1B] mb-2">
                    Téléphone
                  </label>
                  <motion.input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#C6C6C6] rounded-xl focus:border-[#E40714] focus:outline-none transition-all duration-300"
                    placeholder="+33 1 23 45 67 89"
                    whileFocus={{
                      scale: 1.01,
                      boxShadow: "0 0 0 3px rgba(228, 7, 20, 0.1)",
                    }}
                  />
                </div>

                <div>
                  <label className="block text-[#1B1B1B] mb-2">
                    Entreprise
                  </label>
                  <motion.input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#C6C6C6] rounded-xl focus:border-[#E40714] focus:outline-none transition-all duration-300"
                    placeholder="Nom de votre entreprise"
                    whileFocus={{
                      scale: 1.01,
                      boxShadow: "0 0 0 3px rgba(228, 7, 20, 0.1)",
                    }}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[#1B1B1B] mb-2">
                  Sujet de votre demande *
                </label>
                <motion.select
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-[#C6C6C6] rounded-xl focus:border-[#E40714] focus:outline-none transition-all duration-300"
                  whileFocus={{
                    scale: 1.01,
                    boxShadow: "0 0 0 3px rgba(228, 7, 20, 0.1)",
                  }}
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="structure">Structures métalliques</option>
                  <option value="energie">Énergies renouvelables</option>
                  <option value="devis">Demande de devis</option>
                  <option value="autre">Autre demande</option>
                </motion.select>
              </div>

              <div className="mb-6">
                <label className="block text-[#1B1B1B] mb-2">
                  Message *
                </label>
                <motion.textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-[#C6C6C6] rounded-xl focus:border-[#E40714] focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Décrivez votre projet ou votre demande..."
                  whileFocus={{
                    scale: 1.01,
                    boxShadow: "0 0 0 3px rgba(228, 7, 20, 0.1)",
                  }}
                />
              </div>

              <motion.button
                type="submit"
                className="w-full px-8 py-4 bg-[#E40714] text-white rounded-xl inline-flex items-center justify-center gap-3"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(228, 7, 20, 0.5)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={20} />
                Envoyer le message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}