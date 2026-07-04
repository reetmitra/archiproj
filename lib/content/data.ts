/**
 * PLACEHOLDER CONTENT — everything here is illustrative and will be
 * replaced with the professor's real content during discovery, then
 * moved into Sanity. Names, papers, and grants are invented.
 */

import type {
  SiteSettings,
  ResearchTheme,
  Project,
  Publication,
  Person,
  NewsPost,
  Course,
  JoinUsContent,
} from "./types";

export const siteSettings: SiteSettings = {
  labName: "Ageing Mobility Lab",
  tagline: "Cities that work at every age",
  mission:
    "We study how neighbourhoods, streets, and transport systems can support people as they grow older — and how to plan them more fairly.",
  institution: "National University of Singapore",
  department: "Department of Architecture, College of Design and Engineering",
  address: "4 Architecture Drive, Singapore 117566",
  email: "lab@nus.edu.sg",
};

export const researchThemes: ResearchTheme[] = [
  {
    slug: "ageing-in-place",
    code: "R1",
    title: "Ageing in place",
    summary:
      "How housing, amenities, and everyday destinations shape whether older adults can stay rooted in the neighbourhoods they know.",
  },
  {
    slug: "mobility-equity",
    code: "R2",
    title: "Mobility & transport equity",
    summary:
      "Who gets to move easily through the city — and who doesn't. Measuring and closing gaps in access to transit, walking, and paratransit.",
  },
  {
    slug: "public-life",
    code: "R3",
    title: "Public space & social life",
    summary:
      "Designing streets, parks, and void decks that invite older adults into public life rather than designing them out of it.",
  },
];

export const projects: Project[] = [
  {
    slug: "last-400-metres",
    title: "The last 400 metres",
    themeSlug: "mobility-equity",
    summary:
      "Auditing the walk between MRT stations and home for adults over 65 — kerbs, crossings, shade, and seating — across twelve Singapore towns.",
    body: [
      "Transit access is usually measured to the station gate. For many older adults, the decisive part of the journey is the final stretch on foot: the slip road without a crossing, the overhead bridge with no lift, the 400 metres without a single bench.",
      "This project pairs street-level audits with GPS traces volunteered by older residents to map where the pedestrian environment quietly excludes them, and works with agencies on low-cost retrofits.",
    ],
    years: "2024–present",
    status: "active",
    collaborators: ["Land Transport Authority", "Council for Third Age"],
    funding: "MOE Academic Research Fund Tier 2",
    publicationIds: ["pub-2025-benches", "pub-2024-audit"],
  },
  {
    slug: "paratransit-fairness",
    title: "Fair rides: paratransit allocation",
    themeSlug: "mobility-equity",
    summary:
      "Modelling how demand-responsive transport can be allocated fairly when demand outstrips supply.",
    body: [
      "Demand-responsive and paratransit services promise door-to-door mobility for people who cannot use fixed routes — but when trips are scarce, allocation rules decide who moves.",
      "We simulate allocation policies against real trip data to show the equity consequences of design choices that usually pass unexamined.",
    ],
    years: "2023–present",
    status: "active",
    collaborators: ["SMART Future Urban Mobility"],
    funding: "NUS Early Career Award",
    publicationIds: ["pub-2025-paratransit"],
  },
  {
    slug: "void-deck-commons",
    title: "Void deck commons",
    themeSlug: "public-life",
    summary:
      "Documenting how older residents actually use the ground floors of public housing — and what design changes would help.",
    body: [
      "The void deck is Singapore's accidental commons. This project observed 40 void decks over a year to record how older residents claim, furnish, and negotiate these spaces.",
      "Findings feed into design guidance for upgrading programmes, arguing for fewer rules and more chairs.",
    ],
    years: "2022–2025",
    status: "completed",
    collaborators: ["Housing & Development Board"],
    funding: "Social Science Research Council",
    publicationIds: ["pub-2024-voiddeck"],
  },
  {
    slug: "walkable-ageing-index",
    title: "Walkable ageing index",
    themeSlug: "ageing-in-place",
    summary:
      "A composite, open-data index of how well neighbourhoods support ageing in place, published for every planning area in Singapore.",
    body: [
      "Existing walkability indices are calibrated on able-bodied commuters. This index reweights them around the destinations, distances, and hazards that matter after 65 — clinics, markets, shade, rest points, crossing times.",
      "The index and its code are open, so planners and researchers elsewhere can recalibrate it for their own cities.",
    ],
    years: "2023–present",
    status: "active",
    funding: "MOE Academic Research Fund Tier 1",
    publicationIds: ["pub-2023-index"],
  },
];

export const publications: Publication[] = [
  {
    id: "pub-2025-benches",
    title:
      "A bench every 200 metres: rest infrastructure and older adults' walking range",
    authors: ["Li, X.", "Tan, W. K.", "Nurhaliza, S."],
    venue: "Journal of Transport & Health",
    year: 2025,
    type: "journal",
    doi: "10.0000/placeholder.2025.001",
    featured: true,
  },
  {
    id: "pub-2025-paratransit",
    title:
      "Who gets the ride? Equity outcomes of allocation rules in demand-responsive transport",
    authors: ["Li, X.", "Krishnan, D."],
    venue: "Transportation Research Part A",
    year: 2025,
    type: "journal",
    doi: "10.0000/placeholder.2025.002",
    featured: true,
  },
  {
    id: "pub-2024-audit",
    title:
      "Auditing the last 400 metres: a street-level protocol for age-friendly transit access",
    authors: ["Tan, W. K.", "Li, X."],
    venue: "Proceedings of the Transportation Research Board",
    year: 2024,
    type: "conference",
  },
  {
    id: "pub-2024-voiddeck",
    title: "The void deck as ageing commons: an observational study",
    authors: ["Li, X.", "Goh, M.", "Chen, Y."],
    venue: "Urban Studies",
    year: 2024,
    type: "journal",
    doi: "10.0000/placeholder.2024.003",
    featured: true,
  },
  {
    id: "pub-2023-index",
    title: "A walkable ageing index for tropical high-density cities",
    authors: ["Li, X."],
    venue: "Cities",
    year: 2023,
    type: "journal",
    doi: "10.0000/placeholder.2023.004",
  },
  {
    id: "pub-2023-report",
    title: "Age-friendly streets: design guidance for local implementation",
    authors: ["Li, X.", "Tan, W. K."],
    venue: "Report to the Ministry of National Development",
    year: 2023,
    type: "report",
  },
];

export const people: Person[] = [
  {
    slug: "prof-li",
    name: "Prof Xiang Li",
    role: "faculty",
    title: "Principal Investigator · Assistant Professor",
    bio: "Xiang studies the intersection of population ageing and urban mobility. Before joining NUS he worked in transport planning practice, which is why the lab's work always ends in something a city can build.",
    email: "lab@nus.edu.sg",
    links: [
      { label: "Google Scholar", url: "https://scholar.google.com" },
      { label: "ORCID", url: "https://orcid.org" },
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

export const joinUs: JoinUsContent = {
  heading: "Join the lab",
  intro:
    "We look for people who care that research changes what gets built. Backgrounds in planning, geography, data science, public health, and design all fit — the common thread is fieldwork-grounded, publicly useful work.",
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
    "Email us with a short note about what you want to work on, a CV, and one piece of work you're proud of — a paper, a map, a project, anything. We reply to every serious application.",
};
