import type { Metadata } from "next";
import { Lexend_Mega, Public_Sans, IBM_Plex_Mono, Shantell_Sans } from "next/font/google";
import "./globals.css";

const lexend = Lexend_Mega({
  variable: "--font-lexend",
  subsets: ["latin"],
});

const publicSans = Public_Sans({
  variable: "--font-public",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

const shantell = Shantell_Sans({
  variable: "--font-shantell",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arcorath.github.io"),
  title: "adarsh mishra — backend systems & agentic ai",
  description:
    "backend engineer building scalable architectures and agentic ai workflows. mathematics & computing @ iit (bhu), varanasi. microservices, distributed systems, ml data pipelines.",
  keywords: [
    "Adarsh Mishra",
    "ArcoRATH",
    "Backend Engineer",
    "Python",
    "Django",
    "LangGraph",
    "IIT BHU",
  ],
};

const themeInit =
  '(function(){try{var t=localStorage.getItem("theme")||"dark";document.documentElement.classList.toggle("dark",t!=="light");}catch(e){document.documentElement.classList.add("dark");}})()';

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${lexend.variable} ${publicSans.variable} ${plexMono.variable} ${shantell.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInit }}
        />
      </head>
      <body className="min-h-full bg-bg font-sans text-fg">{children}</body>
    </html>
  );
}
