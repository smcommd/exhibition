"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { usePathname, useRouter } from "next/navigation";
import Footer from "../components/Footer";
import type { Work } from "@/app/lib/types";

type StudioKey = "convergence" | "innovation";

function seededRandom(seed: number): () => number {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function shuffleWithSeed<T>(items: T[], seed: number): T[] {
  const random = seededRandom(seed);
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

const PROFESSOR_BUTTON_STYLE = (active: boolean): CSSProperties => ({
  height: 30,
  padding: "3px 11px",
  background: active ? "#DDFF8E" : "#EFEFEF",
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 4,
  transition: "background-color 0.2s ease, color 0.2s ease",
});

const PROFESSOR_TEXT_STYLE = (active: boolean): CSSProperties => ({
  color: active ? "#000000" : "#C1C1C1",
  fontSize: 15,
  fontFamily: "rixdongnimgothic-pro, sans-serif",
  fontWeight: 400,
  lineHeight: "24px",
  whiteSpace: "nowrap",
});

const STUDIOS: Record<StudioKey, { label: string; en: string; icon: string; desc: string; professors: string[] }> = {
  convergence: {
    label: "융합디자인스튜디오",
    en: "Convergence Design studio",
    icon: "/images/works/convergence.svg",
    desc:
      "융합디자인스튜디오는 다양한 전공과 배경을 가진 학생들이 모여 협업하는 실험적 디자인 수업입니다. 이 수업에서는 문제 해결을 위한 창의적인 방법론과 디자인 프로세스를 학습하며, 실제 프로젝트를 통해 아이디어를 구체화합니다. 학생들은 시각디자인, 서비스 디자인, 인터페이스 기획 등 여러 분야를 융합하여 새로운 결과물을 만들어내는 과정을 경험합니다.",
    professors: ["유동관 교수님", "이원제 교수님", "신윤진 교수님", "남정 교수님"],
  },
  innovation: {
    label: "혁신디자인스튜디오",
    en: "Innovative Design studio",
    icon: "/images/works/inovation.svg",
    desc:
      "혁신디자인스튜디오 수업은 다양한 전공과 배경을 가진 학생들이 모여 협업하는 실험적 디자인 수업입니다. 이 수업에서는 문제 해결을 위한 창의적인 방법론과 디자인 프로세스를 학습하며, 실제 프로젝트를 통해 아이디어를 구체화합니다. 학생들은 시각디자인, 서비스 디자인, 인터페이스 기획 등 여러 분야를 융합하여 새로운 결과물을 만들어내는 과정을 경험합니다.",
    professors: ["서승연 교수님", "손우성 교수님", "김한솔 교수님", "안혜선 교수님"],
  },
};

interface WorksPageClientProps {
  works: Work[];
  initialStudio: StudioKey;
}

export default function WorksPageClient({ works, initialStudio }: WorksPageClientProps) {
  const [active, setActive] = useState<StudioKey>(initialStudio);
  const [profFilter, setProfFilter] = useState<string>("전체");
  const daySeed = Math.floor(Date.now() / 86_400_000);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setActive(initialStudio);
  }, [initialStudio]);

  useEffect(() => {
    const desiredQuery = active === "innovation" ? "?studio=innovation" : "";
    const current = typeof window !== "undefined" ? window.location.search : "";
    if (desiredQuery !== current) {
      router.replace(`${pathname}${desiredQuery}`, { scroll: false });
    }
  }, [active, router, pathname]);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const studioParam = params.get("studio") === "innovation" ? "innovation" : "convergence";
      setActive(studioParam);
      setProfFilter("전체");
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // userId -> 디자이너 이름 매핑
  // 실데이터 기반 필터링
  const filtered = useMemo(() => {
    const targetCategory = active === "innovation" ? "혁신디자인스튜디오" : "융합디자인스튜디오";
    let byStudio = works.filter((w) => w.category === targetCategory);
    if (profFilter !== "전체") {
      byStudio = byStudio.filter((w) => w.professor === profFilter);
    } else {
      const seeded = daySeed + hashString(targetCategory);
      byStudio = shuffleWithSeed(byStudio, seeded);
    }
    return byStudio;
  }, [active, profFilter, daySeed]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 pt-8 pb-16">
        {/* 상단 제목 및 설명 제거 요청에 따라 삭제됨 */}

        {/* 상단 스튜디오 탭 (두 개) */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(STUDIOS).map(([key, info]) => {
            const k = key as StudioKey;
            const isActive = active === k;
                const bgImage = isActive ? "/svg/studio_active.svg" : "/svg/studio_non.svg";
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => {
                      setActive(k);
                      setProfFilter("전체");
                    }}
                    aria-pressed={isActive}
                    className="relative w-full transition-all overflow-hidden rounded-none aspect-[409/96]"
                  >
                    <Image src={bgImage} alt="" fill priority={isActive} className="object-contain pointer-events-none select-none" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 py-4">
                      <div className={`text-[20px] font-normal ${isActive ? "text-black" : "text-gray-500"}`}>{info.label}</div>
                      <div className={`text-sm ${isActive ? "text-black/80" : "text-gray-500"}`}>{info.en}</div>
                    </div>
                  </button>
                );
              })}
            </div>

        {/* 스튜디오 설명 + 교수 필터 + 그리드 */}
        <section className="mt-2">
          <h2 className="text-3xl md:text-4xl font-normal">{STUDIOS[active].label}</h2>
          <div className="mt-1 text-sm text-gray-700">{STUDIOS[active].en}</div>
          <p className="pretendard-font mt-6 text-gray-700 leading-7 max-w-4xl break-keep" style={{ wordBreak: 'keep-all' }}>{STUDIOS[active].desc}</p>

          {/* 교수 필터 */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setProfFilter("전체")}
              className="focus:outline-none"
              style={PROFESSOR_BUTTON_STYLE(profFilter === "전체")}
            >
              <span style={PROFESSOR_TEXT_STYLE(profFilter === "전체")}>전체</span>
            </button>
            {STUDIOS[active].professors.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setProfFilter(p)}
                className="focus:outline-none"
                style={PROFESSOR_BUTTON_STYLE(profFilter === p)}
              >
                <span style={PROFESSOR_TEXT_STYLE(profFilter === p)}>{p}</span>
              </button>
            ))}
          </div>

          {/* 작품 그리드 */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((w) => (
              <Link key={`${w.category}-${w.id}`} href={`/archives/years/2025/works/${w.id}`} className="group block">
                <div className="relative aspect-[4/3] w-full rounded-md border border-gray-200 overflow-hidden bg-[repeating-linear-gradient(45deg,#e9e9e9_0px,#e9e9e9_12px,#f6f6f6_12px,#f6f6f6_24px)]">
                  {w.thumbnail ? (
                    <Image
                      src={w.thumbnail}
                      alt={`${w.title} 썸네일`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : null}
                </div>
                <div className="mt-3 pretendard-font font-bold text-[20px] text-gray-900">{w.title}</div>
                <div className="pretendard-font font-bold text-[16px] text-[#8b8b8b]">{w.designerName}</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
