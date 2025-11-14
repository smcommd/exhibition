'use client'

import { useEffect, useRef, useState } from 'react'

const PORTRAIT_RATIO_THRESHOLD = 1.35
const MIN_SHORT_SIDE = 520
const MIN_LONG_SIDE = 900
const LG_PATTERN = /(standby|webos|lgtv|lge|sm[ -]?27|up970)/i

const isPortraitKiosk = () => {
  if (typeof window === 'undefined') return false
  const { innerWidth: width, innerHeight: height } = window
  if (!width || !height) return false
  const ratio = height / width
  const shortSide = Math.min(width, height)
  const longSide = Math.max(width, height)
  const ua = (typeof navigator !== 'undefined' ? navigator.userAgent : '') ?? ''
  const isLgStandbyMe = LG_PATTERN.test(ua)
  return ratio > PORTRAIT_RATIO_THRESHOLD && shortSide >= MIN_SHORT_SIDE && (isLgStandbyMe || longSide >= MIN_LONG_SIDE)
}

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [forceDesktopHero, setForceDesktopHero] = useState(false)

  useEffect(() => {
    const handleResize = () => setForceDesktopHero(isPortraitKiosk())
    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  useEffect(() => {
    if (!forceDesktopHero) return
    const video = videoRef.current
    if (!video) return
    const tryPlay = () => {
      const playPromise = video.play()
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {})
      }
    }
    const onLoaded = () => tryPlay()
    video.addEventListener('loadeddata', onLoaded)
    tryPlay()

    const reattemptEvents = ['touchend', 'click'] as const
    reattemptEvents.forEach((event) => window.addEventListener(event, tryPlay, { once: true }))

    return () => {
      video.removeEventListener('loadeddata', onLoaded)
      reattemptEvents.forEach((event) => window.removeEventListener(event, tryPlay))
    }
  }, [forceDesktopHero])

  return (
    <div className={`home-hero-container hero-media-wrapper w-full ${forceDesktopHero ? 'portrait-kiosk-hero' : ''}`}>
      <picture className="block w-full">
        <source media="(min-width: 961px)" srcSet="/page/1440_hero.png" />
        <source media="(min-width: 601px)" srcSet="/page/1280_hero.png" />
        <img
          src="/page/mobile_hero.png"
          alt="2025 Exhibition hero"
          className="home-hero-image h-auto w-full object-cover"
        />
      </picture>
      <div className="home-hero-video-wrapper">
        <video
          ref={videoRef}
          className="home-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero/hero_main.png"
        >
          <source src="/images/hero/hero_main.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}
