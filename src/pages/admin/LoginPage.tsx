import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Lock, Mail, AlertCircle } from 'lucide-react';
import { authService } from '../../services/auth.service';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await authService.login(email, password);
            navigate('/admin');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erreur de connexion');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1B1B1B] to-[#000000] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#E40714] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#E40714]/30">
                        <Lock className="text-white" size={32} />
                    </div>
                    <h1 className="text-[32px] font-rajdhani font-bold text-[#000000] uppercase">Admin Login</h1>
                    <p className="text-[#1B1B1B]/60">Connectez-vous pour gérer le contenu</p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-red-500/10 text-red-600 p-4 rounded-xl mb-6 flex items-center gap-3 text-sm font-bold"
                    >
                        <AlertCircle size={18} />
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-[14px] font-bold text-[#1B1B1B] mb-2">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B1B1B]/40" size={20} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-all duration-300 font-medium"
                                placeholder="admin@metalr.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[14px] font-bold text-[#1B1B1B] mb-2">Mot de passe</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B1B1B]/40" size={20} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-all duration-300 font-medium"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <motion.button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 bg-[#E40714] text-white rounded-xl font-bold uppercase tracking-wide shadow-lg shadow-[#E40714]/30 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#C00612] hover:shadow-xl'
                            } transition-all duration-300`}
                        whileHover={!loading ? { scale: 1.02 } : {}}
                        whileTap={!loading ? { scale: 0.98 } : {}}
                    >
                        {loading ? (
                            <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <LogIn size={20} />
                                Se connecter
                            </>
                        )}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}
