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
  demoDay?: boolean;
  events?: string[];
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
    demoDay: true,
  },
  {
    name: 'Brandon Davenport',
    role: 'Dir. Communications, Hgraph',
    company: 'Hgraph',
    bio: 'Brandon Davenport is the Director of Communications at Hgraph, a company at the forefront of developing breakthrough data-focused products on Hedera and beyond. A recognized leader in the Hedera community, Brandon plays key roles in ecosystem-wide initiatives and has been instrumental in launching successful projects that drive innovation on the network. Based in Ottawa, Canada, Brandon is also a passionate NFT creator, musician and drummer.',
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
    events: ['africa-hackathon'],
  },
  {
    name: 'Brady Gentile',
    role: 'Founder, Bonzo Finance',
    company: 'Bonzo Finance Labs',
    bio: "Brady Gentile is the Co-Founder and CEO of Bonzo Finance Labs — contributing to the development of Bonzo Finance, an open source, non-custodial lending protocol based on Aave v2 deployed to Hedera. Brady's previous experience includes Product Marketing for blockchain, security, and distributed systems companies' Hedera, Cloudflare, and DataStax.",
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
    name: 'Gaurang Torvekar',
    role: 'Co-Founder',
    company: 'Bonzo Finance Labs',
    bio: 'Gaurang is a protocol-level innovator with 8+ years building blockchain products. He is the CTO and co-founder of Bonzo Finance, which has generated over $50M in TVL (Total Value Locked). Gaurang has earned international recognition with 20+ major media features, including Forbes and CoinDesk. Currently pioneering how conversational AI transforms complex crypto operations into intuitive experiences, he brings proven expertise in scaling Web3 infrastructure and deep technical knowledge to evaluate the next generation of AI-native decentralized applications.',
    image: '/img/hackathon/gaurang.jpg',
    socials: [
      { type: 'linkedin', url: 'https://www.linkedin.com/in/gaurangtorvekar/' },
      { type: 'website', url: 'https://bonzo.finance/' },
    ],
    events: ['africa-hackathon'],
  },
  {
    name: 'Michael Kantor',
    role: 'President',
    company: 'Hashgraph Online',
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
    demoDay: true,
    events: ['africa-hackathon'],
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
    demoDay: true,
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
    name: 'Patricia Carapinha',
    role: 'Founder, SentX',
    company: 'SentX',
    bio: 'Patricia is a Co-Founder of SentX, the leading NFT marketplace on Hedera and Vice President of Hashgraph Online.',
    image:
      'https://pbs.twimg.com/profile_images/1757434156475179009/nirrAh1U_400x400.jpg',
    socials: [{ type: 'twitter', url: 'https://x.com/PattyAlexx' }],
    events: ['africa-hackathon'],
    demoDay: true,
  },
  {
    name: 'Quincy Jones',
    role: 'Lead Developer Relations',
    company: 'XDC Foundation',
    bio: 'From blockchain developer, to community relations I’m here to help the network, and assist other developers,builders and organizations develop and expand the notoriety and visibility of the projects on the XDC Network as well as assist the growth of the network itself',
    image: '/img/hackathon/quincy-jones.jpg',
    socials: [{ type: 'twitter', url: 'https://x.com/coinclubquincy' }],
    demoDay: true,
  },
  {
    name: 'Lance Lilly',
    role: 'Ecosystem Development Manager',
    company: 'XDC Foundation',
    bio: 'As an Ecosystem Development Manager at the XDC Foundation, I focus on growing users, developers, and adoption of the XDC Network. This includes leading programs and projects that address ecosystem needs, such as integrations, developer initiatives, and onboarding strategic projects. I also work closely with the communications team on messaging, awareness, technical writing, and strategic communications.',
    image: '/img/hackathon/lance-lilly.jpeg',
    socials: [
      { type: 'linkedin', url: 'https://www.linkedin.com/in/orren-lilly/' },
    ],
    demoDay: true,
  },
  {
    name: 'Dr. Leemon Baird',
    role: 'Co-founder, Chief Scientist',
    company: 'Hashgraph, Hedera',
    bio: 'Dr. Leemon Baird is the Co-founder and Chief Scientist at Hashgraph. The inventor of the organization’s namesake, the distributed hashgraph consensus algorithm, Leemon co-founded the Hedera network with Mance Harmon. He has two decades of technology and start-up experience, and served as Professor of Computer Science at the US Air Force Academy, as well as holding senior scientist roles in several labs. Leemon received his PhD in Computer Science from Carnegie Mellon University and has multiple patents and publications in peer-reviewed journals. He has spoken at conferences in computer security, machine learning and mathematics. ',
    image: '/img/hackathon/leemon-baird.webp',
    socials: [{ type: 'twitter', url: 'https://x.com/leemonbaird' }],
    demoDay: true,
  },
  {
    name: 'Aleksandr Nechaev',
    role: 'Partner',
    company: 'Funders VC',
    bio: '10+ yrs in growth & product. Backing/advising crypto startups with hands-on support and product expertise',
    image: '/img/hackathon/aleksandr-nechaev.jpg',
    socials: [
      {
        type: 'linkedin',
        url: 'https://www.linkedin.com/in/aleksandr-nechaev-9579b910a/',
      },
      {
        type: 'twitter',
        url: 'https://x.com/al_nechaev',
      },
      {
        type: 'website',
        url: 'https://funders.vc',
      },
    ],
    demoDay: true,
  },
  {
    name: 'Scott Friedman',
    role: 'Partner',
    company: 'Helix',
    bio: 'is a partner at Helix, a thesis-driven advisory platform where he serves as a fractional founder and investor through the Helixer venture syndicate.',
    image: '/img/hackathon/scott-friedman.jpeg',
    socials: [
      {
        type: 'linkedin',
        url: 'https://www.linkedin.com/in/scott-friedman/',
      },
      {
        type: 'twitter',
        url: 'https://x.com/_ScottFriedman',
      },
    ],
    demoDay: true,
  },
  {
    name: 'Ryan Solomon',
    role: 'Founder',
    company: 'Genfinity',
    bio: 'CEO of Genfinity, a blockchain media company at the forefront of innovation, delivering impactful podcasts, insightful articles, and maintaining a dynamic presence across social platforms. With more than a decade in project management, and a proud background as a military veteran, Ryan combines strategic leadership and a mission-driven approach to drive value into the Web3 landscape.',
    image: '/img/hackathon/ryan-solomon.jpg',
    socials: [
      {
        type: 'linkedin',
        url: 'https://www.linkedin.com/in/ryansolomon123/',
      },
      {
        type: 'twitter',
        url: 'https://x.com/IOV_OWL',
      },
    ],
    demoDay: true,
  },
  {
    name: 'Rob Allen',
    role: 'Head of Future Payments',
    company: 'Australian Payments Plus',
    bio: 'Entrepreneur, engineer, and impact-focused technologist, Rob brings over 30 years of experience across banking, defense, and enterprise innovation. He leads Future Payments Strategy at Australian Payments Plus and runs nodl.io a consultancy using decentralized tech to solve real-world problems- from financial inclusion to environmental sustainability.',
    image: '/img/hackathon/rob-allen.jpeg',
    socials: [{ type: 'twitter', url: 'https://x.com/rob_nodl' }],
    demoDay: true,
  },
  {
    name: 'Pietro Negri',
    role: 'Investor Relations & Partnerships',
    company: 'Outlier Ventures',
    bio: "Pietro Negri is leading investor relations and partnerships at Outlier Ventures, focusing on expanding the investor network, connecting teams to investors according to their appetite and identifying new key partners for OV's accelerator programs",
    image: '/img/hackathon/pietro-negri.jpg',
    socials: [{ type: 'twitter', url: 'https://x.com/Pietroo_Negri' }],
    demoDay: true,
  },
  {
    name: 'Kayla Phillips',
    role: 'Senior Venture Principal',
    company: 'Hivemind Ventures',
    bio: 'Kayla Phillips is a Senior Venture Principal at Hivemind, where she invests in crypto and blockchain projects across all funding stages. Prior to Hivemind, she worked as a crypto and generalist VC for several firms, including Truffle Ventures, Alumni Ventures, and White Star Capital. She holds an MBA from Columbia and a BS from Virginia Tech.',
    image: '/img/hackathon/kayla-phillips.png',
    socials: [{ type: 'twitter', url: 'https://x.com/kay_phillips_' }],
    demoDay: true,
  },
  {
    name: 'Mance Harmon',
    role: 'Co-founder',
    company: 'Hashgraph, Hedera',
    bio: 'Mance is the Co-founder and Chairman of the Board at Hashgraph. As a Co-founder of Hedera, he has extensive experience as a business leader in Web3. Previously, he served as Head of Architecture and Labs at Ping Identity, as well as founding and leading two tech start-ups and managing Product Security at a $1.7 billion revenue organization. Mance is the Program Manager for the large-scale software program at the Missile Defense Agency, and the Course Director for Cybersecurity at the US Air Force Academy, as well as a research scientist in Machine Learning at Wright Laboratory. He received an MS in Computer Science from the University of Massachusetts and a BS in Computer Science from Mississippi State University.',
    image: '/img/hackathon/mance-harmon.webp',
    socials: [{ type: 'twitter', url: 'https://x.com/ManceHarmon' }],
    demoDay: true,
  },
  {
    name: 'Marco Podien',
    role: 'Senior Developer Advocate',
    company: 'Algorand',
    bio: 'With over two decades in IT and a passion for Blockchain, GenAI and DevRel, Marco is building bridges from Web 2.0 to Web3. He specializes in community-building and enhancing developer experience through innovative tooling and education. His mission: to foster collaboration, empower developers to explore new technologies, to seek out new life and new civilizations, to boldly go where no nerd has gone before. 🦄',
    image: '/img/hackathon/marco-podien.jpeg',
    socials: [{ type: 'twitter', url: 'https://x.com/marcopodien' }],
    demoDay: true,
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
    bio: 'Ed is an Engineer and Marketer experienced in advanced vehicle technology, model-based design (MBD), and distributed ledger technologies (DLT). He is passionate about leading interdisciplinary teams, building user-centric solutions, and connecting with developers and organizations in technology sectors. Currently, Ed works at Hashgraph, growing Hedera and helping developers adopt Web 3. He is also pursuing a graduate degree in Management at Harvard.',
    image: '/img/hackathon/ed-marquez.jpg',
    socials: [{ type: 'twitter', url: 'https://twitter.com/ed__marquez' }],
    expertise: [
      'Developer Relations',
      'System Interoperability',
      'AI Communication',
      'Framework Design',
    ],
    demoDay: true,
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
    demoDay: true,
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
    bio: 'Ejaz Merchant is a Developer Advocate at Hashgraph, dedicated to equipping developers with the tools, resources, and insights they need to build on Hedera.',
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
    name: 'Michael Kantor',
    role: 'President',
    company: 'Hashgraph Online',
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
    demoDay: true,
    events: ['africa-hackathon'],
  },
  {
    name: 'Brandon Davenport',
    role: 'Dir. Communications, Hgraph',
    company: 'Hgraph',
    bio: 'Brandon Davenport is the Director of Communications at Hgraph, a company at the forefront of developing breakthrough data-focused products on Hedera and beyond. A recognized leader in the Hedera community, Brandon plays key roles in ecosystem-wide initiatives and has been instrumental in launching successful projects that drive innovation on the network. Based in Ottawa, Canada, Brandon is also a passionate NFT creator, musician and drummer.',
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
    events: ['africa-hackathon'],
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
