'use client'

import { useEffect, useState } from 'react'

function waitForWindowLoad(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve()
      return
    }
    if (document.readyState === 'complete') {
      resolve()
      return
    }
    const handleLoad = () => resolve()
    window.addEventListener('load', handleLoad, { once: true })
  })
}

export default function GlobalLoadingGate() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    const fontPromise = document.fonts?.ready ?? Promise.resolve()
    Promise.all([fontPromise, waitForWindowLoad()])
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) {
          setReady(true)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] bg-white transition-opacity duration-300 ${
        ready ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex h-full w-full items-center justify-center">
        <span className="text-sm tracking-[0.4em] text-gray-500 animate-pulse">
          LOADING
        </span>
      </div>
    </div>
  )
}
