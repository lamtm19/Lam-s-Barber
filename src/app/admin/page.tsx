"use client";
import { useState, useEffect } from "react";
import { auth, db, storage, Haircut } from "@/lib/firebase";
import { 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut,
  User 
} from "firebase/auth";
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy,
  serverTimestamp 
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { LogOut, Trash2, Plus, Loader2 } from "lucide-react";
import Image from "next/image";

const TYPES = ["Taper haut", "Taper mid", "Taper bas", "Dégradé haut", "Dégradé mid", "Dégradé bas", "Cuenta", "Burst fade", "Mullet", "Modern mullet"];
const LENGTHS = ["court", "mi-long", "long"];

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState(TYPES[0]);
  const [length, setLength] = useState(LENGTHS[0]);
  const [avantApres, setAvantApres] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [haircuts, setHaircuts] = useState<Haircut[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "haircuts"), orderBy("date", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setHaircuts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Haircut)));
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error(error);
      let message = "Erreur de connexion";
      if (error.code === "auth/user-not-found") message = "Utilisateur non trouvé";
      if (error.code === "auth/wrong-password") message = "Mot de passe incorrect";
      if (error.code === "auth/invalid-credential") message = "Identifiants invalides";
      alert(message + " (" + error.code + ")");
    }
  };

  const handleAddHaircut = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !user) return;
    setSubmitting(true);
    
    try {
      const storageRef = ref(storage, `haircuts/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);
      
      await addDoc(collection(db, "haircuts"), {
        imageUrl,
        type,
        length,
        avantApres,
        date: serverTimestamp(),
      });
      
      setFile(null);
      setAvantApres(false);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'ajout");
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Supprimer cette coupe ?")) return;
    try {
      await deleteDoc(doc(db, "haircuts", id));
      // Optionnel: supprimer du storage aussi
      const fileRef = ref(storage, imageUrl);
      await deleteObject(fileRef).catch(() => {});
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-background text-off-white uppercase tracking-widest text-xs">Chargement...</div>;

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center bg-background px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-8">
          <h1 className="text-2xl font-bold text-off-white uppercase tracking-widest text-center italic">Admin Lam&apos;s</h1>
          <div className="space-y-4">
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-kaki-dark/20 border border-off-white/10 p-4 text-off-white focus:outline-none focus:border-off-white/40 uppercase text-xs tracking-widest"
              required 
            />
            <input 
              type="password" 
              placeholder="Mot de passe" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-kaki-dark/20 border border-off-white/10 p-4 text-off-white focus:outline-none focus:border-off-white/40 uppercase text-xs tracking-widest"
              required 
            />
          </div>
          <button type="submit" className="w-full py-4 bg-off-white text-background uppercase text-xs font-bold tracking-[0.2em] hover:bg-white transition-all">
            Connexion
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-off-white p-4 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-16">
          <h1 className="text-2xl font-bold uppercase tracking-widest italic">Dashboard Admin</h1>
          <button onClick={() => signOut(auth)} className="flex items-center gap-2 text-off-white/40 hover:text-off-white transition-colors uppercase text-[10px] tracking-widest">
            <LogOut className="w-4 h-4" /> Déconnexion
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Add Form */}
          <div className="bg-kaki-dark/10 p-8 border border-off-white/5 h-fit space-y-8 sticky top-12">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em]">Ajouter une coupe</h2>
            <form onSubmit={handleAddHaircut} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-off-white/40">Photo</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full text-xs text-off-white/60 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-[10px] file:uppercase file:tracking-widest file:bg-off-white/10 file:text-off-white file:cursor-pointer hover:file:bg-off-white/20"
                  required 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-off-white/40">Type</label>
                <select 
                  value={type} 
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-background border border-off-white/10 p-3 text-off-white text-xs uppercase tracking-widest focus:outline-none"
                >
                  {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-off-white/40">Longueur</label>
                <select 
                  value={length} 
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full bg-background border border-off-white/10 p-3 text-off-white text-xs uppercase tracking-widest focus:outline-none"
                >
                  {LENGTHS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={avantApres}
                  onChange={(e) => setAvantApres(e.target.checked)}
                  className="w-4 h-4 rounded border-off-white/10 bg-background text-kaki-deep focus:ring-0"
                />
                <span className="text-[10px] uppercase tracking-widest text-off-white/60 group-hover:text-off-white">Avant / Après</span>
              </label>

              <button 
                type="submit" 
                disabled={submitting}
                className="w-full py-4 bg-kaki-deep text-off-white uppercase text-xs font-bold tracking-[0.2em] hover:bg-kaki-dark transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Ajouter
              </button>
            </form>
          </div>

          {/* List */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em]">{haircuts.length} Coupes en ligne</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {haircuts.map((h) => (
                <div key={h.id} className="aspect-[4/5] relative group bg-kaki-dark/20">
                  <Image src={h.imageUrl} alt={h.type} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1">{h.type}</p>
                    <p className="text-[8px] uppercase tracking-widest text-off-white/60 mb-4">{h.length}</p>
                    <button 
                      onClick={() => handleDelete(h.id, h.imageUrl)}
                      className="p-2 bg-red-900/40 text-red-200 hover:bg-red-900 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
