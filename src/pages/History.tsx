import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, Building2, Briefcase, Trash2, Search, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { getHistoryEntries, deleteAnalysis, clearHistory } from '../utils/historyManager'
import type { HistoryEntry } from '../types/analysis'

function ScoreIndicator({ score }: { score: number }) {
  if (score >= 70) {
    return <TrendingUp className="w-4 h-4 text-green-500" />
  } else if (score >= 50) {
    return <Minus className="w-4 h-4 text-yellow-500" />
  }
  return <TrendingDown className="w-4 h-4 text-red-500" />
}

export default function History() {
  const navigate = useNavigate()
  const [entries, setEntries] = useState<HistoryEntry[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setEntries(getHistoryEntries())
  }, [])

  const handleDelete = (id: string) => {
    deleteAnalysis(id)
    setEntries(getHistoryEntries())
  }

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all history?')) {
      clearHistory()
      setEntries([])
    }
  }

  const filteredEntries = entries.filter(
    (entry) =>
      entry.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#1e293b] mb-2">Analysis History</h2>
          <p className="text-[#64748b]">View your past job description analyses</p>
        </div>
        {entries.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-base"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Search */}
      {entries.length > 0 && (
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by company or role..."
            className="w-full pl-12 pr-4 py-3 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(245,58%,51%)]/20 focus:border-[hsl(245,58%,51%)]"
          />
        </div>
      )}

      {/* History List */}
      {filteredEntries.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-[#e2e8f0]">
          <Clock className="w-16 h-16 text-[#e2e8f0] mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[#1e293b] mb-2">
            {entries.length === 0 ? 'No History Yet' : 'No Results Found'}
          </h3>
          <p className="text-[#64748b] mb-6">
            {entries.length === 0
              ? 'Analyze your first job description to see it here.'
              : 'Try a different search term.'}
          </p>
          {entries.length === 0 && (
            <button
              onClick={() => navigate('/analyze')}
              className="px-6 py-3 bg-[hsl(245,58%,51%)] text-white font-medium rounded-lg hover:bg-[hsl(245,58%,41%)] transition-base"
            >
              Analyze JD
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              onClick={() => navigate(`/results?id=${entry.id}`)}
              className="bg-white rounded-xl border border-[#e2e8f0] p-6 hover:shadow-md hover:border-[hsl(245,58%,51%)]/30 cursor-pointer transition-base"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-lg font-semibold text-[#1e293b] flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[hsl(245,58%,51%)]" />
                      {entry.company}
                    </h3>
                    <span className="text-[#e2e8f0]">|</span>
                    <p className="text-[#64748b] flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      {entry.role}
                    </p>
                  </div>
                  <p className="text-sm text-[#64748b] flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {new Date(entry.createdAt).toLocaleDateString()} at{' '}
                    {new Date(entry.createdAt).toLocaleTimeString()}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  {/* Score */}
                  <div className="flex items-center gap-2">
                    <ScoreIndicator score={entry.readinessScore} />
                    <div className="text-right">
                      <span className="text-2xl font-bold text-[#1e293b]">
                        {entry.readinessScore}
                      </span>
                      <span className="text-sm text-[#64748b]">/100</span>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(entry.id)
                    }}
                    className="p-2 text-[#64748b] hover:text-red-600 hover:bg-red-50 rounded-lg transition-base"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats Summary */}
      {entries.length > 0 && (
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 text-center">
            <p className="text-3xl font-bold text-[hsl(245,58%,51%)]">{entries.length}</p>
            <p className="text-sm text-[#64748b]">Total Analyses</p>
          </div>
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 text-center">
            <p className="text-3xl font-bold text-[hsl(245,58%,51%)]">
              {Math.round(entries.reduce((acc, e) => acc + e.readinessScore, 0) / entries.length)}
            </p>
            <p className="text-sm text-[#64748b]">Average Score</p>
          </div>
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 text-center">
            <p className="text-3xl font-bold text-[hsl(245,58%,51%)]">
              {Math.max(...entries.map((e) => e.readinessScore))}
            </p>
            <p className="text-sm text-[#64748b]">Highest Score</p>
          </div>
        </div>
      )}
    </div>
  )
}
