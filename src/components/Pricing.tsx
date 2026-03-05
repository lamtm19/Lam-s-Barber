"use client";
import { motion } from "framer-motion";

const PRICES = [
  { name: "Taper / Dégradé / Cuenta", price: "15€" },
  { name: "Cheveux du dessus", price: "+5€" },
  { name: "Barbe", price: "+5€" },
  { name: "Design", price: "+5€" },
  { name: "Réservation urgence", price: "25€" },
  { name: "Coupe à domicile", price: "DM" },
];

export default function Pricing() {
  return (
    <section className="py-24 px-4 bg-kaki-dark/10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold uppercase tracking-widest text-off-white text-center mb-16">Tarifs</h2>
        
        <div className="space-y-6">
          {PRICES.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex items-center justify-between border-b border-off-white/10 pb-6 group"
            >
              <span className="text-lg uppercase tracking-widest text-off-white/80 group-hover:text-off-white transition-colors duration-300">
                {item.name}
              </span>
              <span className="text-xl font-bold text-off-white tracking-widest">
                {item.price}
              </span>
            </motion.div>
          ))}
        </div>
        
        <p className="mt-12 text-center text-off-white/40 uppercase tracking-[0.2em] text-[10px]">
          Tous les tarifs sont indiqués à titre indicatif.
        </p>
      </div>
    </section>
  );
}
