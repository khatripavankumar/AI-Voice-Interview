export const initialCandidate = {
  name: "Alex Morgan",
  email: "alex.morgan@devtalent.io",
  phone: "+1 (555) 234-8901",
  role: "Senior Full-Stack & Cloud Engineer",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  experienceYears: 5,
  location: "San Francisco, CA (Remote)",
  appliedDate: "September 10, 2026",
};

export const sampleResumeData = {
  fileName: "Alex_Morgan_Senior_FullStack_Resume.pdf",
  fileSize: "2.4 MB",
  fileType: "PDF Document",
  uploadDate: "Just now",
  extractedInfo: {
    fullName: "Alex Morgan",
    email: "alex.morgan@devtalent.io",
    phone: "+1 (555) 234-8901",
    summary: "High-impact Senior Full-Stack Engineer with 5+ years building scalable cloud architectures, reactive web applications, and resilient microservices. Proven track record improving API throughput by 42% and architecting real-time streaming dashboards.",
    education: [
      {
        degree: "B.S. in Computer Science (Magna Cum Laude)",
        institution: "University of California, Berkeley",
        year: "2015 - 2019",
        gpa: "3.89 / 4.0",
      }
    ],
    experience: [
      {
        role: "Senior Software Engineer",
        company: "HyperScale Cloud Systems",
        period: "2022 - Present",
        description: "Led migration from monolith to distributed microservices. Cut P99 latency by 42% across 12 services. Designed distributed caching using Redis clusters handling 50k RPS.",
      },
      {
        role: "Full-Stack Developer",
        company: "NexaTech Platforms",
        period: "2019 - 2022",
        description: "Built real-time telemetry dashboard in React and Python/FastAPI for 250k daily active users. Architected PostgreSQL partitioning strategies to scale database write loads.",
      }
    ],
    skills: {
      languages: ["Python", "JavaScript / TypeScript", "SQL", "Go", "C++"],
      frameworks: ["React 18", "Node.js", "FastAPI", "Django", "Tailwind CSS", "Next.js"],
      databases: ["PostgreSQL", "Redis", "MongoDB", "Elasticsearch"],
      cloud: ["AWS (ECS, Lambda, S3)", "Docker", "Kubernetes", "CI/CD", "Kafka"],
      ai_ml: ["OpenAI API", "LangChain", "Vector Embeddings", "RAG Pipelines"],
    },
    projects: [
      {
        name: "CloudPulse APM",
        tech: "React, Go, Kafka, ClickHouse",
        description: "Real-time telemetry and tracing suite processing 10M+ events/minute with interactive flame graphs.",
      },
      {
        name: "Semantic Vector Search",
        tech: "Python, FastAPI, FAISS, PostgreSQL",
        description: "Enterprise semantic document retrieval engine with sub-50ms hybrid vector/keyword search.",
      }
    ],
    interviewFocusTopics: [
      "Microservices Resiliency & Distributed Caching",
      "React 18 Concurrency & Render Optimization",
      "PostgreSQL Query Optimization & Execution Plans",
      "Python AsyncIO & Event Loop Under High Concurrency",
      "System Design: Designing High-Availability Web Services"
    ]
  }
};

export const analysisSteps = [
  { id: 1, label: "Resume uploaded", description: "Binary verified and parsed successfully" },
  { id: 2, label: "Reading resume", description: "Extracting raw structured text & metadata" },
  { id: 3, label: "Extracting candidate information", description: "Mapping work history, credentials & education" },
  { id: 4, label: "Identifying technical skills", description: "Cataloging 18+ languages, frameworks & cloud tools" },
  { id: 5, label: "Analyzing projects and experience", description: "Assessing impact metrics, complexity & domain depth" },
  { id: 6, label: "Identifying interview topics", description: "Formulating technical pillars matching job spec" },
  { id: 7, label: "Preparing personalized questions", description: "Synthesizing behavioral, psychometric & coding prompts" },
  { id: 8, label: "Interview ready", description: "AI interviewer initialized and ready to start" },
];

export const interviewQuestions = [
  // BEHAVIORAL (5 questions)
  {
    id: "beh-1",
    category: "BEHAVIORAL",
    categoryLabel: "Behavioral Evaluation",
    questionNumber: 1,
    categoryTotal: 5,
    competencies: ["Problem Solving", "Initiative", "Technical Execution"],
    question: "Tell me about a challenging project you worked on and how you solved the problem.",
    context: "Assess the candidate's ability to navigate ambiguity, engineer robust solutions, and deliver measurable business outcomes.",
    suggestedResponse: "At HyperScale, we faced a major bottleneck where our reporting monolith would time out when generating tenant analytics during peak hours. I spearheaded the effort to decouple the reporting pipeline into an event-driven worker architecture using Kafka and Redis. By partitioning workloads asynchronously and caching intermediate aggregates, we eliminated timeouts completely and reduced P99 latency by 42%.",
    expectedKeywords: ["bottleneck", "architecture", "decouple", "metrics", "ownership"]
  },
  {
    id: "beh-2",
    category: "BEHAVIORAL",
    categoryLabel: "Behavioral Evaluation",
    questionNumber: 2,
    categoryTotal: 5,
    competencies: ["Conflict Resolution", "Communication", "Collaboration"],
    question: "Describe a time when you had a disagreement with a team member or stakeholder regarding a technical decision. How was it resolved?",
    context: "Examines interpersonal maturity, openness to feedback, and pragmatic decision making.",
    suggestedResponse: "During our microservices rollout, a senior peer pushed to implement an early GraphQL gateway, whereas I advocated for starting with standard REST + OpenAPI specs to reduce complexity for external partners. Instead of an ideological debate, I built a benchmark matrix comparing developer onboarding velocity and caching overhead. We agreed to start with REST for the v1 milestone and iterate towards federated GraphQL for internal dashboards.",
    expectedKeywords: ["data-driven", "consensus", "benchmark", "respect", "trade-offs"]
  },
  {
    id: "beh-3",
    category: "BEHAVIORAL",
    categoryLabel: "Behavioral Evaluation",
    questionNumber: 3,
    categoryTotal: 5,
    competencies: ["Adaptability", "Agility", "Crisis Management"],
    question: "Can you share an experience where you had to adapt quickly to unexpected changes in project requirements or priorities?",
    context: "Measures resilience and poise when roadmap goals pivot abruptly.",
    suggestedResponse: "Two weeks before our Q3 feature freeze, our enterprise partner notified us that their data compliance policy required on-premise encryption key storage (BYOK). I quickly audited our cryptographic layer, broke the task into three modular milestones, and paired with DevOps to implement AWS KMS external key store connectors without delaying the core launch.",
    expectedKeywords: ["prioritization", "modular", "pivoting", "delivery", "compliance"]
  },
  {
    id: "beh-4",
    category: "BEHAVIORAL",
    categoryLabel: "Behavioral Evaluation",
    questionNumber: 4,
    categoryTotal: 5,
    competencies: ["Leadership", "Mentorship", "Culture"],
    question: "Tell me about a time you took the initiative to improve a process, tool, or codebase without being prompted.",
    context: "Identifies proactive engineering leadership and craft mindset.",
    suggestedResponse: "I noticed our PR build verification was taking 28 minutes due to redundant end-to-end integration tests running sequentially. I spent a hackathon refactoring our test harness with parallel Jest runners and Docker layer caching, cutting CI build times down to 6.5 minutes and saving the engineering team roughly 45 developer-hours per week.",
    expectedKeywords: ["initiative", "CI/CD", "efficiency", "developer velocity"]
  },
  {
    id: "beh-5",
    category: "BEHAVIORAL",
    categoryLabel: "Behavioral Evaluation",
    questionNumber: 5,
    categoryTotal: 5,
    competencies: ["Time Management", "Prioritization", "Accountability"],
    question: "How do you manage deadlines and prioritize critical tasks when balancing multiple high-stakes deliverables?",
    context: "Evaluates work organization, communication hygiene, and boundary setting.",
    suggestedResponse: "I use the Eisenhower matrix paired with daily asynchronous standups. I identify the highest impact blockers early, communicate trade-offs transparently with product managers if scope requires trimming, and block 2-hour uninterrupted deep-work focus windows on my calendar for complex algorithmic work.",
    expectedKeywords: ["transparency", "deep work", "scope management", "deliverables"]
  },

  // PSYCHOMETRIC (5 questions)
  {
    id: "psy-1",
    category: "PSYCHOMETRIC",
    categoryLabel: "Psychometric Evaluation",
    questionNumber: 1,
    categoryTotal: 5,
    competencies: ["Pressure Handling", "Composure", "Situational Judgment"],
    question: "When tasked with a critical system outage under high pressure, what is your step-by-step approach to staying composed and communicating effectively?",
    context: "Measures emotional regulation, incident response discipline, and calm under fire.",
    suggestedResponse: "First, I establish an incident command channel and assume or support the incident commander role to eliminate chatter. Second, I prioritize mitigation over root cause: rolling back or enabling circuit breakers to restore customer service immediately. Third, I provide concise, factual status updates every 15 minutes to non-technical stakeholders, leaving deep post-mortem analysis for after resolution.",
    expectedKeywords: ["mitigation first", "incident commander", "calm", "transparency", "post-mortem"]
  },
  {
    id: "psy-2",
    category: "PSYCHOMETRIC",
    categoryLabel: "Psychometric Evaluation",
    questionNumber: 2,
    categoryTotal: 5,
    competencies: ["Autonomy", "Collaboration Style", "Self-Direction"],
    question: "Do you prefer working autonomously on ambiguous problems, or within a structured team with clearly defined specifications? Why?",
    context: "Gauges intrinsic work style preferences and tolerance for ambiguity.",
    suggestedResponse: "I thrive in an environment that pairs high autonomy with clear North Star outcomes. I enjoy decomposing ambiguous strategic objectives into concrete architecture spikes, but I value strong peer collaboration and RFC reviews to stress-test assumptions before writing production code.",
    expectedKeywords: ["autonomy", "RFC", "ownership", "validation", "collaboration"]
  },
  {
    id: "psy-3",
    category: "PSYCHOMETRIC",
    categoryLabel: "Psychometric Evaluation",
    questionNumber: 3,
    categoryTotal: 5,
    competencies: ["Receptivity", "Growth Mindset", "Humility"],
    question: "How do you handle receiving critical feedback on your architecture design or code during a peer review?",
    context: "Evaluates ego management, psychological safety, and growth mindset.",
    suggestedResponse: "I treat code reviews as an opportunity for collective knowledge sharing, not a personal critique. If a reviewer points out a blind spot in my design or concurrency model, I actively seek to understand their reasoning. If their suggestion is superior, I gladly adopt it; if I see counter-tradeoffs, I hop on a 5-minute sync to align on goals.",
    expectedKeywords: ["egoless", "growth mindset", "learning", "alignment"]
  },
  {
    id: "psy-4",
    category: "PSYCHOMETRIC",
    categoryLabel: "Psychometric Evaluation",
    questionNumber: 4,
    categoryTotal: 5,
    competencies: ["Ethics & Integrity", "Engineering Excellence", "Pragmatism"],
    question: "Suppose a product manager asks for a quick shortcut that compromises code maintainability or security to hit a hard launch date. How do you respond?",
    context: "Explores balance between business urgency and technical stewardship.",
    suggestedResponse: "Security is non-negotiable, so I never compromise on vulnerability or data privacy. For maintainability shortcuts, I explain the trade-offs in business terms: explaining that cutting corners today introduces compound technical debt that will slow down future sprints. I usually propose a middle ground: deliver a feature with trimmed non-essential scope cleanly, or file an immediate tech-debt ticket in the following sprint.",
    expectedKeywords: ["security first", "technical debt", "compromise", "business impact"]
  },
  {
    id: "psy-5",
    category: "PSYCHOMETRIC",
    categoryLabel: "Psychometric Evaluation",
    questionNumber: 5,
    categoryTotal: 5,
    competencies: ["Intrinsic Motivation", "Consistency", "Diligence"],
    question: "What motivates you most in your day-to-day engineering work, and how do you sustain focus during repetitive or tedious tasks?",
    context: "Assesses long-term engagement, stamina, and craftsmanship.",
    suggestedResponse: "I am energized by seeing software I built create tangible value for real end-users. When tackling tedious tasks like writing regression suites or updating dependency lockfiles, I gamify the process by looking for opportunities to automate it with scripts or CI hooks so that neither I nor my teammates have to do it manually again.",
    expectedKeywords: ["automation", "craftsmanship", "user value", "discipline"]
  },

  // TECHNICAL (8 questions customized to Resume: Python, React, PostgreSQL, Cloud, APIs)
  {
    id: "tech-1",
    category: "TECHNICAL",
    categoryLabel: "Technical Assessment",
    questionNumber: 1,
    categoryTotal: 8,
    competencies: ["React 18", "Frontend Performance", "Virtual DOM"],
    question: "In your experience with React and modern state management, how do you prevent unnecessary re-renders in deep component trees?",
    context: "Resume Skill: React 18, Next.js, Redux Toolkit",
    suggestedResponse: "I start by structuring component state close to where it is consumed rather than lifting everything to the root. I use React.memo with custom comparison functions only when profiler metrics show tangible bottlenecks. For expensive derived values, I use useMemo, and useCallback for stable callback references. Additionally, splitting context into separate State and Dispatch contexts prevents consumer re-renders when only actions are needed.",
    expectedKeywords: ["profiler", "React.memo", "useCallback", "context splitting", "state localization"]
  },
  {
    id: "tech-2",
    category: "TECHNICAL",
    categoryLabel: "Technical Assessment",
    questionNumber: 2,
    categoryTotal: 8,
    competencies: ["Python Concurrency", "GIL", "AsyncIO"],
    question: "Can you explain how the Python Global Interpreter Lock (GIL) impacts multithreading, and how you approach CPU-bound vs I/O-bound concurrency in Python?",
    context: "Resume Skill: Python, FastAPI, Django",
    suggestedResponse: "The GIL ensures only one native thread executes Python bytecode at a time. For I/O-bound operations like database queries and HTTP calls, threads or AsyncIO (async/await) work great because the GIL is released during system wait states. For CPU-bound tasks like image processing or cryptographic math, I bypass the GIL using multiprocessing or offloading heavy computations to C-extensions like NumPy or background Celery workers.",
    expectedKeywords: ["GIL", "bytecode", "I/O bound", "AsyncIO", "multiprocessing"]
  },
  {
    id: "tech-3",
    category: "TECHNICAL",
    categoryLabel: "Technical Assessment",
    questionNumber: 3,
    categoryTotal: 8,
    competencies: ["PostgreSQL", "Database Optimization", "Query Plans"],
    question: "In PostgreSQL, how do you analyze slow-running queries, and when would you choose an Index Scan vs a Sequential Scan or Bitmap Index Scan?",
    context: "Resume Skill: PostgreSQL, Partitioning, Query Optimization",
    suggestedResponse: "I inspect query execution plans using EXPLAIN (ANALYZE, BUFFERS). A sequential scan is preferred by the Postgres query planner when reading a large fraction of table pages. A B-Tree Index Scan is ideal for high-selectivity lookups where only a few rows match. When multiple conditions match or a moderate fraction of rows are needed, Postgres uses a Bitmap Index Scan, which creates an in-memory bitmap of matched pages and visits them in physical disk order to minimize random I/O.",
    expectedKeywords: ["EXPLAIN ANALYZE", "selectivity", "Bitmap Index Scan", "B-Tree", "random I/O"]
  },
  {
    id: "tech-4",
    category: "TECHNICAL",
    categoryLabel: "Technical Assessment",
    questionNumber: 4,
    categoryTotal: 8,
    competencies: ["Microservices", "System Design", "Distributed Systems"],
    question: "In your HyperScale project, how did you architect the microservices migration to ensure zero downtime and maintain data consistency across distributed boundaries?",
    context: "Resume Experience: HyperScale Cloud Systems monolith migration",
    suggestedResponse: "We adopted the Strangler Fig pattern. We introduced an API gateway in front of the monolith that dynamically routed traffic by route paths. For data consistency, we shifted away from distributed 2-phase commits and implemented the Saga pattern with compensating transactions. We used transactional outbox patterns with Kafka to ensure reliable asynchronous event propagation.",
    expectedKeywords: ["Strangler Fig", "Saga pattern", "transactional outbox", "Kafka", "eventual consistency"]
  },
  {
    id: "tech-5",
    category: "TECHNICAL",
    categoryLabel: "Technical Assessment",
    questionNumber: 5,
    categoryTotal: 8,
    competencies: ["API Architecture", "Rate Limiting", "Redis"],
    question: "How do you handle rate-limiting and DDoS resilience in RESTful APIs using Redis and token bucket or sliding window algorithms?",
    context: "Resume Skill: Redis, REST APIs, FastAPI",
    suggestedResponse: "I typically implement a sliding window log or token bucket using Redis sorted sets (ZADD, ZREMRANGEBYSCORE) or atomic Lua scripts. The Lua script guarantees atomicity by inspecting the current token balance and deducting within a single round-trip. We pair this with HTTP 429 Too Many Requests responses containing Retry-After headers, and offload coarse DDoS filtering to Cloudflare at the edge.",
    expectedKeywords: ["sliding window", "Lua script", "token bucket", "HTTP 429", "atomic"]
  },
  {
    id: "tech-6",
    category: "TECHNICAL",
    categoryLabel: "Technical Assessment",
    questionNumber: 6,
    categoryTotal: 8,
    competencies: ["Database Transactions", "Concurrency Control", "Locking"],
    question: "Explain the differences between optimistic and pessimistic locking in database transactions, and a real-world scenario where you applied one.",
    context: "Resume Project: CloudPulse APM & NexaTech Systems",
    suggestedResponse: "Pessimistic locking (SELECT FOR UPDATE) prevents concurrent writes by acquiring an exclusive row or table lock, best for high-contention financial transfers. Optimistic locking does not hold locks during user think time; instead, it uses a version number or timestamp column in the WHERE clause: UPDATE ... WHERE id = x AND version = y. If rows updated is 0, a concurrent modification occurred and the transaction retries.",
    expectedKeywords: ["SELECT FOR UPDATE", "version column", "contention", "retry", "optimistic"]
  },
  {
    id: "tech-7",
    category: "TECHNICAL",
    categoryLabel: "Technical Assessment",
    questionNumber: 7,
    categoryTotal: 8,
    competencies: ["AI / ML Integration", "RAG Pipelines", "Vector Embeddings"],
    question: "When integrating LLMs and vector embeddings into a production web app, how do you handle latency, token cost optimization, and caching?",
    context: "Resume Project: Semantic Vector Search & LangChain",
    suggestedResponse: "We use semantic caching with Redis and vector similarity thresholds: if an incoming query cosine similarity is >= 0.96 with a previously cached embedding, we return the cached response instantly without invoking the LLM. For latency, we stream tokens via Server-Sent Events (SSE) so the user perceives immediate responsiveness. We also use small embedding models (e.g. text-embedding-3-small) to keep ingestion fast and cheap.",
    expectedKeywords: ["semantic caching", "cosine similarity", "SSE streaming", "vector embeddings"]
  },
  {
    id: "tech-8",
    category: "TECHNICAL",
    categoryLabel: "Technical Assessment",
    questionNumber: 8,
    categoryTotal: 8,
    competencies: ["DevOps", "CI/CD", "Kubernetes / Docker"],
    question: "How do you design a robust CI/CD pipeline with automated testing and blue-green or canary deployments in Docker and Kubernetes?",
    context: "Resume Skill: AWS, Docker, Kubernetes, CI/CD",
    suggestedResponse: "Our pipeline triggers on Git tags: it runs linters and unit tests in parallel, builds multi-stage distroless Docker images, scans CVEs with Trivy, and pushes to Amazon ECR. In Kubernetes, we deploy via ArgoCD using progressive canary rollouts: 10% traffic is shifted to the new replica set while Prometheus tracks error rate and latency SLIs. If metrics remain green for 10 minutes, traffic ramps to 100%; otherwise, it automatically rolls back.",
    expectedKeywords: ["canary rollout", "ArgoCD", "distroless", "Prometheus SLIs", "automated rollback"]
  }
];

export const codingProblems = [
  {
    id: "problem-1",
    title: "Two Sum",
    difficulty: "Easy",
    timeLimit: "15 mins",
    description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.

You may assume that each input would have **exactly one solution**, and you may not use the *same* element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "nums[1] + nums[2] == 6, we return [1, 2]."
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
        explanation: "nums[0] + nums[1] == 6, we return [0, 1]."
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    starterCode: {
      python: `def twoSum(nums: list[int], target: int) -> list[int]:
    # Write your solution here
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Write your solution here
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int comp = target - nums[i];
            if (seen.count(comp)) {
                return {seen[comp], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
      c: `/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    // Write your solution here
    int* result = (int*)malloc(2 * sizeof(int));
    *returnSize = 2;
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                result[0] = i;
                result[1] = j;
                return result;
            }
        }
    }
    return result;
}`
    },
    testCases: [
      { id: 1, input: "nums = [2, 7, 11, 15], target = 9", expected: "[0, 1]", runtime: "38 ms", memory: "15.4 MB" },
      { id: 2, input: "nums = [3, 2, 4], target = 6", expected: "[1, 2]", runtime: "42 ms", memory: "15.3 MB" },
      { id: 3, input: "nums = [3, 3], target = 6", expected: "[0, 1]", runtime: "36 ms", memory: "15.1 MB" },
      { id: 4, input: "nums = [-1, -2, -3, -4, -5], target = -8", expected: "[2, 4]", runtime: "44 ms", memory: "15.5 MB" },
    ]
  },
  {
    id: "problem-2",
    title: "Valid Anagram",
    difficulty: "Easy",
    timeLimit: "15 mins",
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      {
        input: 's = "anagram", t = "nagaram"',
        output: "true",
        explanation: 'Both strings have identical character frequencies.'
      },
      {
        input: 's = "rat", t = "car"',
        output: "false",
        explanation: 'Characters do not match.'
      }
    ],
    constraints: [
      "1 <= s.length, t.length <= 5 * 10^4",
      "s and t consist of lowercase English letters."
    ],
    starterCode: {
      python: `def isAnagram(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
    counts = {}
    for c in s:
        counts[c] = counts.get(c, 0) + 1
    for c in t:
        if c not in counts or counts[c] == 0:
            return False
        counts[c] -= 1
    return True`,
      javascript: `function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const freq = {};
    for (let char of s) freq[char] = (freq[char] || 0) + 1;
    for (let char of t) {
        if (!freq[char]) return false;
        freq[char]--;
    }
    return true;
}`,
      java: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] counts = new int[26];
        for (char c : s.toCharArray()) counts[c - 'a']++;
        for (char c : t.toCharArray()) {
            if (--counts[c - 'a'] < 0) return false;
        }
        return true;
    }
}`,
      cpp: `class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.length() != t.length()) return false;
        vector<int> counts(26, 0);
        for (char c : s) counts[c - 'a']++;
        for (char c : t) {
            if (--counts[c - 'a'] < 0) return false;
        }
        return true;
    }
};`,
      c: `bool isAnagram(char* s, char* t) {
    int lenS = strlen(s);
    if (lenS != strlen(t)) return false;
    int counts[26] = {0};
    for (int i = 0; i < lenS; i++) counts[s[i] - 'a']++;
    for (int i = 0; i < lenS; i++) {
        if (--counts[t[i] - 'a'] < 0) return false;
    }
    return true;
}`
    },
    testCases: [
      { id: 1, input: 's = "anagram", t = "nagaram"', expected: "true", runtime: "31 ms", memory: "14.8 MB" },
      { id: 2, input: 's = "rat", t = "car"', expected: "false", runtime: "28 ms", memory: "14.6 MB" },
      { id: 3, input: 's = "listen", t = "silent"', expected: "true", runtime: "29 ms", memory: "14.7 MB" },
    ]
  }
];

export const assessmentReportData = {
  candidate: {
    name: "Alex Morgan",
    email: "alex.morgan@devtalent.io",
    role: "Senior Full-Stack & Cloud Engineer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    assessmentDate: "September 10, 2026",
    duration: "48 mins",
    completedStages: "All 6 Stages Completed",
  },
  scores: {
    overall: 92,
    technical: 94,
    coding: 95,
    communication: 90,
    behavioral: 88,
    psychometric: 91,
  },
  recommendation: {
    status: "Strongly Recommended",
    badgeColor: "emerald",
    percentile: "Top 4% of Candidates",
    summary: "Alex Morgan demonstrates world-class software engineering fundamentals, deep architectural maturity in distributed systems and React, and exceptional communication clarity. Both the voice interview and live coding benchmarks place Alex in the 96th percentile of full-stack candidates assessed this quarter.",
  },
  technicalSkillsBreakdown: [
    { skill: "Python & Concurrency", score: 96, level: "Expert", notes: "Deep mastery of GIL, AsyncIO, and high-throughput web APIs." },
    { skill: "React 18 & Frontend Architecture", score: 94, level: "Expert", notes: "Flawless grasp of concurrency, rendering cycles, and memoization patterns." },
    { skill: "PostgreSQL & Database Internals", score: 90, level: "Advanced", notes: "Strong understanding of Bitmap scans, index selectivity, and ACID tuning." },
    { skill: "Distributed Systems & Microservices", score: 93, level: "Expert", notes: "Clear articulation of Strangler Fig, Saga patterns, and Kafka event streaming." },
    { skill: "Cloud Architecture (AWS/Docker/K8s)", score: 91, level: "Advanced", notes: "Experienced with Canary deployments, SLI monitoring, and Docker multi-stage builds." },
    { skill: "AI / LLM Integration & RAG", score: 88, level: "Proficient", notes: "Practical experience with semantic vector caching and embedding cost optimization." },
  ],
  communicationMetrics: [
    { metric: "Clarity of Thought", score: 92, description: "Articulates complex technical tradeoffs with precision and structure." },
    { metric: "Confidence & Poise", score: 89, description: "Maintains steady tone and confidence during high-stakes scenarios." },
    { metric: "Fluency & Pacing", score: 94, description: "Natural, engaging cadence without hesitation or filler words." },
    { metric: "Response Relevance", score: 91, description: "Directly addresses core questions while providing concrete real-world context." },
  ],
  behavioralMetrics: [
    { metric: "Problem Solving", score: 95, description: "Exhibits structured, first-principles approach to debugging and architecture." },
    { metric: "Teamwork & Collaboration", score: 92, description: "Collaborative, consensus-builder with strong egoless code review practices." },
    { metric: "Adaptability & Agility", score: 88, description: "Pivots effectively when project constraints or business priorities shift." },
    { metric: "Leadership & Initiative", score: 86, description: "Proactively optimizes internal tooling and elevates peer developer velocity." },
  ],
  codingMetrics: [
    { metric: "Algorithmic Correctness", score: 98, description: "Passed 100% of test cases including edge cases on first run." },
    { metric: "Time & Space Complexity", score: 96, description: "Optimal O(n) time and O(n) space achieved using hash map lookup." },
    { metric: "Code Readability & Cleanliness", score: 92, description: "Idiomatic syntax, descriptive variables, and clean modular functions." },
    { metric: "Execution Speed", score: 94, description: "Runtime placed in the fastest 8% of all platform submissions." },
  ],
  strengths: [
    "Superior mastery of modern distributed systems, event-driven design, and API resiliency.",
    "Comprehensive full-stack versatility spanning React concurrency, Python internals, and PostgreSQL performance.",
    "Data-driven conflict resolution style that values consensus, benchmark testing, and team psychological safety.",
    "Exceptional live coding execution with immediate optimal O(n) algorithmic solutions and clean idiomatic code.",
    "Clear, structured communication using standard frameworks (STAR method, trade-off analysis)."
  ],
  areasForImprovement: [
    "Could deepen knowledge of edge computing runtimes (Cloudflare Workers / V8 isolates) for ultra-low latency applications.",
    "Further expand on multi-cloud disaster recovery architectures spanning cross-region failovers.",
    "In behavioral responses, could quantify business financial metrics (e.g. cloud cost savings in dollars) even more prominently alongside latency metrics."
  ]
};
