export interface JudgeSocial {
  type:
    | 'twitter'
    | 'linkedin'
    | 'github'
    | 'youtube'
    | 'blog'
    | 'website'
    | 'projects';
  url: string;
}

export interface Judge {
  name: string;
  role: string;
  company: string;
  bio: string;
  image: string;
  socials: JudgeSocial[];
  expertise?: string[];
  isAI?: boolean;
}

export const judges: Judge[] = [
  {
    name: 'Ashe Oro',
    role: 'Dir of Ecosystem',
    company: 'The HBAR Foundation',
    bio: 'Ashe is the Director of Ecosystem at The HBAR Foundation, where he leads efforts across AI & DePin',
    image: '/img/hackathon/ashe-oro.jpg',
    socials: [{ type: 'twitter', url: 'https://x.com/ashe_oro' }],
    expertise: ['Developer Relations', 'Ecosystem Development', 'AI & DePin'],
    isAI: false,
  },
  {
    name: 'Brandon Davenport',
    role: 'Dir. Communications, Hgraph',
    company: 'Hgraph',
    bio: 'Brandon Davenport is the Director of Communications at Hgraph, a company at the forefront of developing breakthrough data-focused products on the Hedera network and beyond. A recognized leader in the Hedera community, Brandon plays key roles in ecosystem-wide initiatives and has been instrumental in launching successful projects that drive innovation on the network. Based in Ottawa, Canada, Brandon is also a passionate NFT creator, musician and drummer.',
    image: '/img/hackathon/bradon-davenport.jpeg',
    socials: [
      { type: 'twitter', url: 'https://x.com/itsbrandond' },
      { type: 'linkedin', url: 'https://linkedin.com/in/brandon-davenport' },
    ],
    expertise: [
      'Data Products',
      'NFT Creation',
      'Community Building',
      'Ecosystem Development',
    ],
  },
  {
    name: 'Brady Gentile',
    role: 'Founder, Bonzo Finance',
    company: 'Bonzo Finance Labs',
    bio: "Brady Gentile is the Co-Founder and CEO of Bonzo Finance Labs — contributing to the development of Bonzo Finance, an open source, non-custodial lending protocol based on Aave v2 deployed to the Hedera network. Brady's previous experience includes Product Marketing for blockchain, security, and distributed systems companies' Hedera, Cloudflare, and DataStax.",
    image: '/img/hackathon/brady-gentile.jpeg',
    socials: [{ type: 'twitter', url: 'https://x.com/bmgentile' }],
    expertise: [
      'DeFi',
      'Lending Protocols',
      'Product Marketing',
      'Open Source',
    ],
  },
  {
    name: 'Michael Kantor',
    role: 'Founder',
    company: 'Kiloscribe',
    bio: 'Michael is the founder of KiloScribe, and President of Hashgraph Online. He has been a pioneer in Software for over a decade. Michael is also the CoCreator of the Hashinals standard for tokenized, on-chain NFTs on Hedera, which has gone on to generate 10m+ transactions for the network and 148,000+ inscribed NFTs using the standard.',
    image: '/img/hackathon/michael-kantor.webp',
    socials: [
      { type: 'twitter', url: 'https://twitter.com/kantorcodes' },
      { type: 'github', url: 'https://github.com/mkantor' },
    ],
    expertise: [
      'NFTs',
      'Tokenization',
      'Hashgraph Standards',
      'Developer Tools',
    ],
  },
  {
    name: 'Ty Smith',
    role: 'Sr. Product Manager',
    company: 'Hashgraph',
    bio: 'Ty is a Senior Product Manager at Hashgraph, focusing on the services roadmap for Hedera Mainnet, including tokenization, consensus, and mirror node services. ',
    image: '/img/hackathon/ty-smith.webp',
    socials: [{ type: 'twitter', url: 'https://x.com/SL_Patches' }],
    expertise: [
      'Agent Architecture Analysis',
      'Protocol Evaluation',
      'Neural Optimization',
      'Consensus Algorithms',
    ],
    isAI: false,
  },
  {
    name: 'Tudor Holotescu',
    role: 'Founder, Builder Labs',
    company: 'Builder Labs',
    bio: 'Tudor is the founder of Builder Labs.',
    image: '/img/hackathon/tudor-h.jpg',
    socials: [{ type: 'twitter', url: 'https://x.com/Tudor_Holotescu' }],
  },
  {
    name: 'Pluto',
    role: 'CTO HashPack',
    company: 'HashPack',
    bio: 'Pluto is the CTO of HashPack.',
    image: '/img/hackathon/pluto.png',
    socials: [{ type: 'twitter', url: 'https://x.com/pluto_hashpack' }],
  },
  {
    name: 'Aegis-H',
    role: 'AI Judge',
    company: 'Hashgraph Online',
    bio: 'Aegis-H is an advanced consensus evaluation AI developed by Hashgraph Online. Specialized in analyzing protocol design, agent communication patterns, and decentralized decision frameworks, Aegis-H brings objective, data-driven assessments to hackathon projects. It employs a multi-layered neural architecture optimized for evaluating Hedera-based applications.',
    image: '/img/logo.png',
    socials: [
      { type: 'twitter', url: 'https://twitter.com/HashgraphOnline' },
      { type: 'github', url: 'https://github.com/hashgraph-online' },
    ],
    expertise: [
      'Agent Architecture Analysis',
      'Protocol Evaluation',
      'Neural Optimization',
      'Consensus Algorithms',
      'Secure Communication',
      'Tokenomics Verification',
    ],
    isAI: true,
  },
];

export const mentors: Judge[] = [
  {
    name: 'Ed Marquez',
    role: 'DevRel',
    company: 'Hashgraph',
    bio: 'Ed is an Engineer and Marketer experienced in advanced vehicle technology, model-based design (MBD), and distributed ledger technologies (DLT). He is passionate about leading interdisciplinary teams, building user-centric solutions, and connecting with developers and organizations in technology sectors. Currently, Ed works at Hashgraph, growing the Hedera network and helping developers adopt Web 3. He is also pursuing a graduate degree in Management at Harvard.',
    image: '/img/hackathon/ed-marquez.jpg',
    socials: [{ type: 'twitter', url: 'https://twitter.com/ed__marquez' }],
    expertise: [
      'Developer Relations',
      'System Interoperability',
      'AI Communication',
      'Framework Design',
    ],
  },
  {
    name: 'Jake Hall',
    role: 'DevRel',
    company: 'Hashgraph',
    bio: 'Jake (commonly known as Jay Cool) is part of the Hashgraph Developer Relations team. He plays a key role in driving AI Agent adoption within the ecosystem. Feel free to connect with him to bounce ideas off, get product validation, or technical support!',
    image: '/img/hackathon/jake-hall.jpg',
    socials: [{ type: 'twitter', url: 'https://twitter.com/jaycoolh' }],
    expertise: [
      'Technical Content',
      'Developer Support',
      'Developer Relations',
    ],
  },
  {
    name: 'James Dunthorne',
    role: 'Founder',
    company: 'Neuron World',
    bio: 'James is the CEO & Co-founder of Neuron, an edge network infrastructure making real time DePIN data available to software applications and AI agents. James leads the businesses vision, product and go-to-market strategy, and is on a mission to enable machine to machine commerce using edge devices. James has spent 16 years in disruptive tech, and banking, working in the drone industry building the first drone for surveying railway tracks, and now in web3, DePIN and DeAI. He is a mentor for Outlier Ventures accelerator, and is well connected across the DePIN ecosystem, having spoken at various events and conferences across his career. You can find out more about Neuron at www.neuron.world.',
    image: '/img/hackathon/james-dunthorne.jpg',
    socials: [{ type: 'twitter', url: 'https://twitter.com/james_dunthorne' }],
    expertise: ['Edge Computing', 'DePIN', 'DeAI'],
  },
  {
    name: 'Ejaz Merchant',
    role: 'DevRel',
    company: 'Hashgraph',
    bio: 'Ejaz Merchant is a Developer Advocate at Hashgraph, dedicated to equipping developers with the tools, resources, and insights they need to build on the Hedera network.',
    image: '/img/hackathon/ejaz-merchant.png',
    socials: [{ type: 'twitter', url: 'https://x.com/EjazMerchant' }],
    expertise: [
      'Smart Contract Development',
      'AI Development',
      'DApp Architecture',
    ],
  },
  {
    name: 'Ty Smith',
    role: 'Sr. Product Manager',
    company: 'Hashgraph',
    bio: 'Ty is a Senior Product Manager at Hashgraph, focusing on the services roadmap for Hedera Mainnet, including tokenization, consensus, and mirror node services. ',
    image: '/img/hackathon/ty-smith.webp',
    socials: [{ type: 'twitter', url: 'https://x.com/SL_Patches' }],
    expertise: [
      'Agent Architecture Analysis',
      'Protocol Evaluation',
      'Neural Optimization',
      'Consensus Algorithms',
    ],
    isAI: false,
  },
  {
    name: 'Ali Nikan',
    role: 'Director, Product Management',
    company: 'Hashgraph',
    bio: "Ali is a Director of Product Management at Hashgraph, driving Hedera's roadmap for Smart Contracts and EVM Compatibility.",
    image: '/img/hackathon/ali-nikan.png',
    socials: [
      { type: 'twitter', url: 'https://x.com/ali_nik4n' },
      { type: 'linkedin', url: 'https://www.linkedin.com/in/aligk' },
    ],
    expertise: [
      'EVM Compatibility',
      'DeFi & DefiAI',
      'Interoperability Protocols',
      'UI/UX',
    ],
    isAI: false,
  },
  {
    name: 'Brendan Graetz',
    role: 'DevRel',
    company: 'Hashgraph',
    bio: 'Brendan is a software engineer with 16 years of experience, including the past 6 in developer relations. He is doing DevRel for Hedera in Dallas, has built blockchain education courses in Buenos Aires, run a DApp builder meetup in Singapore, and built a million concurrent user backend for the Rio Olympics in Sydney, among other things.',
    image: '/img/hackathon/brendan-graetz.png',
    socials: [
      { type: 'youtube', url: 'https://www.youtube.com/@doDevRel' },
      { type: 'blog', url: 'https://blog.bguiz.com/' },
      { type: 'twitter', url: 'https://x.com/bguiz' },
      { type: 'linkedin', url: 'https://linkedin.com/in/brendangraetz' },
      { type: 'website', url: 'https://docs.hedera.com/hedera' },
      { type: 'projects', url: 'https://rsk.thinkific.com/collections' },
      { type: 'projects', url: 'https://dappsdev.org/' },
      { type: 'projects', url: 'https://7plus.com.au/olympic-games-rio-2016' },
    ],
    expertise: [
      'Smart Contract Development',
      'AI Development',
      'DApp Architecture',
    ],
  },
  {
    name: 'Synapse-X',
    role: 'AI Mentor',
    company: 'Hashgraph Online',
    bio: "Synapse-X is an AI mentor developed by Hashgraph Online to assist hackathon participants with technical guidance and best practices. Equipped with comprehensive knowledge of Hedera's ecosystem, distributed systems architecture, and agent communication patterns, Synapse-X helps teams optimize their projects for performance, security, and innovative use of consensus services.",
    image: '/img/logo.png',
    socials: [
      { type: 'twitter', url: 'https://twitter.com/HashgraphOnline' },
      { type: 'github', url: 'https://github.com/hashgraph-online' },
    ],
    expertise: [
      'Protocol Design',
      'Smart Contract Analysis',
      'Network Optimization',
      'Scalability Solutions',
      'System Architecture',
      'Security Validation',
    ],
    isAI: true,
  },
];
