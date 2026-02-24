import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Briefcase, Building2, FileText, Sparkles } from 'lucide-react'
import { extractSkills } from '../utils/skillExtractor'
import { generateChecklist, generatePlan, generateQuestions } from '../utils/analysisGenerator'
import { calculateReadinessScore } from '../utils/scoreCalculator'
import { saveAnalysis } from '../utils/historyManager'
import type { AnalysisResult } from '../types/analysis'

export default function JDAnalyzer() {
  const navigate = useNavigate()
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [jdText, setJdText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = async () => {
    if (!jdText.trim()) return

    setIsAnalyzing(true)

    // Simulate analysis delay for UX
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Extract skills
    const extractedSkills = extractSkills(jdText)

    // Calculate readiness score
    const readinessScore = calculateReadinessScore(extractedSkills, company, role, jdText)

    // Generate analysis
    const plan = generatePlan(extractedSkills)
    const checklist = generateChecklist(extractedSkills)
    const questions = generateQuestions(extractedSkills)

    // Initialize skill confidence map (default all to 'practice')
    const skillConfidenceMap: Record<string, 'know' | 'practice'> = {}
    Object.values(extractedSkills).flat().forEach((skill) => {
      skillConfidenceMap[skill] = 'practice'
    })

    // Create result
    const result: AnalysisResult = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      company: company || 'Unknown Company',
      role: role || 'Unknown Role',
      jdText,
      extractedSkills,
      skillConfidenceMap,
      plan,
      checklist,
      questions,
      readinessScore,
    }

    // Save to history
    saveAnalysis(result)

    // Navigate to results
    navigate('/results', { state: { result } })
  }

  const isValid = jdText.trim().length > 50

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#1e293b] mb-2">JD Analyzer</h2>
        <p className="text-[#64748b]">
          Paste a job description to get personalized preparation insights
        </p>
      </div>

      <div className="bg-white rounded-xl border border-[#e2e8f0] p-8 space-y-6">
        {/* Company Input */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-[#1e293b] mb-2">
            <Building2 className="w-4 h-4 text-[hsl(245,58%,51%)]" />
            Company Name
          </label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g., Google, Microsoft, Amazon"
            className="w-full px-4 py-3 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(245,58%,51%)]/20 focus:border-[hsl(245,58%,51%)]"
          />
        </div>

        {/* Role Input */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-[#1e293b] mb-2">
            <Briefcase className="w-4 h-4 text-[hsl(245,58%,51%)]" />
            Job Role
          </label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g., Software Engineer, Full Stack Developer"
            className="w-full px-4 py-3 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(245,58%,51%)]/20 focus:border-[hsl(245,58%,51%)]"
          />
        </div>

        {/* JD Text Input */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-[#1e293b] mb-2">
            <FileText className="w-4 h-4 text-[hsl(245,58%,51%)]" />
            Job Description
          </label>
          <textarea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste the job description here... Include requirements, skills needed, and responsibilities for better analysis."
            rows={12}
            className="w-full px-4 py-3 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(245,58%,51%)]/20 focus:border-[hsl(245,58%,51%)] resize-none"
          />
          <p className="mt-2 text-sm text-[#64748b]">
            {jdText.length} characters • Minimum 50 characters required
          </p>
        </div>

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={!isValid || isAnalyzing}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[hsl(245,58%,51%)] text-white font-semibold rounded-lg hover:bg-[hsl(245,58%,41%)] disabled:opacity-50 disabled:cursor-not-allowed transition-base"
        >
          {isAnalyzing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Analyze Job Description
            </>
          )}
        </button>
      </div>

      {/* Tips */}
      <div className="mt-8 p-6 bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
        <h3 className="font-semibold text-[#1e293b] mb-3">Tips for best results:</h3>
        <ul className="space-y-2 text-sm text-[#64748b]">
          <li>• Include the full job description with requirements section</li>
          <li>• Mention specific technologies (React, Java, SQL, etc.)</li>
          <li>• Add company and role information for better scoring</li>
          <li>• Longer descriptions yield more accurate skill detection</li>
        </ul>
      </div>
    </div>
  )
}
