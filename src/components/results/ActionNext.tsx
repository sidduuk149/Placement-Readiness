import { AlertCircle, Target, ArrowRight } from 'lucide-react'
import type { SkillConfidenceMap } from '../../types/analysis'

interface ActionNextProps {
  skillConfidenceMap: SkillConfidenceMap
  onStartDay: () => void
}

export function ActionNext({ skillConfidenceMap, onStartDay }: ActionNextProps) {
  const weakSkills = Object.entries(skillConfidenceMap)
    .filter(([, confidence]) => confidence === 'practice')
    .map(([skill]) => skill)
    .slice(0, 3)

  if (weakSkills.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <Target className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-green-800">Great job!</h3>
        </div>
        <p className="text-green-700 mb-4">
          You have marked all skills as known. Focus on mock interviews and revision.
        </p>
        <button
          onClick={onStartDay}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-base"
        >
          Start Day 6: Mock Interviews
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
          <AlertCircle className="w-5 h-5 text-amber-600" />
        </div>
        <h3 className="text-lg font-semibold text-amber-800">Action Next</h3>
      </div>
      
      <p className="text-amber-700 mb-3">Top skills to focus on:</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {weakSkills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
      
      <button
        onClick={onStartDay}
        className="flex items-center gap-2 px-4 py-2 bg-[hsl(245,58%,51%)] text-white rounded-lg hover:bg-[hsl(245,58%,41%)] transition-base"
      >
        Start Day 1 Plan Now
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  )
}
