interface DayActivity {
  day: string
  active: boolean
}

const days: DayActivity[] = [
  { day: 'Mon', active: true },
  { day: 'Tue', active: true },
  { day: 'Wed', active: false },
  { day: 'Thu', active: true },
  { day: 'Fri', active: true },
  { day: 'Sat', active: false },
  { day: 'Sun', active: false },
]

interface WeeklyGoalsProps {
  solved: number
  target: number
}

export function WeeklyGoals({ solved, target }: WeeklyGoalsProps) {
  const percentage = (solved / target) * 100

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-[#64748b]">Problems Solved</span>
          <span className="text-sm font-medium text-[#1e293b]">
            {solved}/{target} this week
          </span>
        </div>
        <div className="h-2 bg-[#e2e8f0] rounded-full overflow-hidden">
          <div
            className="h-full bg-[hsl(245,58%,51%)] rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between pt-2">
        {days.map((day) => (
          <div key={day.day} className="flex flex-col items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-base ${
                day.active
                  ? 'bg-[hsl(245,58%,51%)] text-white'
                  : 'bg-[#e2e8f0] text-[#64748b]'
              }`}
            >
              {day.day.charAt(0)}
            </div>
            <span className="text-xs text-[#64748b]">{day.day}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
