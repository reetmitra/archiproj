/**
 * Local content — the fallback when SANITY_PROJECT_ID is unset, and the
 * source for `npm run seed`.
 *
 * REAL (from the professor, 2026-07): profile, researchPage,
 * researchThemes, publications, siteSettings.email, and the prof's own
 * entry in people.
 *
 * STILL PLACEHOLDER (invented): people other than the prof, news,
 * courses, workWithMe, siteSettings.labName/mission. The footer notice
 * stays until these are real too.
 */

import type {
  SiteSettings,
  Profile,
  ResearchPageContent,
  ResearchTheme,
  Project,
  Publication,
  Person,
  NewsPost,
  Course,
  WorkWithMeContent,
} from "./types";

export const siteSettings: SiteSettings = {
  labName: "Ageing Mobility Lab",
  mission:
    "We study how neighbourhoods, streets, and transport systems can support people as they grow older — and how to plan them more fairly.",
  institution: "National University of Singapore",
  department: "Department of Architecture, College of Design and Engineering",
  address: "4 Architecture Drive, Singapore 117566",
  email: "alexli@nus.edu.sg",
};

export const profile: Profile = {
  // Chrome (title · affiliation, footer, metadata) stays NUS until the
  // prof confirms the Texas A&M switch — his About text below already
  // says TAMU. Swapping is one field here + in the Studio.
  name: "Shengxiao (Alex) Li",
  title: "Assistant Professor",
  affiliation: "Department of Architecture, National University of Singapore",
  // First person, in his own words (from the research overview; one verb
  // adapted "My research examines" → "I examine").
  bio: "My research investigates how cities can transition beyond car dependence toward equitable and sustainable mobility futures. I examine the social consequences of car-dependent development, identify the institutional and governance factors that reinforce it, and explore planning and policy pathways toward more inclusive, low-carbon transportation systems.",
  // Verbatim from About.docx (2026-07).
  about: [
    "Shengxiao (Alex) Li is an Assistant Professor in the Department of Landscape Architecture and Urban Planning at Texas A&M University. His research lies at the intersection of travel behavior and transportation governance, with the goal of understanding how planning policies can guide transportation systems toward equitable and sustainable mobility transitions. Under this broader vision, his research examines the social consequences of car dependence and explores planning and governance pathways toward more equitable and sustainable mobility futures. His work contributes to understanding older adults’ travel and residential choices in car-dependent societies, governments’ responses to population aging through transportation and housing policies, the institutional drivers and social impacts of persistent car dependence, and the governance of transportation decarbonization, particularly vehicle electrification. Alex has published in leading urban planning and transportation journals, including the Journal of the American Planning Association, Journal of Planning Education and Research, Transportation Research Part A: Policy and Practice, Transportation Research Part D: Transport and Environment, and Journal of Urban Affairs.",
    "Alex received his PhD in City and Regional Planning from the University of Pennsylvania in 2022. He also holds a Master of Urban and Regional Planning (2018) and a bachelor’s degree in Urban Management and Economics (2015) from Peking University. Prior to joining Texas A&M University, he served as an Assistant Professor in the Department of Architecture at the National University of Singapore (2024–2026), a Visiting Assistant Professor at the University of Oregon (2023–2024), and a Postdoctoral Researcher and Adjunct Lecturer at the University of California, Riverside (2022–2023).",
  ],
  photo: {
    src: "/images/alex-li-bangkok.webp",
    alt: "Shengxiao (Alex) Li smiling on a busy street in Chinatown, Bangkok, surrounded by shop signs and traffic",
    caption: "Chinatown, Bangkok, Thailand, December 2025",
  },
  education: [
    {
      degree: "PhD, City and Regional Planning",
      institution: "University of Pennsylvania",
      year: "2022",
    },
    {
      degree: "Master of Urban and Regional Planning",
      institution: "Peking University",
      year: "2018",
    },
    {
      degree: "BA, Urban Management and Economics",
      institution: "Peking University",
      year: "2015",
    },
  ],
  links: [
    {
      label: "CV",
      url: "https://docs.google.com/document/d/1atST-50qigic4_Zp0u13iGDLjWWu2VkS/edit?usp=sharing&ouid=107309874306572492328&rtpof=true&sd=true",
    },
    {
      label: "Google Scholar",
      url: "https://scholar.google.com/citations?user=_zb8mMYAAAAJ&hl=en&oi=ao",
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/shengxiao-alex-li-15b0a68a/",
    },
    { label: "ORCID", url: "https://orcid.org/0000-0002-0698-3509" },
  ],
  email: "alexli@nus.edu.sg",
};

// Verbatim from Research overview.docx; the title is the prof's phrase.
export const researchPage: ResearchPageContent = {
  title: "Three interrelated pillars",
  overview: [
    "Dependence on private vehicles is neither environmentally sustainable nor socially equitable. Car-oriented urban development excludes many people—including those who cannot drive or cannot afford to own and maintain a vehicle—from full participation in everyday life. Meanwhile, although vehicle electrification is an important step toward reducing transportation emissions, replacing gasoline-powered vehicles with electric vehicles alone cannot overcome the broader environmental and social costs of car-dependent urban development, including high energy consumption, inefficient land use, and unequal access to opportunities.",
    "These challenges call for an equitable mobility transition—a transformation toward transportation systems that are not only low-carbon but also inclusive. Such a transition is becoming increasingly urgent as cities respond to population aging, climate change, and rapid technological innovation. Addressing these interconnected challenges requires more integrated and collaborative approaches to transportation planning and governance.",
    "My research investigates how cities can transition beyond car dependence toward equitable and sustainable mobility futures. My research examines the social consequences of car-dependent development, identifies the institutional and governance factors that reinforce it, and explores planning and policy pathways toward more inclusive, low-carbon transportation systems. I aim to generate actionable evidence that supports governments, planners, and communities in creating diverse mobility options that enable people of all ages, abilities, incomes, and backgrounds to participate fully in society.",
    "As an interdisciplinary scholar with an international research agenda, my long-term vision is to build a research and education hub that advances equitable mobility transitions through comparative research across North America, Europe, and Asia. By integrating transportation planning, governance, and travel behavior research, I seek to bridge research and practice across different institutional contexts and contribute to the development of transportation systems that are environmentally sustainable, socially equitable, and resilient to future societal challenges.",
    "My current and future research focuses on three interrelated pillars.",
  ],
};

// The prof's three research pillars. Bodies are verbatim from the
// pillar docx files; summaries are short site copy distilled from them
// (the homepage route line needs one or two sentences, not an essay).
export const researchThemes: ResearchTheme[] = [
  {
    slug: "accessibility-aging",
    code: "P1",
    title: "Planning for Accessibility Capability in an Aging Society",
    shortTitle: "Aging & accessibility",
    summary:
      "How older adults make travel and residential decisions in car-dependent societies — and how planning, governance, and policy can expand their opportunities to age in the communities they choose.",
    body: [
      "Car-dependent communities are often not designed to support older adults in aging healthily and independently in the places they call home. As populations age, cities need transportation planning and governance that accommodate the diverse needs, preferences, and aspirations of older adults.",
      "Building on the Accessibility Capability framework that I developed, my research examines how older adults make travel and residential decisions in increasingly car-dependent societies, and how planning institutions, governance arrangements, and public policies shape these choices. Through this line of research, I seek to generate evidence that helps governments and communities create transportation and housing systems that expand older adults' opportunities to age in the communities they choose. Ultimately, I aim to support local policies and planning practices that enable older adults to live healthier and more independent lives in their preferred communities.",
    ],
    figure: {
      src: "/images/pillar-aging-figure.webp",
      alt: "Charts showing the transportation mismatch experienced by zero-vehicle older people in the United States",
      caption:
        "Transportation mismatch among zero-vehicle older people. Figure 1 from “Characteristics of Zero-Vehicle Households among Older Americans” (Journal of the American Planning Association, 2025).",
    },
    publicationIds: [
      "pub-2026-bridging-the-gap",
      "pub-2025-aging-wrong-place",
      "pub-2025-zero-vehicle-households",
      "pub-2025-boomers-silent-generation",
      "pub-2024-older-americans-policy",
      "pub-2024-accessibility-capability",
      "pub-2024-vehicle-ownership-life-course",
      "pub-2023-ict-travel-older-americans",
      "pub-2022-relocation-older-adults",
      "pub-2021-senior-centers-transit",
      "pub-2020-living-environment-wellbeing",
    ],
  },
  {
    slug: "car-dependence",
    code: "P2",
    title: "Understanding the Persistence of Car Dependence and Its Social Impacts",
    shortTitle: "Car dependence",
    summary:
      "Why car dependence persists, and how it reinforces social inequalities — from employment outcomes to policing justice — especially where local governments have limited capacity to change course.",
    body: [
      "Viewing car dependence as a socially and institutionally constructed phenomenon, I examine why it persists and how it shapes social outcomes. In addition to my research on aging and transportation, I investigate the mechanisms through which car-dependent development reinforces social inequalities and limits opportunities for different populations. This line of research examines topics such as the relationship between car dependence and employment outcomes, as well as the implications of car-dependent environments for policing justice. I also investigate how local governments balance economic development, climate action, and mobility goals, and how political institutions and local economic structures can reinforce car-dependent development and constrain transportation transitions.",
      "Taken together, this line of research provides empirical evidence on why many cities, communities, and social groups remain highly dependent on private vehicles, and why transitioning away from car dependence is particularly challenging for many local governments, especially those with limited institutional and financial capacity.",
    ],
    figure: {
      src: "/images/pillar-car-dependence-figure.webp",
      alt: "Chart of the marginal effects of zero-vehicle household share on census-tract unemployment rates",
      caption:
        "Marginal effects of zero-vehicle household percentage on census-tract unemployment, from “Racial Segregation, Transportation, and Employment Outcomes in the United States” (Transport Policy, 2026).",
    },
    publicationIds: [
      "pub-2026-racial-segregation",
      "pub-2025-police-stops",
      "pub-2022-new-towns-commuting",
      "pub-2022-ride-hailing-austin",
      "pub-2022-constrained-car-ownership",
      "pub-2022-low-income-commuters",
    ],
  },
  {
    slug: "beyond-electrification",
    code: "P3",
    title: "Planning for Transportation Transitions Beyond Vehicle Electrification",
    shortTitle: "Beyond electrification",
    summary:
      "How vehicle electrification policies are made and governed, and how cities can decarbonize transportation while expanding mobility choices for diverse populations.",
    body: [
      "Vehicle electrification has become a central strategy for transportation decarbonization worldwide. While electrification is essential for reducing greenhouse gas emissions, it alone cannot create transportation systems that are equitable, accessible, and sustainable. Building on this premise, my research provides empirical evidence on how vehicle electrification policies are formulated, implemented, and governed, and how they influence car dependence and travel behavior across different social groups.",
      "More broadly, I examine transportation transitions beyond vehicle electrification, asking how cities can reduce car dependence while expanding people's mobility choices. My research investigates how transportation transitions are governed across multiple institutional scales, examining the interactions among regional and local planning agencies, higher levels of government, transit agencies, environmental organizations, and other stakeholders in implementing decarbonization strategies. Given the political and institutional challenges of achieving sustainable transitions, I also examine how local political institutions and planning processes shape transportation policies—including street redesign, transit-oriented development, public transit investment, and fare policies—and how these interventions influence travel behavior, residential choices, and access to opportunities.",
      "Through this line of research, I seek to identify governance and planning pathways that advance equitable mobility transitions by enabling transportation decarbonization while expanding mobility choices for diverse populations.",
    ],
    // Figure described in the prof's doc (spatial variation in commitment
    // to vehicle electrification, from the 2026 JPER paper) but the image
    // file wasn't included — ask him for it.
    publicationIds: ["pub-2026-boon-or-bane", "pub-2026-vision-to-reality"],
  },
];

// No real projects yet — the pillar essays carry the research page. The
// project machinery (type, schema, detail route) stays for when the prof
// wants per-project pages.
export const projects: Project[] = [];

// All 22 real publications from "Publications since 2020.docx".
// `*` marks student co-authors (the prof's convention, kept verbatim).
// ids double as Sanity _ids — renaming one breaks pillar publicationIds.
export const publications: Publication[] = [
  {
    id: "pub-2026-boon-or-bane",
    title:
      "Boon or Bane? Regional Transportation Planning in the Vehicle Electrification Era",
    authors: ["Li, Shengxiao (Alex)", "Yufei Wang*"],
    venue: "Journal of Planning Education and Research",
    year: 2026,
    type: "journal",
    doi: "10.1177/0739456X261452146",
    featured: true,
  },
  {
    id: "pub-2026-bridging-the-gap",
    title: "Bridging the Gap: Accessibility for Aging and Disability in Planning",
    authors: [
      "Hong, Andy",
      "Mahtot Gebresselassie",
      "Jongwoong Kim",
      "Shengxiao (Alex) Li",
      "Abigail Cochran",
      "Bhavya Bogra",
      "Samantha Biglieri",
    ],
    venue: "Journal of the American Planning Association",
    year: 2026,
    type: "journal",
    note: "Commentary",
    doi: "10.1080/01944363.2026.2660653",
  },
  {
    id: "pub-2026-vision-to-reality",
    title:
      "From Vision to Reality: Affordable Housing in Transit-Oriented Development in the District Noho Project, California",
    authors: ["Li, Shengxiao (Alex)", "Yufei Wang*", "Anthony Roman*"],
    venue: "Journal of Planning Education and Research",
    year: 2026,
    type: "journal",
    doi: "10.1177/0739456X261416036",
    featured: true,
  },
  {
    id: "pub-2026-racial-segregation",
    title:
      "Racial Segregation, Transportation, and Employment Outcomes in the United States",
    authors: ["Li, Shengxiao (Alex)", "Richard Patti", "Yuxi Xiong*"],
    venue: "Transport Policy",
    year: 2026,
    type: "journal",
    citation: "176 (February), 103920",
    doi: "10.1016/j.tranpol.2025.103920",
    featured: true,
  },
  {
    id: "pub-2025-police-stops",
    title:
      "Understanding the Role of the Built and Social Environments in Outcomes of Stops by Police in San Diego, California",
    authors: [
      "Li, Shengxiao (Alex)",
      "Ran Wei",
      "Danielle Wallace",
      "Tony Grubesic",
      "Xiaoyue Cathy Liu",
    ],
    venue: "Journal of Urban Affairs",
    year: 2025,
    type: "journal",
    doi: "10.1080/07352166.2025.2548828",
  },
  {
    id: "pub-2025-aging-wrong-place",
    title: "Who Is Aging in the Wrong Place? Evidence from Older Americans",
    authors: ["Li, Shengxiao (Alex)"],
    venue: "Transportation Research Part D: Transport and Environment",
    year: 2025,
    type: "journal",
    citation: "140 (March), 104616",
    doi: "10.1016/j.trd.2025.104616",
  },
  {
    id: "pub-2025-zero-vehicle-households",
    title:
      "Characteristics of Zero-Vehicle Households among Older Americans and Their Travel Implications",
    authors: ["Li, Shengxiao (Alex)"],
    venue: "Journal of the American Planning Association",
    year: 2025,
    type: "journal",
    citation: "91 (3): 430–444",
    doi: "10.1080/01944363.2024.2428918",
  },
  {
    id: "pub-2025-boomers-silent-generation",
    title: "How Do Baby Boomers Travel Differently from the Silent Generation?",
    authors: ["Li, Shengxiao (Alex)"],
    venue: "Transportation",
    year: 2025,
    type: "journal",
    citation: "52: 1–28",
    doi: "10.1007/s11116-023-10410-3",
  },
  {
    id: "pub-2024-older-americans-policy",
    title:
      "Transportation Planning for Older Americans: Challenges, Federal Policies, and Next Steps",
    authors: ["Li, Shengxiao (Alex)"],
    venue: "Journal of Aging & Social Policy",
    year: 2024,
    type: "journal",
    citation: "36 (5): 929–47",
    doi: "10.1080/08959420.2023.2238539",
  },
  {
    id: "pub-2024-accessibility-capability",
    title:
      "From Transportation Equity to Accessibility Capability: A New Framework to Guide Transportation Planning for Older People",
    authors: ["Li, Shengxiao (Alex)"],
    venue: "Journal of Planning Literature",
    year: 2024,
    type: "journal",
    citation: "39 (2): 241–53",
    doi: "10.1177/08854122231223802",
  },
  {
    id: "pub-2024-vehicle-ownership-life-course",
    title:
      "Vehicle Ownership over the Life Course among Older Americans: A Longitudinal Analysis",
    authors: ["Li, Shengxiao (Alex)"],
    venue: "Transportation",
    year: 2024,
    type: "journal",
    citation: "51 (1): 247–70",
    doi: "10.1007/s11116-022-10326-4",
  },
  {
    id: "pub-2023-ict-travel-older-americans",
    title:
      "Revisiting the Relationship between Information and Communication Technologies and Travel Behavior: An Investigation of Older Americans",
    authors: ["Li, Shengxiao (Alex)"],
    venue: "Transportation Research Part A: Policy and Practice",
    year: 2023,
    type: "journal",
    citation: "172 (June): 103689",
    doi: "10.1016/j.tra.2023.103689",
  },
  {
    id: "pub-2022-grandparenting-wellbeing",
    title:
      "Grandparenting and Subjective Well-Being in China: The Moderating Effects of Residential Location, Gender, Age, and Income",
    authors: ["Wang, Shuhong*", "Shengxiao (Alex) Li", "Wanyang Hu"],
    venue: "Social Science & Medicine",
    year: 2022,
    type: "journal",
    citation: "315 (December): 115528",
    doi: "10.1016/j.socscimed.2022.115528",
  },
  {
    id: "pub-2022-relocation-older-adults",
    title: "Recent Relocation Patterns Among Older Adults in the United States",
    authors: ["Li, Shengxiao (Alex)", "Wanyang Hu", "Fuyu Guo*"],
    venue: "Journal of the American Planning Association",
    year: 2022,
    type: "journal",
    citation: "88 (1): 15–29",
    doi: "10.1080/01944363.2021.1902842",
  },
  {
    id: "pub-2022-new-towns-commuting",
    title:
      "Examining Commuting Disparities across Different Types of New Towns and Different Income Groups: Evidence from Beijing, China",
    authors: ["Li, Shengxiao (Alex)", "Pengjun Zhao"],
    venue: "Habitat International",
    year: 2022,
    type: "journal",
    citation: "124 (June): 102558",
    doi: "10.1016/j.habitatint.2022.102558",
  },
  {
    id: "pub-2022-ride-hailing-austin",
    title:
      "Who Loses and Who Wins in the Ride-Hailing Era? A Case Study of Austin, Texas",
    authors: [
      "Li, Shengxiao (Alex)",
      "Wei Zhai",
      "Junfeng Jiao",
      "Chao (Kenneth) Wang*",
    ],
    venue: "Transport Policy",
    year: 2022,
    type: "journal",
    citation: "120 (May): 130–38",
    doi: "10.1016/j.tranpol.2022.03.009",
  },
  {
    id: "pub-2022-constrained-car-ownership",
    title:
      "How Do Constrained Car Ownership and Car Use Influence Travel and Life Satisfaction?",
    authors: ["Li, Shengxiao (Alex)", "Xiaodong Guan", "Donggen Wang"],
    venue: "Transportation Research Part A: Policy and Practice",
    year: 2022,
    type: "journal",
    citation: "155 (January): 202–18",
    doi: "10.1016/j.tra.2021.11.014",
  },
  {
    id: "pub-2022-low-income-commuters",
    title:
      "How Do Low-Income Commuters Get to Work in US and Mexican Cities? A Comparative Empirical Assessment",
    authors: ["Guerra, Erick", "Shengxiao Li", "Ariadna Reyes"],
    venue: "Urban Studies",
    year: 2022,
    type: "journal",
    citation: "59 (1): 75–96",
    doi: "10.1177/0042098020965442",
  },
  {
    id: "pub-2021-senior-centers-transit",
    title:
      "Time-Varying Accessibility to Senior Centers by Public Transit in Philadelphia",
    authors: [
      "Li, Shengxiao (Alex)",
      "Hongyu (Anna) Duan*",
      "Tony E. Smith",
      "Haoyu Hu",
    ],
    venue: "Transportation Research Part A: Policy and Practice",
    year: 2021,
    type: "journal",
    citation: "151 (September): 245–58",
    doi: "10.1016/j.tra.2021.06.020",
  },
  {
    id: "pub-2020-living-environment-wellbeing",
    title:
      "Living Environment, Mobility, and Wellbeing among Seniors in the United States: A New Interdisciplinary Dialogue",
    authors: ["Li, Shengxiao (Alex)"],
    venue: "Journal of Planning Literature",
    year: 2020,
    type: "journal",
    citation: "35 (3): 298–314",
    doi: "10.1177/0885412220914993",
  },
  {
    id: "pub-2020-primary-care-china",
    title:
      "The Role of Transportation in Older Adults’ Use of and Satisfaction with Primary Care in China",
    authors: [
      "Li, Shengxiao (Alex)",
      "Yixue Zhang",
      "Hangqing Ruan",
      "Erick Guerra",
      "Denise Burnette",
    ],
    venue: "Journal of Transport & Health",
    year: 2020,
    type: "journal",
    citation: "18 (September): 100898",
    doi: "10.1016/j.jth.2020.100898",
  },
  {
    id: "pub-2020-hospital-accessibility-beijing",
    title:
      "Unequable Spatial Accessibility to Hospitals in Developing Megacities: New Evidence from Beijing",
    authors: ["Zhao, Pengjun", "Shengxiao Li", "Di Liu"],
    venue: "Health & Place",
    year: 2020,
    type: "journal",
    citation: "65 (September): 102406",
    doi: "10.1016/j.healthplace.2020.102406",
  },
];

export const people: Person[] = [
  {
    // Real (from the prof's About + CV); the rest of this list is invented.
    slug: "prof-li",
    name: "Prof Shengxiao (Alex) Li",
    role: "faculty",
    title: "Principal Investigator · Assistant Professor",
    bio: "Alex's research lies at the intersection of travel behavior and transportation governance — understanding how planning policies can guide transportation systems toward equitable and sustainable mobility transitions.",
    email: "alexli@nus.edu.sg",
    links: [
      {
        label: "Google Scholar",
        url: "https://scholar.google.com/citations?user=_zb8mMYAAAAJ&hl=en&oi=ao",
      },
      { label: "ORCID", url: "https://orcid.org/0000-0002-0698-3509" },
    ],
  },
  {
    slug: "wei-keat-tan",
    name: "Tan Wei Keat",
    role: "phd",
    title: "PhD Candidate",
    bio: "Wei Keat leads the street audit fieldwork for The Last 400 Metres and is writing a dissertation on rest infrastructure and pedestrian range.",
  },
  {
    slug: "deepa-krishnan",
    name: "Deepa Krishnan",
    role: "phd",
    title: "PhD Student",
    bio: "Deepa models fairness in demand-responsive transport allocation, combining optimisation with lived-experience interviews.",
  },
  {
    slug: "siti-nurhaliza",
    name: "Siti Nurhaliza",
    role: "masters",
    title: "MUP Student",
    bio: "Siti maps shade and seating along transit corridors for the Walkable Ageing Index.",
  },
  {
    slug: "mabel-goh",
    name: "Mabel Goh",
    role: "alumni",
    title: "MUP 2024 · now at Urban Redevelopment Authority",
    bio: "Mabel's thesis on void deck use won the department's best dissertation award.",
  },
];

export const news: NewsPost[] = [
  {
    id: "news-2026-06",
    date: "2026-06-12",
    title: "Paper on rest infrastructure accepted at Journal of Transport & Health",
    body: "Our study of how bench spacing shapes older adults' walking range — with evidence from 2,100 GPS-traced journeys — is now in press.",
    category: "paper",
  },
  {
    id: "news-2026-05",
    date: "2026-05-28",
    title: "Invited talk at the World Urban Forum session on ageing cities",
    body: "Prof Li presented the Walkable Ageing Index and its open-data methodology to an audience of city planners from 14 countries.",
    category: "talk",
  },
  {
    id: "news-2026-04",
    date: "2026-04-15",
    title: "New Tier 2 grant to extend the street audit to three more towns",
    body: "The Last 400 Metres will grow to cover fifteen towns, adding night-time conditions to the audit protocol.",
    category: "grant",
  },
  {
    id: "news-2026-03",
    date: "2026-03-02",
    title: "The Straits Times covers our void deck research",
    body: "The feature looks at what forty void decks taught us about designing for older residents.",
    category: "media",
    link: { label: "Read the article", url: "https://www.straitstimes.com" },
  },
  {
    id: "news-2026-01",
    date: "2026-01-20",
    title: "Welcome to our new PhD student, Deepa Krishnan",
    body: "Deepa joins the lab from IIT Madras to work on fairness in demand-responsive transport.",
    category: "lab",
  },
];

export const courses: Course[] = [
  {
    code: "AR4102",
    title: "Planning the Age-Friendly City",
    term: "Semester 1",
    level: "undergraduate",
    description:
      "How demographic change reshapes what cities must provide. Students audit a real neighbourhood and propose retrofits, ending the semester with a public review.",
  },
  {
    code: "AR5661",
    title: "Transport Justice",
    term: "Semester 2",
    level: "graduate",
    description:
      "Theories of distributive justice applied to transport planning, with methods for measuring accessibility gaps and evaluating interventions.",
  },
  {
    code: "AR5880",
    title: "Urban Data for Planners",
    term: "Semester 2",
    level: "graduate",
    description:
      "A hands-on methods course: open data, spatial analysis, and honest visualisation for planning arguments.",
  },
];

export const workWithMe: WorkWithMeContent = {
  heading: "How to join the work",
  intro:
    "I look for people who care that research changes what gets built. Backgrounds in planning, geography, data science, public health, and design all fit — the common thread is fieldwork-grounded, publicly useful work.",
  sections: [
    {
      title: "Current NUS students",
      body: "Paid research assistant roles open most semesters, mainly on the street audit — no experience needed, training provided. If you want course credit instead, propose an independent study; the strongest proposals connect to one of the research themes and name the piece of fieldwork or analysis you would own.",
    },
    {
      title: "Prospective PhD students",
      body: "Write to me before you apply to the programme. Tell me which of the research themes you want to push on and what you would bring to it — a method, a fieldwork instinct, a dataset, a question I haven't asked. Admitted students are funded for four years through NUS research scholarships.",
    },
    {
      title: "Visiting researchers & collaborations",
      body: "I host a small number of visiting researchers and welcome collaborations with agencies, city governments, and community organisations — especially where the output is something a city can act on. Timing depends on space and fit, so write early.",
    },
  ],
  openings: [
    {
      title: "Funded PhD position — transport equity",
      description:
        "Four-year funded position on the Fair Rides project, starting August 2027. Strong quantitative skills; lived curiosity about cities required.",
      open: true,
    },
    {
      title: "Undergraduate research assistants",
      description:
        "Paid fieldwork roles on the street audit each semester. No experience needed; training provided.",
      open: true,
    },
  ],
  howToApply:
    "Email me a short note about what you want to work on, a CV, and one piece of work you're proud of — a paper, a map, a project, anything. I reply to every serious application.",
};
