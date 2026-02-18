"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const [inputWord, setInputWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleForge = async (e) => {
    e.preventDefault();
    if (!inputWord.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/v1/forge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ word: inputWord }),
      });

      if (!response.ok) {
        throw new Error("Falha ao forjar a narrativa.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Ocorreu um erro ao forjar sua saga. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-[#0B0E14] to-[#0B0E14]"></div>

      <div className="z-10 w-full max-w-3xl flex flex-col items-center gap-12 font-sans">

        {/* Header / Logo Area */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <div className="relative w-32 h-32 md:w-48 md:h-48 mb-4">
            <Image
              src="/logo.png"
              alt="LexiForge Logo"
              fill
              className="object-contain drop-shadow-[0_0_15px_rgba(0,245,255,0.3)]"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-wider">
            LEXIFORGE
          </h1>
          <p className="text-sm md:text-base text-gray-400 italic font-light tracking-widest uppercase">
            "Uma palavra entra, uma saga sai."
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.form
          onSubmit={handleForge}
          className="w-full max-w-md flex flex-col items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="relative w-full group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00F5FF] to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
            <input
              type="text"
              value={inputWord}
              onChange={(e) => setInputWord(e.target.value)}
              placeholder="Digite a Palavra Primordial..."
              className="relative w-full bg-[#0B0E14] text-white border border-gray-800 rounded-lg py-4 px-6 focus:outline-none focus:border-[#00F5FF] focus:shadow-[0_0_20px_rgba(0,245,255,0.2)] transition-all duration-300 text-center text-lg font-cinzel placeholder-gray-600 uppercase tracking-widest"
              maxLength={30}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !inputWord.trim()}
            className={`
                    px-8 py-3 rounded-full font-cinzel font-bold tracking-widest text-sm transition-all duration-300
                    ${loading || !inputWord.trim()
                ? 'opacity-50 cursor-not-allowed bg-gray-800 text-gray-500'
                : 'bg-transparent border border-[#00F5FF] text-[#00F5FF] hover:bg-[#00F5FF] hover:text-[#0B0E14] shadow-[0_0_10px_rgba(0,245,255,0.2)] hover:shadow-[0_0_20px_rgba(0,245,255,0.6)]'
              }
                `}
          >
            {loading ? "FORJANDO..." : "FORJAR SAGA"}
          </button>
        </motion.form>

        {/* Output Section */}
        <div className="w-full min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[#00F5FF] font-cinzel text-xl animate-pulse text-center"
              >
                <p>O Oráculo consulta as estrelas...</p>
                <p className="text-sm mt-2 text-gray-500 font-sans">Interpretando o significado de "{inputWord}"</p>
              </motion.div>
            )}

            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-red-500 border border-red-900 bg-red-950/20 p-6 rounded-lg text-center font-cinzel"
              >
                {error}
              </motion.div>
            )}

            {result && !loading && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full bg-[#0F1219] border border-gray-800 p-8 rounded-xl shadow-2xl relative overflow-hidden"
              >
                {/* Golden/Cyan Accent Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00F5FF] to-transparent opacity-50"></div>

                <div className="flex flex-col gap-6 text-center">
                  <motion.h2
                    className="text-2xl md:text-3xl font-cinzel font-bold text-[#00F5FF] mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {result.titulo}
                  </motion.h2>

                  <div className="text-gray-300 font-serif leading-relaxed text-lg text-justify md:text-center space-y-4">
                    <Typewriter text={result.historia} delay={30} />
                  </div>

                  <motion.div
                    className="mt-8 pt-6 border-t border-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }} // Delays until story likely finishes typing
                  >
                    <p className="font-cinzel text-sm text-gray-500 uppercase tracking-widest mb-2">A Lenda Diz</p>
                    <p className="text-xl md:text-2xl text-white italic font-serif">"{result.frase_de_ouro}"</p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </main>
  );
}

// Simple Typewriter Component
const Typewriter = ({ text, delay }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Reset when text or delay changes
    setCurrentText("");
    setCurrentIndex(0);
  }, [text, delay]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{currentText}</span>;
};
