interface ContinuePracticeProps {
  topic: string
  completed: number
  total: number
}

export function ContinuePractice({ topic, completed, total }: ContinuePracticeProps) {
  const percentage = (completed / total) * 100

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-[#64748b] mb-1">Last Topic</p>
        <h4 className="text-xl font-semibold text-[#1e293b]">{topic}</h4>
      </div>

      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-[#64748b]">Progress</span>
          <span className="font-medium text-[#1e293b]">
            {completed}/{total} completed
          </span>
        </div>
        <div className="h-2 bg-[#e2e8f0] rounded-full overflow-hidden">
          <div
            className="h-full bg-[hsl(245,58%,51%)] rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <button className="w-full px-4 py-2 bg-[hsl(245,58%,51%)] text-white font-medium rounded-lg hover:bg-[hsl(245,58%,41%)] transition-base">
        Continue
      </button>
    </div>
  )
}
