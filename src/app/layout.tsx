import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg font-sans text-fg">{children}</body>
    </html>
  );
}
