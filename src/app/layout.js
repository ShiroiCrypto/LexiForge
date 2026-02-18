import "./globals.css";
import { Inter, Cinzel } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' })

export const metadata = {
  title: "LexiForge | Oratória Generativa",
  description: "Uma palavra entra, uma saga sai.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${cinzel.variable} antialiased bg-[#0B0E14] text-white min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
