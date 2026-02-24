import { Calendar, Clock } from 'lucide-react'

interface Assessment {
  id: string
  title: string
  date: string
  time: string
}

const assessments: Assessment[] = [
  { id: '1', title: 'DSA Mock Test', date: 'Tomorrow', time: '10:00 AM' },
  { id: '2', title: 'System Design Review', date: 'Wed', time: '2:00 PM' },
  { id: '3', title: 'HR Interview Prep', date: 'Friday', time: '11:00 AM' },
]

export function UpcomingAssessments() {
  return (
    <div className="space-y-3">
      {assessments.map((assessment) => (
        <div
          key={assessment.id}
          className="p-4 bg-[#f8fafc] rounded-lg border border-[#e2e8f0] hover:border-[hsl(245,58%,51%)]/30 transition-base"
        >
          <h4 className="font-medium text-[#1e293b] mb-2">{assessment.title}</h4>
          <div className="flex items-center gap-4 text-sm text-[#64748b]">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{assessment.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{assessment.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
