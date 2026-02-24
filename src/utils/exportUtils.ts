import type { AnalysisResult } from '../types/analysis'

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text)
}

export function generatePlanText(result: AnalysisResult): string {
  const lines = [
    `7-DAY PREPARATION PLAN`,
    `Company: ${result.company}`,
    `Role: ${result.role}`,
    `Generated: ${new Date(result.createdAt).toLocaleDateString()}`,
    ``,
    `========================================`,
    ``,
  ]

  result.plan.forEach((day) => {
    lines.push(`DAY ${day.day}: ${day.title.toUpperCase()}`)
    lines.push(`-`.repeat(40))
    day.tasks.forEach((task) => {
      lines.push(`  • ${task}`)
    })
    lines.push(``)
  })

  return lines.join('\n')
}

export function generateChecklistText(result: AnalysisResult): string {
  const lines = [
    `ROUND-WISE PREPARATION CHECKLIST`,
    `Company: ${result.company}`,
    `Role: ${result.role}`,
    `Generated: ${new Date(result.createdAt).toLocaleDateString()}`,
    ``,
    `========================================`,
    ``,
  ]

  result.checklist.forEach((round) => {
    lines.push(`${round.round}: ${round.title.toUpperCase()}`)
    lines.push(`-`.repeat(40))
    round.items.forEach((item) => {
      lines.push(`  [ ] ${item.text}`)
    })
    lines.push(``)
  })

  return lines.join('\n')
}

export function generateQuestionsText(result: AnalysisResult): string {
  const lines = [
    `LIKELY INTERVIEW QUESTIONS`,
    `Company: ${result.company}`,
    `Role: ${result.role}`,
    `Generated: ${new Date(result.createdAt).toLocaleDateString()}`,
    ``,
    `========================================`,
    ``,
  ]

  result.questions.forEach((question, idx) => {
    lines.push(`${idx + 1}. ${question}`)
    lines.push(``)
  })

  return lines.join('\n')
}

export function generateFullReport(result: AnalysisResult): string {
  const skills = Object.entries(result.extractedSkills)
    .flatMap(([, skills]) => skills)
    .join(', ')

  const lines = [
    `PLACEMENT READINESS ANALYSIS REPORT`,
    `====================================`,
    ``,
    `COMPANY: ${result.company}`,
    `ROLE: ${result.role}`,
    `DATE: ${new Date(result.createdAt).toLocaleDateString()}`,
    `READINESS SCORE: ${result.adjustedScore ?? result.readinessScore}/100`,
    ``,
    `------------------------------------`,
    `EXTRACTED SKILLS`,
    `------------------------------------`,
    skills || 'General fresher stack',
    ``,
    `------------------------------------`,
    `7-DAY PREPARATION PLAN`,
    `------------------------------------`,
    ``,
  ]

  result.plan.forEach((day) => {
    lines.push(`Day ${day.day}: ${day.title}`)
    day.tasks.forEach((task) => lines.push(`  • ${task}`))
    lines.push(``)
  })

  lines.push(`------------------------------------`)
  lines.push(`ROUND-WISE CHECKLIST`)
  lines.push(`------------------------------------`)
  lines.push(``)

  result.checklist.forEach((round) => {
    lines.push(`${round.round}: ${round.title}`)
    round.items.forEach((item) => lines.push(`  [ ] ${item.text}`))
    lines.push(``)
  })

  lines.push(`------------------------------------`)
  lines.push(`INTERVIEW QUESTIONS`)
  lines.push(`------------------------------------`)
  lines.push(``)

  result.questions.forEach((q, i) => {
    lines.push(`${i + 1}. ${q}`)
    lines.push(``)
  })

  lines.push(`====================================`)
  lines.push(`Good luck with your preparation!`)
  lines.push(`====================================`)

  return lines.join('\n')
}

export function downloadAsFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
