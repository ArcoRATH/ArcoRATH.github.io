import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arcorath.github.io"),
  title: "Adarsh Mishra — Backend Engineer",
  description:
    "Backend systems & agentic AI workflows. Mathematics and Computing @ IIT (BHU), Varanasi. Microservices, distributed systems, ML data pipelines.",
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
      className={`${display.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-ink text-snow">
        {children}
      </body>
    </html>
  );
}
