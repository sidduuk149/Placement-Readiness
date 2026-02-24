import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { skill: 'DSA', value: 75 },
  { skill: 'System Design', value: 60 },
  { skill: 'Communication', value: 80 },
  { skill: 'Resume', value: 85 },
  { skill: 'Aptitude', value: 70 },
]

export function SkillBreakdown() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis
            dataKey="skill"
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#94a3b8', fontSize: 10 }}
            tickCount={6}
          />
          <Radar
            name="Skills"
            dataKey="value"
            stroke="hsl(245, 58%, 51%)"
            fill="hsl(245, 58%, 51%)"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
