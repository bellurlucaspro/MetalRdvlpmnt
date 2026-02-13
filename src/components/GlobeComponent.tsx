import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Users, Building2, TrendingUp } from "lucide-react";

interface Location {
    name: string;
    city: string;
    lat: number;
    lng: number;
    employees: string;
    activity: string;
    year: string;
    specialties: string[];
    certifications?: string[];
    color: string;
    status: "operational" | "development";
}

const locations: Location[] = [
    {
        name: "Siège Social",
        city: "Paris, France",
        lat: 48.8566,
        lng: 2.3522,
        employees: "150+",
        activity: "Direction & Coordination",
        year: "1995",
        specialties: ["Management", "R&D", "Commercial"],
        certifications: ["ISO 9001", "ISO 14001"],
        color: "#E40714",
        status: "operational",
    },
    {
        name: "Site Balkans",
        city: "Belgrade, Serbie",
        lat: 44.8176,
        lng: 20.4633,
        employees: "80+",
        activity: "Fabrication métallique",
        year: "2008",
        specialties: ["Chaudronnerie", "Soudure TIG/MIG", "Usinage"],
        certifications: ["ISO 3834-2"],
        color: "#E40714",
        status: "operational",
    },
    {
        name: "Site Roumanie",
        city: "Bucarest, Roumanie",
        lat: 44.4268,
        lng: 26.1025,
        employees: "60+",
        activity: "Bureau d'études & Conception",
        year: "2012",
        specialties: ["CAO/DAO", "Calculs structures", "Prototypage"],
        certifications: ["ISO 9001"],
        color: "#E40714",
        status: "operational",
    },
    {
        name: "Site Tunisie",
        city: "Tunis, Tunisie",
        lat: 36.8065,
        lng: 10.1815,
        employees: "120+",
        activity: "Production industrielle",
        year: "2005",
        specialties: ["Assemblage", "Peinture industrielle", "Contrôle qualité"],
        certifications: ["ISO 9001", "ISO 45001"],
        color: "#E40714",
        status: "operational",
    },
    {
        name: "Site Guinée",
        city: "Conakry, Guinée",
        lat: 9.6412,
        lng: -13.5784,
        employees: "45+",
        activity: "Ingénierie & Projets",
        year: "2018",
        specialties: ["Gestion de projets", "Maintenance", "Logistique"],
        color: "#E40714",
        status: "operational",
    },
    {
        name: "Site Émirats Arabes Unis",
        city: "Dubai, EAU",
        lat: 25.2048,
        lng: 55.2708,
        employees: "En cours",
        activity: "Développement commercial",
        year: "2026",
        specialties: ["Prospection", "Partenariats", "Logistique"],
        color: "#FFA500",
        status: "development",
    },
    {
        name: "Site Antilles",
        city: "Fort-de-France, Martinique",
        lat: 14.6160,
        lng: -61.0589,
        employees: "En cours",
        activity: "Développement régional",
        year: "2026",
        specialties: ["Études de marché", "Infrastructure", "Formation"],
        color: "#FFA500",
        status: "development",
    },
    {
        name: "Site Thaïlande",
        city: "Bangkok, Thaïlande",
        lat: 13.7563,
        lng: 100.5018,
        employees: "En cours",
        activity: "Expansion Asie-Pacifique",
        year: "2026",
        specialties: ["Développement", "Sourcing", "Partenariats"],
        color: "#FFA500",
        status: "development",
    },
];

export function GlobeComponent() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerInteracting = useRef<number | null>(null);
    const pointerInteractionMovement = useRef(0);
    const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const isGlobeHoveredRef = useRef(false);
    const globeRef = useRef<any>(null);
    const focusRef = useRef([0, 0]);

    useEffect(() => {
        let phi = 0;
        let width = 0;

        const onResize = () => {
            if (canvasRef.current) {
                width = canvasRef.current.offsetWidth;
            }
        };
        window.addEventListener("resize", onResize);
        onResize();

        if (!canvasRef.current) return;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: width * 2,
            height: width * 2,
            phi: 0,
            theta: 0.3,
            dark: 0,
            diffuse: 3,
            mapSamples: 16000,
            mapBrightness: 1.2,
            baseColor: [1, 1, 1],
            markerColor: [228 / 255, 7 / 255, 20 / 255],
            glowColor: [0.9, 0.9, 0.9],
            markers: locations.map((loc) => ({
                location: [loc.lat, loc.lng],
                size: loc.status === "development" ? 0.08 : 0.1,
            })),
            onRender: (state) => {
                // Rotation continue sauf si la souris survole le globe
                if (!pointerInteracting.current && !isGlobeHoveredRef.current) {
                    phi += 0.005;
                }
                state.phi = phi + pointerInteractionMovement.current;
                state.width = width * 2;
                state.height = width * 2;
            },
        });

        globeRef.current = globe;

        setTimeout(() => {
            if (canvasRef.current) {
                canvasRef.current.style.opacity = "1";
            }
        }, 100);

        return () => {
            globe.destroy();
            window.removeEventListener("resize", onResize);
        };
    }, []);

    // Détection de hover sur les marqueurs
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Position relative au centre du canvas
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const relX = x - centerX;
        const relY = y - centerY;

        // Distance du centre
        const distance = Math.sqrt(relX * relX + relY * relY);
        const radius = rect.width / 2;

        // Vérifier si on est sur le globe
        if (distance < radius * 0.9) {
            // Calculer l'angle pour déterminer quelle région est survolée
            const angle = Math.atan2(relY, relX);
            const normalizedDistance = distance / radius;

            // Zone de détection simple basée sur la position
            // Cette logique sera améliorée avec un vrai calcul 3D
            let closestLocation: Location | null = null;
            let minDist = Infinity;

            locations.forEach((loc) => {
                // Approximation simple de la position 2D du marqueur
                const locAngle = (loc.lng * Math.PI) / 180;
                const locLat = (loc.lat * Math.PI) / 180;

                const angleDiff = Math.abs(angle - locAngle);
                const dist = angleDiff + Math.abs(normalizedDistance - 0.5);

                if (dist < minDist && dist < 0.3) {
                    minDist = dist;
                    closestLocation = loc;
                }
            });

            if (closestLocation && closestLocation !== hoveredLocation) {
                setHoveredLocation(closestLocation);
                setTooltipPosition({ x: e.clientX, y: e.clientY });
            } else if (!closestLocation && hoveredLocation) {
                setHoveredLocation(null);
            }
        } else if (hoveredLocation) {
            setHoveredLocation(null);
        }
    };

    const totalEmployees = locations.reduce((acc, loc) => {
        const num = parseInt(loc.employees.replace("+", "").replace("En cours", "0"));
        return acc + (isNaN(num) ? 0 : num);
    }, 0);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-8">
            <div
                className="relative w-full max-w-[500px] aspect-square"
                onMouseEnter={() => {
                    isGlobeHoveredRef.current = true;
                }}
                onMouseLeave={() => {
                    isGlobeHoveredRef.current = false;
                    setHoveredLocation(null);
                }}
                onMouseMove={handleMouseMove}
            >
                {/* Ambient Glow Background */}
                <div className="absolute inset-0 -z-10">
                    <motion.div
                        className="absolute inset-0 rounded-full opacity-30 blur-3xl"
                        style={{
                            background: "radial-gradient(circle, rgba(228,7,20,0.4) 0%, rgba(228,7,20,0.1) 40%, transparent 70%)",
                        }}
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <motion.div
                        className="absolute inset-0 rounded-full opacity-20 blur-2xl"
                        style={{
                            background: "radial-gradient(circle, rgba(255,165,0,0.3) 0%, rgba(255,165,0,0.1) 40%, transparent 70%)",
                        }}
                        animate={{
                            scale: [1.1, 1, 1.1],
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5,
                        }}
                    />
                </div>

                {/* Globe Canvas */}
                <canvas
                    ref={canvasRef}
                    className="w-full h-full opacity-0 transition-opacity duration-500"
                    style={{
                        width: "100%",
                        height: "100%",
                        maxWidth: "100%",
                        aspectRatio: "1",
                    }}
                />

                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-[#E40714] rounded-full"
                            style={{
                                left: `${20 + (i * 60) % 80}%`,
                                top: `${30 + (i * 40) % 60}%`,
                            }}
                            animate={{
                                x: [0, Math.random() * 40 - 20, 0],
                                y: [0, Math.random() * 40 - 20, 0],
                                opacity: [0, 0.6, 0],
                                scale: [0, 1.5, 0],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Premium Glassmorphism Tooltip */}
            <AnimatePresence>
                {hoveredLocation && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute z-50 pointer-events-none"
                        style={{
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <div
                            className="relative backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-2xl overflow-hidden border border-white/20 w-[320px]"
                            style={{
                                boxShadow: "0 8px 32px 0 rgba(228, 7, 20, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                            }}
                        >
                            {/* Gradient Border Effect */}
                            <div
                                className="absolute inset-0 rounded-2xl opacity-50 pointer-events-none"
                                style={{
                                    background: `linear-gradient(135deg, ${hoveredLocation.status === "development" ? "#FFA500" : "#E40714"
                                        }40, transparent)`,
                                }}
                            />

                            {/* Header avec gradient */}
                            <div
                                className={`relative p-5 text-white ${hoveredLocation.status === "development"
                                        ? "bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700"
                                        : "bg-gradient-to-br from-[#E40714] via-[#C00612] to-[#A00510]"
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg mb-1.5">{hoveredLocation.name}</h3>
                                        <div className="flex items-center gap-2 text-white/90 text-sm">
                                            <MapPin size={14} />
                                            <span>{hoveredLocation.city}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1.5 items-end">
                                        <div className="bg-white/25 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold">
                                            {hoveredLocation.year}
                                        </div>
                                        {hoveredLocation.status === "development" && (
                                            <div className="bg-white text-orange-600 px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1">
                                                <TrendingUp size={10} />
                                                En développement
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Contenu principal */}
                            <div className="relative p-5 space-y-4 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-800/50">
                                {/* Activité principale */}
                                <div className="flex items-start gap-3">
                                    <div
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${hoveredLocation.status === "development"
                                                ? "bg-orange-500/15"
                                                : "bg-[#E40714]/15"
                                            }`}
                                    >
                                        <Building2
                                            size={18}
                                            className={
                                                hoveredLocation.status === "development"
                                                    ? "text-orange-600"
                                                    : "text-[#E40714]"
                                            }
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">
                                            Activité
                                        </p>
                                        <p className="text-gray-900 dark:text-white font-semibold text-sm leading-tight">
                                            {hoveredLocation.activity}
                                        </p>
                                    </div>
                                </div>

                                {/* Effectif */}
                                <div className="flex items-start gap-3">
                                    <div
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${hoveredLocation.status === "development"
                                                ? "bg-orange-500/15"
                                                : "bg-[#E40714]/15"
                                            }`}
                                    >
                                        <Users
                                            size={18}
                                            className={
                                                hoveredLocation.status === "development"
                                                    ? "text-orange-600"
                                                    : "text-[#E40714]"
                                            }
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">
                                            Effectif
                                        </p>
                                        <p className="text-gray-900 dark:text-white font-semibold text-sm">
                                            {hoveredLocation.employees}{" "}
                                            {hoveredLocation.employees !== "En cours" && "salariés"}
                                        </p>
                                    </div>
                                </div>

                                {/* Spécialités */}
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
                                        Spécialités
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {hoveredLocation.specialties.map((specialty, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-gray-100 px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm"
                                            >
                                                {specialty}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Certifications */}
                                {hoveredLocation.certifications && hoveredLocation.certifications.length > 0 && (
                                    <div className="pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
                                        <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
                                            Certifications
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {hoveredLocation.certifications.map((cert, idx) => (
                                                <span
                                                    key={idx}
                                                    className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-700 px-2.5 py-1 rounded-lg text-[10px] font-bold"
                                                >
                                                    {cert}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Stats Counter */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex items-center gap-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg"
            >
                <div className="text-center">
                    <motion.div
                        className="text-3xl font-bold bg-gradient-to-r from-[#E40714] to-[#C00612] bg-clip-text text-transparent"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                    >
                        {locations.length}
                    </motion.div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 font-medium mt-1">Sites</div>
                </div>
                <div className="w-px h-8 bg-gray-300 dark:bg-gray-600" />
                <div className="text-center">
                    <motion.div
                        className="text-3xl font-bold bg-gradient-to-r from-[#E40714] to-[#C00612] bg-clip-text text-transparent"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                    >
                        {totalEmployees}+
                    </motion.div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 font-medium mt-1">Collaborateurs</div>
                </div>
                <div className="w-px h-8 bg-gray-300 dark:bg-gray-600" />
                <div className="text-center">
                    <motion.div
                        className="text-3xl font-bold bg-gradient-to-r from-[#E40714] to-[#C00612] bg-clip-text text-transparent"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.1, duration: 0.5 }}
                    >
                        8
                    </motion.div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 font-medium mt-1">Pays</div>
                </div>
            </motion.div>
        </div>
    );
}
