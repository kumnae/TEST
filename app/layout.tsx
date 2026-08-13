import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "NeuralPulse", template: "%s | NeuralPulse" },
  description: "인공지능, 생성형 AI, 컴퓨터 비전과 미래 기술을 깊이 있게 탐구합니다.",
  openGraph: { title: "NeuralPulse — AI의 최전선을 탐험하다", description: "AI의 변화와 가능성을 읽는 기술 아카이브", images: ["/og.png"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ko"><body>{children}</body></html>}
