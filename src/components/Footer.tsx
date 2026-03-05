"use client";
import { Instagram, Smartphone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-24 border-t border-off-white/5 bg-background text-off-white px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <h3 className="text-3xl font-bold uppercase tracking-widest italic mb-12">Lam&apos;s Barber</h3>
        
        <div className="flex gap-12 mb-16">
          <a
            href="https://www.instagram.com/lams_barber/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 transition-colors hover:text-off-white"
          >
            <Instagram className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-off-white/40 group-hover:text-off-white">Instagram</span>
          </a>
          <a
            href="https://www.tiktok.com/@lams_barber"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 transition-colors hover:text-off-white"
          >
            <Smartphone className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-off-white/40 group-hover:text-off-white">TikTok</span>
          </a>
        </div>

        <a
          href="https://calendly.com/lamthamvo19/reservation-coupe"
          target="_blank"
          rel="noopener noreferrer"
          className="px-12 py-6 bg-kaki-deep text-off-white hover:bg-kaki-dark transition-all duration-300 uppercase font-bold tracking-[0.4em] text-xs shadow-2xl"
        >
          Réserver Maintenant
        </a>

        <div className="mt-24 text-[10px] uppercase tracking-[0.3em] text-off-white/20">
          © {new Date().getFullYear()} Lam&apos;s Barber. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
