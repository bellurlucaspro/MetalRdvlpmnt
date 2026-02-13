import { motion } from "motion/react";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Newspaper,
  FolderKanban,
  Settings,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Clock,
  Search,
  AlertCircle,
  Loader2,
  Calendar
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { newsService, NewsArticle } from "../../services/news.service";
import { realisationsService, Realisation } from "../../services/realisations.service";
import { authService } from "../../services/auth.service";

// Components to be created
import NewsEditor from "./NewsEditor";
import RealisationEditor from "./RealisationEditor";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"dashboard" | "news" | "realisations" | "settings">("dashboard");
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsArticle | Realisation | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // Data states
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [realisations, setRealisations] = useState<Realisation[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    publishedNews: 0,
    totalRealisations: 0,
    totalViews: 0,
    ongoingProjects: 0
  });

  // Fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [newsData, realisationsData] = await Promise.all([
        newsService.getAllNews({ limit: 100 }),
        realisationsService.getAllRealisations({ limit: 100 })
      ]);

      setNews(newsData.data);
      setRealisations(realisationsData.data);

      // Calculate stats
      setStats({
        publishedNews: newsData.data.filter(n => n.status === 'published').length,
        totalRealisations: realisationsData.data.length,
        totalViews: newsData.data.reduce((acc, n) => acc + (n.views || 0), 0),
        ongoingProjects: realisationsData.data.filter(r => r.status === 'ongoing').length
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      if (!authService.isAuthenticated()) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  const handleDelete = async (type: "news" | "realisation", id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
      try {
        if (type === "news") {
          await newsService.deleteNews(id);
          setNews(news.filter(item => item.id !== id));
        } else {
          await realisationsService.deleteRealisation(id);
          setRealisations(realisations.filter(item => item.id !== id));
        }
        fetchData(); // Refresh stats
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("Erreur lors de la suppression");
      }
    }
  };

  const handleEdit = (item: NewsArticle | Realisation) => {
    setEditingItem(item);
    setIsEditing(true);
  };

  const handleCloseEditor = () => {
    setIsEditing(false);
    setEditingItem(null);
    fetchData(); // Refresh data after edit
  };

  const filteredNews = news.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterCategory === "all" || article.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const filteredRealisations = realisations.filter((realisation) => {
    const matchesSearch = realisation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      realisation.location?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterCategory === "all" || realisation.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    const badges: any = {
      published: { label: "Publié", color: "bg-green-500/10 text-green-600" },
      draft: { label: "Brouillon", color: "bg-gray-500/10 text-gray-600" },
      scheduled: { label: "Programmé", color: "bg-blue-500/10 text-blue-600" },
      completed: { label: "Terminé", color: "bg-green-500/10 text-green-600" },
      ongoing: { label: "En cours", color: "bg-orange-500/10 text-orange-600" },
      planned: { label: "Planifié", color: "bg-purple-500/10 text-purple-600" },
    };
    const badge = badges[status] || badges.draft;
    return <span className={`px-3 py-1 ${badge.color} text-[12px] rounded-lg font-bold`}>{badge.label}</span>;
  };

  const dashboardStats = [
    { label: "Articles publiés", value: stats.publishedNews, icon: Newspaper, color: "from-blue-500 to-blue-600", trend: "Total" },
    { label: "Réalisations", value: stats.totalRealisations, icon: FolderKanban, color: "from-green-500 to-green-600", trend: "Total" },
    { label: "Vues totales", value: stats.totalViews.toLocaleString(), icon: Eye, color: "from-purple-500 to-purple-600", trend: "Cumulé" },
    { label: "Projets en cours", value: stats.ongoingProjects, icon: Clock, color: "from-orange-500 to-orange-600", trend: "Actifs" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
        <Loader2 className="w-12 h-12 text-[#E40714] animate-spin" />
      </div>
    );
  }

  // Render Editor if active
  if (isEditing) {
    if (activeTab === 'news') {
      return <NewsEditor initialData={editingItem as NewsArticle} onClose={handleCloseEditor} />;
    } else if (activeTab === 'realisations') {
      return <RealisationEditor initialData={editingItem as Realisation} onClose={handleCloseEditor} />;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] via-white to-[#F5F5F5] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-[#E40714] to-[#C00612] rounded-2xl flex items-center justify-center shadow-lg">
                  <LayoutDashboard className="text-white" size={24} />
                </div>
                <div>
                  <h1 className="text-[48px] text-[#000000] font-rajdhani font-black uppercase leading-none">
                    Dashboard Admin
                  </h1>
                  <p className="text-[#1B1B1B]/70 text-[16px]">
                    Gérez l'ensemble de votre contenu METALR
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/">
                <motion.button
                  className="flex items-center gap-2 px-6 py-3 bg-white text-[#1B1B1B] border-2 border-[#C6C6C6]/30 rounded-xl hover:border-[#E40714] transition-all duration-300 shadow-lg font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye size={20} />
                  Voir le site
                </motion.button>
              </Link>
              <motion.button
                className="flex items-center gap-2 px-6 py-3 bg-[#E40714] text-white rounded-xl hover:bg-[#C00612] transition-all duration-300 shadow-lg font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
              >
                <LogOut size={20} />
                Déconnexion
              </motion.button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                />
                <motion.div
                  className={`relative bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-500`}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <stat.icon size={24} />
                    </div>
                    <div className="text-right">
                      <div className="text-[40px] font-rajdhani font-black leading-none mb-1">{stat.value}</div>
                      <div className="text-[12px] font-bold opacity-80">{stat.trend}</div>
                    </div>
                  </div>
                  <p className="text-[14px] font-bold uppercase tracking-wide opacity-90">{stat.label}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex gap-3 mb-8 bg-white rounded-2xl p-2 shadow-lg border-2 border-[#C6C6C6]/20">
          {[
            { id: "dashboard", label: "Vue d'ensemble", icon: LayoutDashboard },
            { id: "news", label: "Actualités", icon: Newspaper },
            { id: "realisations", label: "Réalisations", icon: FolderKanban },
            { id: "settings", label: "Paramètres", icon: Settings },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl transition-all duration-300 font-bold ${activeTab === tab.id
                ? "bg-[#E40714] text-white shadow-lg"
                : "text-[#1B1B1B] hover:bg-[#C6C6C6]/10"
                }`}
              onClick={() => setActiveTab(tab.id as any)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon size={20} />
              <span className="hidden md:inline">{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#C6C6C6]/20"
        >
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div>
              <h2 className="text-[36px] text-[#000000] font-rajdhani font-black uppercase mb-8">
                Vue d'ensemble
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Recent Activity */}
                <div className="bg-gradient-to-br from-[#C6C6C6]/5 to-white rounded-2xl p-6 border-2 border-[#C6C6C6]/30">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[24px] text-[#1B1B1B] font-rajdhani font-bold">Derniers Articles</h3>
                    <Clock className="text-[#E40714]" size={24} />
                  </div>
                  <div className="space-y-4">
                    {news.slice(0, 5).map((article, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white transition-all duration-300 border border-transparent hover:border-[#E40714]/20">
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[14px] font-bold text-[#1B1B1B] line-clamp-1">{article.title}</p>
                          <p className="text-[12px] text-[#1B1B1B]/60">{new Date(article.createdAt).toLocaleDateString()}</p>
                        </div>
                        {getStatusBadge(article.status)}
                      </div>
                    ))}
                    {news.length === 0 && <p className="text-center text-gray-500 p-4">Aucun article</p>}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-[#E40714]/5 to-white rounded-2xl p-6 border-2 border-[#E40714]/20">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[24px] text-[#1B1B1B] font-rajdhani font-bold">Actions rapides</h3>
                    <Newspaper className="text-[#E40714]" size={24} />
                  </div>
                  <div className="space-y-3">
                    <motion.button
                      className="w-full flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-[#E40714] to-[#C00612] text-white rounded-xl hover:shadow-xl transition-all duration-300 font-bold"
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setActiveTab("news");
                        setIsEditing(true);
                        setEditingItem(null);
                      }}
                    >
                      <Plus size={20} />
                      Créer un nouvel article
                    </motion.button>

                    <motion.button
                      className="w-full flex items-center gap-3 px-6 py-4 bg-white text-[#1B1B1B] border-2 border-[#C6C6C6]/30 rounded-xl hover:border-[#E40714] transition-all duration-300 font-bold"
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setActiveTab("realisations");
                        setIsEditing(true);
                        setEditingItem(null);
                      }}
                    >
                      <Plus size={20} />
                      Ajouter une réalisation
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* News Tab */}
          {activeTab === "news" && (
            <div>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-[36px] text-[#000000] font-rajdhani font-black uppercase">
                    Gestion des actualités
                  </h2>
                  <p className="text-[14px] text-[#1B1B1B]/60 mt-1">
                    {filteredNews.length} article{filteredNews.length > 1 ? "s" : ""} trouvé{filteredNews.length > 1 ? "s" : ""}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B1B1B]/40" size={20} />
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 pr-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-all duration-300 w-64"
                    />
                  </div>

                  {/* Filter */}
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-all duration-300 font-bold"
                  >
                    <option value="all">Toutes catégories</option>
                    <option value="Entreprise">Entreprise</option>
                    <option value="Innovation">Innovation</option>
                    <option value="Projet">Projet</option>
                    <option value="Événement">Événement</option>
                  </select>

                  <motion.button
                    className="flex items-center gap-2 px-6 py-3 bg-[#E40714] text-white rounded-xl hover:bg-[#C00612] transition-all duration-300 shadow-lg font-bold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsEditing(true);
                      setEditingItem(null);
                    }}
                  >
                    <Plus size={20} />
                    Nouvel article
                  </motion.button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredNews.map((article) => (
                  <motion.div
                    key={article._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group flex items-center gap-6 p-6 bg-gradient-to-br from-[#C6C6C6]/5 to-white rounded-2xl border-2 border-[#C6C6C6]/30 hover:border-[#E40714] transition-all duration-300 hover:shadow-lg"
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-32 h-32 object-cover rounded-xl shadow-md group-hover:shadow-xl transition-shadow duration-300"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-[#E40714]/10 text-[#E40714] text-[12px] rounded-lg font-bold">
                          {article.category}
                        </span>
                        {getStatusBadge(article.status)}
                        {article.featured && (
                          <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-[12px] rounded-lg font-bold">
                            ⭐ À la une
                          </span>
                        )}
                      </div>
                      <h3 className="text-[22px] text-[#000000] font-rajdhani font-bold mb-2 group-hover:text-[#E40714] transition-colors duration-300">
                        {article.title}
                      </h3>
                      <p className="text-[14px] text-[#1B1B1B]/60 mb-3 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center gap-4 text-[13px] text-[#1B1B1B]/50">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : 'N/A'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={14} />
                          {article.views.toLocaleString()} vues
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/actualites/${article.slug}`} target="_blank">
                        <motion.button
                          className="p-3 bg-purple-500/10 text-purple-600 rounded-xl hover:bg-purple-500/20 transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Voir"
                        >
                          <Eye size={18} />
                        </motion.button>
                      </Link>
                      <motion.button
                        className="p-3 bg-blue-500/10 text-blue-600 rounded-xl hover:bg-blue-500/20 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEdit(article)}
                        title="Modifier"
                      >
                        <Edit2 size={18} />
                      </motion.button>
                      <motion.button
                        className="p-3 bg-red-500/10 text-red-600 rounded-xl hover:bg-red-500/20 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete("news", article.id!)}
                        title="Supprimer"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Realisations Tab */}
          {activeTab === "realisations" && (
            <div>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-[36px] text-[#000000] font-rajdhani font-black uppercase">
                    Gestion des réalisations
                  </h2>
                  <p className="text-[14px] text-[#1B1B1B]/60 mt-1">
                    {filteredRealisations.length} projet{filteredRealisations.length > 1 ? "s" : ""} trouvé{filteredRealisations.length > 1 ? "s" : ""}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B1B1B]/40" size={20} />
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 pr-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-all duration-300 w-64"
                    />
                  </div>

                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-all duration-300 font-bold"
                  >
                    <option value="all">Toutes catégories</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Photovoltaïque">Photovoltaïque</option>
                    <option value="Industriel">Industriel</option>
                    <option value="Ouvrages d'art">Ouvrages d'art</option>
                  </select>

                  <motion.button
                    className="flex items-center gap-2 px-6 py-3 bg-[#E40714] text-white rounded-xl hover:bg-[#C00612] transition-all duration-300 shadow-lg font-bold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsEditing(true);
                      setEditingItem(null);
                    }}
                  >
                    <Plus size={20} />
                    Nouvelle réalisation
                  </motion.button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredRealisations.map((realisation) => (
                  <motion.div
                    key={realisation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group bg-white rounded-2xl overflow-hidden border-2 border-[#C6C6C6]/30 hover:border-[#E40714] transition-all duration-300 shadow-lg hover:shadow-2xl"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={realisation.mainImage}
                        alt={realisation.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 to-transparent" />
                      <div className="absolute top-4 right-4">
                        {getStatusBadge(realisation.status)}
                      </div>
                    </div>

                    <div className="p-6">
                      <span className="px-3 py-1 bg-[#E40714]/10 text-[#E40714] text-[12px] rounded-lg font-bold">
                        {realisation.category}
                      </span>
                      <h3 className="text-[24px] text-[#000000] font-rajdhani font-bold mt-3 mb-3 group-hover:text-[#E40714] transition-colors duration-300">
                        {realisation.title}
                      </h3>

                      <div className="space-y-2 mb-4 text-[14px] text-[#1B1B1B]/70">
                        <p className="flex items-center gap-2">
                          <span className="text-[#1B1B1B] font-bold">📍</span>
                          {realisation.location}
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="text-[#1B1B1B] font-bold">📅</span>
                          {realisation.year} • {realisation.surface}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Link to={`/realisations/${realisation.slug}`} target="_blank" className="flex-1">
                          <motion.button
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-500/10 text-purple-600 rounded-xl hover:bg-purple-500/20 transition-all duration-300 font-bold"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Eye size={16} />
                            Voir
                          </motion.button>
                        </Link>
                        <motion.button
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500/10 text-blue-600 rounded-xl hover:bg-blue-500/20 transition-all duration-300 font-bold"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleEdit(realisation)}
                        >
                          <Edit2 size={16} />
                          Modifier
                        </motion.button>
                        <motion.button
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-600 rounded-xl hover:bg-red-500/20 transition-all duration-300 font-bold"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleDelete("realisation", realisation.id!)}
                        >
                          <Trash2 size={16} />
                          Supprimer
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab - Placeholder for now */}
          {activeTab === "settings" && (
            <div className="text-center p-12">
              <Settings size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-700">Paramètres en construction</h3>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
