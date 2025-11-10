'use client';

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Designer } from '@/app/lib/types'
import { englishNameByStudentNumber, getProfileImageMeta } from '@/app/lib/data/student-data'
import Footer from '../components/Footer'

const CHO = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'] as const
function getInitialConsonant(str: string): string {
  const s = str?.trim()?.[0]
  if (!s) return ''
  const code = s.charCodeAt(0)
  if (code < 0xac00 || code > 0xd7a3) return s
  const idx = Math.floor((code - 0xac00) / 588)
  const ch = CHO[idx]
  if (ch === 'ㄲ') return 'ㄱ'
  if (ch === 'ㄸ') return 'ㄷ'
  if (ch === 'ㅃ') return 'ㅂ'
  if (ch === 'ㅆ') return 'ㅅ'
  if (ch === 'ㅉ') return 'ㅈ'
  return ch
}

const CHO_RR = ['g','kk','n','d','tt','r','m','b','pp','s','ss','','j','jj','ch','k','t','p','h']
const JUNG_RR = ['a','ae','ya','yae','eo','e','yeo','ye','o','wa','wae','oe','yo','u','wo','we','wi','yu','eu','ui','i']
const JONG_RR = ['', 'k', 'k', 'ks', 'n', 'nj', 'nh', 't', 'l', 'lk', 'lm', 'lb', 'ls', 'lt', 'lp', 'lh', 'm', 'p', 'ps', 't', 't', 'ng', 't', 't', 'k', 't', 'p', 't']
function romanizeKorean(str: string): string {
  let out = ''
  for (const ch of str) {
    const code = ch.charCodeAt(0)
    if (code < 0xac00 || code > 0xd7a3) { out += ch; continue }
    const sidx = code - 0xac00
    const cho = Math.floor(sidx / 588)
    const jung = Math.floor((sidx % 588) / 28)
    const jong = sidx % 28
    const head = CHO_RR[cho]
    const mid = JUNG_RR[jung]
    const tail = JONG_RR[jong]
    out += (head === '' ? '' : head) + mid + tail
  }
  return out.charAt(0).toUpperCase() + out.slice(1)
}

interface DesignersClientProps {
  designers: Designer[]
}

export default function DesignersClient({ designers }: DesignersClientProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCho, setActiveCho] = useState<'ALL' | string>('ALL')

  const sortedUsers = useMemo(
    () => [...designers].sort((a, b) => a.name.localeCompare(b.name, 'ko-KR')),
    [designers],
  )

  const filteredUsers = useMemo(() => {
    return sortedUsers.filter(user => {
      const matchSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase())
      const initial = getInitialConsonant(user.name)
      const matchCho = activeCho === 'ALL' ? true : initial === activeCho
      return matchSearch && matchCho
    })
  }, [sortedUsers, searchTerm, activeCho])

  const CHO_FILTERS = ['ALL','ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'] as const

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-10 px-5">
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
            <div className="order-1 md:order-2 flex flex-1 flex-col min-w-[280px] w-full md:flex-none md:w-auto md:max-w-md md:ml-auto md:self-end">
              <div className="flex flex-row items-center gap-3 w-full md:justify-end">
                <div className="flex flex-col flex-1 md:flex-none md:w-[320px]">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="디자이너 이름 검색"
                    className="w-full bg-transparent placeholder-[#C9C9C9] text-[#4B4B4B] text-[18px] font-medium focus:outline-none"
                    style={{ fontFamily: 'Pretendard, sans-serif' }}
                  />
                  <div className="mt-1 h-[4px] bg-[#333333]" />
                </div>
                <div className="flex-shrink-0 self-start sm:self-auto md:ml-4">
                  <button
                    type="button"
                    onClick={() => null}
                    className="px-5 py-2 bg-[#E5E5E5] text-black font-extrabold text-sm rix-font"
                    style={{ transform: 'rotate(-2deg)' }}
                  >
                    검색
                  </button>
                </div>
              </div>
            </div>

            <div className="order-2 md:order-1 flex flex-wrap items-center gap-2 md:gap-2 md:min-w-[340px]">
              {CHO_FILTERS.map(key => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveCho(key as any)}
                  className={[
                    'h-8 min-w-8 px-2 flex items-center justify-center border text-sm transition-colors',
                    key === 'ALL'
                      ? (activeCho === 'ALL'
                          ? 'bg-[#2F2F2F] border-[#2F2F2F] text-[#DDFF8E]'
                          : 'bg-white border-[#E5E5E5] text-[#9F9F9F]')
                      : (activeCho === key
                          ? 'bg-[#2F2F2F] border-[#2F2F2F] text-white'
                          : 'bg-white border-[#E5E5E5] text-[#9F9F9F]')
                  ].join(' ')}
                  style={{ fontFamily: '"rixdongnimgothic-pro", sans-serif', fontWeight: 400 }}
                >
                  {key === 'ALL' ? 'All' : key}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 sm:gap-x-6 sm:gap-y-12">
            {filteredUsers.map((designer, index) => {
              const fallbackMeta = getProfileImageMeta(designer.student_number, designer.name)
              const meta = {
                src: designer.profile_image || fallbackMeta.src,
                blurDataURL: designer.profile_blur_data_url || fallbackMeta.blurDataURL,
                width: designer.profile_width || fallbackMeta.width,
                height: designer.profile_height || fallbackMeta.height,
              }

              return (
                <Link key={designer.id} href={`/archives/years/2025/designers/${designer.id}`} className="block group w-full">
                  <div className="relative overflow-hidden border border-gray-200 w-full aspect-[210/256] bg-[#f6f6f6]">
                    <Image
                      src={meta.src}
                      alt={`${designer.name} 사진`}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 210px"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      placeholder={meta.blurDataURL ? 'blur' : 'empty'}
                      blurDataURL={meta.blurDataURL}
                      priority={index < 8}
                      quality={85}
                    />
                  </div>
                  <div className="mt-3 h-[48px] flex flex-col justify-start">
                    <div className="pretendard-font text-black font-bold text-[20px] leading-tight">{designer.name}</div>
                    <div className="pretendard-font text-[#3D3D3D] font-bold text-[14px] leading-snug">
                      {englishNameByStudentNumber[designer.student_number ?? ''] || romanizeKorean(designer.name)}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">검색 결과가 없습니다</div>
        )}
      </div>
      <Footer />
    </div>
  )
}
