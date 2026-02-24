import { Check, AlertCircle } from 'lucide-react'
import type { SkillConfidence } from '../../types/analysis'

interface SkillTagProps {
  skill: string
  color: string
  confidence: SkillConfidence
  onToggle: (skill: string, confidence: SkillConfidence) => void
}

export function SkillTag({ skill, color, confidence, onToggle }: SkillTagProps) {
  const isKnow = confidence === 'know'

  return (
    <button
      onClick={() => onToggle(skill, isKnow ? 'practice' : 'know')}
      className={`group flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
        isKnow
          ? `${color} ring-2 ring-offset-1 ring-green-500/50`
          : `${color} opacity-70 hover:opacity-100`
      }`}
      title={isKnow ? 'I know this - Click to mark as need practice' : 'Need practice - Click to mark as known'}
    >
      {isKnow ? (
        <Check className="w-3.5 h-3.5 text-green-600" />
      ) : (
        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
      )}
      <span>{skill}</span>
      <span className="text-xs opacity-60 ml-1">
        {isKnow ? '(Know)' : '(Practice)'}
      </span>
    </button>
  )
}
