import type { ExtractedSkills, RoundChecklist, DayPlan } from '../types/analysis'

export function generateChecklist(skills: ExtractedSkills): RoundChecklist[] {
  const hasSkill = (category: keyof ExtractedSkills, keyword: string) =>
    skills[category].some((s) => s.toLowerCase().includes(keyword.toLowerCase()))

  const hasWeb = skills.web.length > 0
  const hasData = skills.data.length > 0
  const hasCloud = skills.cloudDevOps.length > 0
  const hasTesting = skills.testing.length > 0
  const hasJava = hasSkill('languages', 'java')
  const hasPython = hasSkill('languages', 'python')
  const hasJavaScript = hasSkill('languages', 'javascript') || hasSkill('languages', 'typescript')
  const hasReact = hasSkill('web', 'react')
  const hasNode = hasSkill('web', 'node')
  const hasSQL = hasSkill('data', 'sql')

  return [
    {
      round: 'Round 1',
      title: 'Aptitude / Basics',
      items: [
        { id: 'r1-1', text: 'Practice quantitative aptitude problems (percentage, ratio, time-speed)', completed: false },
        { id: 'r1-2', text: 'Solve logical reasoning puzzles (patterns, series, coding-decoding)', completed: false },
        { id: 'r1-3', text: 'Review verbal ability (comprehension, grammar, sentence correction)', completed: false },
        { id: 'r1-4', text: 'Complete 2 full-length aptitude mock tests', completed: false },
        { id: 'r1-5', text: 'Brush up on basic mathematics (LCM, HCF, probability, permutations)', completed: false },
      ],
    },
    {
      round: 'Round 2',
      title: 'DSA + Core CS',
      items: [
        { id: 'r2-1', text: 'Revise arrays, strings, and basic searching/sorting', completed: false },
        { id: 'r2-2', text: 'Practice linked lists, stacks, and queues', completed: false },
        { id: 'r2-3', text: 'Master trees, BST, and basic graph traversal (BFS/DFS)', completed: false },
        { id: 'r2-4', text: 'Study dynamic programming patterns (memoization, tabulation)', completed: false },
        { id: 'r2-5', text: 'Review OOP concepts: encapsulation, inheritance, polymorphism, abstraction', completed: false },
        { id: 'r2-6', text: 'Understand DBMS: normalization, joins, indexing, ACID properties', completed: false },
        { id: 'r2-7', text: 'Practice 5 medium-level coding problems daily', completed: false },
        ...(hasSQL ? [{ id: 'r2-8', text: 'Write complex SQL queries with joins, subqueries, and window functions', completed: false }] : []),
      ],
    },
    {
      round: 'Round 3',
      title: 'Tech Interview (Projects + Stack)',
      items: [
        { id: 'r3-1', text: 'Prepare project explanation: problem, solution, your role, tech stack', completed: false },
        { id: 'r3-2', text: 'Document challenges faced and how you solved them', completed: false },
        ...(hasReact
          ? [
              { id: 'r3-react-1', text: 'Explain React lifecycle, hooks, and virtual DOM', completed: false },
              { id: 'r3-react-2', text: 'Compare Redux vs Context API vs Zustand for state management', completed: false },
            ]
          : []),
        ...(hasNode
          ? [
              { id: 'r3-node-1', text: 'Explain Node.js event loop and async programming', completed: false },
              { id: 'r3-node-2', text: 'Discuss Express middleware and REST API design', completed: false },
            ]
          : []),
        ...(hasJava
          ? [
              { id: 'r3-java-1', text: 'Explain JVM, garbage collection, and collections framework', completed: false },
              { id: 'r3-java-2', text: 'Discuss Spring Boot annotations and dependency injection', completed: false },
            ]
          : []),
        ...(hasPython
          ? [
              { id: 'r3-py-1', text: 'Explain Python GIL, decorators, and list vs tuple', completed: false },
              { id: 'r3-py-2', text: 'Discuss Django/Flask request lifecycle and ORM', completed: false },
            ]
          : []),
        ...(hasCloud
          ? [
              { id: 'r3-cloud-1', text: 'Explain microservices architecture and service discovery', completed: false },
              { id: 'r3-cloud-2', text: 'Discuss Docker containers and Kubernetes orchestration', completed: false },
            ]
          : []),
        { id: 'r3-3', text: 'Review system design basics: scalability, caching, load balancing', completed: false },
      ],
    },
    {
      round: 'Round 4',
      title: 'Managerial / HR',
      items: [
        { id: 'r4-1', text: 'Prepare "Tell me about yourself" - keep it under 2 minutes', completed: false },
        { id: 'r4-2', text: 'Document 3 strengths with real examples', completed: false },
        { id: 'r4-3', text: 'Prepare weakness answer showing improvement', completed: false },
        { id: 'r4-4', text: 'Research company: products, culture, recent news', completed: false },
        { id: 'r4-5', text: 'Prepare "Why do you want to join us?" specific answer', completed: false },
        { id: 'r4-6', text: 'Practice salary negotiation - know your expected CTC', completed: false },
        { id: 'r4-7', text: 'Prepare questions to ask the interviewer', completed: false },
        { id: 'r4-8', text: 'Review situational questions: conflict resolution, leadership', completed: false },
      ],
    },
  ]
}

export function generatePlan(skills: ExtractedSkills): DayPlan[] {
  const hasSkill = (category: keyof ExtractedSkills, keyword: string) =>
    skills[category].some((s) => s.toLowerCase().includes(keyword.toLowerCase()))

  const hasReact = hasSkill('web', 'react')
  const hasNode = hasSkill('web', 'node')
  const hasJava = hasSkill('languages', 'java')
  const hasPython = hasSkill('languages', 'python')
  const hasSQL = hasSkill('data', 'sql')
  const hasCloud = skills.cloudDevOps.length > 0

  return [
    {
      day: 1,
      title: 'Basics + Core CS Fundamentals',
      tasks: [
        'Review OOP concepts with code examples',
        'Study OS basics: processes, threads, memory management',
        'Understand DBMS: ACID, normalization, indexing',
        'Practice 3 easy array problems',
      ],
    },
    {
      day: 2,
      title: 'Core CS Deep Dive',
      tasks: [
        'Study computer networks: OSI model, TCP/IP, HTTP/HTTPS',
        'Review DBMS joins and transactions',
        'Practice linked list and stack problems',
        ...(hasSQL ? ['Write 5 complex SQL queries'] : []),
      ],
    },
    {
      day: 3,
      title: 'DSA + Coding Practice',
      tasks: [
        'Master binary search variations',
        'Practice tree traversals (inorder, preorder, postorder)',
        'Solve 2 recursion-based problems',
        'Study sliding window and two-pointer techniques',
      ],
    },
    {
      day: 4,
      title: 'Advanced DSA',
      tasks: [
        'Practice graph BFS and DFS',
        'Study dynamic programming: memoization approach',
        'Solve 2 DP problems (knapsack, LCS, or LIS)',
        'Review heap and priority queue applications',
      ],
    },
    {
      day: 5,
      title: 'Project + Resume Alignment',
      tasks: [
        'Document project architecture and your contributions',
        'Prepare STAR format answers for project questions',
        ...(hasReact ? ['Review React hooks and state management patterns'] : []),
        ...(hasNode ? ['Practice explaining REST API design and middleware'] : []),
        ...(hasJava ? ['Review Spring Boot annotations and DI'] : []),
        ...(hasPython ? ['Practice Django/Flask ORM queries'] : []),
        'Update resume with quantified achievements',
      ],
    },
    {
      day: 6,
      title: 'Mock Interview Questions',
      tasks: [
        'Practice 10 technical questions aloud',
        'Do a mock system design discussion (if applicable)',
        ...(hasCloud ? ['Review microservices and containerization concepts'] : []),
        'Practice coding on whiteboard/paper',
        'Record yourself explaining a project',
      ],
    },
    {
      day: 7,
      title: 'Revision + Weak Areas',
      tasks: [
        'Review mistakes from previous practice',
        'Revisit weak topics identified during prep',
        'Do 1 full mock interview with timer',
        'Prepare HR questions and company research',
        'Rest and stay confident!',
      ],
    },
  ]
}

export function generateQuestions(skills: ExtractedSkills): string[] {
  const hasSkill = (category: keyof ExtractedSkills, keyword: string) =>
    skills[category].some((s) => s.toLowerCase().includes(keyword.toLowerCase()))

  const questions: string[] = []

  // Core CS questions
  if (skills.coreCS.length > 0) {
    questions.push(
      'Explain the difference between process and thread. When would you use multithreading?',
      'What is normalization in databases? Explain 1NF, 2NF, and 3NF with examples.',
      'How does memory management work in modern operating systems?'
    )
  }

  // DSA specific
  if (skills.coreCS.some((s) => s.toLowerCase().includes('dsa'))) {
    questions.push(
      'How would you optimize search in sorted data? Compare binary search vs linear search.',
      'Explain the time and space complexity of quicksort and mergesort. When would you use each?',
      'Design a data structure for an LRU cache. Explain your approach.'
    )
  }

  // Language specific
  if (hasSkill('languages', 'java')) {
    questions.push(
      'Explain Java memory model and garbage collection algorithms.',
      'What is the difference between ArrayList and LinkedList? When to use each?',
      'Explain the working of HashMap in Java. What happens in case of collisions?'
    )
  }

  if (hasSkill('languages', 'python')) {
    questions.push(
      'What is Python GIL and how does it affect multithreading?',
      'Explain Python decorators with a practical example.',
      'Compare list vs tuple vs set in Python. When would you use each?'
    )
  }

  if (hasSkill('languages', 'javascript') || hasSkill('languages', 'typescript')) {
    questions.push(
      'Explain JavaScript event loop and how async/await works under the hood.',
      'What is the difference between == and === in JavaScript?',
      'Explain closures in JavaScript with a practical use case.'
    )
  }

  // Web specific
  if (hasSkill('web', 'react')) {
    questions.push(
      'Explain React Virtual DOM and how it improves performance.',
      'Compare different state management options in React: Context API, Redux, Zustand.',
      'What are React hooks rules and why do they exist?'
    )
  }

  if (hasSkill('web', 'node')) {
    questions.push(
      'Explain Node.js event loop phases in detail.',
      'How does Express middleware chain work?',
      'What are streams in Node.js and when would you use them?'
    )
  }

  // Data specific
  if (hasSkill('data', 'sql')) {
    questions.push(
      'Explain indexing in databases and when it helps vs hurts performance.',
      'Write a query to find the second highest salary in each department.',
      'What is the difference between INNER JOIN and LEFT JOIN?'
    )
  }

  if (hasSkill('data', 'mongodb')) {
    questions.push(
      'Compare SQL vs NoSQL databases. When would you choose MongoDB?',
      'Explain MongoDB aggregation pipeline with an example.',
      'How does MongoDB handle sharding and replication?'
    )
  }

  // Cloud/DevOps specific
  if (skills.cloudDevOps.length > 0) {
    questions.push(
      'Explain microservices architecture and its pros/cons over monolith.',
      'What is the difference between Docker containers and VMs?',
      'Explain CI/CD pipeline and its benefits in software development.'
    )
  }

  // Testing specific
  if (skills.testing.length > 0) {
    questions.push(
      'What is the difference between unit testing and integration testing?',
      'Explain TDD (Test Driven Development) approach.',
      'How would you test a React component? What tools would you use?'
    )
  }

  // General questions if no specific skills detected
  if (questions.length === 0) {
    questions.push(
      'Tell me about yourself and your technical background.',
      'What projects have you worked on? Explain your role and contributions.',
      'Why do you want to join our company?',
      'Where do you see yourself in 5 years?',
      'What are your strengths and weaknesses?',
      'Describe a challenging situation you faced and how you resolved it.',
      'How do you keep yourself updated with the latest technologies?',
      'Explain your approach to learning a new technology quickly.',
      'How do you handle conflicts in a team?',
      'What motivates you to work in software development?'
    )
  }

  // Limit to 10 questions
  return questions.slice(0, 10)
}
