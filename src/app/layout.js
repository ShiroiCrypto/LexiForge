import "./globals.css";
import { Inter, Cinzel, Crimson_Text } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' })
const crimson = Crimson_Text({ weight: ['400', '600', '700'], subsets: ['latin'], variable: '--font-crimson' })

export const metadata = {
  title: "LexiForge | Oratória Generativa",
  description: "Uma palavra entra, uma saga sai.",
  icons: {
    icon: '/logo.png', // Using logo as favicon
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${cinzel.variable} ${crimson.variable} antialiased bg-[#0B0E14] text-white min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
