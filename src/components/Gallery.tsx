"use client";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db, Haircut } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const TYPES = ["Tous", "Taper haut", "Taper mid", "Taper bas", "Dégradé haut", "Dégradé mid", "Dégradé bas", "Cuenta", "Burst fade", "Mullet", "Modern mullet"];
const LENGTHS = ["Toutes", "court", "mi-long", "long"];

export default function Gallery() {
  const [haircuts, setHaircuts] = useState<Haircut[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("Tous");
  const [filterLength, setFilterLength] = useState("Toutes");
  const [filterAvantApres, setFilterAvantApres] = useState<boolean | null>(null);

  useEffect(() => {
    const q = query(collection(db, "haircuts"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Haircut));
      setHaircuts(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filtered = haircuts.filter(h => {
    return (filterType === "Tous" || h.type === filterType) &&
           (filterLength === "Toutes" || h.length === filterLength) &&
           (filterAvantApres === null || h.avantApres === filterAvantApres);
  });

  return (
    <section id="gallery" className="py-24 px-4 bg-background max-w-7xl mx-auto">
      <div className="mb-12 space-y-8">
        <h2 className="text-3xl font-bold uppercase tracking-widest text-off-white text-center">La Galerie</h2>
        
        <div className="flex flex-wrap justify-center gap-4 text-xs font-medium uppercase tracking-widest">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {TYPES.map(t => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-4 py-2 border ${filterType === t ? 'bg-off-white text-background border-off-white' : 'border-off-white/20 text-off-white hover:border-off-white'} transition-all`}
              >
                {t}
              </button>
            ))}
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {LENGTHS.map(l => (
              <button
                key={l}
                onClick={() => setFilterLength(l)}
                className={`px-4 py-2 border ${filterLength === l ? 'bg-off-white text-background border-off-white' : 'border-off-white/20 text-off-white hover:border-off-white'} transition-all`}
              >
                {l}
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-2">
            <button
              onClick={() => setFilterAvantApres(null)}
              className={`px-4 py-2 border ${filterAvantApres === null ? 'bg-off-white text-background border-off-white' : 'border-off-white/20 text-off-white hover:border-off-white'} transition-all`}
            >
              Tous
            </button>
            <button
              onClick={() => setFilterAvantApres(true)}
              className={`px-4 py-2 border ${filterAvantApres === true ? 'bg-off-white text-background border-off-white' : 'border-off-white/20 text-off-white hover:border-off-white'} transition-all`}
            >
              Avant/Après
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((haircut) => (
            <motion.div
              layout
              key={haircut.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="aspect-[4/5] relative group overflow-hidden bg-kaki-dark/20"
            >
              <Image
                src={haircut.imageUrl}
                alt={haircut.type}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-off-white text-xs uppercase tracking-widest font-bold">{haircut.type}</span>
                <span className="text-off-white/60 text-[10px] uppercase tracking-widest mt-1">{haircut.length}</span>
                {haircut.avantApres && (
                  <span className="mt-2 text-[10px] bg-kaki-deep text-off-white px-2 py-1 self-start uppercase">Avant / Après</span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {!loading && filtered.length === 0 && (
        <div className="text-center py-24 text-off-white/40 uppercase tracking-widest text-sm">
          Aucune coupe ne correspond aux filtres.
        </div>
      )}
    </section>
  );
}
