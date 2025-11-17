import Footer from '../components/Footer'

const ARCHIVE_VIMEO_URL = 'https://vimeo.com/1137579677?share=copy&fl=sv&fe=ci'
const VIMEO_EMBED_PARAMS =
  'autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0&background=1&playsinline=1'

function getVimeoEmbedUrl(url?: string | null) {
  if (!url) return null

  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace(/^www\./, '')
    if (!host.includes('vimeo.com')) return null
    const segments = parsed.pathname.split('/').filter(Boolean)
    if (!segments.length) return null

    let id = segments[segments.length - 1]
    if (host === 'player.vimeo.com' && segments[0] === 'video' && segments[1]) {
      id = segments[1]
    }
    if (!id) return null

    return `https://player.vimeo.com/video/${id}?${VIMEO_EMBED_PARAMS}`
  } catch {
    return null
  }
}

export default function ArchivePage() {
  const vimeoEmbedUrl = getVimeoEmbedUrl(ARCHIVE_VIMEO_URL)

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white flex justify-center px-4 pt-8 pb-12 sm:pt-10 lg:pt-12">
        <div className="w-full max-w-4xl">
          {vimeoEmbedUrl ? (
            <div className="relative w-full overflow-hidden rounded-lg shadow-lg" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={vimeoEmbedUrl}
                title="2025 Archive highlight video"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          ) : (
            <video
              src="/images/archive/archive_video.mp4"
              role="presentation"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/images/archive/Group 1074.png"
              className="w-full h-auto"
            />
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
