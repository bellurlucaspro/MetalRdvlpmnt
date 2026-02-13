import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { motion } from "motion/react";
import { X, Save, Image as ImageIcon, Loader2 } from "lucide-react";
import { Realisation, realisationsService } from "../../services/realisations.service";

interface RealisationEditorProps {
    initialData?: Realisation;
    onClose: () => void;
}

export default function RealisationEditor({ initialData, onClose }: RealisationEditorProps) {
    const [formData, setFormData] = useState<Partial<Realisation>>(
        initialData || {
            title: "",
            category: "Industriel",
            location: "",
            year: new Date().getFullYear().toString(),
            surface: "",
            description: "",
            status: "completed",
            seo: {
                metaTitle: "",
                metaDescription: "",
                keywords: []
            }
        }
    );

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>(initialData?.mainImage || "");
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
            Object.keys(formData).forEach(key => {
                if (key === 'seo') {
                    if (formData.seo) {
                        data.append('seo[metaTitle]', formData.seo.metaTitle);
                        data.append('seo[metaDescription]', formData.seo.metaDescription);
                        const keywords = keywordsInput.split(",").map(k => k.trim()).filter(k => k);
                        keywords.forEach((k, i) => data.append(`seo[keywords][${i}]`, k));
                    }
                } else if (key !== 'mainImage' && key !== 'gallery' && key !== '_id' && key !== 'id') {
                    data.append(key, (formData as any)[key]);
                }
            });

            if (!formData.imageAlt) data.append('imageAlt', formData.title || 'Project Image');
            else data.append('imageAlt', formData.imageAlt);

            if (imageFile) {
                data.append("image", imageFile);
            } else if (!initialData) {
                alert("Une image principale est requise");
                setLoading(false);
                return;
            }

            if (initialData?._id) {
                await realisationsService.updateRealisation(initialData._id, data);
            } else {
                await realisationsService.createRealisation(data);
            }
            onClose();
        } catch (error) {
            console.error("Error saving realisation:", error);
            alert("Erreur lors de la sauvegarde");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#C6C6C6]/20">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-[32px] font-rajdhani font-black uppercase">
                    {initialData ? "Modifier la réalisation" : "Nouvelle réalisation"}
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
                    {/* Left Column */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold mb-2">Titre du projet</label>
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
                                    <option value="Agriculture">Agriculture</option>
                                    <option value="Photovoltaïque">Photovoltaïque</option>
                                    <option value="Industriel">Industriel</option>
                                    <option value="Ouvrages d'art">Ouvrages d'art</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">Statut</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-all"
                                >
                                    <option value="completed">Terminé</option>
                                    <option value="ongoing">En cours</option>
                                    <option value="planned">Planifié</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold mb-2">Lieu</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">Année</label>
                                <input
                                    type="text"
                                    value={formData.year}
                                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold mb-2">Surface</label>
                                <input
                                    type="text"
                                    value={formData.surface}
                                    onChange={(e) => setFormData({ ...formData, surface: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none"
                                    placeholder="ex: 1200 m²"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">Client</label>
                                <input
                                    type="text"
                                    value={formData.client || ''}
                                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2">Image principale</label>
                            <div
                                className="relative h-48 rounded-xl border-2 border-dashed border-[#C6C6C6] flex items-center justify-center cursor-pointer hover:border-[#E40714] transition-all bg-gray-50 overflow-hidden"
                                onClick={() => document.getElementById('realisation-image-input')?.click()}
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
                                    id="realisation-image-input"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">Texte alternatif image</label>
                            <input
                                type="text"
                                value={formData.imageAlt || ''}
                                onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-all"
                                placeholder="Description de l'image"
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold mb-2">Description</label>
                            <div className="h-[250px] mb-12">
                                <ReactQuill
                                    theme="snow"
                                    value={formData.description}
                                    onChange={(content) => setFormData({ ...formData, description: content })}
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
                                        maxLength={60}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold mb-1 uppercase text-gray-500">Meta Description</label>
                                    <textarea
                                        value={formData.seo?.metaDescription || ''}
                                        onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo!, metaDescription: e.target.value } })}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#E40714] outline-none text-sm h-20 resize-none"
                                        maxLength={160}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold mb-1 uppercase text-gray-500">Mots-clés</label>
                                    <input
                                        type="text"
                                        value={keywordsInput}
                                        onChange={(e) => setKeywordsInput(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#E40714] outline-none text-sm"
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
