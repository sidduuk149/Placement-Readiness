export default function Resources() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#1e293b] mb-2">Resources</h2>
        <p className="text-[#64748b]">Study materials and reference guides</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: 'Data Structures Guide', type: 'PDF', size: '2.5 MB' },
          { title: 'Algorithm Patterns', type: 'PDF', size: '1.8 MB' },
          { title: 'Interview Questions 2026', type: 'PDF', size: '3.2 MB' },
          { title: 'Company-wise Preparation', type: 'PDF', size: '4.1 MB' },
          { title: 'Resume Templates', type: 'DOCX', size: '850 KB' },
          { title: 'Salary Negotiation Guide', type: 'PDF', size: '1.2 MB' },
        ].map((resource) => (
          <div key={resource.title} className="p-6 bg-white rounded-xl border border-[#e2e8f0] flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[#1e293b]">{resource.title}</h3>
              <p className="text-[#64748b] text-sm">{resource.type} • {resource.size}</p>
            </div>
            <button className="px-4 py-2 border border-[hsl(245,58%,51%)] text-[hsl(245,58%,51%)] font-medium rounded-lg hover:bg-[hsl(245,58%,51%)]/5 transition-base">
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
