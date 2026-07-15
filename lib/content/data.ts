/**
 * Local content — the fallback when SANITY_PROJECT_ID is unset, and the
 * source for `npm run seed`.
 *
 * ALL REAL (from the professor's `Lab Page/` folder, 2026-07): profile,
 * researchPage, researchThemes, publications, people, news, teaching,
 * workWithMe. Prose is verbatim from his docx files except the small
 * normalizations flagged to him via Reet (see HANDOFF session log).
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
  TeachingPageContent,
  WorkWithMeContent,
} from "./types";

export const siteSettings: SiteSettings = {
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

// Verbatim from Research overview.docx; the title is the prof's own
// suggestion from his 2026-07 feedback (was "Three interrelated pillars").
export const researchPage: ResearchPageContent = {
  title: "Equitable Mobility Transition: Three Research Pillars",
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
    figure: {
      src: "/images/pillar-electrification-figure.webp",
      alt: "Map of the United States with labelled metropolitan planning organizations shaded by their electric-vehicle strategy score, from low (red) to high (blue)",
      caption:
        "Spatial variation in commitment to vehicle electrification across U.S. metropolitan regions. Figure from a 2026 publication in the Journal of Planning Education and Research.",
    },
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
  // From People.docx (2026-07). Role lines verbatim; no bios or
  // headshots were provided (his photo folders were empty) — the page
  // shows initials until headshots arrive. Array order = his doc order.
  {
    slug: "yufei-wang",
    name: "Yufei Wang",
    role: "phd",
    title: "PhD Candidate in Architecture, National University of Singapore",
  },
  {
    slug: "wenyu-lyu",
    name: "Wenyu Lyu",
    role: "alumni",
    title:
      "Former student, now a PhD student in Real Estate, National University of Singapore",
  },
  {
    slug: "xinyi-he",
    name: "Xinyi He",
    role: "alumni",
    title:
      "Research assistant (2024–2026), incoming PhD student in Architecture, National University of Singapore",
  },
  {
    slug: "tianle-luo",
    name: "Tianle Luo",
    role: "alumni",
    title: "Research assistant (2024–2026)",
  },
  {
    slug: "jooeun-kim",
    name: "Jooeun Kim",
    role: "alumni",
    title: "Research assistant (2025–2026)",
  },
  {
    slug: "justin-eng",
    name: "Justin Eng",
    role: "alumni",
    title: "Research assistant (2026)",
  },
];

// From News.docx (2026-07), verbatim except: the GSA presentation
// details are reformatted from his label-per-line list into one
// sentence per paper (no facts dropped), and photos get alt text.
export const news: NewsPost[] = [
  {
    id: "news-2026-07-09-gsa",
    date: "2026-07-09",
    title:
      "Shengxiao (Alex) Li's two papers with co-authors have been accepted by Gerontological Society of America Annual Conference!",
    body: [
      "Excited to share that two papers co-authored with wonderful collaborators have been accepted for presentation at the Gerontological Society of America (GSA) Annual Scientific Meeting. Looking forward to seeing everyone in Maryland this November!",
      "“Aging in Place or in Motion? National Migration Patterns of Suburban and Downtown Older Americans”, with Peng Huang (University of Georgia) and Xinyi He (National University of Singapore) — session “Housing, Neighborhoods, and Aging in Place”, Friday November 6, 2026, 8:00–9:30 AM, Maryland Ballroom Breakout 5.",
      "“Smaller Homes, More Friends: Ageing in Singapore's Kampung Admiralty”, a poster with Shin Bin Tan (National University of Singapore) — session “Housing, Neighborhoods, and Aging in Place (Posters)”, Saturday November 7, 2026, 1:45–3:00 PM, Exhibit Hall B–D.",
    ],
    category: "paper",
    image: {
      src: "/images/news-gsa-2026.webp",
      alt: "Logo of the Gerontological Society of America 2026 Annual Scientific Meeting",
    },
  },
  {
    id: "news-2026-07-03-acsp",
    date: "2026-07-03",
    title:
      "See you at Association of Collegiate Schools of Planning conference at Pittsburgh!",
    body: [
      "Shengxiao (Alex) Li will present paper titled “Governance for transportation decarbonization planning in U.S. metropolitan areas: Evidence from state- and regional-level climate action plans” led by Yufei Wang and our amazing co-author Lauren Fischer at ACSP in Pittsburgh. See you in Pittsburgh in the fall!",
    ],
    category: "talk",
    image: {
      src: "/images/news-acsp-2026.webp",
      alt: "Banner of the Association of Collegiate Schools of Planning 2026 conference in Pittsburgh",
    },
  },
  {
    id: "news-2026-06-16-yufei-qe",
    date: "2026-06-16",
    title:
      "Congratulations to Yufei Wang on Passing Her PhD Qualifying Examination",
    body: [
      "Congratulations to Yufei Wang on successfully passing her PhD qualifying examination in the Department of Architecture at the National University of Singapore.",
      "Yufei's dissertation, “Street Transformation in London, San Francisco, and Singapore: History, Implementation, and Governance Pathways,” examines how streets have been transformed and evolved over time across different institutional contexts. Using comparative case study methods and Qualitative Comparative Analysis (QCA), her research investigates the historical trajectories, implementation processes, and governance pathways of street transformation. The project aims to advance scholarship at the intersection of active travel and transportation governance from a comparative perspective.",
      "We are also excited that Yufei will present her research on the comparative history of street transformation in San Francisco, London, and Singapore at the joint conference of the Research Committee 21 (RC21) of the International Sociological Association, the International Journal of Urban and Regional Research (IJURR), and the IJURR Foundation.",
      "Congratulations, Yufei, on this important milestone, and we look forward to seeing your continued success!",
    ],
    category: "lab",
    image: {
      src: "/images/news-yufei-qualifying.webp",
      alt: "Two students smiling on an atrium walkway at the National University of Singapore, greenery behind them",
    },
  },
];

// From Teaching.docx (2026-07): the teaching-philosophy essay plus the
// course list. His one caption typo is fixed ("letf" → "left").
export const teachingPage: TeachingPageContent = {
  title: "Teaching",
  intro: [
    "My teaching approach has been shaped by my experiences as a learner, instructor, and collaborator working across disciplines and with planning practitioners internationally. I believe that planning education should be experiential, interdisciplinary, and inclusive. As an educator, I pursue two primary goals: (1) bridging the classroom with planning and policy practice through applied and collaborative learning, and (2) creating learning environments that support students from diverse socioeconomic, cultural, and disciplinary backgrounds.",
  ],
  sections: [
    {
      title: "Bridging Classroom Learning with Planning Practice",
      body: [
        "To connect coursework with real-world practice, I design assignments that encourage students to apply what they learn in class to contemporary planning challenges. My teaching materials integrate professional planning documents, long-range transportation plans, government reports, planning cases, and academic literature. Through case studies, plan reviews, and project-based learning, students develop professional skills while learning to identify context-sensitive planning solutions.",
        "Recently, three students from my Planning Policy and Process course (Xinyi He, Sofia Rita, and Huixin Fu) received the Best Student Case Study Award from the Global Planning Educator Interest Group (GPEIG) of the Association of Collegiate Schools of Planning (ACSP) for a case study on informal housing governance in India that they developed in my class. Seeing students grow into independent researchers and planning professionals through these practice-based assignments has been one of the most rewarding aspects of my teaching.",
      ],
      photo: {
        src: "/images/teaching-acsp-award.webp",
        alt: "Five people standing on stage at a conference session, three award-winning students with the two co-chairs of the case study selection committee",
        caption:
          "Xinyi, Sofia, and Huixin at the ACSP Annual Conference in Minneapolis, Minnesota (2025). From left to right: Huixin, Andrea Restrepo-Mieth (Rutgers University) and Anton Rozhkov (New York University), co-chairs of case study selection committee, Xinyi, and Sofia.",
      },
    },
    {
      title: "Preparing Students for the Future of Planning",
      body: [
        "Planning education should evolve alongside the profession itself. As emerging technologies continue to reshape planning practice, I continually update my courses to reflect new tools, methods, and professional frontiers.",
        "For example, I recently redesigned a plan evaluation assignment by incorporating generative AI into the learning process. Rather than treating AI as a replacement for human judgment, students compared AI-generated evaluations with human-coded assessments and critically reflected on both the opportunities and limitations of large language models in planning practice. This assignment helped students develop both technical skills and critical perspectives on the role of AI in planning and design. The course redesign was later supported by a Teaching Transformation Grant from the College of Design and Engineering at the National University of Singapore.",
      ],
    },
    {
      title: "Supporting Student Success",
      body: [
        "Creating an inclusive classroom where students feel comfortable sharing diverse perspectives is central to my teaching philosophy. As a first-generation college student, I understand the transformative role that higher education can play in expanding opportunities and promoting social mobility. This experience has shaped my commitment to supporting students from diverse backgrounds and creating classrooms where everyone feels respected, supported, and empowered to succeed.",
        "To foster an inclusive and engaging learning environment, I intentionally assign readings written by scholars from diverse academic and demographic backgrounds and encourage participation through multiple formats, including reading reflections, mini-presentations, and end-of-class takeaways. I also make myself available through additional office hours and informal conversations so that I can better understand each student's learning style, academic goals, and individual needs.",
        "Ultimately, my goal is to create classrooms where students feel intellectually challenged, personally supported, and confident in developing their professional identities as planners, scholars, and future leaders.",
      ],
    },
  ],
  coursesIntro:
    "I have taught undergraduate and graduate courses in urban planning and public policy at four universities in the United States and Singapore. My teaching spans planning history and theory, transportation planning and policy, land use planning, planning methods, and planning for an aging society.",
};

// Titles + parentheticals verbatim from Teaching.docx, in his order
// (sortOrder mirrors the array for the Sanity path). The Penn entry's
// "Co-Instructor," prefix moved into the meta line.
export const courses: Course[] = [
  {
    institution: "National University of Singapore",
    title: "Planning Policy and Process",
    meta: "Master's required, Fall 2024 and 2025",
    sortOrder: 1,
  },
  {
    institution: "National University of Singapore",
    title: "Urban Planning History and Theory",
    meta: "Master's required, Spring 2025 and 2026",
    sortOrder: 2,
  },
  {
    institution: "National University of Singapore",
    title: "Urban Infrastructure and Mobility Systems",
    meta: "Master's required, Fall 2025",
    sortOrder: 3,
  },
  {
    institution: "National University of Singapore",
    title: "Dissertation",
    meta: "Master's elective, Spring 2025",
    sortOrder: 4,
  },
  {
    institution: "University of Oregon",
    title: "Planning Analysis",
    meta: "Master's required, Fall 2023",
    sortOrder: 5,
  },
  {
    institution: "University of Oregon",
    title: "Urban Transportation",
    meta: "Undergraduate elective, Fall 2023",
    sortOrder: 6,
  },
  {
    institution: "University of Oregon",
    title: "Introduction to City Planning",
    meta: "Undergraduate required, Winter 2024",
    sortOrder: 7,
  },
  {
    institution: "University of Oregon",
    title: "Transportation Policy",
    meta: "Undergraduate elective, Winter 2024",
    sortOrder: 8,
  },
  {
    institution: "University of Oregon",
    title: "Land Use Policy",
    meta: "Master's elective, Spring 2024",
    sortOrder: 9,
  },
  {
    institution: "University of Oregon",
    title: "Planning for All Ages",
    meta: "Newly developed undergraduate elective, Spring 2024",
    sortOrder: 10,
  },
  {
    institution: "University of California, Riverside",
    title: "Transportation Policy",
    meta: "Newly developed undergraduate elective, Spring 2023",
    sortOrder: 11,
  },
  {
    institution: "University of California, Riverside",
    title: "Special Topics in Public Policy: Post-Pandemic Cities",
    meta: "Newly developed undergraduate elective, Winter 2023",
    sortOrder: 12,
  },
  {
    institution: "University of Pennsylvania",
    title: "Urban Research Colloquium",
    meta: "Co-instructor, undergraduate elective, Spring 2022",
    sortOrder: 13,
  },
];

// From Join Us.docx (2026-07), verbatim. His TAMU email appears here
// (and only here) while the site chrome stays NUS — Reet's decision,
// 2026-07-15. No openings are listed; the page hides that section.
export const workWithMe: WorkWithMeContent = {
  heading: "Opportunities to Work with Me",
  intro: "Thank you for your interest in my research.",
  sections: [
    {
      title: "Current Availability",
      body: [
        "Due to my transition to Texas A&M University, I am not currently hosting visiting professors, visiting scholars, or exchange students.",
        "For Texas A&M students, although I do not expect to recruit research assistants during the 2026–2027 academic year, I am always happy to hear from students whose research interests align with mine. If opportunities for collaboration arise, I would be happy to explore them together.",
      ],
    },
    {
      title: "PhD Recruitment (Fall 2027)",
      body: [
        "I plan to recruit one PhD student to join my research group beginning in Fall 2027.",
        "Before contacting me, I encourage you to:",
      ],
      bullets: [
        "Learn about the Urban and Regional Sciences PhD Program at Texas A&M and determine whether it is a good fit for your academic goals.",
        "Explore my research overview, current students, and recent publications on this website.",
        "Skim one to three of my publications that you find most interesting and be prepared to discuss why they resonate with you.",
      ],
      after: [
        "Because I receive many generic inquiry emails each year, I will prioritize responding to applicants who demonstrate a genuine understanding of my research and explain how their research interests align with mine.",
        "Please contact me by email (lsx@tamu.edu) after September 1, 2026, once I have completed my transition to Texas A&M.",
      ],
    },
    {
      title: "Application Materials",
      body: ["When you contact me, please include:"],
      bullets: [
        "Your CV.",
        "A brief email explaining why you would like to work with me and how working together would support your long-term career goals.",
        "One to three publications of mine that you found most interesting, together with a few sentences explaining why.",
      ],
    },
    {
      title: "What I Look For",
      body: ["Successful applicants typically have:"],
      bullets: [
        "A basic foundation in college-level statistics and experience applying quantitative methods in research.",
        "Strong interests in aging and transportation, transportation governance, mobility transition, or related fields.",
        "Excellent written and spoken English.",
        "An interest in qualitative and mixed-methods research.",
        "A genuine enthusiasm for interdisciplinary research.",
      ],
    },
    {
      title: "Preferred Qualifications",
      body: ["The ideal candidate will possess one or more of the following qualities:"],
      bullets: [
        "An interdisciplinary educational background (for example, Economics + Urban Analytics, or Urban Planning + Social Work).",
        "Experience or interest in international comparative research and cross-cultural perspectives.",
        "Strong self-motivation, independence, and self-discipline.",
        "A passion for integrating qualitative and quantitative approaches in transportation and urban planning research.",
        "One or more original research ideas that you would like to develop independently during your PhD. I particularly value students who enjoy formulating their own research questions rather than simply extending existing projects.",
      ],
    },
    {
      title: "Some notes for potential applicants",
      body: [
        "I enjoy working with students from the earliest stages of developing an idea through to publication. Rather than operating a traditional physical lab, I see my role as supporting students in achieving their long-term career goals.",
        "At the beginning of our collaboration, I work closely with each student to develop a broad research vision for the next five years. Based on that vision, I involve them in projects that align with their long-term interests while also helping them develop their own independent research agenda. I encourage students to pursue dissertation topics that are driven by their own intellectual passions rather than being limited to my existing research projects. Ideally, a dissertation should lay the foundation for the research program they hope to pursue over the next three to five years.",
        "I believe that publications are an important means of sharing knowledge—not the ultimate goal of research. Consequently, prior publications are not a prerequisite for joining my research group. My current PhD students entered the program without publication records and have gone on to publish successfully during their doctoral studies. What matters most to me are intellectual curiosity, integrity, independence, and a genuine passion for asking meaningful research questions.",
        "I am particularly excited to mentor students who aspire to become future leaders in transportation planning and governance. Whether or not an applicant already has publications is far less important than their potential to grow into an independent, creative, and impactful researcher.",
      ],
    },
  ],
  howToApply:
    "Please contact me by email (lsx@tamu.edu) after September 1, 2026, once I have completed my transition to Texas A&M.",
  contactEmail: "lsx@tamu.edu",
};
