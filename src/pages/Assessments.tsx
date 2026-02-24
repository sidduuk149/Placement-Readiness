export default function Assessments() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#1e293b] mb-2">Assessments</h2>
        <p className="text-[#64748b]">Take assessments to evaluate your preparation level</p>
      </div>

      <div className="space-y-4">
        {[
          { title: 'Aptitude Test', duration: '30 mins', questions: 30 },
          { title: 'Technical Round 1', duration: '45 mins', questions: 25 },
          { title: 'Coding Challenge', duration: '60 mins', questions: 3 },
          { title: 'System Design', duration: '45 mins', questions: 2 },
        ].map((assessment) => (
          <div key={assessment.title} className="p-6 bg-white rounded-xl border border-[#e2e8f0] flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[#1e293b]">{assessment.title}</h3>
              <p className="text-[#64748b] text-sm">
                {assessment.questions} questions • {assessment.duration}
              </p>
            </div>
            <button className="px-4 py-2 bg-[hsl(245,58%,51%)] text-white font-medium rounded-lg hover:bg-[hsl(245,58%,41%)] transition-base">
              Start
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
