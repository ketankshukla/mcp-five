import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/**
 * Three faces, all self-hosted at build time by next/font. There is no runtime
 * request to any external host, and no generic system stack anywhere — a
 * default sans is what makes a page look machine-generated.
 */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mcp-five.vercel.app"),
  title: {
    default: "MCP Five — five projects, one arc",
    template: "%s · MCP Five",
  },
  description:
    "A course on the Model Context Protocol, taught through five real, shipped projects — a server, a loop, a gate, a crew and a ledger.",
  openGraph: {
    title: "MCP Five — five projects, one arc",
    description:
      "A course on the Model Context Protocol, taught through five real, shipped projects.",
    type: "website",
  },
};

// Typed explicitly rather than with `LayoutProps<"/">`: that generated type
// does not exist until after a build, so a clean clone fails `tsc --noEmit`.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:border focus:border-[var(--accent)] focus:bg-[var(--surface-2)] focus:px-4 focus:py-2 focus:text-[var(--accent)]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
