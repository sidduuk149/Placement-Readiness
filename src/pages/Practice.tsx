export default function Practice() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#1e293b] mb-2">Practice Problems</h2>
        <p className="text-[#64748b]">Sharpen your coding skills with curated problems</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {['Arrays & Strings', 'Linked Lists', 'Trees & Graphs', 'Dynamic Programming', 'Sorting & Searching', 'System Design'].map((category) => (
          <div key={category} className="p-6 bg-white rounded-xl border border-[#e2e8f0] hover:shadow-md transition-base cursor-pointer">
            <h3 className="text-lg font-semibold text-[#1e293b] mb-2">{category}</h3>
            <p className="text-[#64748b] text-sm">Practice problems from this category</p>
          </div>
        ))}
      </div>
    </div>
  )
}
