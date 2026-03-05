"use client";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { db, Review } from "@/lib/firebase";
import { Star, User } from "lucide-react";
import { motion } from "framer-motion";

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "reviews"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review));
      setReviews(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newComment) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, "reviews"), {
        name: newName,
        comment: newComment,
        rating: newRating,
        date: serverTimestamp(),
      });
      setNewName("");
      setNewComment("");
      setNewRating(5);
    } catch (error) {
      console.error(error);
    }
    setSubmitting(false);
  };

  return (
    <section className="py-24 px-4 bg-background max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
        <h2 className="text-3xl font-bold uppercase tracking-widest text-off-white">Avis Clients</h2>
        <div className="flex items-center gap-4 bg-kaki-dark/20 p-6 border border-off-white/10">
          <div className="text-5xl font-bold text-off-white tracking-tighter">{averageRating}</div>
          <div>
            <div className="flex gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.round(Number(averageRating)) ? 'fill-off-white text-off-white' : 'text-off-white/20'}`} />
              ))}
            </div>
            <p className="text-[10px] uppercase tracking-widest text-off-white/40">{reviews.length} Avis au total</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8 max-h-[600px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-kaki-deep">
          {reviews.map((review) => (
            <div key={review.id} className="border-l border-off-white/10 pl-6 py-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold uppercase tracking-widest text-off-white">{review.name}</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-off-white text-off-white' : 'text-off-white/20'}`} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-off-white/60 leading-relaxed italic">&ldquo;{review.comment}&rdquo;</p>
            </div>
          ))}
          {!loading && reviews.length === 0 && (
            <p className="text-off-white/20 uppercase tracking-[0.2em] text-[10px]">Soyez le premier à donner votre avis.</p>
          )}
        </div>

        <div className="bg-kaki-dark/10 p-8 border border-off-white/5">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-off-white mb-6">Laissez un avis</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Votre prénom"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full bg-background border border-off-white/10 p-4 text-off-white focus:outline-none focus:border-off-white/40 transition-colors uppercase text-xs tracking-widest"
              required
            />
            <textarea
              placeholder="Votre avis..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full bg-background border border-off-white/10 p-4 text-off-white min-h-[120px] focus:outline-none focus:border-off-white/40 transition-colors text-xs tracking-widest"
              required
            />
            <div className="flex items-center gap-4 py-2">
              <span className="text-[10px] uppercase tracking-widest text-off-white/40">Note:</span>
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setNewRating(i + 1)}
                    className="p-1"
                  >
                    <Star className={`w-5 h-5 ${i < newRating ? 'fill-off-white text-off-white' : 'text-off-white/20 hover:text-off-white/40'}`} />
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-off-white text-background uppercase text-xs font-bold tracking-[0.3em] hover:bg-white transition-all disabled:opacity-50"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
