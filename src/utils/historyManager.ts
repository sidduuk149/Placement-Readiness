import type { AnalysisResult, HistoryEntry, SkillConfidenceMap } from '../types/analysis'

const HISTORY_KEY = 'placement_readiness_history'

export function saveAnalysis(result: AnalysisResult): void {
  const history = getHistory()
  history.unshift(result)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}

export function updateAnalysis(id: string, updates: Partial<AnalysisResult>): AnalysisResult | null {
  const history = getHistory()
  const index = history.findIndex((item) => item.id === id)
  if (index === -1) return null
  
  history[index] = { ...history[index], ...updates }
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  return history[index]
}

export function updateSkillConfidence(
  id: string, 
  skillConfidenceMap: SkillConfidenceMap,
  adjustedScore: number
): AnalysisResult | null {
  return updateAnalysis(id, { skillConfidenceMap, adjustedScore })
}

export function getHistory(): AnalysisResult[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(HISTORY_KEY)
  return stored ? JSON.parse(stored) : []
}

export function getHistoryEntries(): HistoryEntry[] {
  const history = getHistory()
  return history.map((item) => ({
    id: item.id,
    createdAt: item.createdAt,
    company: item.company,
    role: item.role,
    readinessScore: item.readinessScore,
  }))
}

export function getAnalysisById(id: string): AnalysisResult | null {
  const history = getHistory()
  return history.find((item) => item.id === id) || null
}

export function deleteAnalysis(id: string): void {
  const history = getHistory()
  const filtered = history.filter((item) => item.id !== id)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered))
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY)
}
