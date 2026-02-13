import { motion } from "motion/react";
import { ArrowLeft, Calendar, Share2, User, Clock, Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { newsService, NewsArticle } from "../../services/news.service";
import { SEOHead } from "../../components/SEOHead";

export default function ActualiteDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const response = await newsService.getNewsBySlug(slug);
        setArticle(response.data);

        // Fetch related
        const related = await newsService.getRelatedNews(slug);
        setRelatedArticles(related.data);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-white flex justify-center items-center">
        <Loader2 className="w-12 h-12 text-[#E40714] animate-spin" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-white flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">Article non trouvé</h1>
        <Link to="/actualites" className="text-[#E40714] hover:underline">
          Retour aux actualités
        </Link>
      </div>
    );
  }

  const readTime = Math.ceil((article.content?.split(' ').length || 0) / 200) + " min";

  return (
    <div className="pt-32 pb-20 bg-white">
      <SEOHead
        title={article.seo?.metaTitle || article.title || ''}
        description={article.seo?.metaDescription || article.excerpt || ''}
        keywords={article.seo?.keywords || []}
        image={article.image || ''}
        url={`/actualites/${slug}`}
        type="article"
        author={article.author || ''}
        publishedTime={article.publishedAt || article.createdAt}
      />

      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <Link to="/actualites">
          <motion.button
            className="flex items-center gap-2 text-[#1B1B1B] hover:text-[#E40714] transition-colors duration-300 font-bold"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft size={20} />
            <span>Retour aux actualités</span>
          </motion.button>
        </Link>
      </div>

      {/* Article Header */}
      <section className="max-w-4xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-4 py-2 bg-[#E40714]/10 text-[#E40714] text-[13px] rounded-xl font-bold uppercase tracking-wide">
              {article.category}
            </span>
            {article.badge && (
              <span className="px-4 py-2 bg-[#E40714] text-white text-[12px] rounded-xl font-bold uppercase tracking-wide">
                {article.badge}
              </span>
            )}
          </div>

          <h1 className="text-[56px] lg:text-[64px] text-[#000000] mb-8 font-rajdhani font-bold uppercase leading-[1.1]">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-[#1B1B1B]/70 text-[15px] mb-8">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{new Date(article.publishedAt || article.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={18} />
              <span>{article.author || "Direction Communication"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>{readTime} de lecture</span>
            </div>
          </div>

          <motion.button
            className="flex items-center gap-2 text-[#E40714] hover:text-[#C00612] transition-colors duration-300 font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 size={18} />
            <span>Partager l'article</span>
          </motion.button>
        </motion.div>
      </section>

      {/* Featured Image */}
      <section className="max-w-5xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-[60vh] rounded-3xl overflow-hidden shadow-2xl"
        >
          <img
            src={article.image}
            alt={article.imageAlt || article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/30 to-transparent" />
        </motion.div>
      </section>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <p className="text-[20px] text-[#1B1B1B] leading-relaxed mb-8 font-semibold">
            {article.excerpt}
          </p>

          <div
            dangerouslySetInnerHTML={{ __html: article.content }}
            className="text-[18px] text-[#1B1B1B] leading-relaxed quill-content"
          />
        </motion.div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mt-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-[42px] text-[#000000] mb-12 font-rajdhani font-bold uppercase text-center"
          >
            Articles similaires
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((item, index) => (
              <Link key={item.id} to={`/actualites/${item.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-2xl overflow-hidden border-2 border-[#C6C6C6]/30 hover:border-[#E40714] transition-all duration-300 shadow-lg hover:shadow-xl h-full"
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-[#E40714] text-white text-[11px] rounded-lg font-bold uppercase">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-[18px] text-[#000000] font-rajdhani font-bold uppercase leading-tight group-hover:text-[#E40714] transition-colors duration-300">
                      {item.title}
                    </h4>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#E40714] to-[#C00612] rounded-3xl p-12 text-center text-white"
        >
          <h3 className="text-[36px] mb-6 font-rajdhani font-bold uppercase">Envie d'en savoir plus ?</h3>
          <p className="text-[18px] mb-8 leading-relaxed">
            Contactez-nous pour découvrir comment METALR peut accompagner votre projet
          </p>
          <Link to="/contact">
            <motion.button
              className="bg-white text-[#E40714] px-10 py-5 rounded-xl hover:bg-white/90 transition-all duration-300 font-bold shadow-lg"
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
