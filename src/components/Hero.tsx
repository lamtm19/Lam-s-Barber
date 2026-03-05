"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col items-center justify-center text-center px-4 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-off-white uppercase italic">
          Lam&apos;s Barber
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="flex flex-col md:flex-row gap-4 w-full max-w-md"
      >
        <button
          onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
          className="flex-1 px-8 py-4 border border-off-white text-off-white hover:bg-off-white hover:text-background transition-all duration-300 font-medium uppercase tracking-widest text-sm"
        >
          Voir les coupes
        </button>
        <a
          href="https://calendly.com/lamthamvo19/reservation-coupe"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-8 py-4 bg-kaki-deep text-off-white hover:bg-kaki-dark transition-all duration-300 font-medium uppercase tracking-widest text-sm text-center"
        >
          Réserver
        </a>
      </motion.div>
    </section>
  );
}
