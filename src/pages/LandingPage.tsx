import { Link } from 'react-router-dom'
import { Code, Video, BarChart3 } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-[hsl(245,58%,51%)] mb-6">
          Ace Your Placement
        </h1>
        <p className="text-xl text-[#64748b] mb-10 max-w-2xl">
          Practice, assess, and prepare for your dream job
        </p>
        <Link
          to="/dashboard"
          className="px-8 py-4 bg-[hsl(245,58%,51%)] text-white font-semibold rounded-lg hover:bg-[hsl(245,58%,41%)] transition-base focus-ring"
        >
          Get Started
        </Link>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-20 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Practice Problems */}
            <div className="p-8 bg-white rounded-xl border border-[#e2e8f0] hover:shadow-lg transition-base">
              <div className="w-14 h-14 bg-[hsl(245,58%,51%)]/10 rounded-xl flex items-center justify-center mb-6">
                <Code className="w-7 h-7 text-[hsl(245,58%,51%)]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1e293b] mb-3">
                Practice Problems
              </h3>
              <p className="text-[#64748b]">
                Solve coding challenges across multiple difficulty levels
              </p>
            </div>

            {/* Mock Interviews */}
            <div className="p-8 bg-white rounded-xl border border-[#e2e8f0] hover:shadow-lg transition-base">
              <div className="w-14 h-14 bg-[hsl(245,58%,51%)]/10 rounded-xl flex items-center justify-center mb-6">
                <Video className="w-7 h-7 text-[hsl(245,58%,51%)]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1e293b] mb-3">
                Mock Interviews
              </h3>
              <p className="text-[#64748b]">
                Simulate real interview scenarios with AI feedback
              </p>
            </div>

            {/* Track Progress */}
            <div className="p-8 bg-white rounded-xl border border-[#e2e8f0] hover:shadow-lg transition-base">
              <div className="w-14 h-14 bg-[hsl(245,58%,51%)]/10 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-7 h-7 text-[hsl(245,58%,51%)]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1e293b] mb-3">
                Track Progress
              </h3>
              <p className="text-[#64748b]">
                Monitor your improvement with detailed analytics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-[#e2e8f0]">
        <div className="max-w-6xl mx-auto text-center text-[#64748b]">
          <p>&copy; 2026 Placement Readiness Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
