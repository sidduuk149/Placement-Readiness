import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import { ArrowLeft, Save, RotateCcw, Copy, Download, CheckCircle2, HelpCircle, Lightbulb, Target, Calendar, Building2, Briefcase, Check } from 'lucide-react'
import { getAnalysisById, updateSkillConfidence } from '../utils/historyManager'
import { copyToClipboard, generatePlanText, generateChecklistText, generateQuestionsText, generateFullReport, downloadAsFile } from '../utils/exportUtils'
import { SkillTag } from '../components/results/SkillTag'
import { ActionNext } from '../components/results/ActionNext'
import type { AnalysisResult, ExtractedSkills, SkillConfidence, SkillConfidenceMap } from '../types/analysis'

// Circular Progress Component
function CircularProgress({ value, max, size = 120 }: { value: number; max: number; size?: number }) {
  const radius = (size - 10) / 2
  const circumference = radius * 2 * Math.PI
  const percentage = (value / max) * 100
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth={8} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(245, 58%, 51%)"
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-[#1e293b]">{value}</span>
        <span className="text-xs text-[#64748b]">/{max}</span>
      </div>
    </div>
  )
}

// Skill Tags Component with Interactivity
function SkillTags({ 
  skills, 
  confidenceMap, 
  onToggle 
}: { 
  skills: ExtractedSkills
  confidenceMap: SkillConfidenceMap
  onToggle: (skill: string, confidence: SkillConfidence) => void
}) {
  const categories = [
    { key: 'coreCS', label: 'Core CS', color: 'bg-blue-100 text-blue-700' },
    { key: 'languages', label: 'Languages', color: 'bg-green-100 text-green-700' },
    { key: 'web', label: 'Web', color: 'bg-purple-100 text-purple-700' },
    { key: 'data', label: 'Data', color: 'bg-orange-100 text-orange-700' },
    { key: 'cloudDevOps', label: 'Cloud/DevOps', color: 'bg-cyan-100 text-cyan-700' },
    { key: 'testing', label: 'Testing', color: 'bg-pink-100 text-pink-700' },
  ] as const

  const hasAnySkills = Object.values(skills).some((arr) => arr.length > 0)

  if (!hasAnySkills) {
    return (
      <div className="p-4 bg-[#f8fafc] rounded-lg">
        <p className="text-[#64748b]">General fresher stack detected. Focus on fundamental CS concepts.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-[#64748b] mb-3">
        Click tags to toggle between "I know this" and "Need practice"
      </p>
      {categories.map((cat) => {
        const skillsList = skills[cat.key as keyof ExtractedSkills]
        if (skillsList.length === 0) return null
        return (
          <div key={cat.key}>
            <h4 className="text-sm font-medium text-[#64748b] mb-2">{cat.label}</h4>
            <div className="flex flex-wrap gap-2">
              {skillsList.map((skill) => (
                <SkillTag
                  key={skill}
                  skill={skill}
                  color={cat.color}
                  confidence={confidenceMap[skill] || 'practice'}
                  onToggle={onToggle}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Export Button Component
function ExportButton({ 
  icon: Icon, 
  label, 
  onClick,
  copied
}: { 
  icon: React.ElementType
  label: string
  onClick: () => void
  copied?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 border border-[#e2e8f0] text-[#64748b] rounded-lg hover:bg-[#f8fafc] hover:text-[#1e293b] transition-base"
    >
      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Icon className="w-4 h-4" />}
      {copied ? 'Copied!' : label}
    </button>
  )
}

export default function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [adjustedScore, setAdjustedScore] = useState<number>(0)
  const [confidenceMap, setConfidenceMap] = useState<SkillConfidenceMap>({})
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({})

  // Calculate adjusted score based on skill confidence
  const calculateAdjustedScore = useCallback((baseScore: number, map: SkillConfidenceMap): number => {
    let adjustment = 0
    Object.values(map).forEach((confidence) => {
      if (confidence === 'know') adjustment += 2
      else adjustment -= 2
    })
    return Math.max(0, Math.min(100, baseScore + adjustment))
  }, [])

  useEffect(() => {
    const historyId = searchParams.get('id')
    
    if (historyId) {
      const saved = getAnalysisById(historyId)
      if (saved) {
        setResult(saved)
        setConfidenceMap(saved.skillConfidenceMap || {})
        setAdjustedScore(saved.adjustedScore ?? saved.readinessScore)
      }
    } else if (location.state?.result) {
      const newResult = location.state.result
      setResult(newResult)
      setConfidenceMap(newResult.skillConfidenceMap || {})
      setAdjustedScore(newResult.adjustedScore ?? newResult.readinessScore)
    }
    setLoading(false)
  }, [location.state, searchParams])

  // Handle skill toggle
  const handleSkillToggle = useCallback((skill: string, confidence: SkillConfidence) => {
    if (!result) return

    const newMap = { ...confidenceMap, [skill]: confidence }
    setConfidenceMap(newMap)

    const newScore = calculateAdjustedScore(result.readinessScore, newMap)
    setAdjustedScore(newScore)

    // Persist to localStorage
    updateSkillConfidence(result.id, newMap, newScore)
  }, [result, confidenceMap, calculateAdjustedScore])

  // Handle copy with feedback
  const handleCopy = async (key: string, text: string) => {
    await copyToClipboard(text)
    setCopiedStates((prev) => ({ ...prev, [key]: true }))
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [key]: false }))
    }, 2000)
  }

  // Handle download
  const handleDownload = () => {
    if (!result) return
    const report = generateFullReport({ ...result, adjustedScore })
    const filename = `${result.company.replace(/\s+/g, '_')}_${result.role.replace(/\s+/g, '_')}_analysis.txt`
    downloadAsFile(report, filename)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[hsl(245,58%,51%)]/30 border-t-[hsl(245,58%,51%)] rounded-full animate-spin" />
      </div>
    )
  }

  if (!result) {
    return (
      <div className="text-center py-16">
        <HelpCircle className="w-16 h-16 text-[#e2e8f0] mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-[#1e293b] mb-2">No Analysis Found</h2>
        <p className="text-[#64748b] mb-6">Analyze a job description first to see results.</p>
        <button
          onClick={() => navigate('/analyze')}
          className="px-6 py-3 bg-[hsl(245,58%,51%)] text-white font-medium rounded-lg hover:bg-[hsl(245,58%,41%)] transition-base"
        >
          Analyze JD
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#64748b] hover:text-[#1e293b] transition-base"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/analyze')}
            className="flex items-center gap-2 px-4 py-2 border border-[#e2e8f0] text-[#64748b] rounded-lg hover:bg-[#f8fafc] transition-base"
          >
            <RotateCcw className="w-4 h-4" />
            New Analysis
          </button>
          <button
            onClick={() => navigate('/history')}
            className="flex items-center gap-2 px-4 py-2 bg-[hsl(245,58%,51%)] text-white rounded-lg hover:bg-[hsl(245,58%,41%)] transition-base"
          >
            <Save className="w-4 h-4" />
            View History
          </button>
        </div>
      </div>

      {/* Title Section */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-[#64748b] mb-2">
              <Building2 className="w-4 h-4" />
              {result.company}
            </div>
            <h2 className="text-2xl font-bold text-[#1e293b] flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-[hsl(245,58%,51%)]" />
              {result.role}
            </h2>
            <p className="text-sm text-[#64748b] mt-2">
              Analyzed on {new Date(result.createdAt).toLocaleDateString()} at{' '}
              {new Date(result.createdAt).toLocaleTimeString()}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <CircularProgress value={adjustedScore} max={100} size={140} />
            <span className="text-sm font-medium text-[#64748b] mt-2">Readiness Score</span>
            {adjustedScore !== result.readinessScore && (
              <span className="text-xs text-[#64748b] mt-1">
                Base: {result.readinessScore} | Adjusted: {adjustedScore}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Export Tools */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-4">
        <h3 className="text-sm font-semibold text-[#1e293b] mb-3">Export Tools</h3>
        <div className="flex flex-wrap gap-3">
          <ExportButton
            icon={Copy}
            label="Copy 7-day plan"
            copied={copiedStates['plan']}
            onClick={() => handleCopy('plan', generatePlanText(result))}
          />
          <ExportButton
            icon={Copy}
            label="Copy checklist"
            copied={copiedStates['checklist']}
            onClick={() => handleCopy('checklist', generateChecklistText(result))}
          />
          <ExportButton
            icon={Copy}
            label="Copy questions"
            copied={copiedStates['questions']}
            onClick={() => handleCopy('questions', generateQuestionsText(result))}
          />
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-[hsl(245,58%,51%)] text-white rounded-lg hover:bg-[hsl(245,58%,41%)] transition-base"
          >
            <Download className="w-4 h-4" />
            Download as TXT
          </button>
        </div>
      </div>

      {/* Skills Extracted - Interactive */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-[#1e293b] mb-4">
          <Target className="w-5 h-5 text-[hsl(245,58%,51%)]" />
          Key Skills Extracted
        </h3>
        <SkillTags 
          skills={result.extractedSkills} 
          confidenceMap={confidenceMap}
          onToggle={handleSkillToggle}
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Preparation Checklist */}
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-[#1e293b] mb-4">
            <CheckCircle2 className="w-5 h-5 text-[hsl(245,58%,51%)]" />
            Round-wise Preparation
          </h3>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {result.checklist.map((round) => (
              <div key={round.round} className="border border-[#e2e8f0] rounded-lg p-4">
                <h4 className="font-medium text-[#1e293b] mb-1">
                  {round.round}: {round.title}
                </h4>
                <ul className="space-y-2 mt-3">
                  {round.items.slice(0, 5).map((item) => (
                    <li key={item.id} className="flex items-start gap-2 text-sm text-[#64748b]">
                      <span className="w-1.5 h-1.5 bg-[hsl(245,58%,51%)] rounded-full mt-1.5 flex-shrink-0" />
                      {item.text}
                    </li>
                  ))}
                  {round.items.length > 5 && (
                    <li className="text-sm text-[hsl(245,58%,51%)]">
                      +{round.items.length - 5} more items
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day Plan */}
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-[#1e293b] mb-4">
            <Calendar className="w-5 h-5 text-[hsl(245,58%,51%)]" />
            7-Day Preparation Plan
          </h3>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {result.plan.map((day) => (
              <div key={day.day} className="border border-[#e2e8f0] rounded-lg p-4">
                <h4 className="font-medium text-[#1e293b] mb-2">
                  Day {day.day}: {day.title}
                </h4>
                <ul className="space-y-1">
                  {day.tasks.slice(0, 3).map((task, idx) => (
                    <li key={idx} className="text-sm text-[#64748b] flex items-start gap-2">
                      <span className="w-1 h-1 bg-[#94a3b8] rounded-full mt-2 flex-shrink-0" />
                      {task}
                    </li>
                  ))}
                  {day.tasks.length > 3 && (
                    <li className="text-sm text-[hsl(245,58%,51%)]">
                      +{day.tasks.length - 3} more tasks
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Likely Interview Questions */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-[#1e293b] mb-4">
          <Lightbulb className="w-5 h-5 text-[hsl(245,58%,51%)]" />
          Likely Interview Questions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.questions.map((question, idx) => (
            <div key={idx} className="p-4 bg-[#f8fafc] rounded-lg border border-[#e2e8f0]">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[hsl(245,58%,51%)] text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">
                  {idx + 1}
                </span>
                <p className="text-[#1e293b]">{question}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Next Box */}
      <ActionNext 
        skillConfidenceMap={confidenceMap}
        onStartDay={() => {
          const day1Element = document.querySelector('[data-day="1"]')
          day1Element?.scrollIntoView({ behavior: 'smooth' })
        }}
      />
    </div>
  )
}
