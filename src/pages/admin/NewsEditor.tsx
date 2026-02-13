import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { motion } from "motion/react";
import { X, Save, Image as ImageIcon, Loader2 } from "lucide-react";
import { NewsArticle, newsService } from "../../services/news.service";

interface NewsEditorProps {
    initialData?: NewsArticle;
    onClose: () => void;
}

export default function NewsEditor({ initialData, onClose }: NewsEditorProps) {
    const [formData, setFormData] = useState<Partial<NewsArticle>>(
        initialData || {
            title: "",
            category: "Entreprise",
            excerpt: "",
            content: "",
            status: "draft",
            featured: false,
            seo: {
                metaTitle: "",
                metaDescription: "",
                keywords: []
            }
        }
    );
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>(initialData?.image || "");
    const [loading, setLoading] = useState(false);
    const [keywordsInput, setKeywordsInput] = useState(initialData?.seo?.keywords?.join(", ") || "");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();

            // Add basic fields explicitly
            data.append('title', formData.title || '');
            data.append('category', formData.category || 'Entreprise');
            data.append('excerpt', formData.excerpt || '');
            data.append('content', formData.content || '');
            data.append('status', formData.status || 'draft');
            data.append('featured', String(formData.featured || false));
            data.append('imageAlt', formData.imageAlt || formData.title || 'News Image');

            if (formData.badge) {
                data.append('badge', formData.badge);
            }

            if (formData.author) {
                data.append('author', formData.author);
            }

            // Add SEO as JSON string (backend will parse it)
            const keywords = keywordsInput.split(",").map(k => k.trim()).filter(k => k);
            const seoData = {
                metaTitle: formData.seo?.metaTitle || formData.title || '',
                metaDescription: formData.seo?.metaDescription || formData.excerpt || '',
                keywords: keywords
            };
            data.append('seo', JSON.stringify(seoData));

            if (imageFile) {
                data.append("image", imageFile);
            } else if (!initialData) {
                alert("Une image est requise");
                setLoading(false);
                return;
            }

            if (initialData?._id) {
                await newsService.updateNews(initialData._id, data);
            } else {
                await newsService.createNews(data);
            }
            onClose();
        } catch (error) {
            console.error("Error saving news:", error);
            alert("Erreur lors de la sauvegarde");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#C6C6C6]/20">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-[32px] font-rajdhani font-black uppercase">
                    {initialData ? "Modifier l'article" : "Nouvel article"}
                </h2>
                <motion.button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <X size={24} />
                </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold mb-2">Titre</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-all"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold mb-2">Catégorie</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-all"
                                >
                                    <option value="Entreprise">Entreprise</option>
                                    <option value="Innovation">Innovation</option>
                                    <option value="Projet">Projet</option>
                                    <option value="Événement">Événement</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">Statut</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-all"
                                >
                                    <option value="draft">Brouillon</option>
                                    <option value="published">Publié</option>
                                    <option value="scheduled">Programmé</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2">Extrait (chapô)</label>
                            <textarea
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-all h-24 resize-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2">Image principale</label>
                            <div
                                className="relative h-48 rounded-xl border-2 border-dashed border-[#C6C6C6] flex items-center justify-center cursor-pointer hover:border-[#E40714] transition-all bg-gray-50 overflow-hidden"
                                onClick={() => document.getElementById('news-image-input')?.click()}
                            >
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-center text-gray-400">
                                        <ImageIcon size={32} className="mx-auto mb-2" />
                                        <p>Cliquez pour ajouter une image</p>
                                    </div>
                                )}
                                <input
                                    id="news-image-input"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">Texte alternatif image (SEO)</label>
                            <input
                                type="text"
                                value={formData.imageAlt || ''}
                                onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-all"
                                placeholder="Description de l'image"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold mb-2">Contenu</label>
                            <div className="h-[400px] mb-12">
                                <ReactQuill
                                    theme="snow"
                                    value={formData.content}
                                    onChange={(content) => setFormData({ ...formData, content })}
                                    className="h-full rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-8">
                            <h3 className="font-rajdhani font-bold text-lg mb-4 text-[#E40714]">Optimisation SEO</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold mb-1 uppercase text-gray-500">Meta Titre</label>
                                    <input
                                        type="text"
                                        value={formData.seo?.metaTitle || ''}
                                        onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo!, metaTitle: e.target.value } })}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#E40714] outline-none text-sm"
                                        placeholder="Titre pour Google (max 60 chars)"
                                        maxLength={60}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold mb-1 uppercase text-gray-500">Meta Description</label>
                                    <textarea
                                        value={formData.seo?.metaDescription || ''}
                                        onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo!, metaDescription: e.target.value } })}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#E40714] outline-none text-sm h-20 resize-none"
                                        placeholder="Description pour Google (max 160 chars)"
                                        maxLength={160}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold mb-1 uppercase text-gray-500">Mots-clés (séparés par des virgules)</label>
                                    <input
                                        type="text"
                                        value={keywordsInput}
                                        onChange={(e) => setKeywordsInput(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#E40714] outline-none text-sm"
                                        placeholder="métallurgie, structure, afrique..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl font-bold bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        Annuler
                    </button>
                    <motion.button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 rounded-xl font-bold bg-[#E40714] text-white hover:bg-[#C00612] transition-colors flex items-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                        {initialData ? 'Mettre à jour' : 'Publier'}
                    </motion.button>
                </div>
            </form>
        </div>
    );
}
