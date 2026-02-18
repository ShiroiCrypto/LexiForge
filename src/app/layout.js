import "./globals.css";
import { Inter, Cinzel, Crimson_Text, Playfair_Display } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' })
const crimson = Crimson_Text({ weight: ['400', '600', '700'], subsets: ['latin'], variable: '--font-crimson' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata = {
  title: "LexiForge | O Leão da Oratória",
  description: "No princípio era o Verbo. Uma palavra entra, uma saga sai.",
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${cinzel.variable} ${crimson.variable} ${playfair.variable} antialiased bg-[#05070a] text-white min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
