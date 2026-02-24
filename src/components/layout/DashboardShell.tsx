import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { LayoutDashboard, Code2, ClipboardCheck, BookOpen, User, UserCircle, Sparkles, History } from 'lucide-react'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/practice', label: 'Practice', icon: Code2 },
  { path: '/assessments', label: 'Assessments', icon: ClipboardCheck },
  { path: '/resources', label: 'Resources', icon: BookOpen },
  { path: '/analyze', label: 'JD Analyzer', icon: Sparkles },
  { path: '/history', label: 'History', icon: History },
  { path: '/profile', label: 'Profile', icon: User },
]

export default function DashboardShell() {
  const location = useLocation()
  const isResultsPage = location.pathname === '/results'

  return (
    <div className="min-h-screen flex bg-[#f8fafc]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#e2e8f0] flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-[#e2e8f0]">
          <h2 className="text-xl font-bold text-[hsl(245,58%,51%)]">
            Placement Prep
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-base ${
                      isActive
                        ? 'bg-[hsl(245,58%,51%)] text-white'
                        : 'text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#1e293b]'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-[#e2e8f0] flex items-center justify-between px-8">
          <h1 className="text-lg font-semibold text-[#1e293b]">
            {isResultsPage ? 'Analysis Results' : 'Placement Prep'}
          </h1>
          <div className="w-10 h-10 bg-[hsl(245,58%,51%)]/10 rounded-full flex items-center justify-center">
            <UserCircle className="w-6 h-6 text-[hsl(245,58%,51%)]" />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
