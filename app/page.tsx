import Navigation from './archives/years/2025/components/Navigation'
import ArchiveHomePage from './archives/years/2025/page'

export default function RootPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow">
        <ArchiveHomePage />
      </div>
    </div>
  )
}
