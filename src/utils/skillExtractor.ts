import type { ExtractedSkills } from '../types/analysis'

const skillKeywords: Record<keyof ExtractedSkills, string[]> = {
  coreCS: ['DSA', 'OOP', 'DBMS', 'OS', 'Networks', 'Operating System', 'Database', 'Data Structure', 'Algorithm'],
  languages: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'C#', 'Go', 'Golang', 'Rust', 'Kotlin', 'Swift', 'PHP', 'Ruby'],
  web: ['React', 'Next.js', 'Node.js', 'Express', 'REST', 'GraphQL', 'Angular', 'Vue', 'HTML', 'CSS', 'Bootstrap', 'Tailwind', 'Spring Boot', 'Django', 'Flask'],
  data: ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch', 'Cassandra', 'DynamoDB', 'Oracle', 'SQLite'],
  cloudDevOps: ['AWS', 'Azure', 'GCP', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD', 'Jenkins', 'GitHub Actions', 'Linux', 'Terraform', 'Ansible', 'Nginx', 'Apache'],
  testing: ['Selenium', 'Cypress', 'Playwright', 'JUnit', 'PyTest', 'Jest', 'Mocha', 'Chai', 'Cucumber', 'TestNG', 'Postman', 'JMeter'],
}

export function extractSkills(jdText: string): ExtractedSkills {
  const text = jdText.toLowerCase()
  const extracted: ExtractedSkills = {
    coreCS: [],
    languages: [],
    web: [],
    data: [],
    cloudDevOps: [],
    testing: [],
  }

  // Extract skills from each category
  ;(Object.keys(skillKeywords) as Array<keyof ExtractedSkills>).forEach((category) => {
    skillKeywords[category].forEach((keyword) => {
      // Match whole words only
      const regex = new RegExp(`\\b${keyword.toLowerCase().replace(/\./g, '\\.')}\\b`, 'i')
      if (regex.test(text) && !extracted[category].includes(keyword)) {
        extracted[category].push(keyword)
      }
    })
  })

  return extracted
}

export function hasAnySkills(skills: ExtractedSkills): boolean {
  return Object.values(skills).some((arr) => arr.length > 0)
}

export function getDetectedCategories(skills: ExtractedSkills): string[] {
  return Object.entries(skills)
    .filter(([, arr]) => arr.length > 0)
    .map(([key]) => key)
}
