import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="footer-root w-full mt-24 md:mt-20 lg:mt-16">
      <div className="footer-desktop relative">
        <Image
          src="/page/1440_footer.png"
          alt="2025 졸업 전시 푸터"
          width={1440}
          height={259}
          priority
          className="h-auto w-full"
        />
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ transform: 'translateY(-10%)' }}
        >
          <Image
            src="/page/1440_footer_c.png"
            alt="2025 졸업 전시 푸터 장식"
            width={1176}
            height={138}
            className="h-auto w-[76%] max-w-[1176px]"
            priority
          />
        </div>
      </div>

      <div className="footer-tablet relative">
        <Image
          src="/page/1280_footer.png"
          alt="2025 졸업 전시 푸터 (중간 화면)"
          width={960}
          height={204}
          priority
          className="h-auto w-full"
        />
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ transform: 'translateY(-10%)' }}
        >
          <Image
            src="/page/1280_footer_c.png"
            alt="2025 졸업 전시 푸터 장식 (중간 화면)"
            width={921}
            height={119}
            className="h-auto w-[88%] max-w-[921px]"
            priority
          />
        </div>
      </div>

      <div className="footer-mobile relative">
        <Image
          src="/page/mobile_footer.png"
          alt="2025 졸업 전시 푸터 (모바일 600 이하)"
          width={780}
          height={754}
          priority
          className="h-auto w-full"
        />
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ transform: 'translateY(-10%)' }}
        >
          <Image
            src="/page/mobile_footer_c.png"
            alt="2025 졸업 전시 푸터 장식 (모바일 600 이하)"
            width={768}
            height={497}
            className="h-auto w-[86%] max-w-[768px]"
            priority
          />
        </div>
      </div>
    </footer>
  )
}
