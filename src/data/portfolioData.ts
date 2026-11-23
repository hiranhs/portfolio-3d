export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'game' | 'app';
  badge: string;
  year: string;
  description: string;
  highlights: string[];
  image: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  liveLabel?: string;
  youtubeId?: string;
  featured?: boolean;
}

export interface GameplayVideo {
  id: string;
  title: string;
  status: string;
  description: string;
  youtubeId: string;
  tags: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  rarity: 'LEGENDARY' | 'NATIONAL PRESS' | 'HONOURS' | 'FILM AWARD' | 'SHIPPED' | 'IMPACT';
  xp: string;
  description: string;
  image?: string;
  secondaryImage?: string;
  link?: string;
  linkLabel?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'gamefest' | 'game-art' | 'press';
  categoryLabel: string;
  caption: string;
  image: string;
  externalUrl?: string;
}

export interface GameFestPhoto {
  src: string;
  title: string;
  caption: string;
  tag: string;
  objectPosition?: string;
}

export const GAMEFEST_PHOTOS: GameFestPhoto[] = [
  {
    src: './assets/gamefest/gamefest-award.jpg',
    title: 'GAME FEST 2026 — 2nd Place Award Ceremony',
    caption:
      'Receiving the 2nd Place award in the University Category at the SLIIT Kandy UNI Inter-University Game Development Competition (24 July 2026).',
    tag: 'AWARD STAGE',
    objectPosition: 'object-center',
  },
  {
    src: './assets/gamefest/gamefest-certificate.jpg',
    title: 'Official Certificate of Achievement — 2nd Place',
    caption:
      'Presented to Tharindu Hiran Samaranayake for securing 2nd Place in the University Category at GAME FEST 2026, organized by the Department of Computing, SLIIT Kandy UNI.',
    tag: 'CERTIFICATE',
    objectPosition: 'object-center',
  },
  {
    src: './assets/gamefest/gamefest-team.jpg',
    title: 'Team Orzio — GAME FEST 2026 Finalists',
    caption:
      'Representing SLIIT City UNI together at GAME FEST 2026 after building a competitive Unity game under strict competition deadlines.',
    tag: 'TEAM ORZIO',
    objectPosition: 'object-top',
  },
  {
    src: './assets/gamefest/gamefest-solo.jpg',
    title: 'Tharindu Hiran at GAME FEST 2026',
    caption:
      'Captured at SLIIT Kandy UNI during GAME FEST 2026 — Inter-University Game Development Competition.',
    tag: 'EVENT MOMENT',
    objectPosition: 'object-top',
  },
];

export interface SkillGroup {
  id: string;
  title: string;
  tag: string;
  skills: { name: string; level: number }[];
}

export const PROFILE = {
  fullName: 'Tharindu Hiran Samaranayake',
  shortName: 'Tharindu Hiran',
  handle: 'HIRAN // 3D',
  role: 'Game Developer & 3D Interactive Creator',
  subRole: 'BSc (Hons) Computer Science (Second Class Upper) — SLIIT City UNI',
  degreeHonours: 'Second Class Upper Division',
  location: 'Colombo / Mawanella, Sri Lanka',
  email: 'tharindu2003hs@gmail.com',
  phone: '+94 76 949 2281',
  cvUrl: './assets/Tharindu_CV.pdf',
  portraitCutout: './assets/hiran-portrait.png',
  socials: {
    github: 'https://github.com/hiranhs',
    linkedin: 'https://www.linkedin.com/in/tharinduhiran/',
    itch: 'https://tharindu-hiran.itch.io/',
  },
  emailjs: {
    publicKey: 'VEFVGP_l0Wl9s5mbg',
    serviceId: 'service_1yki0ch',
    templateId: 'template_iq10u1h',
  },
  heroStats: [
    { value: '2ND UPPER', label: 'BSc (Hons) Computer Science' },
    { value: 'UNITY', label: '2D / 3D & C# Systems' },
    { value: '06+ BUILDS', label: 'Shipped Games & Apps' },
  ],
  bioParagraphs: [
    "I'm a Computer Science graduate from SLIIT City UNI with Second Class Upper honours (2024–2026), passionate about game development and interactive design. I craft engaging gameplay mechanics using Unity and Unreal Engine with C# and C++.",
    'From first-person 3D horror-mystery games featuring C# Raycasting, Firebase auth, and API-based dynamic puzzles to 3D action combat with enemy AI and stylized 2D adventures, I combine technical problem-solving with visual storytelling.',
    'I also design intuitive game interfaces and wireframes in Figma, explore character design & animation pipelines, and build full-stack Android & web applications.',
  ],
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'gamedev',
    title: 'Game Dev & 3D Worlds',
    tag: 'CORE ENGINE',
    skills: [
      { name: 'Unity Engine (2D & 3D) & C#', level: 94 },
      { name: 'Unreal Engine & C++', level: 84 },
      { name: 'AI, Enemy Mechanics & Raycasting', level: 88 },
      { name: 'Character Design & Animation Pipelines', level: 86 },
    ],
  },
  {
    id: 'mobile-web',
    title: 'Mobile & Full-Stack Dev',
    tag: 'APPLICATIONS',
    skills: [
      { name: 'Kotlin & Android Studio', level: 90 },
      { name: 'HTML / CSS / JavaScript', level: 92 },
      { name: 'Java & PHP / MySQL', level: 82 },
      { name: 'REST APIs & JSON Architecture', level: 86 },
    ],
  },
  {
    id: 'backend-cloud',
    title: 'Cloud & Data Systems',
    tag: 'INFRASTRUCTURE',
    skills: [
      { name: 'Firebase Auth & Realtime DB', level: 91 },
      { name: 'Room Database & SQL', level: 85 },
      { name: 'Google Maps API & ML Kit', level: 82 },
      { name: 'System Architecture & Testing', level: 87 },
    ],
  },
  {
    id: 'design-media',
    title: 'UI/UX & Game Interface',
    tag: 'UI / UX',
    skills: [
      { name: 'Figma & Adobe XD Prototyping', level: 93 },
      { name: 'Game HUD & Menu Systems', level: 90 },
      { name: 'Wireframing & User Flows', level: 88 },
      { name: 'Interactive Visual Direction', level: 89 },
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'escape-room',
    title: 'Escape Room: The Code Murders',
    subtitle: 'Unity 3D Atmospheric Horror Mystery',
    category: 'game',
    badge: '3D HORROR MYSTERY',
    year: '2025',
    featured: true,
    description:
      'An immersive first-person 3D horror mystery built in Unity, placing players inside a locked industrial room governed by a master terminal. Features data-driven puzzles, secure Firebase account management, and REST API/JSON-powered game logic.',
    highlights: [
      'First-person movement & object interaction built with C# Raycasting system',
      'Secure player authentication & API-based dynamic puzzle system via Firebase + JSON',
      'Final-year completed campus showcase with full gameplay walkthrough',
    ],
    image: './assets/projects/escape-room.png',
    tech: ['Unity 3D', 'C#', 'Firebase', 'REST API', 'JSON'],
    githubUrl: 'https://github.com/hiranhs/Escape-Room',
    liveUrl: 'https://tharindu-hiran.itch.io/',
    liveLabel: 'Play on itch.io',
    youtubeId: 'XsyQT6vAZAE',
  },
  {
    id: 'road-to-heaven',
    title: 'Road to Heaven',
    subtitle: 'Stylized 2D Pixel Art Adventure',
    category: 'game',
    badge: 'PLAYABLE DEMO',
    year: '2025',
    featured: true,
    description:
      'A stylized 2D pixel-art adventure game built with Unity and C#. Journey across glowing caverns and crystal-lit paths featuring responsive character controllers, atmospheric particle effects, and interactive obstacles.',
    highlights: [
      'Playable directly in the browser via Unity Play WebGL build',
      'Custom 2D glowing environments, smooth physics & responsive platforming',
      'Clean C# state machine for player movement, hazards, and level transitions',
    ],
    image: './assets/projects/road-to-heaven.jpg',
    tech: ['Unity 2D', 'C#', 'Pixel Art', 'WebGL', 'Game Design'],
    githubUrl: 'https://github.com/hiranhs/Road-to-Heaven',
    liveUrl:
      'https://play.unity.com/en/games/569bebe9-b094-48d1-bcec-c1f79f497379/final-2d-game-road-to-heaven',
    liveLabel: 'Play Live on Unity',
  },
  {
    id: 'drakoz-3d-horror',
    title: 'Drakoz — 3D Action Horror',
    subtitle: 'High-Fidelity 3D Action Combat Prototype',
    category: 'game',
    badge: 'IN DEVELOPMENT',
    year: '2026',
    featured: true,
    description:
      'A chilling 3D action-horror experience combining realistic 3D environments, lifelike character models, custom dark HUD interfaces, and fluid melee fighting and locomotion animations.',
    highlights: [
      'Dynamic C# combat system paired with responsive enemy AI behavior',
      'Integrated character animations, realistic 3D models & interactive environments',
      'Active development build with live YouTube gameplay preview',
    ],
    image: './assets/projects/3d-action-horror.jpg',
    tech: ['Unity 3D', 'C#', 'Enemy AI', 'Animations', 'Combat UI'],
    youtubeId: '50y68Ym-fdo',
  },
  {
    id: 'school-dbms',
    title: 'School DBMS Mobile App',
    subtitle: 'Delta Gemunupura College Management System',
    category: 'app',
    badge: 'NATIONAL PRESS',
    year: '2025',
    description:
      'Hybrid Android/WSA application crafted for Delta Gemunupura College (Pussellawa, Sri Lanka), streamlining student records, attendance tracking, timetables, and exams — cutting manual workload by 40%.',
    highlights: [
      'Formally handed over to the Zonal Director of Education & School Principal',
      'Published in national newspapers: The Sunday Times & Sunday Observer',
      'Built with Kotlin, Android Studio, Firebase, and Figma UI/UX',
    ],
    image: './assets/projects/school-dbms.jpg',
    tech: ['Kotlin', 'Android Studio', 'Firebase', 'Figma', 'WSA'],
    githubUrl: 'https://github.com/hiranhs/Delta-Gemunupura-College-School-DBMS',
  },
  {
    id: 'lostlk',
    title: 'LostLK',
    subtitle: 'Real-Time Lost & Found Map Hub',
    category: 'app',
    badge: 'ANDROID + MAPS',
    year: '2024',
    description:
      'Campus and neighborhood lost & found mobile hub across Sri Lanka featuring live Google Maps pinning, secure Firebase authentication, local Room caching, and ML Kit smart assistance.',
    highlights: [
      'Real-time location reporting and discovery via Google Maps API',
      'Offline-ready persistence with Room Database + Firebase Auth',
      'Intuitive user flows designed end-to-end in Figma',
    ],
    image: './assets/projects/lostlk.jpg',
    tech: ['Kotlin', 'Firebase', 'Google Maps', 'ML Kit', 'Room DB'],
    githubUrl: 'https://github.com/hiranhs/LostLK-Mobile-Application',
  },
  {
    id: 'fenshi-clothing',
    title: 'Fenshi Clothing',
    subtitle: 'Responsive E-Commerce Web Platform',
    category: 'app',
    badge: 'FULL-STACK WEB',
    year: '2024',
    description:
      'Modern responsive fashion e-commerce platform enabling seamless product browsing, detailed views, and shopping cart management powered by a custom PHP & MySQL backend.',
    highlights: [
      'Custom responsive storefront crafted with semantic HTML, CSS & JS',
      'Dynamic catalog, cart flow, and order management on PHP + MySQL',
      'Clean luxury-inspired typography and product presentation',
    ],
    image: './assets/projects/fenshi-clothing.jpg',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
    githubUrl: 'https://github.com/hiranhs/Fenshi-Clothing-E-Commerce-Website',
  },
];

export const GAMEPLAY_VIDEOS: GameplayVideo[] = [
  {
    id: 'escape-room-walkthrough',
    title: 'Escape Room — Full Walkthrough',
    status: 'COMPLETED BUILD',
    description:
      'Final-year Unity 3D horror mystery campus project showcasing atmospheric room exploration, terminal decryption, and puzzle progression.',
    youtubeId: 'XsyQT6vAZAE',
    tags: ['Unity 3D', 'Horror Mystery', 'Firebase + REST'],
  },
  {
    id: 'drakoz-preview',
    title: 'Drakoz — Gameplay Preview',
    status: 'WORK IN PROGRESS',
    description:
      'Early 3D action-horror gameplay preview featuring fluid combat animations, custom character controllers, and dark atmospheric environments.',
    youtubeId: '50y68Ym-fdo',
    tags: ['Unity 3D', 'Action Horror', 'Animations'],
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'national-press',
    title: 'Featured in Sunday Times & Sunday Observer',
    issuer: 'Sri Lanka National Newspapers',
    date: 'November 2025',
    rarity: 'NATIONAL PRESS',
    xp: '+2500 XP',
    description:
      'Earned national media recognition in both The Sunday Times (Education Times) and Sunday Observer for building and formally handing over the Delta Gemunupura College School Management System as part of Team Nurox at SLIIT City UNI.',
    image: './assets/press/sunday-times.jpg',
    secondaryImage: './assets/press/sunday-observer.jpg',
  },
  {
    id: 'blessed-rat-film',
    title: '"Blessed Rat" — 2× Award-Winning Short Film',
    issuer: 'University of Ruhuna (2nd Place) & University of Peradeniya (3rd Place) // Wanderlust Pictures',
    date: '2026',
    rarity: 'FILM AWARD',
    xp: '+4000 XP',
    description:
      'What began in 2024 with zero budget and big ambitions grew into a double award-winning short film by Wanderlust Pictures — taking 2nd Place (Best Short Film) at Frame by Frame 1.0 (Rotaract Club of University of Ruhuna) and 3rd Place (Open Category) at the Student Literature Festival 2026 (University of Peradeniya).',
    image: './assets/press/blessed-rat-ruhuna-poster.jpg',
    secondaryImage: './assets/press/blessed-rat-ceremony.jpg',
    link: 'https://www.youtube.com/watch?v=I-2hxhEdKAs',
    linkLabel: 'Watch Short Film on YouTube',
  },
  {
    id: 'cs-second-class-upper',
    title: 'BSc (Hons) Computer Science — Second Class Upper Division',
    issuer: 'SLIIT City UNI (Sri Lanka Institute of Information Technology)',
    date: 'Academic Honours',
    rarity: 'HONOURS',
    xp: '+3000 XP',
    description:
      'Achieved Second Class Upper Division Honours in Computer Science, demonstrating strong academic excellence across software engineering, game development, algorithms, databases, and human-computer interaction.',
  },
  {
    id: 'game-dev-comp',
    title: 'GAME FEST 2026 — 2nd Place (University Category)',
    issuer: 'Department of Computing, SLIIT Kandy UNI // Team Orzio',
    date: '24 July 2026',
    rarity: 'LEGENDARY',
    xp: '+3500 XP',
    description:
      'Secured 2nd Place in the University Category at GAME FEST 2026 — the School and Inter-University Game Development Competition held at SLIIT Kandy UNI — building a complete Unity Engine game within a 6-hour game development challenge with Team Orzio.',
  },
  {
    id: 'published-games',
    title: 'Published Playable Builds on Unity Play & itch.io',
    issuer: 'Unity Play & itch.io Indie Platforms',
    date: '2025 – 2026',
    rarity: 'SHIPPED',
    xp: '+1500 XP',
    description:
      'Successfully packaged and shipped public playable builds — including Road to Heaven (WebGL on Unity Play) and Escape Room: The Code Murders on itch.io.',
    link: 'https://play.unity.com/en/games/569bebe9-b094-48d1-bcec-c1f79f497379/final-2d-game-road-to-heaven',
    linkLabel: 'Launch Unity Play',
  },
  {
    id: 'school-impact',
    title: '40% Administrative Workload Reduction',
    issuer: 'Delta Gemunupura College, Kothmale',
    date: 'October 2025',
    rarity: 'IMPACT',
    xp: '+1400 XP',
    description:
      'Delivered a production Kotlin + Firebase school management system formally accepted by the Zonal Director of Education and Principal, digitizing attendance, student records, and exam tracking.',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-gf-award',
    title: 'GAME FEST 2026 — 2nd Place Award Ceremony',
    category: 'gamefest',
    categoryLabel: 'Game Fest 2026',
    caption:
      'Receiving the 2nd Place University Category award at SLIIT Kandy UNI Inter-University Game Development Competition.',
    image: './assets/gamefest/gamefest-award.jpg',
  },
  {
    id: 'g-gf-cert',
    title: 'GAME FEST 2026 — Certificate of Achievement',
    category: 'gamefest',
    categoryLabel: 'Game Fest 2026',
    caption:
      'Official Certificate presented to Tharindu Hiran Samaranayake for securing 2nd Place in the University Category (24 July 2026).',
    image: './assets/gamefest/gamefest-certificate.jpg',
  },
  {
    id: 'g-gf-team',
    title: 'Team Orzio — GAME FEST 2026',
    category: 'gamefest',
    categoryLabel: 'Game Fest 2026',
    caption:
      'Team Orzio representing SLIIT City UNI on the GAME FEST 2026 backdrop at SLIIT Kandy UNI.',
    image: './assets/gamefest/gamefest-team.jpg',
  },
  {
    id: 'g-gf-solo',
    title: 'Tharindu Hiran — GAME FEST 2026 Stage',
    category: 'gamefest',
    categoryLabel: 'Game Fest 2026',
    caption:
      'Solo event highlight from the Inter-University Game Development Competition at SLIIT Kandy UNI.',
    image: './assets/gamefest/gamefest-solo.jpg',
  },
  {
    id: 'g-escape',
    title: 'Escape Room: The Code Murders',
    category: 'game-art',
    categoryLabel: 'Game Key Art',
    caption: 'Unity 3D Horror Mystery key visual featuring terminal decryption & chained exit door.',
    image: './assets/projects/escape-room.png',
  },
  {
    id: 'g-road',
    title: 'Road to Heaven — Key Art',
    category: 'game-art',
    categoryLabel: 'Game Key Art',
    caption: 'Stylized 2D pixel adventure artwork with glowing crystal caverns and ethereal skies.',
    image: './assets/projects/road-to-heaven.jpg',
  },
  {
    id: 'g-horror',
    title: 'Drakoz — 3D Character Render',
    category: 'game-art',
    categoryLabel: 'Game Key Art',
    caption: 'High-detail 3D action-horror warrior portrait render for upcoming Unity 3D project.',
    image: './assets/projects/3d-action-horror.jpg',
  },
  {
    id: 'g-times',
    title: 'The Sunday Times Feature',
    category: 'press',
    categoryLabel: 'National Press',
    caption: 'Education Times (Nov 16, 2025): Delta Gemunupura College Receives New School Management System.',
    image: './assets/press/sunday-times.jpg',
  },
  {
    id: 'g-observer',
    title: 'Sunday Observer Feature',
    category: 'press',
    categoryLabel: 'National Press',
    caption: 'Sunday Observer national print coverage of the official handover ceremony with Team Nurox.',
    image: './assets/press/sunday-observer.jpg',
  },
  {
    id: 'g-blessed-rat-ruhuna-poster',
    title: 'Blessed Rat — 2nd Place (Frame by Frame 1.0)',
    category: 'press',
    categoryLabel: 'Film Award',
    caption:
      '2nd Place — Best Short Film at Frame by Frame 1.0 Short Movie Competition 2026, organized by the Rotaract Club of the University of Ruhuna.',
    image: './assets/press/blessed-rat-ruhuna-poster.jpg',
    externalUrl: 'https://www.youtube.com/watch?v=I-2hxhEdKAs',
  },
  {
    id: 'g-blessed-rat-ruhuna-cert',
    title: 'Frame by Frame 2026 — Certificate of Excellence',
    category: 'press',
    categoryLabel: 'Film Award',
    caption:
      'Certificate of Excellence presented to Tharindu Hiran Samaranayake for securing Second Place in Frame by Frame Short Movie Competition 2026 (Rotaract Club of University of Ruhuna).',
    image: './assets/press/blessed-rat-ruhuna-cert.jpg',
    externalUrl: 'https://www.youtube.com/watch?v=I-2hxhEdKAs',
  },
  {
    id: 'g-blessed-rat',
    title: 'Blessed Rat — 3rd Place Short Film Poster',
    category: 'press',
    categoryLabel: 'Film Award',
    caption:
      'Wanderlust Pictures — 3rd Place (Open Category) at Let My Country Awake / Student Literature Festival 2026, University of Peradeniya.',
    image: './assets/press/blessed-rat-award.jpg',
    externalUrl: 'https://www.youtube.com/watch?v=I-2hxhEdKAs',
  },
  {
    id: 'g-blessed-rat-stage',
    title: 'Blessed Rat — Award Ceremony with Prof. Indika Ferdinando',
    category: 'press',
    categoryLabel: 'Film Award',
    caption:
      'Receiving the 3rd Place (Open Category) award & certificates for Blessed Rat from Prof. K. W. K. M. M. W. Indika Ferdinando at E.O.E. Pereira Theatre, University of Peradeniya.',
    image: './assets/press/blessed-rat-ceremony.jpg',
    externalUrl: 'https://www.youtube.com/watch?v=I-2hxhEdKAs',
  },
];
