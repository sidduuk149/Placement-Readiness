import { CircularProgress } from '../components/dashboard/CircularProgress'
import { SkillBreakdown } from '../components/dashboard/SkillBreakdown'
import { ContinuePractice } from '../components/dashboard/ContinuePractice'
import { WeeklyGoals } from '../components/dashboard/WeeklyGoals'
import { UpcomingAssessments } from '../components/dashboard/UpcomingAssessments'

// Card component for consistent styling
function Card({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-xl border border-[#e2e8f0] p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-[#1e293b] mb-4">{title}</h3>
      {children}
    </div>
  )
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#1e293b] mb-2">Dashboard</h2>
        <p className="text-[#64748b]">Track your placement preparation progress</p>
      </div>

      {/* 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Overall Readiness - Circular Progress */}
          <Card title="Overall Readiness">
            <div className="flex justify-center py-4">
              <CircularProgress value={72} max={100} size={180} strokeWidth={10} />
            </div>
          </Card>

          {/* Skill Breakdown - Radar Chart */}
          <Card title="Skill Breakdown">
            <SkillBreakdown />
          </Card>

          {/* Continue Practice */}
          <Card title="Continue Practice">
            <ContinuePractice topic="Dynamic Programming" completed={3} total={10} />
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Weekly Goals */}
          <Card title="Weekly Goals">
            <WeeklyGoals solved={12} target={20} />
          </Card>

          {/* Upcoming Assessments */}
          <Card title="Upcoming Assessments">
            <UpcomingAssessments />
          </Card>
        </div>
      </div>
    </div>
  )
}
