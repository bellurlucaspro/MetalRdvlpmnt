import { motion } from "motion/react";
import { useRef, useState } from "react";
import { useInView } from "motion/react";
import { MapPin, Phone, Mail, Download, Send } from "lucide-react";

export default function ContactPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Logique d'envoi du formulaire
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Siège social",
      details: ["123 Avenue de l'Industrie", "60000 Beauvais, France"],
    },
    {
      icon: Phone,
      title: "Téléphone",
      details: ["+33 (0)3 44 XX XX XX", "Lun-Ven : 8h-18h"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["contact@metalr.com", "devis@metalr.com"],
    },
  ];

  const implantations = [
    { country: "France", phone: "+33 3 44 XX XX XX", email: "france@metalr.com" },
    { country: "Roumanie", phone: "+40 XXX XXX XXX", email: "romania@metalr.com" },
    { country: "Balkans", phone: "+381 XX XXX XXXX", email: "balkans@metalr.com" },
    { country: "Tunisie", phone: "+216 XX XXX XXX", email: "tunisie@metalr.com" },
    { country: "Guinée", phone: "+224 XXX XX XX XX", email: "guinee@metalr.com" },
  ];

  return (
    <div className="pt-32 pb-20">
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-[56px] text-[#000000] mb-6 relative inline-block">
            Contactez-nous
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-[#E40714] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h1>
          <p className="text-[20px] text-[#1B1B1B] max-w-3xl mx-auto leading-relaxed mt-8">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {/* Formulaire */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-8 border-2 border-[#C6C6C6]/30 shadow-xl"
            >
              <h2 className="text-[32px] text-[#000000] mb-6">Demande de contact</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1B1B1B] mb-2">Nom complet *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-colors"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1B1B1B] mb-2">Entreprise</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-colors"
                      placeholder="Nom de l'entreprise"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1B1B1B] mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-colors"
                      placeholder="votre@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1B1B1B] mb-2">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-colors"
                      placeholder="+33 X XX XX XX XX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#1B1B1B] mb-2">Type de projet *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-colors"
                  >
                    <option value="">Sélectionnez un type</option>
                    <option value="agricole">Bâtiment agricole</option>
                    <option value="photovoltaique">Projet photovoltaïque</option>
                    <option value="industriel">Bâtiment industriel</option>
                    <option value="ouvrage">Ouvrage d'art</option>
                    <option value="autre">Autre demande</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#1B1B1B] mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-colors resize-none"
                    placeholder="Décrivez votre projet..."
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-[#E40714] text-white px-8 py-4 rounded-xl hover:bg-[#C00612] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={20} />
                  <span>Envoyer la demande</span>
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Informations de contact */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-gradient-to-br from-[#C6C6C6]/10 to-white rounded-2xl p-6 border-2 border-[#C6C6C6]/30 shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#E40714] rounded-xl flex items-center justify-center flex-shrink-0">
                    <info.icon size={24} color="white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-[18px] text-[#1B1B1B] mb-2">{info.title}</h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-[#1B1B1B]/70 text-[14px]">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Download brochure */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="bg-gradient-to-br from-[#1B1B1B] to-[#000000] rounded-2xl p-6 text-center text-white"
            >
              <Download size={40} color="#E40714" className="mx-auto mb-4" />
              <h3 className="text-[20px] mb-3">Brochure METALR</h3>
              <p className="text-white/80 text-[14px] mb-4">
                Téléchargez notre documentation complète
              </p>
              <motion.button
                className="w-full bg-[#E40714] text-white px-6 py-3 rounded-xl hover:bg-[#C00612] transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Télécharger
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Implantations */}
        <section ref={ref} className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-[48px] text-[#000000] mb-4 relative inline-block">
              Nos implantations
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-[#E40714] rounded-full"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {implantations.map((impl, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border-2 border-[#C6C6C6]/30 hover:border-[#E40714] transition-all duration-300 shadow-lg text-center"
              >
                <h3 className="text-[20px] text-[#000000] mb-4">{impl.country}</h3>
                <div className="space-y-2 text-[13px] text-[#1B1B1B]/70">
                  <p>{impl.phone}</p>
                  <p>{impl.email}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Map placeholder */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#C6C6C6]/10 to-white rounded-3xl p-12 border-2 border-[#C6C6C6]/30 text-center"
          >
            <MapPin size={48} color="#E40714" className="mx-auto mb-6" />
            <h3 className="text-[28px] text-[#000000] mb-4">Localisez-nous</h3>
            <p className="text-[#1B1B1B]/70 text-[16px] mb-6">
              Retrouvez nos bureaux et usines de production à travers l'Europe et l'Afrique
            </p>
            <div className="w-full h-64 bg-[#C6C6C6]/20 rounded-2xl flex items-center justify-center text-[#1B1B1B]/50">
              Google Map - Siège social Beauvais
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
