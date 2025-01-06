import type { Metadata } from "next";
import "@/styles/globals.css";
import { Nanum_Gothic } from "next/font/google";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "용인 함박 교회 ",
  description: "사랑과 믿음이 함께하는 공간, 용인 함박 교회 공식 웹사이트입니다.",
};

//font setting
const nanumGothic = Nanum_Gothic({
  subsets: ["latin"],
  weight: ["400", "700", "800"], // 사용할 굵기 지정
  display: "swap", // 폰트 표시 방식 설정
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={nanumGothic.className}>
      <body>
        <Navigation className="mb-3" />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
