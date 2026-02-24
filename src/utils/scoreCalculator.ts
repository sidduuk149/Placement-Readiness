import type { ExtractedSkills } from '../types/analysis'

export function calculateReadinessScore(
  skills: ExtractedSkills,
  company: string,
  role: string,
  jdText: string
): number {
  let score = 35 // Base score

  // +5 per detected category (max 30)
  const categories = Object.values(skills)
  const detectedCategories = categories.filter((arr) => arr.length > 0).length
  score += Math.min(detectedCategories * 5, 30)

  // +10 if company name provided
  if (company.trim().length > 0) {
    score += 10
  }

  // +10 if role provided
  if (role.trim().length > 0) {
    score += 10
  }

  // +10 if JD length > 800 chars
  if (jdText.trim().length > 800) {
    score += 10
  }

  // Cap at 100
  return Math.min(score, 100)
}
