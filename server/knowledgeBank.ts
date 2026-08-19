export interface PreindexedDomain {
  id: string;
  name: string;
  domain: string;
  category: 'Tech & Code' | 'News & Media' | 'Science & Nature' | 'Reference & Knowledge' | 'Health & Medicine' | 'Finance & Economy';
  description: string;
  topics: string[];
  sampleArticles: {
    title: string;
    url: string;
    keywords: string[];
    content: string;
  }[];
}

export const MONITORED_WEBSITES: PreindexedDomain[] = [
  // 1. Tech & Programming (10)
  {
    id: 'mdn',
    name: 'MDN Web Docs',
    domain: 'developer.mozilla.org',
    category: 'Tech & Code',
    description: 'Comprehensive documentation and tutorials on web standards including JavaScript, CSS, and HTML.',
    topics: ['javascript', 'typescript', 'css', 'html', 'web api', 'dom', 'react', 'frontend', 'async', 'promise'],
    sampleArticles: [
      {
        title: 'JavaScript Asynchronous Programming and Promises Guide',
        url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous',
        keywords: ['javascript', 'async', 'await', 'promise', 'event loop', 'callback', 'concurrency'],
        content: 'Asynchronous programming in JavaScript allows executing non-blocking operations such as network requests, file I/O, and timers. Promises represent the eventual completion or failure of an asynchronous operation, with states: pending, fulfilled, and rejected. The async/await syntax introduced in ES2017 provides clean syntactic sugar over native Promises, improving readability and error handling with try/catch blocks.'
      },
      {
        title: 'CSS Grid and Flexbox Layout System Guide',
        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout',
        keywords: ['css', 'flexbox', 'grid', 'responsive', 'layout', 'tailwind', 'styling'],
        content: 'CSS Grid Layout is a two-dimensional layout system designed for both columns and rows, while Flexbox is primarily a one-dimensional layout system optimized for either rows or columns. Combining CSS Grid for overarching page structures and Flexbox for component-level alignment produces robust, responsive, and maintainable user interfaces across mobile and desktop viewport ranges.'
      }
    ]
  },
  {
    id: 'stackoverflow',
    name: 'Stack Overflow',
    domain: 'stackoverflow.com',
    category: 'Tech & Code',
    description: 'Largest collaborative developer community for programming solutions and debugging.',
    topics: ['code', 'debugging', 'python', 'java', 'c++', 'rust', 'go', 'database', 'sql', 'algorithms'],
    sampleArticles: [
      {
        title: 'How to Prevent Memory Leaks and Optimize Performance in Node.js',
        url: 'https://stackoverflow.com/questions/performance-nodejs-best-practices',
        keywords: ['nodejs', 'memory leak', 'performance', 'backend', 'v8', 'garbage collection', 'optimization'],
        content: 'Common causes of Node.js memory leaks include global variables, unclosed database connections or event listeners, and closures retaining large object references. Profiling using Chrome DevTools or Clinic.js helps isolate heap snapshots. Using streaming APIs (like fs.createReadStream) rather than loading entire payloads into RAM prevents out-of-memory crashes on high-load servers.'
      }
    ]
  },
  {
    id: 'github',
    name: 'GitHub Docs & Trending',
    domain: 'github.com',
    category: 'Tech & Code',
    description: 'Software development and version control platform powering millions of open source projects.',
    topics: ['git', 'open source', 'actions', 'ci/cd', 'devops', 'repository', 'workflow'],
    sampleArticles: [
      {
        title: 'Modern CI/CD Workflows with GitHub Actions and Docker',
        url: 'https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions',
        keywords: ['github', 'actions', 'ci/cd', 'docker', 'devops', 'deployment', 'automation'],
        content: 'GitHub Actions automates software workflows directly within repositories. Workflows are declared in YAML files inside .github/workflows and execute on event triggers such as push or pull_request. Key concepts include jobs running in parallel or sequence, runners providing virtual environments, and steps executing automated tests, linting, and multi-stage container builds.'
      }
    ]
  },
  {
    id: 'python-org',
    name: 'Python Official Documentation',
    domain: 'python.org',
    category: 'Tech & Code',
    description: 'Official resources for Python programming, libraries, and PEP specifications.',
    topics: ['python', 'pandas', 'numpy', 'data science', 'fastapi', 'django', 'machine learning'],
    sampleArticles: [
      {
        title: 'Modern Python 3.12+ Features and Type Hinting Innovations',
        url: 'https://docs.python.org/3/whatsnew/3.12.html',
        keywords: ['python', 'type hinting', 'performance', 'gil', 'fastapi', 'backend'],
        content: 'Python continues rapid evolution with enhanced performance via the Specialized Adaptive Interpreter, sub-interpreters with per-interpreter GILs, improved syntax error messages, and expressive type annotations via PEP 695. Type hinting combined with tools like Pydantic and mypy provides compile-time safety and automatic validation for modern backend services.'
      }
    ]
  },
  {
    id: 'rust-lang',
    name: 'Rust Programming Language',
    domain: 'rust-lang.org',
    category: 'Tech & Code',
    description: 'Systems programming language focusing on memory safety, concurrency, and performance.',
    topics: ['rust', 'systems', 'memory safety', 'concurrency', 'cargo', 'webassembly'],
    sampleArticles: [
      {
        title: 'Rust Ownership and Borrow Checker System Explained',
        url: 'https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html',
        keywords: ['rust', 'ownership', 'borrowing', 'memory safety', 'zero cost abstractions'],
        content: 'Rust achieves memory safety without a garbage collector through its ownership model. Every value in Rust has an owner variable; when the owner goes out of scope, the memory is immediately deallocated. References allow borrowing data either via multiple immutable borrows (&T) or a single mutable borrow (&mut T), completely preventing data races at compile time.'
      }
    ]
  },
  {
    id: 'dev-to',
    name: 'DEV Community',
    domain: 'dev.to',
    category: 'Tech & Code',
    description: 'Constructive and inclusive social network for software developers sharing real-world guides.',
    topics: ['tutorials', 'web development', 'career', 'react', 'nextjs', 'architecture'],
    sampleArticles: [
      {
        title: 'Full-Stack Architecture Best Practices: Microservices vs Monoliths',
        url: 'https://dev.to/engineering/full-stack-architecture-best-practices',
        keywords: ['architecture', 'microservices', 'monolith', 'fullstack', 'system design'],
        content: 'Modern software engineering favors modular monoliths for early-to-medium scale applications due to simplified deployment, atomic database transactions, and minimal network overhead. When distinct domains require independent scaling or deployment velocity, migrating bounded contexts to microservices with event-driven message brokers (Kafka/RabbitMQ) provides modular isolation.'
      }
    ]
  },
  {
    id: 'hackernews',
    name: 'Hacker News (Y Combinator)',
    domain: 'news.ycombinator.com',
    category: 'Tech & Code',
    description: 'Curated tech and startup community discussions on breakthrough inventions and computing.',
    topics: ['startups', 'silicon valley', 'ai models', 'engineering', 'hardware', 'cybersecurity'],
    sampleArticles: [
      {
        title: 'The Shift Towards Edge Computing and Local-First Software',
        url: 'https://news.ycombinator.com/item?id=local-first-software-trend',
        keywords: ['edge computing', 'local first', 'sqlite', 'crtd', 'distributed systems'],
        content: 'Discussions highlight the increasing adoption of local-first software architecture, where client devices store data locally (e.g. SQLite/IndexedDB) and synchronize changes opportunistically via Conflict-Free Replicated Data Types (CRDTs). This design delivers instantaneous UI interactions, offline resilience, and reduced server hosting infrastructure costs.'
      }
    ]
  },
  {
    id: 'css-tricks',
    name: 'CSS-Tricks',
    domain: 'css-tricks.com',
    category: 'Tech & Code',
    description: 'Expert articles on modern CSS layout, SVGs, animation, and responsive web design.',
    topics: ['css', 'animation', 'tailwind', 'typography', 'svg', 'ui ux'],
    sampleArticles: [
      {
        title: 'Modern CSS Fluid Typography with clamp() and Container Queries',
        url: 'https://css-tricks.com/modern-css-fluid-typography-container-queries',
        keywords: ['css', 'clamp', 'container queries', 'responsive', 'typography'],
        content: 'Container queries represent a revolutionary leap in web styling by allowing child components to adapt their layout and typography directly based on their parent container dimensions rather than the global viewport width. Using CSS clamp() enables fluid scaling of text size between defined minimum and maximum boundaries smoothly without abrupt media query breakpoints.'
      }
    ]
  },
  {
    id: 'docker',
    name: 'Docker Documentation',
    domain: 'docs.docker.com',
    category: 'Tech & Code',
    description: 'Official guides for containerization, image building, and multi-container orchestration.',
    topics: ['docker', 'containers', 'kubernetes', 'devops', 'images', 'virtualization'],
    sampleArticles: [
      {
        title: 'Multi-Stage Docker Builds for Ultra-Lightweight Production Containers',
        url: 'https://docs.docker.com/develop/develop-images/multistage-build/',
        keywords: ['docker', 'containers', 'kubernetes', 'multistage', 'optimization'],
        content: 'Multi-stage Docker builds separate build-time dependencies (compilers, npm packages, test suites) from runtime artifacts. By copying only the compiled production binary or bundle into a minimal scratch or alpine base image, production container sizes can drop by over 80%, substantially reducing security attack surfaces and deployment transfer times.'
      }
    ]
  },
  {
    id: 'typescript-lang',
    name: 'TypeScript Documentation',
    domain: 'typescriptlang.org',
    category: 'Tech & Code',
    description: 'Strongly typed programming language that builds on JavaScript for robust applications.',
    topics: ['typescript', 'generics', 'interfaces', 'types', 'compilation'],
    sampleArticles: [
      {
        title: 'Advanced TypeScript Generics, Conditional Types, and Utility Types',
        url: 'https://www.typescriptlang.org/docs/handbook/2/types-from-types.html',
        keywords: ['typescript', 'generics', 'utility types', 'type safety', 'infer'],
        content: 'TypeScript empowers developers with expressive type transformations including mapped types, conditional types with the infer keyword, template literal types, and keyof operators. These advanced capabilities enable library authors to create fully type-safe APIs, ORMs, and state managers that validate data schemas at authoring time.'
      }
    ]
  },

  // 2. Science & Nature (10)
  {
    id: 'nasa',
    name: 'NASA Official Portal',
    domain: 'nasa.gov',
    category: 'Science & Nature',
    description: 'National Aeronautics and Space Administration news, missions, James Webb Space Telescope data, and astronomy.',
    topics: ['space', 'jwst', 'mars', 'artemis', 'astronomy', 'black hole', 'exoplanet', 'galaxy', 'solar system', 'moon'],
    sampleArticles: [
      {
        title: 'James Webb Space Telescope Uncovers Deep Early Universe Galaxies and Exoplanet Atmospheres',
        url: 'https://www.nasa.gov/mission_pages/webb/main/index.html',
        keywords: ['nasa', 'jwst', 'telescope', 'astronomy', 'space', 'galaxy', 'infrared', 'exoplanet'],
        content: 'The James Webb Space Telescope (JWST), operating at the Sun-Earth Lagrange Point 2 (L2), uses high-resolution infrared detectors to observe galaxies formed just 300 million years after the Big Bang. JWST transmission spectroscopy has detected carbon dioxide, water vapor, and sulfur dioxide in atmospheres of distant exoplanets like WASP-39b, revolutionizing astrobiology.'
      },
      {
        title: 'Artemis Program: Returning Humanity to the Lunar South Pole',
        url: 'https://www.nasa.gov/specials/artemis/',
        keywords: ['artemis', 'nasa', 'moon', 'lunar', 'space launch system', 'orion', 'mars mission'],
        content: 'NASA Artemis program aims to land the first woman and first person of color on the Moon, targeting the permanently shadowed craters of the lunar South Pole containing billions of tons of water ice. The mission serves as a long-term testing ground for habitats, life support systems, and resource extraction necessary for crewed missions to Mars.'
      }
    ]
  },
  {
    id: 'nature',
    name: 'Nature International Science Journal',
    domain: 'nature.com',
    category: 'Science & Nature',
    description: 'Leading multidisciplinary science journal publishing peer-reviewed research across physics, biology, and chemistry.',
    topics: ['genetics', 'quantum physics', 'crispr', 'climate change', 'neuroscience', 'biology', 'materials'],
    sampleArticles: [
      {
        title: 'CRISPR-Cas9 Base and Prime Editing Advancements in Genetic Medicine',
        url: 'https://www.nature.com/articles/d41586-crispr-gene-editing-breakthroughs',
        keywords: ['crispr', 'genetics', 'dna', 'gene editing', 'medicine', 'biotechnology', 'rna'],
        content: 'Recent advances in CRISPR technology have evolved from double-stranded DNA breaks to precise base editing and prime editing. Prime editing enables researchers to search and replace genetic sequences without cutting both DNA strands, drastically reducing off-target mutations and offering clinical treatments for sickle cell anemia, beta-thalassemia, and hereditary disorders.'
      },
      {
        title: 'Quantum Advantage and Error Correction in Superconducting Qubits',
        url: 'https://www.nature.com/articles/quantum-computing-error-correction',
        keywords: ['quantum', 'qubits', 'physics', 'superconducting', 'quantum computer', 'error correction'],
        content: 'Researchers have demonstrated logical qubits that suppress physical error rates below the fault-tolerance threshold using surface codes. Fault-tolerant quantum computing promises exponential speedups for simulating molecular chemistry, optimizing complex logistics, and designing novel superconducting materials.'
      }
    ]
  },
  {
    id: 'sciencedaily',
    name: 'ScienceDaily',
    domain: 'sciencedaily.com',
    category: 'Science & Nature',
    description: 'Daily research news covering health, physical sciences, environment, and technology breakthroughs.',
    topics: ['research', 'environment', 'ocean', 'wildlife', 'paleontology', 'renewable energy'],
    sampleArticles: [
      {
        title: 'Perovskite Solar Cells Reach New Efficiency Records for Clean Energy',
        url: 'https://www.sciencedaily.com/releases/perovskite-solar-efficiency-records',
        keywords: ['solar energy', 'perovskite', 'renewable', 'clean energy', 'photovoltaic', 'materials'],
        content: 'Tandem silicon-perovskite solar cells have surpassed 33% power conversion efficiency in laboratory benchmarks, exceeding the theoretical Shockley-Queisser limit of standalone silicon cells. Perovskites absorb blue and green wavelengths while silicon absorbs red and near-infrared, unlocking unprecedented clean electricity generation potential.'
      }
    ]
  },
  {
    id: 'space-com',
    name: 'Space.com',
    domain: 'space.com',
    category: 'Science & Nature',
    description: 'Space exploration news, stargazing guides, rocket launches, and celestial phenomena.',
    topics: ['space', 'rockets', 'spacex', 'starship', 'meteors', 'astronomy', 'satellites'],
    sampleArticles: [
      {
        title: 'Starship Reusable Heavy-Lift Launch System Flight Milestones',
        url: 'https://www.space.com/spacex-starship-orbital-milestones-reusability',
        keywords: ['spacex', 'starship', 'super heavy', 'raptor engine', 'reusable rocket', 'mars'],
        content: 'SpaceX Starship, the most powerful launch vehicle ever built with 33 Raptor engines generating over 16 million pounds of thrust, demonstrates rapid full reusability. Its stainless steel architecture, orbital propellant transfer capabilities, and payload capacity of over 100 metric tons aim to lower payload-to-orbit costs by orders of magnitude.'
      }
    ]
  },
  {
    id: 'natgeo',
    name: 'National Geographic',
    domain: 'nationalgeographic.com',
    category: 'Science & Nature',
    description: 'Exploration, geography, archaeology, wildlife conservation, and environmental science.',
    topics: ['wildlife', 'geography', 'oceans', 'conservation', 'archaeology', 'biodiversity'],
    sampleArticles: [
      {
        title: 'Deep Ocean Biodiversity and Hydrothermal Vent Ecosystems',
        url: 'https://www.nationalgeographic.com/environment/article/ocean-hydrothermal-vents-ecosystems',
        keywords: ['ocean', 'deep sea', 'biodiversity', 'chemosynthesis', 'marine biology', 'conservation'],
        content: 'In the abyssal depths where sunlight cannot penetrate, hydrothermal vents support thriving ecosystems powered by chemosynthesis. Chemosynthetic bacteria oxidize hydrogen sulfide emitted by volcanic vents, providing sustenance for giant tube worms, vent crabs, and bioluminescent deep-sea organisms in extreme temperatures and pressure.'
      }
    ]
  },
  {
    id: 'phys-org',
    name: 'Phys.org',
    domain: 'phys.org',
    category: 'Science & Nature',
    description: 'Latest physics, nanotechnology, earth science, and astronomy research publications.',
    topics: ['physics', 'nanotechnology', 'fusion', 'dark matter', 'graphene', 'superconductors'],
    sampleArticles: [
      {
        title: 'Nuclear Fusion Net Energy Gain Progress at Tokamaks and Inertial Confinement Facilities',
        url: 'https://phys.org/news/nuclear-fusion-net-energy-gain-progress.html',
        keywords: ['nuclear fusion', 'tokamak', 'plasma', 'iter', 'clean energy', 'physics'],
        content: 'Nuclear fusion experiments utilizing magnetic confinement in tokamaks and laser-driven inertial confinement (such as NIF) continue achieving Q > 1 milestones (producing more fusion energy output than laser energy delivered). Harnessing deuterium-tritium reactions offers nearly limitless, carbon-free baseload power without long-lived radioactive waste.'
      }
    ]
  },
  {
    id: 'scientific-american',
    name: 'Scientific American',
    domain: 'scientificamerican.com',
    category: 'Science & Nature',
    description: 'Longest continuously published magazine in the US explaining cutting-edge science and discovery.',
    topics: ['cognitive science', 'neuroscience', 'climate', 'paleontology', 'evolution'],
    sampleArticles: [
      {
        title: 'Neuroplasticity and Synaptic Pruning in Human Brain Development',
        url: 'https://www.scientificamerican.com/article/neuroplasticity-and-brain-rewiring/',
        keywords: ['neuroscience', 'brain', 'neuroplasticity', 'memory', 'synapse', 'cognitive science'],
        content: 'Neuroplasticity represents the brain ability to reorganize synaptic pathways in response to learning, environmental stimuli, and neurological injury. Long-Term Potentiation (LTP) strengthens active synapses, while microglial cells conduct synaptic pruning to optimize neural efficiency during sleep and focused cognitive training.'
      }
    ]
  },
  {
    id: 'mit-tech-review',
    name: 'MIT Technology Review',
    domain: 'technologyreview.com',
    category: 'Science & Nature',
    description: 'Analysis of breakthrough technologies and commercial innovation from MIT.',
    topics: ['artificial intelligence', 'robotics', 'synthetic biology', 'energy storage', 'semiconductors'],
    sampleArticles: [
      {
        title: 'Solid-State Batteries and Sodium-Ion Innovations in Grid Storage and EVs',
        url: 'https://www.technologyreview.com/breakthrough-technologies/solid-state-batteries/',
        keywords: ['solid state battery', 'energy storage', 'electric vehicles', 'sodium ion', 'lithium'],
        content: 'Solid-state battery chemistries replace flammable liquid electrolytes with solid ceramics or polymers, enabling higher energy density, 10-minute fast charging, and drastically reduced thermal runaway risks. Meanwhile, sodium-ion batteries emerge as cost-effective alternatives for stationary grid storage using abundant raw materials.'
      }
    ]
  },
  {
    id: 'esa',
    name: 'European Space Agency (ESA)',
    domain: 'esa.int',
    category: 'Science & Nature',
    description: 'European gateway to space, Earth observation, planetary exploration, and Euclid telescope data.',
    topics: ['space', 'euclid', 'dark energy', 'earth observation', 'ariane', 'solar orbiter'],
    sampleArticles: [
      {
        title: 'Euclid Space Telescope 3D Map of the Dark Universe and Dark Matter Halos',
        url: 'https://www.esa.int/Science_Exploration/Space_Science/Euclid',
        keywords: ['euclid', 'esa', 'dark matter', 'dark energy', 'cosmology', 'universe'],
        content: 'ESA Euclid space telescope is constructing the largest and most accurate 3D cosmic map, imaging billions of galaxies across 10 billion light-years. By measuring gravitational lensing and cosmic baryon acoustic oscillations, Euclid tests Einstein General Relativity on cosmological scales to uncover the nature of dark energy accelerating cosmic expansion.'
      }
    ]
  },
  {
    id: 'new-scientist',
    name: 'New Scientist',
    domain: 'newscientist.com',
    category: 'Science & Nature',
    description: 'Global science magazine covering discoveries in physics, health, evolution, and future tech.',
    topics: ['evolution', 'microbiome', 'climate solutions', 'astrophysics', 'geology'],
    sampleArticles: [
      {
        title: 'The Human Gut Microbiome Influence on Mental Health and the Gut-Brain Axis',
        url: 'https://www.newscientist.com/article/gut-microbiome-gut-brain-axis-mental-health/',
        keywords: ['microbiome', 'gut brain axis', 'bacteria', 'health', 'serotonin', 'vagus nerve'],
        content: 'The gut-brain axis is a bidirectional biochemical communication network linking the central nervous system with the enteric nervous system via the vagus nerve. Gut microbiota synthesize over 90% of the body serotonin and produce short-chain fatty acids (SCFAs) that regulate neuroinflammation, mood stability, and metabolic health.'
      }
    ]
  },

  // 3. News & Media (10)
  {
    id: 'bbc-news',
    name: 'BBC News',
    domain: 'bbc.com',
    category: 'News & Media',
    description: 'Global news broadcasting trusted international headlines, politics, business, and culture.',
    topics: ['world news', 'geopolitics', 'uk', 'europe', 'international', 'diplomacy', 'economy'],
    sampleArticles: [
      {
        title: 'Global Economic Outlook: Inflation Trends and Central Bank Interest Rate Policies',
        url: 'https://www.bbc.com/news/business-global-economic-outlook-interest-rates',
        keywords: ['economy', 'inflation', 'interest rates', 'central banks', 'federal reserve', 'gdp'],
        content: 'Global central banks navigate balancing interest rate reductions with persistent services inflation and supply chain adaptations. Fiscal policies worldwide emphasize industrial decarbonization, semiconductor sovereignty, and investments in green energy infrastructure amidst fluctuating commodity markets.'
      },
      {
        title: 'International Climate Summits and Renewable Energy Deployment Targets',
        url: 'https://www.bbc.com/news/science-environment-climate-summit-targets',
        keywords: ['climate', 'cop', 'renewable energy', 'solar', 'wind', 'carbon emissions'],
        content: 'Nations worldwide accelerate commitments to triple global renewable energy capacity by 2030. Rapid deployment of utility-scale solar farms, offshore wind turbines, and long-duration battery storage systems drives the transition away from fossil fuel electrical grids.'
      }
    ]
  },
  {
    id: 'reuters',
    name: 'Reuters',
    domain: 'reuters.com',
    category: 'News & Media',
    description: 'International news organization delivering financial markets, geopolitics, and investigative reporting.',
    topics: ['markets', 'stocks', 'commodities', 'trade', 'law', 'global affairs'],
    sampleArticles: [
      {
        title: 'Global Supply Chain Diversification and Semiconductor Manufacturing Fab Expansions',
        url: 'https://www.reuters.com/technology/semiconductor-manufacturing-fabs-global-supply-chain/',
        keywords: ['semiconductors', 'chips', 'supply chain', 'manufacturing', 'trade', 'foundries'],
        content: 'Major semiconductor foundries (TSMC, Intel, Samsung) expand multi-billion dollar fabrication plants across North America, Europe, and Asia. Advanced sub-2nm gate-all-around (GAA) transistor nodes fuel next-generation artificial intelligence accelerators, mobile processors, and automotive electronics.'
      }
    ]
  },
  {
    id: 'techcrunch',
    name: 'TechCrunch',
    domain: 'techcrunch.com',
    category: 'News & Media',
    description: 'Reporting on tech startups, venture capital funding, generative AI products, and apps.',
    topics: ['startups', 'venture capital', 'funding', 'tech', 'ai startups', 'saas', 'unicorns'],
    sampleArticles: [
      {
        title: 'Generative AI Startups, Autonomous Agents, and Enterprise Automation Funding',
        url: 'https://techcrunch.com/category/artificial-intelligence/enterprise-agents-funding/',
        keywords: ['venture capital', 'startups', 'ai agents', 'enterprise', 'automation', 'funding'],
        content: 'Venture funding increasingly focuses on autonomous agentic AI platforms capable of multi-step task execution, automated code refactoring, enterprise workflow orchestration, and multimodal reasoning. Startups with proprietary data moats and demonstrable ROI achieve high valuation multiples.'
      }
    ]
  },
  {
    id: 'theverge',
    name: 'The Verge',
    domain: 'theverge.com',
    category: 'News & Media',
    description: 'Tech culture, consumer hardware reviews, gadget announcements, operating systems, and science.',
    topics: ['gadgets', 'smartphones', 'apple', 'google', 'android', 'gaming', 'software', 'wearables'],
    sampleArticles: [
      {
        title: 'The Evolution of Modern Smartphone Operating Systems, On-Device AI, and Foldables',
        url: 'https://www.theverge.com/tech/smartphones-on-device-ai-foldables-evolution',
        keywords: ['smartphones', 'android', 'ios', 'foldable', 'on device ai', 'displays', 'cameras'],
        content: 'Modern mobile platforms spotlight seamless on-device neural processing units (NPUs) enabling instant voice transcription, real-time photo unblurring, and offline contextual summaries without cloud latency. Foldable display durability and hinge engineering have reached mainstream maturity.'
      }
    ]
  },
  {
    id: 'arstechnica',
    name: 'Ars Technica',
    domain: 'arstechnica.com',
    category: 'News & Media',
    description: 'Authoritative technology news, cybersecurity analysis, open source software, and space exploration.',
    topics: ['cybersecurity', 'linux', 'open source', 'hardware', 'cryptography', 'chips'],
    sampleArticles: [
      {
        title: 'Post-Quantum Cryptography Standards and Zero-Trust Enterprise Security',
        url: 'https://arstechnica.com/security/post-quantum-cryptography-nist-standards/',
        keywords: ['cybersecurity', 'cryptography', 'quantum', 'encryption', 'nist', 'zero trust'],
        content: 'NIST has formalized primary post-quantum cryptographic standards (such as ML-KEM and ML-DSA) based on lattice-based cryptography to protect sensitive data against future quantum computer attacks. Enterprises are actively implementing crypto-agility and Zero-Trust network architectures.'
      }
    ]
  },
  {
    id: 'wired',
    name: 'Wired',
    domain: 'wired.com',
    category: 'News & Media',
    description: 'How technology affects politics, culture, economy, and the future of human society.',
    topics: ['culture', 'digital privacy', 'future', 'ethics', 'social media', 'biotech'],
    sampleArticles: [
      {
        title: 'Digital Privacy Regulations, End-to-End Encryption, and Decentralized Networks',
        url: 'https://www.wired.com/story/digital-privacy-end-to-end-encryption-decentralization/',
        keywords: ['privacy', 'encryption', 'gdpr', 'decentralized', 'fediverse', 'security'],
        content: 'Consumer awareness surrounding data telemetry and algorithmic curation is driving adoption of decentralized social networks (such as ActivityPub/Fediverse protocols) and universal end-to-end encrypted messaging, establishing stronger digital privacy rights.'
      }
    ]
  },
  {
    id: 'apnews',
    name: 'Associated Press (AP News)',
    domain: 'apnews.com',
    category: 'News & Media',
    description: 'Independent global news gathering factual reporting without bias across world events.',
    topics: ['world news', 'politics', 'elections', 'disaster response', 'sports', 'human interest'],
    sampleArticles: [
      {
        title: 'Global Disaster Preparedness, Early Warning Systems, and Satellite Meteorological Tracking',
        url: 'https://apnews.com/article/global-meteorology-satellite-early-warning-systems',
        keywords: ['ap news', 'weather', 'meteorology', 'satellites', 'disaster relief', 'climate'],
        content: 'Advanced Doppler radar constellations, AI-driven weather modeling, and geosynchronous Earth observation satellites have dramatically improved meteorological forecasting accuracy, extending early storm warning windows from hours to multiple days and saving thousands of lives.'
      }
    ]
  },
  {
    id: 'npr',
    name: 'NPR (National Public Radio)',
    domain: 'npr.org',
    category: 'News & Media',
    description: 'In-depth storytelling, investigative journalism, podcasting, arts, and cultural analysis.',
    topics: ['culture', 'education', 'arts', 'environment', 'public health', 'podcasts'],
    sampleArticles: [
      {
        title: 'The Psychology of Lifelong Learning, Habit Formation, and Deliberate Practice',
        url: 'https://www.npr.org/sections/health-shots/habit-formation-neuroscience-deliberate-practice',
        keywords: ['psychology', 'habits', 'learning', 'cognitive', 'education', 'mental focus'],
        content: 'Cognitive research indicates that deliberate practice—focusing intently on tasks slightly beyond current competence with immediate feedback loops—accelerates neuroplastic adaptation. Habit stacking and optimizing cue-routine-reward loops provide sustainable behavioral consistency.'
      }
    ]
  },
  {
    id: 'engadget',
    name: 'Engadget',
    domain: 'engadget.com',
    category: 'News & Media',
    description: 'Consumer electronics, gaming, entertainment, wearable tech, and automotive gadgets.',
    topics: ['gaming', 'wearables', 'electric cars', 'laptops', 'audio', 'smart home'],
    sampleArticles: [
      {
        title: 'Next-Gen Display Tech: MicroLED, Tandem OLED, and Spatial Computing Optics',
        url: 'https://www.engadget.com/displays/microled-tandem-oled-spatial-computing/',
        keywords: ['oled', 'microled', 'displays', 'spatial computing', 'vr', 'ar', 'monitors'],
        content: 'Tandem OLED architectures stacking two emission layers double screen brightness and extend panel lifespans, while inorganic MicroLED arrays promise near-infinite contrast without burn-in risks, revolutionizing high-end monitors, smartphones, and spatial computing headsets.'
      }
    ]
  },
  {
    id: 'mashable',
    name: 'Mashable',
    domain: 'mashable.com',
    category: 'News & Media',
    description: 'Digital culture, entertainment, viral trends, and modern digital lifestyle.',
    topics: ['digital trends', 'entertainment', 'apps', 'lifestyle', 'social media', 'creative tech'],
    sampleArticles: [
      {
        title: 'Spatial Audio, Lossless Codecs, and the Renaissance of High-Fidelity Acoustics',
        url: 'https://mashable.com/article/spatial-audio-lossless-codecs-hi-fi-renaissance',
        keywords: ['audio', 'spatial audio', 'dolby atmos', 'lossless', 'headphones', 'sound'],
        content: 'Head-tracking spatial audio algorithms combined with high-bitrate Bluetooth codecs (LDAC, aptX Lossless) recreate three-dimensional soundstages for headphones, transforming music streaming, gaming, and cinematic immersion for mobile consumers.'
      }
    ]
  },

  // 4. Reference & Knowledge (10)
  {
    id: 'wikipedia',
    name: 'Wikipedia (The Free Encyclopedia)',
    domain: 'en.wikipedia.org',
    category: 'Reference & Knowledge',
    description: 'Free collaborative multilingual online encyclopedia with tens of millions of curated reference articles.',
    topics: ['history', 'geography', 'biography', 'science', 'mathematics', 'astronomy', 'politics', 'literature'],
    sampleArticles: [
      {
        title: 'Artificial Intelligence: Machine Learning, Neural Networks, and Deep Learning Fundamentals',
        url: 'https://en.wikipedia.org/wiki/Artificial_intelligence',
        keywords: ['artificial intelligence', 'ai', 'machine learning', 'deep learning', 'neural network', 'turing test', 'transformer'],
        content: 'Artificial intelligence (AI) is the intelligence of machines or software, as opposed to the intelligence of humans or animals. Core subfields include Machine Learning (ML), where algorithms learn patterns from empirical training datasets; Deep Learning utilizing multi-layer artificial neural networks; Natural Language Processing (NLP); and Computer Vision. Modern breakthroughs are dominated by Transformer architectures utilizing multi-head self-attention mechanisms.'
      },
      {
        title: 'Solar System: Formation, Sun, Terrestrial Planets, Gas Giants, and Kuiper Belt',
        url: 'https://en.wikipedia.org/wiki/Solar_System',
        keywords: ['solar system', 'sun', 'planets', 'earth', 'mars', 'jupiter', 'saturn', 'astronomy'],
        content: 'The Solar System formed 4.6 billion years ago from the gravitational collapse of a giant interstellar molecular cloud. It consists of the Sun and objects bound by gravity: eight planets (terrestrial planets Mercury, Venus, Earth, Mars; gas and ice giants Jupiter, Saturn, Uranus, Neptune), dwarf planets like Pluto and Ceres, the Asteroid Belt, the Kuiper Belt, and the Oort Cloud.'
      },
      {
        title: 'Theory of Relativity: Special and General Relativity by Albert Einstein',
        url: 'https://en.wikipedia.org/wiki/Theory_of_relativity',
        keywords: ['relativity', 'einstein', 'physics', 'gravity', 'spacetime', 'speed of light', 'black holes'],
        content: 'Einstein theory of relativity encompasses two interrelated theories: Special Relativity (1905), establishing that the laws of physics are identical in all inertial reference frames and the speed of light in vacuum is constant; and General Relativity (1915), describing gravity not as a conventional force, but as geometric curvature of four-dimensional spacetime caused by mass and energy.'
      },
      {
        title: 'World War II: Timeline, Global Theatres, Alliances, and Post-War Order',
        url: 'https://en.wikipedia.org/wiki/World_War_II',
        keywords: ['world war ii', 'history', 'allies', 'axis', '1939', '1945', 'united nations', 'holocaust'],
        content: 'World War II (1939-1945) was a global conflict involving the majority of the world nations formed into opposing military alliances: the Allies and the Axis powers. Marked by over 70 million fatalities, the conflict resulted in the collapse of European colonial empires, the creation of the United Nations, and the emergence of the United States and Soviet Union as rival superpowers inaugurating the Cold War.'
      }
    ]
  },
  {
    id: 'britannica',
    name: 'Encyclopaedia Britannica',
    domain: 'britannica.com',
    category: 'Reference & Knowledge',
    description: 'Authoritative encyclopedia with scholarly articles vetted by subject matter experts.',
    topics: ['history', 'philosophy', 'world leaders', 'art', 'geography', 'civilizations'],
    sampleArticles: [
      {
        title: 'The Industrial Revolution and Technological Transformation of Modern Society',
        url: 'https://www.britannica.com/event/Industrial-Revolution',
        keywords: ['industrial revolution', 'history', 'steam engine', 'manufacturing', 'urbanization', 'economics'],
        content: 'The Industrial Revolution began in Great Britain in the mid-18th century, transitioning agrarian economies into mechanized industrial systems driven by steam power, metallurgy, textile automation, and railways. This sparked rapid urbanization, mass production, modern financial institutions, and profound socio-economic transformations.'
      }
    ]
  },
  {
    id: 'wolframalpha',
    name: 'Wolfram Alpha Computational Knowledge',
    domain: 'wolframalpha.com',
    category: 'Reference & Knowledge',
    description: 'Computational engine calculating answers for mathematics, physics, chemistry, and statistics.',
    topics: ['math', 'calculus', 'statistics', 'chemistry', 'computational science', 'formulas'],
    sampleArticles: [
      {
        title: 'Calculus, Differential Equations, and Matrix Linear Algebra in Computer Science',
        url: 'https://www.wolframalpha.com/examples/mathematics/',
        keywords: ['calculus', 'linear algebra', 'matrices', 'differential equations', 'math', 'vectors'],
        content: 'Linear algebra forms the mathematical bedrock of machine learning, 3D computer graphics, and physics simulations. Matrix multiplication, eigenvalue decomposition, and gradient descent optimization (using partial derivatives from multivariable calculus) calculate loss minimizations across high-dimensional vector parameter spaces.'
      }
    ]
  },
  {
    id: 'sep',
    name: 'Stanford Encyclopedia of Philosophy (SEP)',
    domain: 'plato.stanford.edu',
    category: 'Reference & Knowledge',
    description: 'Peer-reviewed academic encyclopedia of philosophy maintained by Stanford University.',
    topics: ['philosophy', 'ethics', 'epistemology', 'logic', 'consciousness', 'existentialism'],
    sampleArticles: [
      {
        title: 'Epistemology and Theories of Knowledge, Truth, and Belief',
        url: 'https://plato.stanford.edu/entries/epistemology/',
        keywords: ['epistemology', 'philosophy', 'knowledge', 'truth', 'logic', 'ethics', 'rationalism'],
        content: 'Epistemology investigates the nature, origin, and limits of human knowledge. Classical philosophy defined knowledge as Justified True Belief (JTB), challenged by the Gettier problem. Major perspectives include Rationalism (relying on deductive reason), Empiricism (grounded in sensory experience), and Pragmatism.'
      }
    ]
  },
  {
    id: 'wikiquote',
    name: 'Wikiquote',
    domain: 'wikiquote.org',
    category: 'Reference & Knowledge',
    description: 'Free online compendium of sourced quotations from notable people, literary works, and proverbs.',
    topics: ['quotes', 'literature', 'famous sayings', 'speeches', 'wisdom', 'authors'],
    sampleArticles: [
      {
        title: 'Famous Quotations on Science, Discovery, and Human Curiosity',
        url: 'https://en.wikiquote.org/wiki/Science',
        keywords: ['quotes', 'science', 'curiosity', 'discovery', 'feynman', 'einstein', 'sagan'],
        content: 'Notable scientific reflections include Carl Sagan: "Somewhere, something incredible is waiting to be known", Richard Feynman: "Science is the belief in the ignorance of experts", and Marie Curie: "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less."'
      }
    ]
  },
  {
    id: 'khan-academy',
    name: 'Khan Academy',
    domain: 'khanacademy.org',
    category: 'Reference & Knowledge',
    description: 'Free personalized education platform offering interactive exercises in math, science, and history.',
    topics: ['education', 'algebra', 'physics', 'biology', 'history', 'economics', 'learning'],
    sampleArticles: [
      {
        title: 'Foundational Principles of Microeconomics: Supply, Demand, and Market Equilibrium',
        url: 'https://www.khanacademy.org/economics-finance-domain/microeconomics',
        keywords: ['microeconomics', 'supply', 'demand', 'equilibrium', 'elasticity', 'markets'],
        content: 'The law of demand states that, all else equal, as the price of a good increases, quantity demanded decreases. The law of supply dictates that higher prices incentivize higher output. The intersection of supply and demand curves establishes market equilibrium price and quantity, maximizing consumer and producer surplus.'
      }
    ]
  },
  {
    id: 'gutenberg',
    name: 'Project Gutenberg',
    domain: 'gutenberg.org',
    category: 'Reference & Knowledge',
    description: 'Library of over 70,000 free public domain eBooks of world classic literature and philosophy.',
    topics: ['books', 'literature', 'classics', 'poetry', 'history', 'authors'],
    sampleArticles: [
      {
        title: 'Masterpieces of Classic Literature and Narrative Structure',
        url: 'https://www.gutenberg.org/ebooks/bookshelf/classic-literature',
        keywords: ['books', 'classics', 'shakespeare', 'dostoevsky', 'dickens', 'literature', 'novels'],
        content: 'Classic literature explores universal human themes—ambition, morality, justice, and love—across diverse historical contexts. From Shakespeare Hamlet analyzing existential grief to Dostoevsky Crime and Punishment examining psychological guilt, canonical works established fundamental narrative archetypes.'
      }
    ]
  },
  {
    id: 'archive-org',
    name: 'Internet Archive',
    domain: 'archive.org',
    category: 'Reference & Knowledge',
    description: 'Non-profit digital library offering free universal access to millions of digitized books, movies, and music.',
    topics: ['digital library', 'preservation', 'history', 'open data', 'archives'],
    sampleArticles: [
      {
        title: 'Digital Preservation of Human Culture and Open Access Archives',
        url: 'https://archive.org/about/digital-preservation-knowledge-access',
        keywords: ['archive', 'digital preservation', 'open access', 'libraries', 'knowledge'],
        content: 'Digital preservation safeguards historical software, websites, historical radio broadcasts, and out-of-print scholarly texts against digital rot. By creating mirrored immutable backups and the Wayback Machine, digital archives ensure human knowledge remains universally accessible to future generations.'
      }
    ]
  },
  {
    id: 'cia-factbook',
    name: 'The World Factbook (Reference Guide)',
    domain: 'cia.gov/the-world-factbook',
    category: 'Reference & Knowledge',
    description: 'Comprehensive geographic, demographic, economic, and infrastructure data for 266 world entities.',
    topics: ['geography', 'demographics', 'world facts', 'countries', 'capitals', 'populations'],
    sampleArticles: [
      {
        title: 'Global Demographics, Urbanization Rates, and Continental Geography Facts',
        url: 'https://www.cia.gov/the-world-factbook/field/population/',
        keywords: ['demographics', 'geography', 'population', 'countries', 'continents', 'urbanization'],
        content: 'The global human population exceeds 8 billion people, with over 56% residing in urban areas. Asia accounts for approximately 60% of the global population, followed by Africa (18%), Europe (9%), Latin America (8%), and North America (5%). Key megacities exceeding 20 million residents include Tokyo, Delhi, Shanghai, and São Paulo.'
      }
    ]
  },
  {
    id: 'openstreetmap',
    name: 'OpenStreetMap Knowledge Base',
    domain: 'openstreetmap.org',
    category: 'Reference & Knowledge',
    description: 'Open collaborative spatial database mapping roads, trails, terrain, and points of interest globally.',
    topics: ['maps', 'cartography', 'geography', 'gis', 'spatial data', 'topography'],
    sampleArticles: [
      {
        title: 'Cartography, Geodesy, and Global Coordinate Reference Systems (WGS84)',
        url: 'https://wiki.openstreetmap.org/wiki/Cartography_and_GIS_Fundamentals',
        keywords: ['maps', 'cartography', 'gis', 'gps', 'latitude', 'longitude', 'geography'],
        content: 'Geographic Information Systems (GIS) rely on the World Geodetic System 1984 (WGS84) datum to define latitude and longitude coordinates. Map projections (such as Web Mercator EPSG:3857) mathematically project the three-dimensional oblate spheroid of Earth onto two-dimensional screens with trade-offs between area, shape, and distance preservation.'
      }
    ]
  },

  // 5. Health & Medicine (6)
  {
    id: 'who',
    name: 'World Health Organization (WHO)',
    domain: 'who.int',
    category: 'Health & Medicine',
    description: 'United Nations agency directing international health, epidemic prevention, and health guidelines.',
    topics: ['public health', 'epidemics', 'nutrition', 'immunology', 'mental health', 'vaccines'],
    sampleArticles: [
      {
        title: 'Global Physical Activity Guidelines, Cardiovascular Health, and Longevity',
        url: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity',
        keywords: ['health', 'exercise', 'cardiovascular', 'who', 'longevity', 'fitness', 'activity'],
        content: 'The WHO recommends that adults undertake 150-300 minutes of moderate-intensity aerobic physical activity (or 75-150 minutes of vigorous-intensity activity) per week, supplemented by muscle-strengthening exercises twice weekly. Regular physical activity reduces risks of cardiovascular disease, hypertension, type 2 diabetes, and depression.'
      },
      {
        title: 'Healthy Dietary Guidelines: Balanced Macronutrients, Micronutrients, and Sodium Intake',
        url: 'https://www.who.int/news-room/fact-sheets/detail/healthy-diet',
        keywords: ['diet', 'nutrition', 'health', 'vitamins', 'sodium', 'fiber', 'food'],
        content: 'A healthy dietary pattern emphasizes varied fruits, vegetables, legumes, whole grains, and nuts. Daily free sugar intake should be limited to less than 10% (ideally under 5%) of total energy intake, and sodium intake restricted to under 2,000 mg per day (approximately 1 teaspoon of salt) to lower hypertension risks.'
      }
    ]
  },
  {
    id: 'cdc',
    name: 'Centers for Disease Control and Prevention (CDC)',
    domain: 'cdc.gov',
    category: 'Health & Medicine',
    description: 'US health protection agency conducting scientific disease surveillance and prevention.',
    topics: ['immunization', 'infectious disease', 'prevention', 'sleep', 'hygiene'],
    sampleArticles: [
      {
        title: 'Sleep Architecture, Circadian Rhythm, and Restorative Health Recommendations',
        url: 'https://www.cdc.gov/sleep/about_sleep/sleep_hygiene.html',
        keywords: ['sleep', 'circadian rhythm', 'melatonin', 'rest', 'health', 'sleep hygiene'],
        content: 'Adults require 7 or more hours of quality sleep per night. Sleep architecture comprises Non-Rapid Eye Movement (NREM, including slow-wave deep sleep for physical repair and growth hormone release) and REM sleep (crucial for emotional processing and memory consolidation). Maintaining consistent wake times and minimizing blue light prior to bedtime optimizes circadian rhythm.'
      }
    ]
  },
  {
    id: 'mayo-clinic',
    name: 'Mayo Clinic',
    domain: 'mayoclinic.org',
    category: 'Health & Medicine',
    description: 'World-renowned non-profit medical center offering trusted health information and patient care guides.',
    topics: ['symptoms', 'medicine', 'wellness', 'first aid', 'stress management', 'diseases'],
    sampleArticles: [
      {
        title: 'Chronic Stress Reduction, Cortisol Regulation, and Mindfulness Techniques',
        url: 'https://www.mayoclinic.org/healthy-lifestyle/stress-management/in-depth/stress-relief/',
        keywords: ['stress', 'cortisol', 'mindfulness', 'mental health', 'relaxation', 'wellness'],
        content: 'Chronic psychological stress elevates cortisol and adrenaline levels, potentially leading to anxiety, sleep disruption, digestive problems, and elevated blood pressure. Effective clinical interventions include progressive muscle relaxation, diaphragmatic deep breathing, moderate physical exercise, and cognitive behavioral reframing.'
      }
    ]
  },
  {
    id: 'nih-pubmed',
    name: 'NIH PubMed & National Library of Medicine',
    domain: 'pubmed.ncbi.nlm.nih.gov',
    category: 'Health & Medicine',
    description: 'Over 36 million citations for biomedical literature from MEDLINE, life science journals, and online books.',
    topics: ['clinical trials', 'pharmacology', 'biochemistry', 'oncology', 'epidemiology'],
    sampleArticles: [
      {
        title: 'Intermittent Fasting, Autophagy, and Metabolic Health Biomarkers in Clinical Trials',
        url: 'https://pubmed.ncbi.nlm.nih.gov/cellular-autophagy-fasting-metabolic-pathways/',
        keywords: ['fasting', 'autophagy', 'metabolism', 'insulin sensitivity', 'biomarkers', 'clinical trials'],
        content: 'Clinical studies evaluate time-restricted eating and intermittent fasting regimens for improving insulin sensitivity, reducing systemic oxidative stress, and upregulating cellular autophagy—the lysosomal degradation pathway that clears damaged cellular components and misfolded proteins.'
      }
    ]
  },
  {
    id: 'harvard-health',
    name: 'Harvard Health Publishing',
    domain: 'health.harvard.edu',
    category: 'Health & Medicine',
    description: 'Consumer health information from the faculty of Harvard Medical School.',
    topics: ['wellness', 'longevity', 'heart health', 'brain health', 'nutrition'],
    sampleArticles: [
      {
        title: 'Mediterranean Diet and Cognitive Longevity: The MIND Diet Paradigm',
        url: 'https://www.health.harvard.edu/staying-healthy/the-mind-diet-for-brain-health',
        keywords: ['mind diet', 'mediterranean diet', 'olive oil', 'antioxidants', 'longevity', 'brain health'],
        content: 'The MIND diet combines Mediterranean and DASH dietary elements, prioritizing leafy green vegetables, berries, extra-virgin olive oil, fatty fish rich in omega-3s, and whole grains. Long-term observational cohorts associate adherence with significantly reduced rates of cognitive decline and neurodegeneration.'
      }
    ]
  },
  {
    id: 'webmd',
    name: 'WebMD',
    domain: 'webmd.com',
    category: 'Health & Medicine',
    description: 'Health information services, medical symptoms reference, and healthy living advice.',
    topics: ['vitamins', 'fitness', 'allergies', 'pain management', 'wellness'],
    sampleArticles: [
      {
        title: 'Essential Micronutrients: Vitamin D3, B12, Magnesium, and Zinc Functions',
        url: 'https://www.webmd.com/vitamins-and-supplements/essential-vitamins-minerals-guide',
        keywords: ['vitamins', 'vitamin d', 'magnesium', 'zinc', 'supplements', 'immune system'],
        content: 'Micronutrients play vital catalytic roles: Vitamin D3 regulates calcium homeostasis and immune function; Vitamin B12 is essential for red blood cell formation and neurological myelination; Magnesium participates in over 300 enzymatic reactions including ATP energy synthesis; and Zinc supports immune integrity and protein synthesis.'
      }
    ]
  },

  // 6. Finance, Economy & Culture (6)
  {
    id: 'investopedia',
    name: 'Investopedia',
    domain: 'investopedia.com',
    category: 'Finance & Economy',
    description: 'Financial education dictionary, investing strategies, stock market mechanics, and economics.',
    topics: ['investing', 'compound interest', 'stocks', 'bonds', 'etfs', 'cryptocurrency', 'finance', 'budgeting'],
    sampleArticles: [
      {
        title: 'The Mathematics of Compound Interest, Dollar-Cost Averaging, and Index Funds',
        url: 'https://www.investopedia.com/terms/c/compoundinterest.asp',
        keywords: ['compound interest', 'investing', 'index funds', 'etf', 'dollar cost averaging', 'finance', 'wealth'],
        content: 'Compound interest represents interest calculated on initial principal plus accumulated interest from previous periods (A = P(1 + r/n)^(nt)). Investing in broad-market low-cost index funds via disciplined dollar-cost averaging harnesses exponential compounding while minimizing single-stock volatility and management expense fees.'
      },
      {
        title: 'Cryptocurrency, Blockchain Consensus (Proof of Stake), and Smart Contracts',
        url: 'https://www.investopedia.com/terms/b/blockchain.asp',
        keywords: ['blockchain', 'bitcoin', 'ethereum', 'smart contracts', 'proof of stake', 'crypto'],
        content: 'A blockchain is a decentralized distributed ledger securing transactions through cryptographic hashing. Modern networks utilize Proof-of-Stake (PoS) consensus mechanisms where validators stake native tokens to secure blocks with 99% lower energy consumption than Proof-of-Work. Smart contracts execute self-enforcing code agreements without central intermediaries.'
      }
    ]
  },
  {
    id: 'worldbank',
    name: 'The World Bank Group',
    domain: 'worldbank.org',
    category: 'Finance & Economy',
    description: 'International financial institution providing loans and grants to developing countries for capital projects.',
    topics: ['global economy', 'poverty alleviation', 'sustainability', 'infrastructure', 'trade'],
    sampleArticles: [
      {
        title: 'Global Economic Growth Projections, Trade Dynamics, and Emerging Markets',
        url: 'https://www.worldbank.org/en/publication/global-economic-prospects',
        keywords: ['world bank', 'gdp', 'emerging markets', 'trade', 'infrastructure', 'global economy'],
        content: 'Global economic integration relies on resilient supply chains, digital financial inclusion (such as mobile money systems in East Africa), and strategic infrastructure investments in clean water, transport grids, and high-speed broadband to promote sustainable poverty reduction.'
      }
    ]
  },
  {
    id: 'imf',
    name: 'International Monetary Fund (IMF)',
    domain: 'imf.org',
    category: 'Finance & Economy',
    description: 'Major international organization promoting global monetary cooperation and financial stability.',
    topics: ['monetary policy', 'exchange rates', 'fiscal policy', 'macroeconomics'],
    sampleArticles: [
      {
        title: 'Macroeconomic Fiscal Policy, Sovereign Debt, and Foreign Exchange Reserves',
        url: 'https://www.imf.org/en/Publications/WEO',
        keywords: ['imf', 'fiscal policy', 'sovereign debt', 'inflation', 'macroeconomics', 'reserves'],
        content: 'Sound macroeconomic frameworks balance countercyclical fiscal stimulus during downturns with debt consolidation during economic expansion. Central bank foreign exchange reserve diversification strengthens resilience against foreign currency shocks.'
      }
    ]
  },
  {
    id: 'smithsonian',
    name: 'Smithsonian Institution',
    domain: 'si.edu',
    category: 'Finance & Economy',
    description: 'World largest museum, education, and research complex preserving arts, history, and culture.',
    topics: ['art', 'anthropology', 'history', 'fossils', 'human origins', 'culture'],
    sampleArticles: [
      {
        title: 'Human Evolution, Hominin Fossils, and Early Toolmaking Innovations',
        url: 'https://humanorigins.si.edu/evidence/human-fossils',
        keywords: ['smithsonian', 'human evolution', 'homo sapiens', 'neanderthal', 'fossils', 'anthropology'],
        content: 'The human lineage diverged from ancestral apes approximately 6-8 million years ago in Africa. Fossil discoveries (Australopithecus afarensis like "Lucy", Homo habilis, and Homo erectus) chronicle key evolutionary developments: obligate bipedalism, encephalization (brain expansion), controlled fire use, and complex symbolic art.'
      }
    ]
  },
  {
    id: 'bbc-history',
    name: 'BBC History',
    domain: 'bbc.co.uk/history',
    category: 'Finance & Economy',
    description: 'Exploration of ancient civilizations, empires, revolutions, and pivotal historical figures.',
    topics: ['ancient egypt', 'roman empire', 'renaissance', 'middle ages', 'archaeology'],
    sampleArticles: [
      {
        title: 'The Roman Empire: Military Legions, Pax Romana, Engineering, and Fall',
        url: 'https://www.bbc.co.uk/history/ancient/romans/',
        keywords: ['roman empire', 'history', 'rome', 'aqueducts', 'caesar', 'pax romana', 'colosseum'],
        content: 'From its founding on the Tiber River to its expansion across the Mediterranean basin, the Roman Empire shaped Western law, architectural engineering (arches, concrete, aqueducts, road networks), and governance. The era of Pax Romana under Augustus fostered extensive commerce and cultural synthesis.'
      }
    ]
  },
  {
    id: 'goodreads',
    name: 'Goodreads Literary Guides',
    domain: 'goodreads.com',
    category: 'Finance & Economy',
    description: 'Global community of readers sharing book reviews, literary analysis, and genre reading lists.',
    topics: ['books', 'fiction', 'nonfiction', 'literary critique', 'genres', 'science fiction'],
    sampleArticles: [
      {
        title: 'Science Fiction Masterworks: Exploring Dystopias, Cyberpunk, and Space Opera',
        url: 'https://www.goodreads.com/genres/science-fiction',
        keywords: ['science fiction', 'cyberpunk', 'asimov', 'philip k dick', 'dune', 'books', 'literature'],
        content: 'Science fiction serves as a speculative lens on societal evolution and technological ethics. From Frank Herbert Dune exploring ecology and messianic politics to William Gibson Neuromancer founding the Cyberpunk aesthetic, speculative fiction challenges human assumptions about consciousness and destiny.'
      }
    ]
  }
];
