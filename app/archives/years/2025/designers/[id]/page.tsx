import Link from 'next/link'
import Image from 'next/image'
import { englishNameByStudentNumber, getProfileImageMeta } from '@/app/lib/data/student-data'
import type { Work } from '@/app/lib/types'
import { fetchWorksByUserId } from '@/app/lib/services/works'
import { fetchDesignerById } from '@/app/lib/services/designers'

// 간단 로마자 변환(표시용)
function romanizeKorean(str: string): string {
  const CHO_RR = ['g','kk','n','d','tt','r','m','b','pp','s','ss','','j','jj','ch','k','t','p','h']
  const JUNG_RR = ['a','ae','ya','yae','eo','e','yeo','ye','o','wa','wae','oe','yo','u','wo','we','wi','yu','eu','ui','i']
  const JONG_RR = ['', 'k', 'k', 'ks', 'n', 'nj', 'nh', 't', 'l', 'lk', 'lm', 'lb', 'ls', 'lt', 'lp', 'lh', 'm', 'p', 'ps', 't', 't', 'ng', 't', 't', 'k', 't', 'p', 't']
  let out = ''
  for (const ch of str) {
    const code = ch.charCodeAt(0)
    if (code < 0xac00 || code > 0xd7a3) { out += ch; continue }
    const sidx = code - 0xac00
    const cho = Math.floor(sidx / 588)
    const jung = Math.floor((sidx % 588) / 28)
    const jong = sidx % 28
    out += (CHO_RR[cho] || '') + (JUNG_RR[jung] || '') + (JONG_RR[jong] || '')
  }
  return out.charAt(0).toUpperCase() + out.slice(1)
}

// Bio helper: insert gentle line breaks after sentence‑like boundaries
function formatBio(text: string): string {
  if (!text) return ''
  // 1) Normalize whitespace
  const normalized = text.replace(/\r\n?/g, '\n').replace(/[\t ]+/g, ' ').trim()

  // 2) If author inserted explicit newlines, preserve them (but collapse 3+)
  if (normalized.includes('\n')) {
    return normalized.replace(/\n{3,}/g, '\n\n')
  }

  // 3) Conservative sentence split: split after sentence-ending punctuation
  //    only when next token likely starts a new sentence (letter/Korean/quote/open bracket)
  const parts = normalized.split(/(?<=[.!?]|다\.|니다\.|요\.)\s+(?=[A-Za-z가-힣"“‘\(\[])/g)

  // 4) Reflow into lines with a soft max width to avoid overly long lines
  const MAX = 72
  const lines: string[] = []
  let buf = ''
  for (const seg of parts) {
    const candidate = buf ? buf + ' ' + seg : seg
    if (candidate.length > MAX && buf) {
      lines.push(buf)
      buf = seg
    } else {
      buf = candidate
    }
  }
  if (buf) lines.push(buf)

  return lines.join('\n')
}

// 페이지 매개변수 타입
interface DesignerDetailPageProps {
  params: {
    id: string
  }
}

export default async function DesignerDetailPage({ params }: DesignerDetailPageProps) {
  const designerId = parseInt(params.id)
  const designer = await fetchDesignerById(designerId)

  const profileImage = designer
    ? (() => {
        const fallbackMeta = getProfileImageMeta(designer.student_number, designer.name)
        const fallbackPreferred = fallbackMeta.src
        const primarySrc = designer.profile_image && designer.profile_image.trim().length > 0
          ? designer.profile_image
          : fallbackPreferred
        const finalSrc = designer.student_number === '202120343' ? fallbackPreferred : primarySrc
        return {
          src: finalSrc,
          blurDataURL: designer.profile_blur_data_url || fallbackMeta.blurDataURL,
        }
      })()
    : null

  if (!designer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-normal text-gray-800 mb-4">디자이너를 찾을 수 없습니다</h2>
          <p className="text-gray-600 mb-8">요청하신 디자이너 정보를 찾을 수 없습니다.</p>
          <Link href="/archives/years/2025/designers" className="px-6 py-3 bg-primary-800 text-white rounded-lg hover:bg-primary-700">
            디자이너 목록으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  const designerWorks = await fetchWorksByUserId(designer.id)
  const featuredWorks: Work[] = (() => {
    const conv = designerWorks.find(w => w.category === '융합디자인스튜디오')
    const inov = designerWorks.find(w => w.category === '혁신디자인스튜디오')
    return [conv, inov].filter((w): w is Work => Boolean(w))
  })()

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* info */}
      <section id="info" className="py-8">
        <div className="container mx-auto px-[30px]">
          <div className="grid grid-cols-1 min-[900px]:grid-cols-[302px_1fr] gap-6 min-[900px]:gap-10 items-stretch">
            {/* Mobile: 이름을 사진 위로 배치 */}
            <div className="min-[900px]:hidden flex justify-center mb-2 text-center">
              <div className="relative inline-block align-middle">
                <img
                  src="/images/profiles/Group 1073.png"
                  alt="name bracket"
                  className="h-[120px] w-auto select-none"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
                  <span
                    className="leading-tight whitespace-nowrap"
                    style={{ fontFamily: '"rixdongnimgothic-pro", sans-serif', fontSize: '33px', fontWeight: 400 }}
                  >
                    {designer.name}
                  </span>
                  <span
                    className="text-black leading-tight mx-auto"
                    style={{
                      fontFamily: '"rixdongnimgothic-pro", sans-serif',
                      fontSize: '22px',
                      fontWeight: 700,
                      whiteSpace: 'normal',
                      wordBreak: 'break-word',
                      maxWidth: '200px',
                    }}
                  >
                    {englishNameByStudentNumber[designer.student_number ?? ''] || romanizeKorean(designer.name)}
                  </span>
                </div>
              </div>
            </div>
            {/* 왼쪽: 학생 사진 (이름 기반) */}
            <div className="relative overflow-hidden border border-gray-200 w-[302px] h-[370px] mx-auto min-[900px]:mx-0 min-[900px]:mt-[20px] bg-[#f6f6f6]">
              {profileImage && (
                <Image
                  src={profileImage.src}
                  alt={`${designer.name} 사진`}
                  fill
                  priority
                  sizes="(min-width: 900px) 302px, 50vw"
                  className="object-cover"
                  placeholder={profileImage.blurDataURL ? 'blur' : 'empty'}
                  blurDataURL={profileImage.blurDataURL}
                />
              )}
            </div>
            {/* 우측 정보 */}
            <div className="min-[900px]:h-[370px] flex flex-col justify-start">
              {/* 이름: 괄호 PNG 한 장 위에 텍스트 오버레이 (데스크톱 전용) */}
              <div className="mb-4 hidden min-[900px]:block">
                <div className="relative inline-block align-middle">
                  <img
                    src="/images/profiles/Group 1073.png"
                    alt="name bracket"
                    className="h-[120px] min-[900px]:h-[168px] w-auto select-none"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
                    <span
                      className="leading-tight whitespace-nowrap"
                      style={{ fontFamily: '"rixdongnimgothic-pro", sans-serif', fontSize: '33px', fontWeight: 400 }}
                    >
                      {designer.name}
                    </span>
                    <span
                      className="text-black leading-tight mx-auto"
                      style={{
                        fontFamily: '"rixdongnimgothic-pro", sans-serif',
                        fontWeight: 400,
                        fontSize: 'clamp(14px, 2.4vw, 18px)',
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',
                        maxWidth: '220px',
                      }}
                    >
                      {englishNameByStudentNumber[designer.student_number ?? ''] || romanizeKorean(designer.name)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="pretendard-font text-base text-gray-800 grid grid-cols-[86px_1fr] gap-y-2 gap-x-2 items-center max-w-xl mb-6">
                <div className="text-gray-600 flex items-center h-[32px]">Instagram</div>
                <div className="flex items-center h-[32px]">
                  {designer.instagram ? (
                    <a
                      href={`https://instagram.com/${designer.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center h-[32px] px-2 -rotate-1"
                      style={{ background: '#DDFF8E', fontFamily: '"rixdongnimgothic-pro", sans-serif', fontSize: '16px', fontWeight: 700, transformOrigin: 'center' }}
                    >
                      @{designer.instagram}
                    </a>
                  ) : (
                    <span className="pretendard-font text-gray-500">계정 없음</span>
                  )}
                </div>
                <div className="text-gray-600 flex items-center h-[32px]">E-mail</div>
                <div className="flex items-center h-[32px]">
                  {designer.email ? (
                    <a
                      href={`mailto:${designer.email}`}
                      className="inline-flex items-center h-[32px] px-2 -rotate-1"
                      style={{ background: '#B5EEFF', fontFamily: '"rixdongnimgothic-pro", sans-serif', fontSize: '16px', fontWeight: 700, transformOrigin: 'center' }}
                    >
                      {designer.email}
                    </a>
                  ) : (
                    <span className="pretendard-font text-gray-500">없음</span>
                  )}
                </div>
              </div>
              <p className="pretendard-font text-gray-700 leading-relaxed break-keep whitespace-pre-line max-w-[68ch] min-[900px]:max-w-[72ch]" style={{ wordBreak: 'keep-all' }}>
                {formatBio(designer.bio)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 구분선 (모바일에서 숨김) */}
      <div className="container mx-auto px-[30px] mt-4 min-[900px]:mt-4 lg:mt-1 xl:mt-0">
        <div className="h-[12px] bg-black hidden min-[900px]:block" />
      </div>

      {/* interview */}
      <section id="interview" className="container mx-auto px-[30px] py-10">
        <h2 className="text-2xl min-[900px]:text-3xl font-normal mb-8">Interview</h2>
        <div className="grid grid-cols-1 min-[900px]:grid-cols-2 gap-10 min-[900px]:gap-12">
          <div>
            <div className="mb-3">
              <span className="inline-flex items-center px-2 py-0.5 -rotate-1" style={{ background: '#DDFF8E' }}>[ 1 ]</span>
            </div>
            <h3 className="text-lg min-[900px]:text-xl font-normal mb-3">4년동안 디자인 전공을 하며 생긴 새로운 습관이나 태도가 있다면 무엇인가요?</h3>
            <p className="pretendard-font text-gray-700 leading-relaxed break-keep whitespace-pre-line max-w-[68ch] min-[900px]:max-w-[72ch]" style={{ wordBreak: 'keep-all' }}>{formatBio(designer.interview1)}</p>
          </div>
          <div>
            <div className="mb-3">
              <span className="inline-flex items-center px-2 py-0.5 -rotate-1" style={{ background: '#DDFF8E' }}>[ 2 ]</span>
            </div>
            <h3 className="text-lg min-[900px]:text-xl font-normal mb-3">졸업 작품 작업을 하면서 가장 고민했던 점이나 기억에 남는 순간이 있다면 무엇인가요?</h3>
            <p className="pretendard-font text-gray-700 leading-relaxed break-keep whitespace-pre-line max-w-[68ch] min-[900px]:max-w-[72ch]" style={{ wordBreak: 'keep-all' }}>{formatBio(designer.interview2)}</p>
          </div>
        </div>
      </section>

      {/* 구분선 (모바일에서 숨김) */}
      <div className="container mx-auto px-[30px]"><div className="h-[12px] bg-black hidden min-[900px]:block" /></div>

      {/* projects */}
      <section id="projects" className="py-10">
        <div className="container mx-auto px-[30px]">
          <h2 className="text-2xl min-[900px]:text-3xl font-normal mb-8">Project</h2>
          <div className="grid grid-cols-1 min-[900px]:grid-cols-2 gap-8 min-[900px]:gap-10">
            {featuredWorks.map((work) => (
              <Link key={work.id} href={`/archives/years/2025/works/${work.id}`} className="block group">
                <div className="relative w-full aspect-[4/3] overflow-hidden border border-gray-200 bg-[repeating-linear-gradient(45deg,#e6e6e6_0,#e6e6e6_12px,#f5f5f5_12px,#f5f5f5_24px)]">
                  {work.thumbnail ? (
                    <Image
                      src={work.thumbnail}
                      alt={`${work.title} 썸네일`}
                      fill
                      sizes="(max-width: 900px) 100vw, 420px"
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <div className="mt-3">
                  <div className="pretendard-font font-bold text-[20px] text-gray-900">{work.title}</div>
                  <div className="pretendard-font text-[16px] text-gray-700">{work.category}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
