import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Calendar, ArrowRight, Filter, TrendingUp, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { newsService, NewsArticle } from "../services/news.service";
import { SEOHead } from "../components/SEOHead";

export default function ActualitesPage() {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const filters = ["Tous", "Innovation", "Projet", "Entreprise", "Événement"];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await newsService.getPublicNews();
        setNewsArticles(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const filteredNews =
    activeFilter === "Tous"
      ? newsArticles
      : newsArticles.filter((article) => article.category === activeFilter);

  const featuredArticle = newsArticles.find((article) => article.featured);
  const regularArticles = filteredNews.filter((article) => article.id !== featuredArticle?.id);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-white flex justify-center items-center">
        <Loader2 className="w-12 h-12 text-[#E40714] animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-white">
      <SEOHead
        title="Actualités"
        description="Suivez les dernières nouveautés, projets et innovations de METALR."
      />
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center flex flex-col items-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#E40714]/10 rounded-xl mb-8"
          >
            <TrendingUp size={20} className="text-[#E40714]" />
            <span className="text-[#E40714] font-bold text-[14px] uppercase tracking-wide">
              Dernières actualités
            </span>
          </motion.div>
          <h1 className="text-[64px] text-[#000000] mb-6 relative inline-block font-rajdhani font-bold uppercase">
            Notre actualité
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-[#E40714] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h1>
          <p className="text-[20px] text-[#1B1B1B] max-w-3xl mx-auto leading-relaxed mt-8">
            Suivez les dernières nouveautés, projets et innovations de METALR
          </p>
        </motion.div>
      </section>

      {/* Featured Article */}
      {featuredArticle && activeFilter === "Tous" && (
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <Link to={`/actualites/${featuredArticle.slug}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="group relative bg-white rounded-3xl overflow-hidden border-2 border-[#C6C6C6]/30 hover:border-[#E40714] transition-all duration-500 shadow-2xl hover:shadow-3xl"
              whileHover={{ y: -5 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-96 lg:h-auto overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full"
                  >
                    <ImageWithFallback
                      src={featuredArticle.image}
                      alt={featuredArticle.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-[#E40714] text-white text-[12px] rounded-xl font-bold uppercase tracking-wide shadow-lg">
                      {featuredArticle.badge || "Nouveau"}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/50 to-transparent lg:hidden" />
                </div>

                {/* Content */}
                <div className="p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-[#E40714]/10 text-[#E40714] text-[13px] rounded-lg font-bold uppercase">
                      {featuredArticle.category}
                    </span>
                    <div className="flex items-center gap-2 text-[#1B1B1B]/60 text-[14px]">
                      <Calendar size={16} />
                      <span>{new Date(featuredArticle.publishedAt || featuredArticle.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <h2 className="text-[42px] text-[#000000] mb-6 font-rajdhani font-bold uppercase leading-[1.1] group-hover:text-[#E40714] transition-colors duration-300">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-[#1B1B1B] text-[18px] leading-relaxed mb-8">
                    {featuredArticle.excerpt}
                  </p>
                  <motion.div
                    className="flex items-center gap-2 text-[#E40714] font-bold group-hover:gap-4 transition-all duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-[16px]">Lire la suite</span>
                    <ArrowRight size={20} />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </Link>
        </section>
      )}

      {/* Filtres */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Filter size={20} color="#1B1B1B" />
          {filters.map((filter) => (
            <motion.button
              key={filter}
              className={`px-6 py-3 rounded-xl transition-all duration-300 font-bold text-[14px] ${activeFilter === filter
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

      {/* Articles Grid */}
      {regularArticles.length > 0 ? (
        <section className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article, index) => (
              <Link key={article.id} to={`/actualites/${article.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-white rounded-2xl overflow-hidden border-2 border-[#C6C6C6]/30 hover:border-[#E40714] transition-all duration-500 shadow-lg hover:shadow-2xl h-full flex flex-col"
                  whileHover={{ y: -8 }}
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full"
                    >
                      <ImageWithFallback
                        src={article.image}
                        alt={article.imageAlt || article.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      {article.badge && (
                        <span className="px-3 py-1 bg-[#E40714] text-white text-[11px] rounded-lg font-bold uppercase tracking-wide">
                          {article.badge}
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#E40714] text-[12px] rounded-lg font-bold">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-[#1B1B1B]/60 text-[13px] mb-3">
                      <Calendar size={14} />
                      <span>{new Date(article.publishedAt || article.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-[22px] text-[#000000] mb-3 font-rajdhani font-bold uppercase leading-tight group-hover:text-[#E40714] transition-colors duration-300 flex-1">
                      {article.title}
                    </h3>
                    <p className="text-[#1B1B1B]/80 text-[14px] leading-relaxed mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <motion.div
                      className="flex items-center gap-2 text-[#E40714] font-bold text-[14px] group-hover:gap-3 transition-all duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <span>Lire l'article</span>
                      <ArrowRight size={16} />
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl">Aucun article trouvé pour cette catégorie.</p>
        </div>
      )}

      {/* Newsletter CTA */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#1B1B1B] to-[#000000] rounded-3xl p-12 text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
          <div className="relative z-10">
            <h3 className="text-[42px] mb-6 font-rajdhani font-bold uppercase">
              Restez informé
            </h3>
            <p className="text-[18px] mb-8 max-w-2xl mx-auto leading-relaxed">
              Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités et innovations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:border-[#E40714] transition-all duration-300"
              />
              <motion.button
                className="bg-[#E40714] text-white px-8 py-4 rounded-xl hover:bg-[#C00612] transition-all duration-300 font-bold shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                S'inscrire
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}