import React, { useState, useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import styles from './TutorialShowcase.module.css';

type TutorialCategory = {
  title: string;
  description: string;
  icon?: string;
  tutorials: Tutorial[];
};

type Tutorial = {
  title: string;
  description: string;
  href: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  standard: string;
  featured?: boolean;
  image?: string;
  tags?: string[];
};

const tutorialCategories: TutorialCategory[] = [
  {
    title: 'Getting Started',
    description: 'Set up your development environment and learn HCS fundamentals',
    icon: '',
    tutorials: [
      {
        title: 'Setup Your Environment',
        description: 'Configure your development environment with Node.js, create a Hedera testnet account, and install the Standards SDK.',
        href: '/docs/tutorials/getting-started/setup-environment',
        difficulty: 'beginner',
        duration: '10 min',
        standard: 'Setup',
        featured: true,
        tags: ['setup', 'basics'],
      },
      {
        title: 'Submit Your First HCS Message',
        description: 'Learn HCS fundamentals by creating topics, submitting messages, and subscribing to real-time updates.',
        href: '/docs/tutorials/getting-started/submit-your-first-hcs-message',
        difficulty: 'beginner',
        duration: '15 min',
        standard: 'HCS Basics',
        featured: true,
        tags: ['messages', 'topics'],
      },
    ],
  },
  {
    title: 'Inscriptions & Storage',
    description: 'Store data permanently on Hedera using HCS inscriptions',
    icon: '',
    tutorials: [
      {
        title: 'Inscribe Your First File',
        description: 'Store any file permanently on Hedera using HCS inscriptions. Learn chunking, verification, and retrieval.',
        href: '/docs/tutorials/inscriptions/inscribe-your-first-file',
        difficulty: 'beginner',
        duration: '20 min',
        standard: 'HCS-1',
        featured: true,
        tags: ['storage', 'files'],
      },
      {
        title: 'Create NFT with Inscriptions',
        description: 'Build fully on-chain NFTs (Hashinals) where both image and metadata are stored permanently on Hedera.',
        href: '/docs/tutorials/inscriptions/create-nft-with-inscriptions',
        difficulty: 'intermediate',
        duration: '30 min',
        standard: 'HCS-5',
        tags: ['nft', 'hashinals'],
      },
    ],
  },
  {
    title: 'Registries & Discovery',
    description: 'Build decentralized registries for data organization',
    icon: '',
    tutorials: [
      {
        title: 'Create Your First Registry',
        description: 'Build a decentralized registry using HCS-2 for organizing and discovering on-chain data.',
        href: '#',
        difficulty: 'intermediate',
        duration: '25 min',
        standard: 'HCS-2',
        tags: ['registry', 'discovery'],
      },
      {
        title: 'Build a Name Service',
        description: 'Create a decentralized naming system similar to ENS using HCS registries.',
        href: '#',
        difficulty: 'advanced',
        duration: '45 min',
        standard: 'HCS-2',
        tags: ['naming', 'dns'],
      },
    ],
  },
  {
    title: 'AI Agents',
    description: 'Deploy autonomous agents on the Hedera network',
    icon: '',
    tutorials: [
      {
        title: 'Deploy Your First Agent',
        description: 'Create an autonomous AI agent that can communicate through HCS using the OpenConvAI standard.',
        href: '#',
        difficulty: 'intermediate',
        duration: '30 min',
        standard: 'HCS-10',
        tags: ['ai', 'agents'],
      },
      {
        title: 'Agent-to-Agent Messaging',
        description: 'Enable secure, verifiable communication between AI agents on the Hedera network.',
        href: '#',
        difficulty: 'advanced',
        duration: '40 min',
        standard: 'HCS-10',
        tags: ['ai', 'messaging'],
      },
    ],
  },
  {
    title: 'Points & Rewards',
    description: 'Implement auditable points and reward systems',
    icon: '',
    tutorials: [
      {
        title: 'Deploy Points System',
        description: 'Create an auditable points system using HCS-20 for transparent reward distribution.',
        href: '#',
        difficulty: 'intermediate',
        duration: '25 min',
        standard: 'HCS-20',
        tags: ['points', 'rewards'],
      },
      {
        title: 'Build Rewards Program',
        description: 'Implement a complete loyalty program with point minting, transfers, and redemption.',
        href: '#',
        difficulty: 'advanced',
        duration: '50 min',
        standard: 'HCS-20',
        tags: ['loyalty', 'gamification'],
      },
    ],
  },
];

const DifficultyBadge: React.FC<{ difficulty: Tutorial['difficulty'] }> = ({ difficulty }) => {
  const icons = {
    beginner: '',
    intermediate: '',
    advanced: ''
  };
  
  return (
    <span className={`${styles.difficultyBadge} ${styles[difficulty]}`}>
      <span className={styles.difficultyIcon}>{icons[difficulty]}</span>
      {difficulty}
    </span>
  );
};

const FeaturedCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const featuredTutorials = tutorialCategories.flatMap(cat => 
    cat.tutorials.filter(t => t.featured && t.href !== '#')
  );

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % featuredTutorials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused, featuredTutorials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredTutorials.length) % featuredTutorials.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredTutorials.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  if (featuredTutorials.length === 0) return null;

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselHeader}>
        <h2 className={styles.carouselTitle}>
          <span className={styles.featuredIcon}></span>
          Featured Tutorials
        </h2>
        <div className={styles.carouselControls}>
          <button onClick={goToPrev} className={styles.carouselButton} aria-label="Previous">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button onClick={goToNext} className={styles.carouselButton} aria-label="Next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.carouselViewport}>
        <div 
          className={styles.carouselTrack}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {featuredTutorials.map((tutorial, index) => (
            <div key={index} className={styles.carouselSlide}>
              <div className={styles.featuredCard}>
                <div className={styles.featuredCardContent}>
                  <div className={styles.featuredBadges}>
                    <span className={styles.featuredStandardBadge}>{tutorial.standard}</span>
                    <DifficultyBadge difficulty={tutorial.difficulty} />
                  </div>
                  <h3 className={styles.featuredTitle}>{tutorial.title}</h3>
                  <p className={styles.featuredDescription}>{tutorial.description}</p>
                  <div className={styles.featuredMeta}>
                    <span className={styles.featuredDuration}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                      {tutorial.duration}
                    </span>
                    {tutorial.tags && (
                      <div className={styles.featuredTags}>
                        {tutorial.tags.map((tag, i) => (
                          <span key={i} className={styles.featuredTag}>#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <Link to={tutorial.href} className={styles.featuredCTA}>
                    <span>Start Learning</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                <div className={styles.featuredCardDecoration}>
                  <div className={styles.floatingShape1}></div>
                  <div className={styles.floatingShape2}></div>
                  <div className={styles.floatingShape3}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.carouselIndicators}>
        {featuredTutorials.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === currentIndex ? styles.indicatorActive : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const InteractiveLearningPath: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  
  const pathSteps = [
    {
      number: 1,
      title: 'Environment Setup',
      subtitle: 'Configure your dev environment',
      time: '10 min',
      href: '/docs/tutorials/getting-started/setup-environment',
      icon: '',
    },
    {
      number: 2,
      title: 'First HCS Message',
      subtitle: 'Send your first message',
      time: '15 min',
      href: '/docs/tutorials/getting-started/submit-your-first-hcs-message',
      icon: '',
    },
    {
      number: 3,
      title: 'First Inscription',
      subtitle: 'Store data on-chain',
      time: '20 min',
      href: '/docs/tutorials/inscriptions/inscribe-your-first-file',
      icon: '',
    },
  ];

  return (
    <div className={styles.learningPathSection}>
      <div className={styles.learningPathHeader}>
        <h2 className={styles.learningPathTitle}>
          Quick Start Journey
        </h2>
        <p className={styles.learningPathSubtitle}>
          Master the essentials in under an hour
        </p>
      </div>

      <div className={styles.pathVisualContainer}>
        <div className={styles.pathLine}>
          <div className={styles.pathLineProgress}></div>
        </div>
        
        <div className={styles.pathSteps}>
          {pathSteps.map((step, index) => (
            <div
              key={step.number}
              className={styles.pathStepWrapper}
              onMouseEnter={() => setActiveStep(step.number)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <Link to={step.href} className={styles.pathStep}>
                <div className={`${styles.stepCircle} ${activeStep === step.number ? styles.stepCircleActive : ''}`}>
                  <span className={styles.stepNumber}>{step.number}</span>
                </div>
                <div className={`${styles.stepContent} ${activeStep === step.number ? styles.stepContentActive : ''}`}>
                  <h4 className={styles.stepTitle}>{step.title}</h4>
                  <p className={styles.stepSubtitle}>{step.subtitle}</p>
                  <span className={styles.stepTime}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    {step.time}
                  </span>
                </div>
                <div className={styles.stepHoverCard}>
                  <span className={styles.stepHoverText}>Start Step {step.number}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.pathCTA}>
        <Link to="/docs/tutorials/getting-started/setup-environment" className={styles.pathStartButton}>
          <span>Begin Your Journey</span>
          <svg className={styles.pathStartIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

const TutorialCard: React.FC<{ tutorial: Tutorial; categoryIcon?: string }> = ({ tutorial, categoryIcon }) => {
  const isAvailable = tutorial.href !== '#';
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      to={isAvailable ? tutorial.href : '#'} 
      className={`${styles.tutorialCard} ${!isAvailable ? styles.comingSoon : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>
          <div className={styles.cardHeader}>
            <h3>{tutorial.title}</h3>
            <span className={styles.standardBadge}>{tutorial.standard}</span>
          </div>
          
          <p className={styles.cardDescription}>{tutorial.description}</p>
          
          <div className={styles.cardMeta}>
            <DifficultyBadge difficulty={tutorial.difficulty} />
            <span className={styles.duration}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              {tutorial.duration}
            </span>
          </div>
          
          {isAvailable ? (
            <button className={`${styles.cardAction} ${isHovered ? styles.cardActionHovered : ''}`}>
              <span className={styles.actionText}>Start Tutorial</span>
              <span className={styles.actionIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </span>
              <span className={styles.actionRipple}></span>
            </button>
          ) : (
            <div className={styles.comingSoonLabel}>
              <span className={styles.comingSoonIcon}></span>
              Coming Soon
            </div>
          )}
        </div>
        
        <div className={styles.cardGlow}></div>
      </div>
    </Link>
  );
};

const CategorySection: React.FC<{ category: TutorialCategory }> = ({ category }) => {
  const availableCount = category.tutorials.filter(t => t.href !== '#').length;
  const totalCount = category.tutorials.length;

  return (
    <div className={styles.categorySection}>
      <div className={styles.categoryHeader}>
        <div className={styles.categoryTitleWrapper}>
          {category.icon && <span className={styles.categoryIcon}>{category.icon}</span>}
          <h2 className={styles.categoryTitle}>{category.title}</h2>
        </div>
        <p className={styles.categoryDescription}>{category.description}</p>
        <div className={styles.categoryProgress}>
          <div className={styles.categoryProgressBar}>
            <div 
              className={styles.categoryProgressFill} 
              style={{ width: `${(availableCount / totalCount) * 100}%` }}
            />
          </div>
          <span className={styles.categoryStats}>
            {availableCount} of {totalCount} available
          </span>
        </div>
      </div>
      
      <div className={styles.tutorialGrid}>
        {category.tutorials.map((tutorial, index) => (
          <TutorialCard key={index} tutorial={tutorial} categoryIcon={category.icon} />
        ))}
      </div>
    </div>
  );
};

const TutorialShowcase: React.FC = () => {
  const totalTutorials = tutorialCategories.reduce(
    (acc, cat) => acc + cat.tutorials.filter(t => t.href !== '#').length, 
    0
  );
  
  const totalPlanned = tutorialCategories.reduce(
    (acc, cat) => acc + cat.tutorials.length, 
    0
  );

  return (
    <div className={styles.showcaseContainer}>
      <div className={styles.showcaseHeader}>
        <div className={styles.headerAnimation}>
          <span className={styles.floatingEmoji1}></span>
          <span className={styles.floatingEmoji2}></span>
          <span className={styles.floatingEmoji3}></span>
        </div>
        <h1 className={styles.showcaseTitle}>Learn HCS Standards</h1>
        <p className={styles.showcaseSubtitle}>
          Practical tutorials to build real applications with Hedera Consensus Service
        </p>
        
        <div className={styles.progressInfo}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${(totalTutorials / totalPlanned) * 100}%` }}
            />
          </div>
          <span className={styles.progressText}>
            <span className={styles.progressNumber}>{totalTutorials}</span> tutorials available • 
            <span className={styles.progressNumber}>{totalPlanned - totalTutorials}</span> coming soon
          </span>
        </div>
      </div>

      <FeaturedCarousel />
      <InteractiveLearningPath />

      <div className={styles.categoriesContainer}>
        {tutorialCategories.map((category, index) => (
          <CategorySection key={index} category={category} />
        ))}
      </div>
    </div>
  );
};

export default TutorialShowcase;