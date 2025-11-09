import Link from 'next/link'
import Image from 'next/image'
import type { Work } from '@/app/lib/types'
import { fetchWorks } from '@/app/lib/services/works'
import { fetchDesignerById } from '@/app/lib/services/designers'
import { englishNameByStudentNumber } from '@/app/lib/data/student-data'

function seededRandom(seed: number): () => number {
  let value = seed % 2147483647
  if (value <= 0) value += 2147483646
  return () => {
    value = (value * 16807) % 2147483647
    return (value - 1) / 2147483646
  }
}

function shuffleWithSeed<T>(items: T[], seed: number): T[] {
  const random = seededRandom(seed)
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

function hashString(input: string): number {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0
  }
  return hash
}

// 페이지 매개변수 타입
interface WorkDetailPageProps {
  params: {
    id: string
  }
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const workId = parseInt(params.id)
  const allWorks = await fetchWorks()
  const work = allWorks.find(w => w.id === workId)
  const designer = work ? await fetchDesignerById(work.userId) : null
  const studioKey = work?.category === '혁신디자인스튜디오' ? 'innovation' : 'convergence'
  const worksListHref = `/archives/years/2025/works${studioKey === 'innovation' ? '?studio=innovation' : ''}`

  const daySeed = Math.floor(Date.now() / 86_400_000)
  const categorySeed = work ? daySeed + hashString(work.category) : daySeed
  const sameStudio = work ? allWorks.filter(w => w.category === work.category) : []
  const shuffledStudio = work ? shuffleWithSeed(sameStudio, categorySeed) : []
  const currentIndex = work ? shuffledStudio.findIndex(w => w.id === work.id) : -1
  const targetCount = Math.min(4, Math.max(0, shuffledStudio.length - 1))
  const offsets = [-1, 1, -2, 2]
  const related: Work[] = []
  const used = new Set<number>()

  if (currentIndex >= 0) {
    for (const offset of offsets) {
      if (related.length >= targetCount) break
      const len = shuffledStudio.length
      if (len === 0) break
      let idx = (currentIndex + offset) % len
      if (idx < 0) idx += len
      if (idx === currentIndex) continue
      const candidate = shuffledStudio[idx]
      if (!candidate || used.has(candidate.id)) continue
      related.push(candidate)
      used.add(candidate.id)
    }
  }

  if (!work || !designer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">작품을 찾을 수 없습니다</h2>
          <p className="text-gray-600 mb-8">요청하신 작품 정보를 찾을 수 없습니다.</p>
          <Link href={worksListHref} className="px-6 py-3 bg-primary-800 text-white rounded-lg hover:bg-primary-700">
            작품 목록으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }
  const roman = designer.student_number ? englishNameByStudentNumber[designer.student_number] : undefined

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-10">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[minmax(0,720px)_minmax(0,1fr)] gap-10">
          {/* Left: main visual */}
          <div className="order-2 lg:order-1 space-y-8">
            {work.images.length ? (
              work.images.map((src, idx) => (
                <div
                  key={`${src}-${idx}`}
                  className="w-full border border-gray-200 bg-gray-100"
                >
                  <img
                    src={src}
                    alt={`${work.title} 상세 이미지 ${idx + 1}`}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    className="block w-full h-auto"
                  />
                </div>
              ))
            ) : (
              <div className="w-full bg-[repeating-linear-gradient(45deg,#efefef_0,#efefef_24px,#f8f8f8_24px,#f8f8f8_48px)] border border-gray-200 min-h-[720px]" />
            )}
          </div>

          {/* Right: meta and description */}
          <aside className="order-1 lg:order-2 lg:pl-2 mb-10 lg:mb-0">
            <Link href={worksListHref} className="text-gray-600 hover:text-black inline-flex items-center mb-6">
              <Image src="/images/works/arrow.svg" alt="" width={16} height={16} className="mr-2" />
              <span className="rix-font text-[16px]">뒤로가기</span>
            </Link>
            <h1 className="pretendard-font text-[26px] font-extrabold text-black leading-snug mb-2">{work.title}</h1>
            <div className="pretendard-font text-[18px] font-bold text-[#D5B27D] mb-5">
              {designer.name}
              {roman ? <span className="ml-2 text-[#D5B27D] font-bold">{roman}</span> : null}
            </div>
            <p className="work-description pretendard-font text-[18px] font-medium leading-7 text-gray-700 mb-6">
              {work.description}
            </p>
            <div className="pretendard-font text-[18px] font-bold text-gray-700">{work.category}</div>
          </aside>
        </div>

        {/* Related */}
        <div className="mx-auto max-w-6xl mt-12">
          <span
            className="inline-flex items-center px-2 py-0.5 -rotate-1"
            style={{ background: '#DDFF8E', fontSize: '24px' }}
          >
            다른 작품 둘러보기
          </span>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {related.map((r, idx) => (
              <Link
                key={r.id}
                href={`/archives/years/2025/works/${r.id}`}
                className={`group block ${idx >= 2 ? 'hidden sm:block' : ''}`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[repeating-linear-gradient(45deg,#efefef_0,#efefef_24px,#f8f8f8_24px,#f8f8f8_48px)]">
                  {r.thumbnail ? (
                    <Image
                      src={r.thumbnail}
                      alt={`${r.title} 썸네일`}
                      fill
                      sizes="(max-width: 1024px) 50vw, 240px"
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <div className="mt-3 pretendard-font font-bold text-[16px] text-gray-900">{r.title}</div>
                <div className="pretendard-font font-bold text-[14px] text-[#8b8b8b]">{r.designerName}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
