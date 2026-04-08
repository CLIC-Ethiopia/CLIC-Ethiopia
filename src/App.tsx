import { GOOGLE_SCRIPT_URL } from './constants';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FlaskConical, Cpu, Compass, Palette, Calculator, 
  ChevronRight, ArrowRight, BookOpen, Factory, 
  Sprout, Building2, HeartHandshake, UserPlus, Menu, X,
  Globe, Lightbulb, GraduationCap, Target, Rocket, Briefcase,
  BarChart3, Clock, Users, Trophy, Zap, Microscope, Hammer,
  Car, Coins, Home, Recycle, Server, Landmark, Quote, Play, Youtube, ChevronDown, Moon, Sun, ArrowUp, CheckCircle, Sparkles, Phone, Mail
} from 'lucide-react';

import ChatBot from './components/ChatBot';
import CurriculumSection from './components/CurriculumSection';
import CurriculumEngine from './components/CurriculumEngine';
import NewsSection from './components/NewsSection';
import MerchSection from './components/MerchSection';
import ImpactSection from './components/ImpactSection';
import ShareStorySection from './components/ShareStorySection';
import GoogleTranslateWidget from './components/GoogleTranslateWidget';
import DonationPortal from './components/DonationPortal';
import ResourceHub from './components/ResourceHub';
import EventCalendar from './components/EventCalendar';
import TheoryOfChange from './components/TheoryOfChange';
import AdminPortal from './components/AdminPortal';

// --- Localization ---
export type Language = 'en' | 'am';
export const LanguageContext = React.createContext<{lang: Language, setLang: (l: Language) => void}>({lang: 'en', setLang: () => {}});

export const translations = {
  en: {
    home: 'Home',
    about: 'About',
    founder: 'Founder',
    impact: 'Impact',
    programs: 'Programs',
    news: 'News',
    merch: 'Merch',
    getInvolved: 'Get Involved',
    heroTitle1: 'Empowering',
    heroTitle2: 'Ethiopia\'s',
    heroTitle3: 'Future Innovators',
    heroSubtitle: 'A visionary initiative to transform nations through industrialization and upward economic mobility enabled by STEAM education for Innovation & Entrepreneurship.',
    explorePrograms: 'Explore Programs',
    watchVideo: 'Watch Video',
    firstName: 'First Name',
    lastName: 'LastName',
    email: 'Email Address',
    submit: 'Submit',
    success: 'Success!',
    close: 'Close',
    aboutDesc: 'Founded by Dr. Ir. Frehun Adefris, CLIC Ethiopia aims to train 1 Million Ethiopians by 2025 EC. We bring new opportunities in Education, Industrialization, Digital Transformation, and High-Tech Entrepreneurship.',
    aboutList1Title: 'Our Mission',
    aboutList1Desc: 'Prepare Ethiopians for their professional future through practical interdisciplinary trainings using state-of-the-art STEAM laboratories.',
    aboutList2Title: 'Our Vision',
    aboutList2Desc: 'Create top technical talent for the future of Ethiopian industries and businesses, inspiring self-sufficient contributors to society.',
    aboutList3Title: 'Our Operations',
    aboutList3Desc: 'We operate in every region, every major city, and every locality within the country and beyond.',
    founderMsg1: '"I am starting this national level NGO called CLIC (Creative Learning in Community) to help Ethiopians get the right education, start the right business and empower their communities."',
    founderMsg2: 'I spent more than 10 years and millions of Birr to conduct NATIONAL research and design the curriculums at CLIC from interdisciplinary STEAM fields. My plan is to train ',
    founderMsg2Bold: '1 MILLION ETHIOPIANS BY 2025 EC',
    founderMsg3: 'I designed my STEAM curriculum based on Ethiopia\'s socio-economic situation and the level of adoption of new technology. I wish you join me at CLIC Ethiopia Vision 2025 and build smart citizens for the future of Ethiopia. I also call for every public servant & every government body to help me and help young Ethiopians achieve the ultimate goal!',
    steamDesc: 'It is the New Evolution of Literacy. An interdisciplinary skill set that empowers students to be curious learners, critical thinkers & creative problem solvers.',
    ieDesc: 'The "IE" in STEAM-IE. We empower the next generation to turn creative ideas into sustainable businesses and solutions.',
    labsDesc: 'State-of-the-art facilities designed to foster hands-on learning and cutting-edge research across all STEAM disciplines.',
    projectsDesc: 'Discover the innovative solutions our students and mentors are building to address real-world challenges in Ethiopia.',
    curriculumDesc: 'A comprehensive, hands-on learning journey designed to transform students from curious beginners to capable innovators.',
    newsDesc: 'Stay informed about our latest programs, student achievements, and upcoming events.',
    merchDesc: 'Support our mission and show your CLIC pride with our official merchandise. All proceeds go towards funding student projects.',
    impactDesc: 'Hear from the students, mentors, and partners who are part of the CLIC Ethiopia journey.',
    getInvolvedDesc: 'Join us in our mission to transform education and empower the next generation of Ethiopian innovators.',
    footerDesc: 'Creative Learning in Community. Bringing new STEAM skills across the nation enabling industrialization, digital transformation and tech entrepreneurship.',
    newsletterDesc: 'Subscribe to our newsletter to get updates on new labs and merch drops.',
    navAboutUs: 'About Us',
    navMission: 'Mission & Vision',
    navTheory: 'Theory of Change',
    navEducation: 'Education',
    navSteam: 'STEAM',
    navIe: 'Innovation & Entrepreneurship',
    navRoadmap: 'STEAM-IE Roadmap',
    navEngine: 'Curriculum Engine',
    navResources: 'Resource Hub',
    navInnovation: 'Innovation',
    navLabs: 'Labs',
    navProjects: 'Student Projects',
    navCommunity: 'Community',
    navEvents: 'Events',
    navStories: 'Community Stories',
    navSupport: 'Support Us',
    navDonate: 'Donate',
  },
  am: {
    home: 'መነሻ',
    about: 'ስለ እኛ',
    founder: 'መስራች',
    impact: 'ተጽዕኖ',
    programs: 'ፕሮግራሞች',
    news: 'ዜና',
    merch: 'መደብር',
    getInvolved: 'ተሳተፍ',
    heroTitle1: 'የኢትዮጵያን',
    heroTitle2: 'የነገ',
    heroTitle3: 'ፈጣሪዎች ማብቃት',
    heroSubtitle: 'A visionary initiative to transform nations through industrialization and upward economic mobility enabled by STEAM education for Innovation & Entrepreneurship.',
    explorePrograms: 'ፕሮግራሞችን ያስሱ',
    watchVideo: 'ቪዲዮ ይመልከቱ',
    firstName: 'ስም',
    lastName: 'የአባት ስም',
    email: 'ኢሜይል',
    submit: 'አስገባ',
    success: 'ተሳክቷል!',
    close: 'ዝጋ',
    aboutDesc: 'በዶ/ር ኢ/ር ፍሬሁን አደፍርስ የተመሰረተው ክሊክ ኢትዮጵያ በ2025 ዓ.ም 1 ሚሊዮን ኢትዮጵያውያንን ለማሰልጠን ያለመ ነው። በትምህርት፣ በኢንዱስትሪ፣ በዲጂታል ትራንስፎርሜሽን እና በከፍተኛ የቴክኖሎጂ ስራ ፈጠራ አዳዲስ እድሎችን እናመጣለን።',
    aboutList1Title: 'ተልዕኳችን',
    aboutList1Desc: 'በዘመናዊ የSTEAM ቤተ-ሙከራዎች በመጠቀም በተግባራዊ ሁለገብ ስልጠናዎች ኢትዮጵያውያንን ለወደፊቱ የሙያ ህይወታቸው ማዘጋጀት።',
    aboutList2Title: 'ራዕያችን',
    aboutList2Desc: 'ለወደፊቱ የኢትዮጵያ ኢንዱስትሪዎች እና ንግዶች ከፍተኛ የቴክኒክ ችሎታ ያላቸውን መፍጠር፣ ለማህበረሰቡ ራሳቸውን የቻሉ አስተዋፅዖ አድራጊዎችን ማነሳሳት።',
    aboutList3Title: 'አሰራራችን',
    aboutList3Desc: 'በእያንዳንዱ ክልል፣ በእያንዳንዱ ዋና ከተማ እና በሀገሪቱ ውስጥ እና ከሀገር ውጭ ባሉ ሁሉም አካባቢዎች እንሰራለን።',
    founderMsg1: '"ኢትዮጵያውያን ትክክለኛውን ትምህርት እንዲያገኙ፣ ትክክለኛውን ንግድ እንዲጀምሩ እና ማህበረሰባቸውን እንዲያበቁ ለመርዳት ይህንን ሀገር አቀፍ መንግስታዊ ያልሆነ ድርጅት ክሊክ (በማህበረሰብ ውስጥ የፈጠራ ትምህርት) እየጀመርኩ ነው።"',
    founderMsg2: 'ከ10 ዓመታት በላይ እና በሚሊዮኖች የሚቆጠር ብር አውጥቼ ሀገር አቀፍ ምርምር በማካሄድ በክሊክ የSTEAM ዘርፎች ስርአተ ትምህርቶችን ቀርጫለሁ። እቅዴ ',
    founderMsg2Bold: 'በ2025 ዓ.ም 1 ሚሊዮን ኢትዮጵያውያንን ማሰልጠን ነው።',
    founderMsg3: 'ስርአተ ትምህርቴን የነደፍኩት በኢትዮጵያ ማህበራዊና ኢኮኖሚያዊ ሁኔታ እና አዳዲስ ቴክኖሎጂዎችን በመቀበል ደረጃ ላይ በመመስረት ነው። በክሊክ ኢትዮጵያ ራዕይ 2025 እንድትቀላቀሉኝ እና ለወደፊቷ ኢትዮጵያ ብልህ ዜጎችን እንድንገነባ እመኛለሁ። እንዲሁም እያንዳንዱ የመንግስት ሰራተኛ እና እያንዳንዱ የመንግስት አካል እኔን እና ወጣት ኢትዮጵያውያንን የመጨረሻውን ግብ እንዲያሳኩ እንዲረዱኝ እጠይቃለሁ!',
    steamDesc: 'ይህ አዲሱ የመፃፍ እና የማንበብ ዝግመተ ለውጥ ነው። ተማሪዎች የማወቅ ጉጉት ያላቸው ተማሪዎች፣ ሂሳዊ አሳቢዎች እና የፈጠራ ችግር ፈቺዎች እንዲሆኑ የሚያስችል ሁለገብ የክህሎት ስብስብ ነው።',
    ieDesc: 'በSTEAM-IE ውስጥ ያለው "IE"። ቀጣዩን ትውልድ የፈጠራ ሀሳቦችን ወደ ዘላቂ ንግዶች እና መፍትሄዎች እንዲቀይር እናበቃለን።',
    labsDesc: 'በሁሉም የSTEAM ዘርፎች የተግባር ትምህርት እና ዘመናዊ ምርምርን ለማበረታታት የተነደፉ ዘመናዊ ተቋማት።',
    projectsDesc: 'ተማሪዎቻችን እና አማካሪዎቻችን በኢትዮጵያ ውስጥ ያሉ እውነተኛ ፈተናዎችን ለመፍታት እየገነቡ ያሉትን አዳዲስ መፍትሄዎች ያግኙ።',
    curriculumDesc: 'ተማሪዎችን ከማወቅ ጉጉት ጀማሪዎች ወደ ብቁ ፈጣሪዎች ለመለወጥ የተነደፈ አጠቃላይ፣ የተግባር ትምህርት ጉዞ።',
    newsDesc: 'ስለ አዳዲስ ፕሮግራሞቻችን፣ የተማሪዎች ስኬቶች እና መጪ ክስተቶች መረጃ ያግኙ።',
    merchDesc: 'ተልዕኳችንን ይደግፉ እና የክሊክ ኩራትዎን በይፋዊ ሸቀጦቻችን ያሳዩ። ሁሉም ገቢዎች የተማሪዎችን ፕሮጀክቶች የገንዘብ ድጋፍ ለማድረግ ይውላሉ።',
    impactDesc: 'የክሊክ ኢትዮጵያ ጉዞ አካል ከሆኑት ተማሪዎች፣ አማካሪዎች እና አጋሮች ይስሙ።',
    getInvolvedDesc: 'ትምህርትን ለመለወጥ እና ቀጣዩን የኢትዮጵያ ፈጣሪዎች ትውልድ ለማብቃት በምናደርገው ተልዕኮ ይቀላቀሉን።',
    footerDesc: 'በማህበረሰብ ውስጥ የፈጠራ ትምህርት። የኢንዱስትሪ፣ የዲጂታል ትራንስፎርሜሽን እና የቴክኖሎጂ ስራ ፈጠራን የሚያስችሉ አዳዲስ የSTEAM ክህሎቶችን በመላው ሀገሪቱ ማምጣት።',
    newsletterDesc: 'ስለ አዳዲስ ቤተ-ሙከራዎች እና የሸቀጦች መረጃ ለማግኘት ለጋዜጣችን ይመዝገቡ።',
    navAboutUs: 'ስለ እኛ',
    navMission: 'ተልዕኮ እና ራዕይ',
    navTheory: 'የለውጥ ንድፈ ሀሳብ',
    navEducation: 'ትምህርት',
    navSteam: 'STEAM',
    navIe: 'የፈጠራ ስራ እና ስራ ፈጠራ',
    navRoadmap: 'STEAM-IE ፍኖተ ካርታ',
    navEngine: 'ስርዓተ ትምህርት ኤንጂን',
    navResources: 'የመረጃ ማዕከል',
    navInnovation: 'ፈጠራ',
    navLabs: 'ቤተ-ሙከራዎች',
    navProjects: 'የተማሪ ፕሮጀክቶች',
    navCommunity: 'ማህበረሰብ',
    navEvents: 'ክስተቶች',
    navStories: 'የማህበረሰብ ታሪኮች',
    navSupport: 'ይደግፉን',
    navDonate: 'ለግስ',
  }
};

export const useTranslation = () => {
  const { lang } = React.useContext(LanguageContext);
  return { t: translations[lang], lang };
};

// --- Components ---

const InfoModal = ({ isOpen, onClose, data }: { isOpen: boolean; onClose: () => void; data: any }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsPlaying(false);
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [data, isOpen]);

    if (!isOpen || !data) return null;
  const { title, color, icon: Icon, description, detailedContent, stats, image, videoUrl } = data;
  
  // Helper function to extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeId(videoUrl) || data.videoId || 'M7lc1UVf-VE';
  
  // Static content based on chapter/title
  const getStaticContent = (title: string) => {
    const defaultTitles = {
      learningsTitle: "What You'll Learn",
      modulesTitle: "Curriculum & Modules"
    };

    switch (title) {
      // LABS
      case 'Digital Labs':
        return {
          ...defaultTitles,
          learnings: [
            'Basic Literacy Skills (Language, Computer HW/SW)',
            'Virtual Reality & Augmented Reality Navigation',
            'IoT Fundamentals and Cloud Computing',
            'Data Center Operations & Digital Solutions'
          ],
          curriculum: [
            { module: 'Module 1', title: 'Intro to Digital Literacy' },
            { module: 'Module 2', title: 'VR/AR Environments' },
            { module: 'Module 3', title: 'IoT & Cloud Computing' }
          ]
        };
      case 'Fabrication Labs':
        return {
          ...defaultTitles,
          learnings: [
            'CAD/CAM Design and 3D Modeling',
            '3D Printing & Rapid Prototyping',
            'CNC Machining and Laser Cutting',
            'Workshop Safety and Manufacturing Processes'
          ],
          curriculum: [
            { module: 'Module 1', title: 'Design Thinking & CAD' },
            { module: 'Module 2', title: 'Additive Manufacturing' },
            { module: 'Module 3', title: 'Subtractive Manufacturing' }
          ]
        };
      case 'Field Labs':
        return {
          ...defaultTitles,
          learnings: [
            'Smart Agriculture and Automated Irrigation',
            'Solar Energy Systems and Maintenance',
            'Large Scale Production Plant Operations',
            'On-the-job Practical Attachments'
          ],
          curriculum: [
            { module: 'Module 1', title: 'Renewable Energy Basics' },
            { module: 'Module 2', title: 'Smart Farming Tech' },
            { module: 'Module 3', title: 'Field Project Management' }
          ]
        };
      case 'Smart City Labs':
        return {
          ...defaultTitles,
          learnings: [
            'Smart Grid Management and Energy Efficiency',
            'Urban Planning Technologies',
            'Business Incubation and Startup Strategies',
            'Sustainable Living and Smart Housing'
          ],
          curriculum: [
            { module: 'Module 1', title: 'Smart Infrastructure' },
            { module: 'Module 2', title: 'Data Centers & Networks' },
            { module: 'Module 3', title: 'Startup Incubation' }
          ]
        };

      // STEAM
      case 'Science':
        return {
          ...defaultTitles,
          learnings: [
            'Scientific Method and Experimental Design',
            'Biology and Chemistry Fundamentals',
            'Physics Principles in Real-World Applications',
            'Data Collection and Analysis'
          ],
          curriculum: [
            { module: 'Module 1', title: 'Intro to Applied Sciences' },
            { module: 'Module 2', title: 'Laboratory Experiments' },
            { module: 'Module 3', title: 'Advanced Research Methods' }
          ]
        };
      case 'Technology':
        return {
          ...defaultTitles,
          learnings: [
            'Programming Fundamentals and Logic',
            'Software Development Lifecycle',
            'Networking Basics and Architecture',
            'Cybersecurity Awareness'
          ],
          curriculum: [
            { module: 'Module 1', title: 'Coding 101' },
            { module: 'Module 2', title: 'Web & App Development' },
            { module: 'Module 3', title: 'Systems Architecture' }
          ]
        };
      case 'Engineering':
        return {
          ...defaultTitles,
          learnings: [
            'Structural Design and Analysis',
            'CAD Modeling and Simulation',
            'Mechanics and Electronics Integration',
            'Complex Problem-Solving Strategies'
          ],
          curriculum: [
            { module: 'Module 1', title: 'Engineering Principles' },
            { module: 'Module 2', title: 'Prototyping & Testing' },
            { module: 'Module 3', title: 'Material Science' }
          ]
        };
      case 'Arts':
        return {
          ...defaultTitles,
          learnings: [
            'Digital Design and Illustration',
            'Creative Thinking and Ideation',
            'UI/UX Principles and Human-Centered Design',
            'Multimedia Production'
          ],
          curriculum: [
            { module: 'Module 1', title: 'Visual Arts & Aesthetics' },
            { module: 'Module 2', title: 'Digital Media Tools' },
            { module: 'Module 3', title: 'Design Thinking Process' }
          ]
        };
      case 'Mathematics':
        return {
          ...defaultTitles,
          learnings: [
            'Applied Mathematics for Engineering',
            'Statistics and Probability',
            'Logic, Algorithms, and Computation',
            'Financial Literacy and Modeling'
          ],
          curriculum: [
            { module: 'Module 1', title: 'Core Mathematical Concepts' },
            { module: 'Module 2', title: 'Data Science Basics' },
            { module: 'Module 3', title: 'Algorithmic Logic' }
          ]
        };

      // IE (Innovation & Entrepreneurship)
      case 'Innovation':
        return {
          ...defaultTitles,
          learnings: [
            'Ideation Techniques and Brainstorming',
            'Design Thinking Methodologies',
            'Rapid Prototyping and Iteration',
            'Market Validation and User Feedback'
          ],
          curriculum: [
            { module: 'Module 1', title: 'Idea Generation' },
            { module: 'Module 2', title: 'Prototyping Solutions' },
            { module: 'Module 3', title: 'Market Validation' }
          ]
        };
      case 'Entrepreneurship':
        return {
          ...defaultTitles,
          learnings: [
            'Business Modeling and Strategy',
            'Pitching and Fundraising',
            'Market Research and Competitive Analysis',
            'Scaling Strategies and Operations'
          ],
          curriculum: [
            { module: 'Module 1', title: 'Business Fundamentals' },
            { module: 'Module 2', title: 'Startup Funding' },
            { module: 'Module 3', title: 'Growth & Scaling' }
          ]
        };

      // PROJECTS (12 Categories)
      case 'Smart Agriculture':
        return {
          learningsTitle: "Key Innovations",
          modulesTitle: "Project Phases",
          learnings: [
            'Phytoponics & Hydroponics systems',
            'Vertical agriculture space optimization',
            'Smart livestock farming automation',
            'Solar-powered irrigation solutions'
          ],
          curriculum: [
            { module: 'Phase 1', title: 'System Design & Resource Planning' },
            { module: 'Phase 2', title: 'Hardware & Sensor Integration' },
            { module: 'Phase 3', title: 'Yield Monitoring & Optimization' }
          ]
        };
      case 'Smart Healthcare':
        return {
          learningsTitle: "Key Innovations",
          modulesTitle: "Project Phases",
          learnings: [
            'Portable smart healthcare systems',
            '4G enabled medical IT infrastructure',
            'Solar-powered emergency medical kits',
            'Wearable health monitoring devices'
          ],
          curriculum: [
            { module: 'Phase 1', title: 'Medical Needs Assessment' },
            { module: 'Phase 2', title: 'Device Prototyping & Connectivity' },
            { module: 'Phase 3', title: 'Clinical Testing & Deployment' }
          ]
        };
      case 'Smart Manufacturing':
        return {
          learningsTitle: "Key Innovations",
          modulesTitle: "Project Phases",
          learnings: [
            'Smart factory automation processes',
            'Specialty robotics for assembly',
            'Zero-waste manufacturing techniques',
            'Computer-Aided Design (CAD) integration'
          ],
          curriculum: [
            { module: 'Phase 1', title: 'Process Flow & Automation Design' },
            { module: 'Phase 2', title: 'Robotics Assembly & Programming' },
            { module: 'Phase 3', title: 'Quality Control & Scaling' }
          ]
        };
      case 'Smart Construction':
        return {
          learningsTitle: "Key Innovations",
          modulesTitle: "Project Phases",
          learnings: [
            '3D house printing technologies',
            'Modular concrete prefabrication',
            'Digital construction management',
            'Eco-friendly building materials'
          ],
          curriculum: [
            { module: 'Phase 1', title: 'Architectural Modeling & Simulation' },
            { module: 'Phase 2', title: 'Material Testing & Prefabrication' },
            { module: 'Phase 3', title: 'On-site Assembly & Management' }
          ]
        };
      case 'Smart Mobility':
        return {
          learningsTitle: "Key Innovations",
          modulesTitle: "Project Phases",
          learnings: [
            'Electric UTVs/ATVs development',
            'Solar-powered battery charging systems',
            'Smart traffic management solutions',
            'Engine-to-electric conversion kits'
          ],
          curriculum: [
            { module: 'Phase 1', title: 'Vehicle Dynamics & Battery Sizing' },
            { module: 'Phase 2', title: 'Powertrain Integration' },
            { module: 'Phase 3', title: 'Road Testing & Safety Validation' }
          ]
        };
      case 'Smart Energy':
        return {
          learningsTitle: "Key Innovations",
          modulesTitle: "Project Phases",
          learnings: [
            'Modular wind energy harvesting',
            'Micro hydropower plant design',
            'Smart off-grid metering systems',
            '24/7 green power distribution'
          ],
          curriculum: [
            { module: 'Phase 1', title: 'Energy Source Assessment' },
            { module: 'Phase 2', title: 'Grid Design & Metering Setup' },
            { module: 'Phase 3', title: 'Installation & Maintenance' }
          ]
        };
      case 'Smart Finance':
        return {
          learningsTitle: "Key Innovations",
          modulesTitle: "Project Phases",
          learnings: [
            'Digital coin and crypto integration',
            'Smart POS system infrastructure',
            'Secure mobile payment gateways',
            'High-speed transaction processing'
          ],
          curriculum: [
            { module: 'Phase 1', title: 'Financial Architecture & Security' },
            { module: 'Phase 2', title: 'Software Development & API Integration' },
            { module: 'Phase 3', title: 'Beta Testing & Rollout' }
          ]
        };
      case 'Smart Education':
        return {
          learningsTitle: "Key Innovations",
          modulesTitle: "Project Phases",
          learnings: [
            'E-learning platform development',
            'VR/AR classroom environments',
            'Interactive STEM kit creation',
            'Remote education delivery systems'
          ],
          curriculum: [
            { module: 'Phase 1', title: 'Curriculum & Content Digitization' },
            { module: 'Phase 2', title: 'Platform & VR Development' },
            { module: 'Phase 3', title: 'User Testing & Deployment' }
          ]
        };
      case 'Smart Lifestyle':
        return {
          learningsTitle: "Key Innovations",
          modulesTitle: "Project Phases",
          learnings: [
            'Smokeless smart cooking stoves',
            'Efficient solar LED lighting',
            'Educational Android TV systems',
            'Biodegradable fuel utilization'
          ],
          curriculum: [
            { module: 'Phase 1', title: 'Home Appliance Prototyping' },
            { module: 'Phase 2', title: 'Energy Efficiency Optimization' },
            { module: 'Phase 3', title: 'Consumer Testing & Production' }
          ]
        };
      case 'Smart Environment':
        return {
          learningsTitle: "Key Innovations",
          modulesTitle: "Project Phases",
          learnings: [
            'Plastic recycling plant operations',
            'Textile waste management solutions',
            'Bio-fuel production processes',
            'Value-added eco-safe products'
          ],
          curriculum: [
            { module: 'Phase 1', title: 'Waste Collection & Sorting Systems' },
            { module: 'Phase 2', title: 'Recycling Process Engineering' },
            { module: 'Phase 3', title: 'Product Manufacturing & Distribution' }
          ]
        };
      case 'Smart Infrastructure':
        return {
          learningsTitle: "Key Innovations",
          modulesTitle: "Project Phases",
          learnings: [
            'National data center architecture',
            'Smart road construction tech',
            'Digital supply chain logistics',
            'Secure data transmission networks'
          ],
          curriculum: [
            { module: 'Phase 1', title: 'Infrastructure Planning & Design' },
            { module: 'Phase 2', title: 'Network & Hardware Installation' },
            { module: 'Phase 3', title: 'System Integration & Monitoring' }
          ]
        };
      case 'Smart Governance':
        return {
          learningsTitle: "Key Innovations",
          modulesTitle: "Project Phases",
          learnings: [
            'Public service application development',
            'Digital ID system implementation',
            'Civic engagement platforms',
            'Transparent administration tools'
          ],
          curriculum: [
            { module: 'Phase 1', title: 'Service Digitization Strategy' },
            { module: 'Phase 2', title: 'App Development & Security' },
            { module: 'Phase 3', title: 'Public Launch & Feedback' }
          ]
        };

      // SPOTLIGHT PROJECTS
        return {
          learningsTitle: "Key Innovations",
          modulesTitle: "Project Phases",
          learnings: [
            'Soil moisture sensing and automation',
            'Solar power integration for remote areas',
            'Water conservation techniques',
            'Hardware assembly and field deployment'
          ],
          curriculum: [
            { module: 'Phase 1', title: 'Research & Sensor Design' },
            { module: 'Phase 2', title: 'Solar Integration & Prototyping' },
            { module: 'Phase 3', title: 'Field Testing & Deployment' }
          ]
        };
      case '3D Printed Mobility':
        return {
          learningsTitle: "Key Innovations",
          modulesTitle: "Development Milestones",
          learnings: [
            'Advanced 3D printing techniques',
            'Biomechanics and ergonomic design',
            'Utilization of recycled plastics',
            'Patient fitting and rehabilitation'
          ],
          curriculum: [
            { module: 'Phase 1', title: 'Material Sourcing & Testing' },
            { module: 'Phase 2', title: 'CAD Modeling & Printing' },
            { module: 'Phase 3', title: 'Clinical Trials & Adjustments' }
          ]
        };
      case 'Agri-AI Doctor':
        return {
          learningsTitle: "Key Innovations",
          modulesTitle: "Project Phases",
          learnings: [
            'Machine learning model training',
            'Image recognition for plant diseases',
            'Offline mobile app development',
            'Agricultural pathology and remedies'
          ],
          curriculum: [
            { module: 'Phase 1', title: 'Crop Disease Data Collection' },
            { module: 'Phase 2', title: 'AI Model Training & Optimization' },
            { module: 'Phase 3', title: 'Offline App Launch & User Testing' }
          ]
        };

      default:
        return {
          ...defaultTitles,
          learnings: [
            'Core Concepts and Theoretical Foundations',
            'Practical Application and Hands-on Skills',
            'Industry Standards and Best Practices',
            'Team Collaboration and Project Management'
          ],
          curriculum: [
            { module: 'Module 1', title: 'Introduction & Fundamentals' },
            { module: 'Module 2', title: 'Advanced Techniques' },
            { module: 'Module 3', title: 'Final Project & Assessment' }
          ]
        };
    }
  };

  const staticContent = getStaticContent(title);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-white dark:bg-gray-900 rounded-3xl max-w-6xl w-full max-h-[90vh] shadow-2xl relative flex flex-col md:flex-row overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md transition-colors text-white">
              <X size={24} />
            </button>

            {/* Hero / Sidebar Section */}
            <div className="w-full md:w-2/5 relative bg-gray-900 text-white flex flex-col min-h-[300px] md:min-h-full">
                {isLoading ? (
                  <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gray-800 animate-pulse">
                    <div className="w-16 h-16 rounded-2xl bg-gray-700 mb-6"></div>
                    <div className="h-10 bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-1 w-20 bg-gray-700 rounded-full mb-6"></div>
                    <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-5/6 mb-8"></div>
                    <div className="grid grid-cols-3 gap-4 border-t border-gray-700 pt-6">
                      <div className="h-8 bg-gray-700 rounded w-full"></div>
                      <div className="h-8 bg-gray-700 rounded w-full"></div>
                      <div className="h-8 bg-gray-700 rounded w-full"></div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img 
                            src={image || `https://loremflickr.com/800/1200/${title.split(' ')[0]},technology`} 
                            alt={title} 
                            className="w-full h-full object-cover opacity-60"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    </div>

                    <div className="relative z-10 p-8 flex flex-col h-full mt-auto">
                        <div className="mt-auto">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg mb-6 backdrop-blur-md border border-white/20" style={{ backgroundColor: `${color}80` }}>
                                <Icon size={32} />
                            </div>
                            <h2 className="text-4xl font-bold font-serif mb-4 leading-tight">{title}</h2>
                            <div className="h-1 w-20 rounded-full mb-6" style={{ backgroundColor: color }}></div>
                            <p className="text-lg text-gray-200 leading-relaxed mb-8">{description}</p>
                            
                            {stats && (
                                <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                                    {stats.map((stat: any, i: number) => (
                                        <div key={i}>
                                            <div className="text-2xl font-black" style={{ color: color }}>{stat.value}</div>
                                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                  </>
                )}
            </div>

            {/* Content Section */}
            <div className="w-full md:w-3/5 bg-white dark:bg-gray-900 overflow-y-auto max-h-[60vh] md:max-h-[90vh]">
                <div className="p-8 md:p-12">
                    {isLoading ? (
                      <div className="animate-pulse">
                        <div className="mb-12">
                          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-4"></div>
                          <div className="space-y-3">
                            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-4/6"></div>
                          </div>
                        </div>
                        <div className="mb-12">
                          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-4"></div>
                          <div className="w-full aspect-video bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
                        </div>
                        <div className="mb-12">
                          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-4"></div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded"></div>
                            <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded"></div>
                            <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded"></div>
                            <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded"></div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Detailed Content */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <BookOpen size={24} className="text-gray-400" />
                                Overview
                            </h3>
                            <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300">
                                <p>{detailedContent}</p>
                            </div>
                        </div>

                        {/* YouTube Section */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Youtube size={24} className="text-red-600" />
                                Video Tour
                            </h3>
                            <div className="rounded-2xl overflow-hidden shadow-lg bg-black aspect-video relative group cursor-pointer">
                                {isPlaying ? (
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                        title="Video Tour"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="absolute inset-0 w-full h-full"
                                    ></iframe>
                                ) : (
                                    <div onClick={() => setIsPlaying(true)} className="w-full h-full relative">
                                        <img 
                                            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
                                            alt="Video Thumbnail" 
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                                            referrerPolicy="no-referrer"
                                            loading="lazy"
                                            onError={(e) => {
                                                // Fallback if maxresdefault is not available
                                                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                                            }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                                                <Play size={32} fill="currentColor" />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                                             <p className="font-medium">Watch: Introduction to {title}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* What You'll Learn */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Target size={24} className="text-[var(--color-clic-blue)]" />
                                {staticContent.learningsTitle}
                            </h3>
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {staticContent.learnings.map((learning, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <div className="mt-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full p-1">
                                                <ChevronRight size={16} />
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300 font-medium">{learning}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Curriculum & Modules */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <GraduationCap size={24} className="text-[var(--color-clic-orange)]" />
                                {staticContent.modulesTitle}
                            </h3>
                            <div className="space-y-4">
                                {staticContent.curriculum.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 hover:shadow-sm transition-all bg-white dark:bg-gray-800">
                                        <div className="w-12 h-12 rounded-lg bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 font-bold">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <div className="text-sm text-[var(--color-clic-orange)] font-bold mb-1">{item.module}</div>
                                            <div className="text-gray-900 dark:text-white font-medium">{item.title}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Photo Catalogue */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Palette size={24} className="text-gray-400" />
                                Gallery
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="rounded-xl overflow-hidden aspect-[4/3] group cursor-pointer">
                                        <img 
                                            src={`https://loremflickr.com/400/300/${title.split(' ')[0]},${i},tech`} 
                                            alt={`Gallery ${i}`} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            referrerPolicy="no-referrer"
                                            loading="lazy"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Extra Links */}
                        <div>
                             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Globe size={24} className="text-gray-400" />
                                Resources
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {['Curriculum Guide', 'Student Projects', 'Research Papers', 'Apply Now'].map((link, i) => (
                                    <a key={i} href="#" className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group bg-white dark:bg-gray-800">
                                        <span className="font-semibold text-gray-700 dark:text-gray-300">{link}</span>
                                        <ArrowRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                ))}
                            </div>
                        </div>
                      </>
                    )}
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const LoginModal = ({ isOpen, onClose, onLoginSuccess }: { isOpen: boolean; onClose: () => void; onLoginSuccess: (user: any) => void }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    // Hardcoded test login in the frontend
    if (formData.email === 'frehun.demissie@gmail.com' && formData.password === 'Assefa2!') {
      onLoginSuccess({
        id: 'test_admin',
        email: 'frehun.demissie@gmail.com',
        role: 'Super Admin',
        name: 'Test Admin'
      });
      onClose();
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          action: 'admin_login',
          email: formData.email,
          password: formData.password
        }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        onLoginSuccess(result.user);
        onClose();
      } else {
        setError(result.message || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl relative overflow-hidden"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Admin Portal</h3>
            <p className="text-gray-600 dark:text-gray-400">Access your CLIC Ethiopia account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg border border-red-200 dark:border-red-800">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-clic-blue)] focus:border-transparent outline-none transition-all"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <a href="#" className="text-sm text-[var(--color-clic-blue)] hover:underline">Forgot password?</a>
              </div>
              <input 
                type="password" 
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-clic-blue)] focus:border-transparent outline-none transition-all"
                placeholder="Enter your password"
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-[var(--color-clic-blue)] hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex justify-center items-center gap-2 mt-6 disabled:opacity-70"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account? <a href="#" className="text-[var(--color-clic-blue)] font-medium hover:underline">Request access</a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Navbar = ({ isDarkMode, setIsDarkMode }: { isDarkMode: boolean, setIsDarkMode: (val: boolean) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { t, lang } = useTranslation();
  const { setLang } = React.useContext(LanguageContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginSuccess = (user: any) => {
    setAdminUser(user);
    setIsAdminPortalOpen(true);
  };

  const navLinks = [
    { 
      name: t.navAboutUs || 'About Us', 
      href: '#',
      children: [
        { name: t.navMission || 'Mission & Vision', href: '#about' },
        { name: t.founder, href: '#founder' },
        { name: t.impact, href: '#impact' },
      ]
    },
    { 
      name: t.navEducation || 'Education', 
      href: '#',
      children: [
        { name: t.navSteam || 'STEAM', href: '#steam' },
        { name: t.navIe || 'Innovation & Entrepreneurship', href: '#ie' },
        { name: t.navRoadmap || 'STEAM-IE Roadmap', href: '#curriculum' },
        { name: t.navTheory || 'Theory of Change', href: '#theory-of-change' },
        { name: t.navEngine || 'Curriculum Engine', href: '#engine' },
        { name: t.navResources || 'Resource Hub', href: '#resources' },
      ]
    },
    { 
      name: t.navInnovation || 'Innovation', 
      href: '#',
      children: [
        { name: t.navLabs || 'Labs', href: '#labs' },
        { name: t.navProjects || 'Student Projects', href: '#projects' },
      ]
    },
    { 
      name: t.navCommunity || 'Community', 
      href: '#',
      children: [
        { name: t.news, href: '#news' },
        { name: t.navEvents || 'Events', href: '#events' },
        { name: t.navStories || 'Community Stories', href: '#share-story' },
      ]
    },
    { 
      name: t.navSupport || 'Support Us', 
      href: '#',
      children: [
        { name: t.getInvolved, href: '#get-involved' },
        { name: t.navDonate || 'Donate', href: '#donate' },
        { name: t.merch, href: '#merch' },
      ]
    },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    
    // Handle hash links
    if (href.startsWith('#')) {
      if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      
      // Use setTimeout to allow the mobile menu close animation to start
      // without interrupting the smooth scroll
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          const offset = 80; // Navbar height
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 50);
    } else {
      // Handle external links or other cases
      window.location.href = href;
    }
  };

  return (
    <>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLoginSuccess={handleLoginSuccess} />
      <AdminPortal isOpen={isAdminPortalOpen} onClose={() => setIsAdminPortalOpen(false)} user={adminUser} />
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white dark:bg-gray-900 shadow-md py-2' : 'bg-transparent py-0'}`}>
        {/* Institutional Top Bar */}
        <div className="hidden lg:flex justify-between items-center px-4 md:px-8 py-1.5 bg-gray-900 text-gray-300 text-xs border-b border-gray-800">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone size={12} /> +251 911 69 2277</span>
            <span className="flex items-center gap-1"><Mail size={12} /> frehun@fadlab.tech</span>
          </div>
          <div className="flex items-center gap-4 font-medium">
            <span className="text-[var(--color-clic-blue)]">National Initiative for New Opportunities</span>
            <div className="flex items-center gap-3 ml-2">
              <button onClick={() => setIsLoginModalOpen(true)} className="hover:text-white transition-colors">Admin Portal</button>
              <span className="w-px h-3 bg-gray-700"></span>
              <a href="https://web.facebook.com/profile.php?id=100088701683074" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Alumni</a>
            </div>
          </div>
        </div>

        <div className={`w-full px-2 lg:px-4 transition-all duration-300 ${isScrolled ? '' : 'pt-3 pb-3'}`}>
        <div className="flex justify-between items-center">
          <a href="#" onClick={(e) => scrollToSection(e, '#')} className="flex items-center gap-2 group">
            <div className="flex transition-transform group-hover:scale-105">
              <span className="text-xl md:text-2xl font-black text-[var(--color-clic-red)] tracking-tighter">C</span>
              <span className="text-xl md:text-2xl font-black text-[var(--color-clic-orange)] tracking-tighter">L</span>
              <span className="text-xl md:text-2xl font-black text-[var(--color-clic-green)] tracking-tighter">I</span>
              <span className="text-xl md:text-2xl font-black text-[var(--color-clic-blue)] tracking-tighter">C</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-base md:text-lg font-bold leading-none ${isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}>Ethiopia</span>
              <span className={`text-[0.4rem] md:text-[0.45rem] font-semibold uppercase tracking-widest ${isScrolled ? 'text-gray-500 dark:text-gray-400' : 'text-gray-300'}`}>Creative Learning</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              link.children ? (
                <div key={link.name} className="relative group">
                  <button 
                    className={`flex items-center gap-1 text-xs xl:text-sm font-bold uppercase tracking-wider hover:opacity-70 transition-opacity ${isScrolled ? 'text-gray-800 dark:text-gray-200' : 'text-white'}`}
                  >
                    {link.name} <ChevronDown size={14} />
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-2 min-w-[160px] overflow-hidden">
                      {link.children.map(child => (
                         <a 
                           key={child.name}
                           href={child.href}
                           onClick={(e) => scrollToSection(e, child.href)}
                           className="block px-4 py-2 text-xs xl:text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-[var(--color-clic-blue)] dark:hover:text-[var(--color-clic-blue)] rounded-lg transition-colors text-center"
                         >
                           {child.name}
                         </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`text-xs xl:text-sm font-bold uppercase tracking-wider hover:opacity-70 transition-opacity ${isScrolled ? 'text-gray-800 dark:text-gray-200' : 'text-white'}`}
                >
                  {link.name}
                </a>
              )
            ))}
            <div className="flex items-center gap-4">
              <a href="#get-involved" onClick={(e) => scrollToSection(e, '#get-involved')} className="px-3 py-1.5 xl:px-4 xl:py-2 rounded-full text-xs xl:text-sm font-bold bg-[var(--color-clic-red)] text-white hover:bg-opacity-90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap">
                {t.getInvolved}
              </a>
              <GoogleTranslateWidget />
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full transition-colors ${isScrolled ? 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800' : 'text-white hover:bg-white/10'}`}
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-colors ${isScrolled ? 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800' : 'text-white hover:bg-white/10'}`}
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className={isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'} />
              ) : (
                <Menu className={isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'} />
              )}
            </button>
          </div>
      </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 overflow-hidden shadow-xl"
          >
            <div className="px-4 py-6 flex flex-col gap-2 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.children ? (
                    <div className="rounded-xl bg-gray-50 dark:bg-gray-800 overflow-hidden">
                      <button 
                        onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                        className="w-full flex justify-between items-center px-4 py-3 text-left font-bold text-gray-900 dark:text-white"
                      >
                        {link.name}
                        <ChevronDown size={16} className={`transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === link.name && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-3 space-y-1">
                              {link.children.map(child => (
                                <a 
                                  key={child.name}
                                  href={child.href}
                                  onClick={(e) => scrollToSection(e, child.href)}
                                  className="block px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[var(--color-clic-blue)] dark:hover:text-[var(--color-clic-blue)] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                                >
                                  {child.name}
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <a 
                      href={link.href} 
                      className="block px-4 py-3 text-lg font-bold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl"
                      onClick={(e) => scrollToSection(e, link.href)}
                    >
                      {link.name}
                    </a>
                  )}
                </div>
              ))}
              <hr className="my-4 border-gray-100 dark:border-gray-800" />
              <div className="flex justify-center mb-4">
                <GoogleTranslateWidget id="google_translate_element_mobile" />
              </div>
              <a 
                href="#get-involved" 
                onClick={(e) => scrollToSection(e, '#get-involved')}
                className="px-5 py-4 text-center rounded-xl text-base font-bold bg-[var(--color-clic-red)] text-white shadow-md active:scale-95 transition-transform"
              >
                {t.getInvolved}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    </>
  );
};

const Hero = () => {
  const { t } = useTranslation();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const videoId = "M7lc1UVf-VE"; // Placeholder YouTube video ID

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gray-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://loremflickr.com/1920/1080/technology,education,africa" 
          alt="Ethiopian Students Learning" 
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
        {/* Subtle African Motif Pattern */}
        <div className="absolute inset-0 bg-pattern-mudcloth opacity-[0.04] invert pointer-events-none mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-100 text-sm font-bold mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-indigo-300" />
              <span>Curricula Co-Created with Google AI Ecosystem</span>
            </div>
            <br />
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
              Vision Smart-Ethiopia 2025 EC
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 font-serif">
              {t.heroTitle1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-clic-green)] to-[var(--color-clic-blue)]">{t.heroTitle2}</span> {t.heroTitle3}
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              {t.heroSubtitle}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#get-involved" className="px-8 py-4 rounded-full text-lg font-bold bg-[var(--color-clic-blue)] text-white hover:bg-opacity-90 transition-all shadow-[0_0_20px_rgba(0,114,206,0.4)] hover:shadow-[0_0_30px_rgba(0,114,206,0.6)] flex items-center gap-2 hover:scale-105">
                Donate to Empower <ArrowRight size={20} />
              </a>
              <button 
                onClick={() => setIsVideoModalOpen(true)} 
                className="px-8 py-4 rounded-full text-base font-bold bg-[#FF0000] text-white hover:bg-red-700 transition-all shadow-[0_0_20px_rgba(255,0,0,0.4)] hover:shadow-[0_0_30px_rgba(255,0,0,0.6)] flex items-center gap-2 hover:scale-105"
              >
                <Youtube size={18} /> {t.watchVideo}
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 border-t border-white/10 pt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
        >
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-[var(--color-clic-red)] font-mono">12+</h3>
              <p className="text-xs md:text-sm text-gray-300 uppercase tracking-wider font-semibold mt-1">Sectors</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-[var(--color-clic-green)] font-mono">200+</h3>
              <p className="text-xs md:text-sm text-gray-300 uppercase tracking-wider font-semibold mt-1">Projects</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-[var(--color-clic-blue)] font-mono">15+</h3>
              <p className="text-xs md:text-sm text-gray-300 uppercase tracking-wider font-semibold mt-1">Partners</p>
            </div>
          </div>

          {/* Decorative STEAM Elements - Moved to be responsive */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-start lg:justify-end">
            <div className="flex gap-2 sm:gap-3">
              {[
                { icon: FlaskConical, color: 'var(--color-clic-red)', label: 'S' },
                { icon: Cpu, color: 'var(--color-clic-orange)', label: 'T' },
                { icon: Compass, color: 'var(--color-clic-green)', label: 'E' },
                { icon: Palette, color: 'var(--color-clic-blue)', label: 'A' },
                { icon: Calculator, color: 'var(--color-clic-purple)', label: 'M' }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + (i * 0.1), duration: 0.5 }}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-lg flex flex-col items-center justify-center border border-gray-100 dark:border-gray-700 relative group"
                  style={{ color: item.color }}
                >
                  <item.icon size={20} className="sm:w-6 sm:h-6" />
                  <span className="text-[10px] font-bold mt-1 opacity-0 group-hover:opacity-100 absolute -bottom-5 text-white bg-gray-900 px-2 py-0.5 rounded transition-opacity z-20">{item.label}</span>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="text-white/80 flex flex-row sm:flex-col items-center justify-center mx-2 gap-2 sm:gap-0"
            >
              <span className="text-xs font-bold uppercase tracking-widest sm:mb-1">Enables</span>
              <ArrowRight size={20} className="animate-pulse text-[var(--color-clic-blue)] sm:w-6 sm:h-6 sm:rotate-0" />
            </motion.div>

            <div className="flex gap-2 sm:gap-3">
              {[
                { icon: Lightbulb, color: '#FFD700', label: 'Innovation' },
                { icon: Rocket, color: '#FF4500', label: 'Entrepreneurship' }
              ].map((item, i) => (
                <motion.div 
                  key={`ie-${i}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + (i * 0.2), duration: 0.5 }}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-white to-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.3)] flex flex-col items-center justify-center border-2 border-white/50 relative group"
                  style={{ color: item.color }}
                >
                  <item.icon size={24} className="sm:w-7 sm:h-7" />
                  <span className="text-[10px] font-bold mt-1 opacity-0 group-hover:opacity-100 absolute -bottom-5 text-white bg-gray-900 px-2 py-0.5 rounded transition-opacity whitespace-nowrap z-20">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-black rounded-2xl w-full max-w-5xl aspect-video overflow-hidden shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsVideoModalOpen(false)} 
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 rounded-full transition-colors text-white"
              >
                <X size={24} />
              </button>
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const About = () => {
  const { t } = useTranslation();
  return (
    <section id="about" className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Subtle African Motif Pattern */}
      <div className="absolute inset-0 bg-pattern-mudcloth opacity-[0.02] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-serif">
              National Initiative for New Opportunities
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t.aboutDesc}
            </p>
            
            <div className="space-y-6">
              {[
                { 
                  icon: Target, 
                  title: t.aboutList1Title, 
                  desc: t.aboutList1Desc 
                },
                { 
                  icon: Lightbulb, 
                  title: t.aboutList2Title, 
                  desc: t.aboutList2Desc 
                },
                { 
                  icon: Globe, 
                  title: t.aboutList3Title, 
                  desc: t.aboutList3Desc 
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-clic-light)] flex items-center justify-center text-[var(--color-clic-orange)]">
                    <item.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-12"
          >
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden relative shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80" 
                  alt="National Initiative Collaboration" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-xs z-10">
                <div className="text-4xl font-black text-[var(--color-clic-blue)] mb-2">1M+</div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Ethiopians to be trained by 2025 EC</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FounderMessage = () => {
  const { t } = useTranslation();
  return (
    <section id="founder" className="py-24 bg-gray-50 dark:bg-gray-800 relative overflow-hidden transition-colors duration-300">
      {/* Subtle African Motif Pattern */}
      <div className="absolute inset-0 bg-pattern-kuba opacity-[0.02] pointer-events-none"></div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--color-clic-red)]/5 rounded-br-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--color-clic-blue)]/5 rounded-tl-full translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="https://loremflickr.com/800/1000/professor,ethiopian,man,portrait" 
                alt="Dr. Ir. Frehun Adefris" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
                <h3 className="text-2xl font-bold font-serif">Dr. Ir. Frehun Adefris (Prof.)</h3>
                <p className="text-gray-300">Founder & CEO, CLIC Ethiopia</p>
              </div>
            </div>
            {/* Decorative frame */}
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[var(--color-clic-orange)] rounded-3xl -z-10"></div>
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[var(--color-clic-green)] rounded-3xl -z-10"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Quote className="text-[var(--color-clic-red)] fill-current opacity-20" size={48} />
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white font-serif">Message from the Founder</h2>
            </div>
            
            <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300 mb-8">
              <p className="italic text-xl text-gray-800 dark:text-gray-200 font-medium mb-6">
                {t.founderMsg1}
              </p>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                {t.founderMsg2}<strong className="text-[var(--color-clic-red)]">{t.founderMsg2Bold}</strong>.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {t.founderMsg3}
              </p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 mb-8 p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-800/30 relative overflow-hidden"
            >
              <Sparkles className="absolute top-4 right-4 w-24 h-24 text-indigo-500/10 rotate-12" />
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 font-serif">The AI Synergy</h4>
                  <p className="text-gray-700 dark:text-gray-300 italic text-sm">
                    "As a Subject Matter Expert, I leverage tools like Google AI Studio and NotebookLM to translate decades of industrial experience into dynamic, scalable curricula. AI doesn't replace the expert; it amplifies our reach across Africa."
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-wrap gap-4">
              <a href="#get-involved" className="px-8 py-4 rounded-full text-base font-bold bg-[var(--color-clic-blue)] text-white hover:bg-opacity-90 transition-colors shadow-lg flex items-center gap-2">
                Join the Vision <ArrowRight size={18} />
              </a>
              <a href="#get-involved" className="px-8 py-4 rounded-full text-base font-bold bg-white text-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-700 border border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                Support Our Goal
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};



const SteamSection = () => {
  const { t } = useTranslation();
  const [selectedField, setSelectedField] = useState<any>(null);

  const steamFields = [
    { 
      letter: 'S', name: 'Science', color: 'var(--color-clic-red)', icon: FlaskConical, 
      desc: 'Equips students with the analytical tools to experiment, test hypotheses, and uncover the fundamental laws shaping our world.',
      stats: [{ label: 'Modules', value: '12+' }, { label: 'Experiments', value: '50+' }],
      detailedContent: 'Our Science curriculum covers Biotechnology, Agricultural Science, Chemical Science, and Environmental Science. Students engage in hands-on experiments to understand the fundamental laws of nature and apply them to solve local challenges.',
      colSpan: 'lg:col-span-2'
    },
    { 
      letter: 'T', name: 'Technology', color: 'var(--color-clic-orange)', icon: Cpu, 
      desc: 'Empowers learners to build, connect, and process information across diverse digital and physical environments.',
      stats: [{ label: 'Tools', value: '25+' }, { label: 'Projects', value: '40+' }],
      detailedContent: 'Focuses on Electronics, IoT Systems, Computer Programming, and Digital Communications. Students learn to build smart devices, code applications, and leverage digital tools for industrial transformation.',
      colSpan: 'lg:col-span-2'
    },
    { 
      letter: 'E', name: 'Engineering', color: 'var(--color-clic-green)', icon: Compass, 
      desc: 'Drives the cycle of innovation—turning complex problems into tangible, scalable, and practical solutions.',
      stats: [{ label: 'Designs', value: '100+' }, { label: 'Prototypes', value: '30+' }],
      detailedContent: 'Covers Architecture, Manufacturing, Process Automation, and Robotics. Students learn the engineering design process, from ideation to prototyping and final production.',
      colSpan: 'lg:col-span-2'
    },
    { 
      letter: 'A', name: 'Arts', color: 'var(--color-clic-blue)', icon: Palette, 
      desc: 'Fosters creative expression and design thinking to bridge cultural barriers and inspire human-centric innovation.',
      stats: [{ label: 'Mediums', value: '8' }, { label: 'Exhibits', value: '12' }],
      detailedContent: 'Integrates Fine Arts, Digital Arts, and Technical Arts. We believe creativity is the catalyst for innovation. Students explore graphics design, 3D modeling, and multimedia storytelling.',
      colSpan: 'lg:col-span-3'
    },
    { 
      letter: 'M', name: 'Mathematics', color: 'var(--color-clic-purple)', icon: Calculator, 
      desc: 'Provides the structural logic and quantitative frameworks needed to analyze data, model scenarios, and optimize systems.',
      stats: [{ label: 'Models', value: '20+' }, { label: 'Algorithms', value: '15+' }],
      detailedContent: 'Applied Mathematics, Statistics, and Data Science. We move beyond theory to application, using math to model real-world systems, analyze business data, and optimize industrial processes.',
      colSpan: 'lg:col-span-3'
    },
  ];

  return (
    <section id="steam" className="py-24 bg-[var(--color-clic-light)] dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Subtle African Motif Pattern */}
      <div className="absolute inset-0 bg-pattern-kuba opacity-[0.03] pointer-events-none"></div>
      
      {/* Decorative dashed line behind the grid */}
      <div className="absolute top-[55%] left-0 w-full h-0.5 border-t-2 border-dashed border-gray-300 -z-0 hidden lg:block opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 font-serif">What is STEAM?</h2>
          <p className="text-xl text-gray-600">
            {t.steamDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {steamFields.map((field, i) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-500 flex flex-col h-full ${field.colSpan}`}
              onClick={() => setSelectedField({ ...field, title: field.name })}
            >
              {/* Hover Tint */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 z-0 pointer-events-none"
                style={{ backgroundColor: field.color }}
              ></div>

              {/* Watermark Letter */}
              <div 
                className="absolute -bottom-8 -right-4 text-[14rem] font-black leading-none opacity-[0.15] group-hover:opacity-[0.25] group-hover:-translate-y-4 transition-all duration-700 z-0 select-none pointer-events-none"
                style={{ color: field.color }}
              >
                {field.letter}
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-500"
                    style={{ backgroundColor: field.color }}
                  >
                    <field.icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{field.name}</h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-8 flex-grow text-base leading-relaxed">
                  {field.desc}
                </p>
                
                {/* Mini Stats */}
                <div className="grid grid-cols-2 gap-4 w-full mb-6 border-t border-gray-100 dark:border-gray-700 pt-6">
                  {field.stats.map((stat, idx) => (
                    <div key={idx} className="text-left">
                      <div className="text-2xl font-black mb-1" style={{ color: field.color }}>{stat.value}</div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mt-auto group-hover:gap-3 transition-all duration-300" style={{ color: field.color }}>
                  <span>Learn More</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* AI Integration Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2 lg:col-span-6 p-8 rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-xl"
          >
            <Sparkles className="absolute -right-10 -top-10 w-48 h-48 text-white/10 rotate-12" />
            <div className="flex-grow relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-sm border border-white/30">
                <Sparkles className="w-3 h-3" /> AI-Powered Curriculum
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 font-serif">Dynamic STEAM Modules</h3>
              <p className="text-indigo-100 text-lg max-w-3xl">
                Course materials, quizzes, and project prompts across all STEAM fields are continuously updated using <strong>Gemini Gems</strong> to reflect the latest industry standards and technological advancements.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <InfoModal 
        isOpen={!!selectedField} 
        onClose={() => setSelectedField(null)} 
        data={selectedField} 
      />
    </section>
  );
};

const IESection = () => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const ieData = {
    innovation: {
      title: 'Innovation',
      color: 'var(--color-clic-orange)',
      icon: Lightbulb,
      description: 'Fostering a culture of creativity and problem-solving. We provide the tools and environment for students to experiment, prototype, and develop unique solutions to real-world challenges.',
      stats: [
        { label: 'Patents Filed', value: '15+' },
        { label: 'Prototypes', value: '200+' },
        { label: 'R&D Hours', value: '5k+' }
      ],
      detailedContent: 'Our Innovation hub focuses on Research & Development, Prototyping, and Design Thinking. We support students in protecting their intellectual property through patent support and connecting them with industrial partners for pilot testing.'
    },
    entrepreneurship: {
      title: 'Entrepreneurship',
      color: 'var(--color-clic-green)',
      icon: Rocket,
      description: 'Building the business leaders of tomorrow. We offer incubation support, mentorship, and resources to help transform innovative projects into viable, scalable startups.',
      stats: [
        { label: 'Startups', value: '25+' },
        { label: 'Mentors', value: '40+' },
        { label: 'Funding', value: '$12M' }
      ],
      detailedContent: 'The Entrepreneurship track includes Business Incubation, Startup Mentorship, and Market Analysis. We guide young entrepreneurs through the entire lifecycle of a startup, from business plan development to securing seed funding and scaling operations.'
    }
  };

  return (
    <section id="ie" className="py-24 bg-white dark:bg-gray-800 relative overflow-hidden transition-colors duration-300">
      {/* Subtle African Motif Pattern */}
      <div className="absolute inset-0 bg-pattern-zigzag opacity-[0.02] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 font-serif">Innovation & Entrepreneurship</h2>
          <p className="text-xl text-gray-600">
            {t.ieDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Innovation Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[var(--color-clic-light)] rounded-3xl p-8 md:p-12 border border-gray-100 hover:shadow-xl transition-all relative overflow-hidden group cursor-pointer"
            onClick={() => setSelectedItem(ieData.innovation)}
          >
            <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity">
               <img src="https://loremflickr.com/600/400/idea,technology" alt="Innovation" className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-clic-orange)]/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500 z-0"></div>
            
            {/* Watermark Letter */}
            <div 
              className="absolute -bottom-8 -right-4 text-[14rem] font-black leading-none opacity-[0.15] group-hover:opacity-[0.25] group-hover:-translate-y-4 transition-all duration-700 z-0 select-none pointer-events-none"
              style={{ color: 'var(--color-clic-orange)' }}
            >
              I
            </div>

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-gray-700 text-[var(--color-clic-orange)] flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                <Lightbulb size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Innovation</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Fostering a culture of creativity and problem-solving. We provide the tools and environment for students to experiment, prototype, and develop unique solutions to real-world challenges.
              </p>
              
              <div className="flex gap-6 mb-8">
                {ieData.innovation.stats.map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl font-black text-[var(--color-clic-orange)]">{stat.value}</div>
                    <div className="text-xs font-bold text-gray-500 uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>

              <button className="px-6 py-3 rounded-xl font-bold text-white bg-[var(--color-clic-orange)] hover:bg-opacity-90 transition-colors shadow-md flex items-center gap-2">
                Explore Innovation <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>

          {/* Entrepreneurship Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[var(--color-clic-light)] rounded-3xl p-8 md:p-12 border border-gray-100 hover:shadow-xl transition-all relative overflow-hidden group cursor-pointer"
            onClick={() => setSelectedItem(ieData.entrepreneurship)}
          >
            <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity">
               <img src="https://loremflickr.com/600/400/startup,business" alt="Entrepreneurship" className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-clic-green)]/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500 z-0"></div>
            
            {/* Watermark Letter */}
            <div 
              className="absolute -bottom-8 -right-4 text-[14rem] font-black leading-none opacity-[0.15] group-hover:opacity-[0.25] group-hover:-translate-y-4 transition-all duration-700 z-0 select-none pointer-events-none"
              style={{ color: 'var(--color-clic-green)' }}
            >
              E
            </div>

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-gray-700 text-[var(--color-clic-green)] flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                <Rocket size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Entrepreneurship</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Building the business leaders of tomorrow. We offer incubation support, mentorship, and resources to help transform innovative projects into viable, scalable startups.
              </p>

              <div className="flex gap-6 mb-8">
                {ieData.entrepreneurship.stats.map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl font-black text-[var(--color-clic-green)]">{stat.value}</div>
                    <div className="text-xs font-bold text-gray-500 uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>

              <button className="px-6 py-3 rounded-xl font-bold text-white bg-[var(--color-clic-green)] hover:bg-opacity-90 transition-colors shadow-md flex items-center gap-2">
                Start Business <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* AI Integration Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 p-8 rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-xl"
        >
          <Sparkles className="absolute -left-10 -bottom-10 w-48 h-48 text-white/10 -rotate-12" />
          <div className="flex-grow relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-sm border border-white/30">
              <Sparkles className="w-3 h-3" /> AI-Powered Incubation
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3 font-serif">Smart Startup Acceleration</h3>
            <p className="text-indigo-100 text-lg max-w-3xl">
              From ideation to market analysis, our incubation process leverages <strong>Google AI Studio</strong> to help student founders generate business plans, analyze market trends, and refine their pitches at unprecedented speed.
            </p>
          </div>
        </motion.div>
      </div>

      <InfoModal 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
        data={selectedItem} 
      />
    </section>
  );
};

const Labs = () => {
  const { t } = useTranslation();
  const [selectedLab, setSelectedLab] = useState<any>(null);

  const labs = [
    {
      title: 'Digital Labs',
      icon: BookOpen,
      color: 'var(--color-clic-blue)',
      desc: 'The Future of Classrooms. E-learning platforms for remote classes, using VR & AR as new training methods.',
      image: 'https://loremflickr.com/600/400/computer,code,classroom',
      stats: [{ label: 'Students', value: '500+' }, { label: 'Courses', value: '25' }, { label: 'VR Units', value: '50' }],
      detailedContent: 'Digital Labs are designed for learning skills using digital means. Includes Basic Literacy Skills (Language, Computer HW/SW) and Theoretical Skills delivered via virtual classrooms. Features a Data Center for digital solutions, IoT, and AI.',
      colSpan: 'md:col-span-2 lg:col-span-3'
    },
    {
      title: 'Fabrication Labs',
      icon: Factory,
      color: 'var(--color-clic-orange)',
      desc: 'Smart workshops for practical lessons. Prototyping & small scale production labs using smart fabrication technologies.',
      image: 'https://loremflickr.com/600/400/robotics,factory,workshop',
      stats: [{ label: 'Machines', value: '15+' }, { label: 'Tools', value: '200+' }, { label: 'Safety', value: '100%' }],
      detailedContent: 'Workshops for hands-on skills using state-of-the-art tools. Covers Basic Tools Skills, Design & Fabrication (CAD/CAM), and Prototyping & Manufacturing. Learn to manufacture, distribute, and market products.',
      colSpan: 'md:col-span-1 lg:col-span-2'
    },
    {
      title: 'Field Labs',
      icon: Sprout,
      color: 'var(--color-clic-green)',
      desc: 'State of the Art field projects. On-the-job hands-on practical trainings and large scale production plants.',
      image: 'https://loremflickr.com/600/400/agriculture,solar,farm',
      stats: [{ label: 'Sites', value: '10' }, { label: 'Projects', value: '15' }, { label: 'Impact', value: 'High' }],
      detailedContent: 'Includes Field Workshops for digital learning in the field, Practical Attachment for on-the-job training with professionals, and On-the-Job Trainings for short-term assignments on field projects.',
      colSpan: 'md:col-span-1 lg:col-span-2'
    },
    {
      title: 'Smart City Labs',
      icon: Building2,
      color: 'var(--color-clic-purple)',
      desc: 'A place for 10,000 to 100,000 innovators per region! Smart houses, smart factories, and smart businesses.',
      image: 'https://loremflickr.com/600/400/smartcity,architecture,modern',
      stats: [{ label: 'Capacity', value: '10k+' }, { label: 'Zones', value: '3' }, { label: 'Vision', value: '2025' }],
      detailedContent: 'Smart industrial cities built as a business & manufacturing hub. Features Smart Industry (Smart factories, R&D), Smart Business (Data centers, Incubation), and Smart Living (Budget housing, Smart energy, Smart farming).',
      colSpan: 'md:col-span-2 lg:col-span-3'
    }
  ];

  return (
    <section id="labs" className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
      {/* Subtle African Motif Pattern */}
      <div className="absolute inset-0 bg-pattern-mudcloth opacity-[0.02] dark:opacity-[0.015] dark:invert pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-serif">Smart Creative Laboratories</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t.labsDesc}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {labs.map((lab, i) => (
            <motion.div
              key={lab.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`group relative rounded-3xl overflow-hidden bg-gray-900 aspect-[4/3] sm:aspect-auto sm:min-h-[400px] cursor-pointer shadow-lg hover:shadow-2xl transition-all ${lab.colSpan}`}
              onClick={() => setSelectedLab(lab)}
            >
              <img 
                src={lab.image} 
                alt={lab.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-white backdrop-blur-md shadow-lg group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-500"
                  style={{ backgroundColor: `${lab.color}90` }}
                >
                  <lab.icon size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{lab.title}</h3>
                <p className="text-gray-300 max-w-md mb-4 line-clamp-2">{lab.desc}</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-auto">
                  <span className="text-white font-bold text-sm bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 w-max group-hover:bg-white/30 transition-colors">
                    Explore Lab
                  </span>
                  
                  <div className="flex gap-4 sm:ml-auto">
                    {lab.stats.slice(0, 2).map((stat, idx) => (
                      <div key={idx} className="text-left sm:text-right">
                        <div className="text-white font-bold text-sm">{stat.value}</div>
                        <div className="text-gray-400 text-[0.6rem] uppercase tracking-wider">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <InfoModal 
        isOpen={!!selectedLab} 
        onClose={() => setSelectedLab(null)} 
        data={selectedLab} 
      />
    </section>
  );
};

const Projects = () => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const projects = [
    { 
      category: 'Smart Agriculture', count: '5 Projects', color: 'var(--color-clic-green)', icon: Sprout,
      items: ['Phytoponics & Hydroponics', 'Vertical Agriculture', 'Smart Livestock Farming'],
      stats: [{ label: 'Yield', value: '+300%' }, { label: 'Water', value: '-90%' }, { label: 'Space', value: 'Optimized' }],
      detailedContent: 'Includes Phytoponics (Hydroponics farming powered by solar), Vertical agriculture systems for any size of space, and Smart Livestock Farming with automation in poultry farms. Aiming to increase vegetable production multiple folds.',
      colSpan: 'lg:col-span-2'
    },
    { 
      category: 'Smart Healthcare', count: '10 Projects', color: 'var(--color-clic-red)', icon: HeartHandshake,
      items: ['Portable Smart Healthcare', '4G Enabled IT Systems', 'Solar Powered Medical Kits'],
      stats: [{ label: 'Portability', value: '100%' }, { label: 'Access', value: 'Remote' }, { label: 'Cost', value: 'Low' }],
      detailedContent: 'Highly portable smart healthcare systems that fit into a suitcase. Ultra-efficient 4G enabled IT systems including handheld ultrasound, smart phones, and wearable devices. Applications for cancer, HIV/AIDS, Diabetes, and emergency care.',
      colSpan: 'lg:col-span-1'
    },
    { 
      category: 'Smart Manufacturing', count: '12 Projects', color: 'var(--color-clic-orange)', icon: Factory,
      items: ['Smart Factories', 'Specialty Robotics', 'Process Automation'],
      stats: [{ label: 'Efficiency', value: 'High' }, { label: 'Waste', value: 'Zero' }, { label: 'Quality', value: 'Best' }],
      detailedContent: 'Smart factories for different industrial sectors. Includes Smart Industrial Robotics (Computer Aided Design, Machine Assembly), and Smart Metal, Plastic, Wood, Textile & Leather Works using small-scale fabrication technologies.',
      colSpan: 'lg:col-span-1'
    },
    { 
      category: 'Smart Construction', count: '7 Projects', color: 'var(--color-clic-blue)', icon: Building2,
      items: ['3D House Printing', 'Modular Prefabrication', 'Digital Construction Mgmt'],
      stats: [{ label: 'Speed', value: 'Fast' }, { label: 'Cost', value: 'Affordable' }, { label: 'Eco', value: 'Friendly' }],
      detailedContent: 'Use of state-of-the-art technologies to build smart industrial villages. Resource efficient tools including 3D house printing machineries and modular concrete prefabrication technologies for rural areas.',
      colSpan: 'lg:col-span-1'
    },
    { 
      category: 'Smart Mobility', count: '5 Projects', color: 'var(--color-clic-purple)', icon: Car,
      items: ['Electric UTVs/ATVs', 'Solar Powered Batteries', 'Smart Traffic Systems'],
      stats: [{ label: 'Cost', value: '-40%' }, { label: 'Emission', value: '0%' }, { label: 'Range', value: '150km' }],
      detailedContent: 'Modular city mobility solutions and electric utility vehicles for rural Ethiopia. Powered by efficient battery packs and solar charging. Includes conversion kits for old engines to electric.',
      colSpan: 'lg:col-span-2'
    },
    { 
      category: 'Smart Energy', count: '5 Projects', color: 'var(--color-clic-green)', icon: Zap,
      items: ['Modular Wind Energy', 'Micro Hydropower', 'Off-grid Metering'],
      stats: [{ label: 'Power', value: '24/7' }, { label: 'Green', value: '100%' }, { label: 'Cost', value: 'Low' }],
      detailedContent: 'Harvesting green energy using modular systems. Bringing electricity to villages not connected to the national grid using solar, wind, and hydro sources. Smart off-grid metering systems.',
      colSpan: 'lg:col-span-1'
    },
    { 
      category: 'Smart Finance', count: '6 Projects', color: 'var(--color-clic-red)', icon: Coins,
      items: ['Digital Coins', 'Smart POS Systems', 'Mobile Payments'],
      stats: [{ label: 'Speed', value: 'Instant' }, { label: 'Security', value: 'High' }, { label: 'Access', value: 'All' }],
      detailedContent: 'Integration of digital payment solutions and smart POS infrastructures. Enabling safe and secured transactions across all industries and private citizens. Includes crypto currency integration.',
      colSpan: 'lg:col-span-1'
    },
    { 
      category: 'Smart Education', count: '7 Projects', color: 'var(--color-clic-orange)', icon: GraduationCap,
      items: ['E-learning Platforms', 'VR/AR Classrooms', 'STEM Kits'],
      stats: [{ label: 'Reach', value: 'Remote' }, { label: 'Content', value: 'Rich' }, { label: 'Skills', value: 'Future' }],
      detailedContent: 'Smart education delivery including remote areas. Offers highly specialized technical skills and content-oriented practical lessons via digital platforms and virtual reality.',
      colSpan: 'lg:col-span-1'
    },
    { 
      category: 'Smart Lifestyle', count: '3 Projects', color: 'var(--color-clic-blue)', icon: Home,
      items: ['Smart Cooking Stoves', 'Solar LED Lamps', 'Android TV Systems'],
      stats: [{ label: 'Smoke', value: '0%' }, { label: 'Power', value: 'Solar' }, { label: 'Life', value: 'Better' }],
      detailedContent: 'Improving daily life with smart home technologies. Includes smokeless cooking stoves using biodegradable fuel, efficient solar lighting, and educational entertainment systems.',
      colSpan: 'lg:col-span-2'
    },
    { 
      category: 'Smart Environment', count: '4 Projects', color: 'var(--color-clic-purple)', icon: Recycle,
      items: ['Plastic Recycling', 'Textile Waste Mgmt', 'Bio-fuel Production'],
      stats: [{ label: 'Waste', value: '-80%' }, { label: 'Value', value: 'Added' }, { label: 'Eco', value: 'Safe' }],
      detailedContent: 'Small scale recycling plants for textiles and plastic wastes. Converting waste into usable products and energy sources. Environmentally friendly and safe operating atmosphere.',
      colSpan: 'lg:col-span-2'
    },
    { 
      category: 'Smart Infrastructure', count: '12 Projects', color: 'var(--color-clic-green)', icon: Server,
      items: ['National Data Centers', 'Smart Roads', 'Digital Services'],
      stats: [{ label: 'Uptime', value: '99.9%' }, { label: 'Connect', value: 'Fast' }, { label: 'Data', value: 'Secure' }],
      detailedContent: 'Nationally connected data centers and smart road construction technologies for efficient transportation, supply chain, and logistics. Digital services for every industrial sector.',
      colSpan: 'lg:col-span-1'
    },
    { 
      category: 'Smart Governance', count: '15 Projects', color: 'var(--color-clic-red)', icon: Landmark,
      items: ['Public Service Apps', 'Digital ID Systems', 'Civic Engagement'],
      stats: [{ label: 'Service', value: 'Fast' }, { label: 'Transp.', value: '100%' }, { label: 'Access', value: 'Easy' }],
      detailedContent: 'Digitizing public services for better governance. Smart systems for efficient administration, citizen engagement, and smart public projects.',
      colSpan: 'lg:col-span-1'
    },
  ];

  return (
    <section id="projects" className="py-24 bg-gray-900 text-white relative overflow-hidden">
      {/* Subtle African Motif Pattern */}
      <div className="absolute inset-0 bg-pattern-kuba opacity-[0.03] invert pointer-events-none mix-blend-overlay"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-6 font-serif">200+ Applied Industrial Projects</h2>
          <p className="text-xl text-gray-400">
            {t.projectsDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((proj, i) => (
            <motion.div
              key={proj.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`bg-gray-800 rounded-3xl p-8 border border-gray-700 hover:border-gray-500 transition-all hover:bg-gray-750 cursor-pointer group flex flex-col h-full relative overflow-hidden ${proj.colSpan}`}
              onClick={() => setSelectedProject({ ...proj, title: proj.category, description: `Explore our ${proj.category} initiatives.` })}
            >
              {/* Hover Tint */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500 z-0 pointer-events-none"
                style={{ backgroundColor: proj.color }}
              ></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div 
                    className="text-xs font-bold uppercase tracking-wider inline-block px-3 py-1 rounded-full"
                    style={{ backgroundColor: `${proj.color}20`, color: proj.color }}
                  >
                    {proj.count}
                  </div>
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-500"
                    style={{ backgroundColor: `${proj.color}90` }}
                  >
                    <proj.icon size={24} />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{proj.category}</h3>
                <ul className="space-y-3 mb-8 flex-grow">
                  {proj.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                      <ChevronRight size={16} className="mt-0.5 flex-shrink-0" style={{ color: proj.color }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="pt-6 border-t border-gray-700 flex justify-between items-center mt-auto">
                  <span className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors">View Details</span>
                  <ArrowRight size={16} className="text-gray-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <InfoModal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        data={selectedProject} 
      />
    </section>
  );
};

const DonateModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    paymentMethod: 'telebirr'
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return phone === '' || /^\d{10}$/.test(phone.replace(/\D/g, ''));
  };

  const isFormValid = () => {
    const finalAmount = amount === 'Custom' ? customAmount : amount;
    return (
      finalAmount &&
      formData.name.trim().length > 0 &&
      validateEmail(formData.email) &&
      validatePhone(formData.phone)
    );
  };

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true });
    
    if (!isFormValid()) return;

    setIsLoading(true);
    setError(null);
    
    const finalAmount = amount === 'Custom' ? customAmount : amount;

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          action: 'donate',
          amount: finalAmount,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          paymentMethod: formData.paymentMethod
        }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setIsSubmitted(true);
      } else {
        throw new Error(result.message || 'Failed to submit donation');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
    setFormData({ name: '', email: '', phone: '', message: '', paymentMethod: 'telebirr' });
    setAmount('');
    setCustomAmount('');
    setTouched({ name: false, email: false, phone: false });
  };

  const finalAmount = amount === 'Custom' ? customAmount : amount;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-white dark:bg-gray-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            {isSubmitted ? (
              <div className="p-12 text-center relative">
                <button onClick={handleClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                  <X size={20} className="text-gray-600 dark:text-gray-400" />
                </button>
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HeartHandshake size={40} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Thank You!</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8">Your generous donation has been received. We will send a receipt to your email shortly.</p>
                <button onClick={handleClose} className="px-8 py-3 bg-[var(--color-clic-red)] text-white rounded-xl font-bold hover:bg-opacity-90 transition-colors">
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 shrink-0">
                  <h3 className="text-xl font-bold font-serif text-gray-900 dark:text-white">Make a Donation</h3>
                  <button onClick={handleClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
                    <X size={20} className="text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
                
                <form onSubmit={handleDonate} className="flex flex-col overflow-hidden flex-grow">
                  <div className="overflow-y-auto p-6 md:p-8 space-y-4 flex-grow">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Select Amount</label>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {['500', '2500', '10000', 'Custom'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => { setAmount(opt); if(opt !== 'Custom') setCustomAmount(''); }}
                          className={`py-2 px-1 rounded-lg text-sm font-bold border transition-all ${
                            amount === opt
                              ? 'bg-[var(--color-clic-red)] text-white border-[var(--color-clic-red)]'
                              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                          }`}
                        >
                          {opt === 'Custom' ? 'Custom' : `ETB ${opt}`}
                        </button>
                      ))}
                    </div>
                    {amount === 'Custom' && (
                      <input 
                        required
                        type="number" 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-clic-red)] outline-none"
                        placeholder="Enter amount in ETB"
                        value={customAmount}
                        onChange={e => setCustomAmount(e.target.value)}
                      />
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                      <input 
                        required
                        type="text" 
                        className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none transition-all pr-10 ${
                          touched.name 
                            ? formData.name.trim().length > 0 
                              ? 'border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-900/30' 
                              : 'border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/30'
                            : 'border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[var(--color-clic-red)]'
                        }`}
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        onBlur={() => setTouched({...touched, name: true})}
                        placeholder="Your Name"
                      />
                      {touched.name && formData.name.trim().length > 0 && (
                        <CheckCircle size={18} className="absolute right-3 top-10 text-green-500" />
                      )}
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                      <input 
                        type="tel" 
                        className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none transition-all pr-10 ${
                          touched.phone 
                            ? validatePhone(formData.phone)
                              ? formData.phone ? 'border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-900/30' : 'border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[var(--color-clic-red)]'
                              : 'border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/30'
                            : 'border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[var(--color-clic-red)]'
                        }`}
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        onBlur={() => setTouched({...touched, phone: true})}
                        placeholder="0911..."
                      />
                      {touched.phone && formData.phone && validatePhone(formData.phone) && (
                        <CheckCircle size={18} className="absolute right-3 top-10 text-green-500" />
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input 
                      required
                      type="email" 
                      className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none transition-all pr-10 ${
                        touched.email 
                          ? validateEmail(formData.email)
                            ? 'border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-900/30' 
                            : 'border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/30'
                          : 'border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[var(--color-clic-red)]'
                      }`}
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      onBlur={() => setTouched({...touched, email: true})}
                      placeholder="you@example.com"
                    />
                    {touched.email && validateEmail(formData.email) && (
                      <CheckCircle size={18} className="absolute right-3 top-10 text-green-500" />
                    )}
                    {touched.email && !validateEmail(formData.email) && formData.email.length > 0 && (
                      <p className="text-red-500 text-xs mt-1">Please enter a valid email address</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Message (Optional)</label>
                    <textarea 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-clic-red)] outline-none h-24 resize-none"
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      placeholder="Why are you supporting us?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Payment Method</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, paymentMethod: 'telebirr'})}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                          formData.paymentMethod === 'telebirr'
                            ? 'border-[var(--color-clic-red)] bg-red-50 dark:bg-red-900/20 text-[var(--color-clic-red)]'
                            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <span className="font-bold">Telebirr</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, paymentMethod: 'chapa'})}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                          formData.paymentMethod === 'chapa'
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600'
                            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <span className="font-bold">Chapa</span>
                      </button>
                    </div>
                    {formData.paymentMethod === 'telebirr' && (
                      <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-sm text-red-800 dark:text-red-200">
                        <p>Please send <strong>{finalAmount ? `ETB ${finalAmount}` : 'your donation'}</strong> to Telebirr account: <strong>+251 911 69 2277</strong></p>
                        <p className="mt-1 text-xs opacity-80">We will verify your payment and send a receipt.</p>
                      </div>
                    )}
                    {formData.paymentMethod === 'chapa' && (
                      <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-sm text-green-800 dark:text-green-200">
                        <p>You will be redirected to the Chapa payment gateway to complete your donation securely.</p>
                      </div>
                    )}
                  </div>
                  </div>

                  <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 shrink-0">
                    <button 
                      type="submit"
                      disabled={!isFormValid() || isLoading}
                      className="w-full py-4 rounded-xl font-bold text-white bg-[var(--color-clic-red)] hover:bg-opacity-90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? 'Processing...' : `Donate ${finalAmount ? `ETB ${finalAmount}` : ''}`} {!isLoading && <ArrowRight size={18} />}
                    </button>
                    {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DonateContent = () => {
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-12 lg:p-16 flex flex-col justify-center">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-clic-red)]/10 text-[var(--color-clic-red)] flex items-center justify-center mb-8">
              <HeartHandshake size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-serif">Support Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8">
              Your donation helps us build smart creative laboratories, provide course kits, and train the next generation of Ethiopian innovators and entrepreneurs.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { amount: 'ETB 500', desc: 'Provides basic course kits' },
                { amount: 'ETB 2,500', desc: 'Sponsors one student training' },
                { amount: 'ETB 10,000', desc: 'Annual lab membership' },
                { amount: 'Custom', desc: 'Any amount helps' }
              ].map((tier, i) => (
                <button 
                  key={i} 
                  onClick={() => setIsDonateModalOpen(true)}
                  className="p-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-[var(--color-clic-red)] hover:bg-[var(--color-clic-red)]/5 transition-all text-left group"
                >
                  <div className="font-bold text-gray-900 dark:text-white group-hover:text-[var(--color-clic-red)]">{tier.amount}</div>
                  <div className="text-xs text-gray-500 mt-1">{tier.desc}</div>
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => setIsDonateModalOpen(true)}
              className="w-full py-4 rounded-xl font-bold text-white bg-[var(--color-clic-red)] hover:bg-opacity-90 transition-colors shadow-md flex items-center justify-center gap-2"
            >
              Donate Now <ArrowRight size={18} />
            </button>
          </div>
          
          <div className="relative hidden lg:block">
            <img 
              src="https://loremflickr.com/800/1000/community,africa,happy" 
              alt="Community Support" 
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-gray-800 via-white/20 dark:via-gray-800/20 to-transparent"></div>
          </div>
        </div>
      </div>
      <DonateModal isOpen={isDonateModalOpen} onClose={() => setIsDonateModalOpen(false)} />
    </>
  );
};

const RegisterContent = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    membershipType: 'Youth (High school graduates)',
    interests: [] as string[]
  });
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isFormValid = () => {
    return (
      formData.firstName.trim().length > 0 &&
      formData.lastName.trim().length > 0 &&
      validateEmail(formData.email)
    );
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ firstName: true, lastName: true, email: true });
    
    if (!isFormValid()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          action: 'register_student',
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          membershipType: formData.membershipType,
          interests: formData.interests.join(', ')
        }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setIsSubmitted(true);
      } else {
        throw new Error(result.message || 'Registration failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      membershipType: 'Youth (High school graduates)',
      interests: []
    });
    setTouched({ firstName: false, lastName: false, email: false });
  };

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12 relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
        <button onClick={handleClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X size={20} className="text-gray-600" />
        </button>
        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <UserPlus size={40} />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Registration Successful!</h3>
        <p className="text-gray-600 mb-8">Welcome to CLIC Ethiopia. We will contact you soon.</p>
        <button onClick={handleClose} className="px-8 py-3 bg-[var(--color-clic-blue)] text-white rounded-xl font-bold hover:bg-opacity-90 transition-colors">
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-[var(--color-clic-blue)]/10 text-[var(--color-clic-blue)] flex items-center justify-center mb-6">
          <UserPlus size={32} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-serif">Student Registration</h2>
        <p className="text-lg text-gray-600">
          Register for our STEAM-IE courses and become part of the digital transformation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">First Name</label>
            <input 
              required
              type="text" 
              value={formData.firstName}
              onChange={e => setFormData({...formData, firstName: e.target.value})}
              onBlur={() => setTouched({...touched, firstName: true})}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all pr-10 ${
                touched.firstName 
                  ? formData.firstName.trim().length > 0 
                    ? 'border-green-500 focus:ring-2 focus:ring-green-200' 
                    : 'border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-200 focus:ring-2 focus:ring-[var(--color-clic-blue)]'
              }`} 
              placeholder="Abebe" 
            />
            {touched.firstName && formData.firstName.trim().length > 0 && (
              <CheckCircle size={18} className="absolute right-3 top-11 text-green-500" />
            )}
          </div>
          <div className="relative">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
            <input 
              required
              type="text" 
              value={formData.lastName}
              onChange={e => setFormData({...formData, lastName: e.target.value})}
              onBlur={() => setTouched({...touched, lastName: true})}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all pr-10 ${
                touched.lastName 
                  ? formData.lastName.trim().length > 0 
                    ? 'border-green-500 focus:ring-2 focus:ring-green-200' 
                    : 'border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-200 focus:ring-2 focus:ring-[var(--color-clic-blue)]'
              }`} 
              placeholder="Kebede" 
            />
            {touched.lastName && formData.lastName.trim().length > 0 && (
              <CheckCircle size={18} className="absolute right-3 top-11 text-green-500" />
            )}
          </div>
        </div>
        
        <div className="relative">
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
          <input 
            required
            type="email" 
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            onBlur={() => setTouched({...touched, email: true})}
            className={`w-full px-4 py-3 rounded-xl border outline-none transition-all pr-10 ${
              touched.email 
                ? validateEmail(formData.email)
                  ? 'border-green-500 focus:ring-2 focus:ring-green-200' 
                  : 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-gray-200 focus:ring-2 focus:ring-[var(--color-clic-blue)]'
            }`} 
            placeholder="abebe@example.com" 
          />
          {touched.email && validateEmail(formData.email) && (
            <CheckCircle size={18} className="absolute right-3 top-11 text-green-500" />
          )}
          {touched.email && !validateEmail(formData.email) && formData.email.length > 0 && (
            <p className="text-red-500 text-xs mt-1">Please enter a valid email address</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Membership Type</label>
          <select 
            value={formData.membershipType}
            onChange={e => setFormData({...formData, membershipType: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[var(--color-clic-blue)] focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 dark:text-white"
          >
            <option>Youth (High school graduates)</option>
            <option>Students (Elementary & High school)</option>
            <option>Graduates (Certificate holders)</option>
            <option>Professionals (Employed)</option>
            <option>Businesses (Industrial sector)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Area of Interest</label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              'Smart Agriculture', 'Smart Healthcare', 'Smart Manufacturing', 
              'Smart Construction', 'Smart Mobility', 'Smart Energy', 
              'Smart Finance', 'Smart Education', 'Smart Lifestyle', 
              'Smart Environment', 'Smart Infrastructure', 'Smart Governance'
            ].map((interest) => (
              <label key={interest} className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600">
                <input 
                  type="checkbox" 
                  checked={formData.interests.includes(interest)}
                  onChange={() => handleInterestChange(interest)}
                  className="rounded text-[var(--color-clic-blue)] focus:ring-[var(--color-clic-blue)]" 
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{interest}</span>
              </label>
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={!isFormValid() || isLoading}
          className="w-full py-4 rounded-xl font-bold text-white bg-[var(--color-clic-blue)] hover:bg-opacity-90 transition-colors shadow-md mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Submitting...' : 'Submit Application'}
        </button>
        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
      </form>
    </div>
  );
};

const MentorContent = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    expertise: 'Engineering & Technology',
    message: ''
  });
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    message: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isFormValid = () => {
    return (
      formData.firstName.trim().length > 0 &&
      formData.lastName.trim().length > 0 &&
      validateEmail(formData.email) &&
      formData.message.trim().length > 0
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ firstName: true, lastName: true, email: true, message: true });
    
    if (!isFormValid()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          action: 'register_mentor',
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          expertise: formData.expertise,
          message: formData.message
        }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setIsSubmitted(true);
      } else {
        throw new Error(result.message || 'Registration failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      expertise: 'Engineering & Technology',
      message: ''
    });
    setTouched({ firstName: false, lastName: false, email: false, message: false });
  };

  if (isSubmitted) {
    return (
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="max-w-3xl mx-auto text-center py-12 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 relative"
        >
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">Your application to become a mentor has been received. We will be in touch with you shortly.</p>
          <button 
            onClick={handleClose}
            className="px-8 py-3 bg-[var(--color-clic-orange)] text-white font-bold rounded-xl hover:bg-opacity-90 transition-colors"
          >
            Close
          </button>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-[var(--color-clic-orange)]/10 text-[var(--color-clic-orange)] flex items-center justify-center mb-6">
          <Lightbulb size={32} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-serif">Become a Mentor</h2>
        <p className="text-lg text-gray-600">
          Share your expertise and help shape the next generation of Ethiopian innovators.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">First Name</label>
            <div className="relative">
              <input 
                required
                type="text" 
                value={formData.firstName}
                onChange={e => setFormData({...formData, firstName: e.target.value})}
                onBlur={() => setTouched({...touched, firstName: true})}
                className={`w-full px-4 py-3 rounded-xl border ${
                  touched.firstName 
                    ? formData.firstName.trim().length > 0 
                      ? 'border-green-500 focus:ring-green-500' 
                      : 'border-red-500 focus:ring-red-500'
                    : 'border-gray-200 focus:ring-[var(--color-clic-orange)]'
                } focus:ring-2 focus:border-transparent outline-none transition-all`}
                placeholder="Your Name" 
              />
              {touched.firstName && formData.firstName.trim().length > 0 && (
                <CheckCircle className="absolute right-3 top-3.5 text-green-500" size={20} />
              )}
            </div>
            {touched.firstName && formData.firstName.trim().length === 0 && (
              <p className="text-red-500 text-xs mt-1">First name is required</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
            <div className="relative">
              <input 
                required
                type="text" 
                value={formData.lastName}
                onChange={e => setFormData({...formData, lastName: e.target.value})}
                onBlur={() => setTouched({...touched, lastName: true})}
                className={`w-full px-4 py-3 rounded-xl border ${
                  touched.lastName 
                    ? formData.lastName.trim().length > 0 
                      ? 'border-green-500 focus:ring-green-500' 
                      : 'border-red-500 focus:ring-red-500'
                    : 'border-gray-200 focus:ring-[var(--color-clic-orange)]'
                } focus:ring-2 focus:border-transparent outline-none transition-all`}
                placeholder="Surname" 
              />
              {touched.lastName && formData.lastName.trim().length > 0 && (
                <CheckCircle className="absolute right-3 top-3.5 text-green-500" size={20} />
              )}
            </div>
            {touched.lastName && formData.lastName.trim().length === 0 && (
              <p className="text-red-500 text-xs mt-1">Last name is required</p>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
          <div className="relative">
            <input 
              required
              type="email" 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              onBlur={() => setTouched({...touched, email: true})}
              className={`w-full px-4 py-3 rounded-xl border ${
                touched.email 
                  ? validateEmail(formData.email)
                    ? 'border-green-500 focus:ring-green-500' 
                    : 'border-red-500 focus:ring-red-500'
                  : 'border-gray-200 focus:ring-[var(--color-clic-orange)]'
              } focus:ring-2 focus:border-transparent outline-none transition-all`}
              placeholder="you@example.com" 
            />
            {touched.email && validateEmail(formData.email) && (
              <CheckCircle className="absolute right-3 top-3.5 text-green-500" size={20} />
            )}
          </div>
          {touched.email && !validateEmail(formData.email) && formData.email.length > 0 && (
            <p className="text-red-500 text-xs mt-1">Please enter a valid email address</p>
          )}
          {touched.email && formData.email.length === 0 && (
            <p className="text-red-500 text-xs mt-1">Email is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Area of Expertise</label>
          <select 
            value={formData.expertise}
            onChange={e => setFormData({...formData, expertise: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-[var(--color-clic-orange)] focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 dark:text-white"
          >
            <option>Engineering & Technology</option>
            <option>Business & Entrepreneurship</option>
            <option>Science & Research</option>
            <option>Arts & Design</option>
            <option>Education & Pedagogy</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">How would you like to help?</label>
          <div className="relative">
            <textarea 
              required
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
              onBlur={() => setTouched({...touched, message: true})}
              className={`w-full px-4 py-3 rounded-xl border ${
                touched.message 
                  ? formData.message.trim().length > 0 
                    ? 'border-green-500 focus:ring-green-500' 
                    : 'border-red-500 focus:ring-red-500'
                  : 'border-gray-200 focus:ring-[var(--color-clic-orange)]'
              } focus:ring-2 focus:border-transparent outline-none transition-all h-32`}
              placeholder="Tell us about your experience and how you can contribute..."
            ></textarea>
            {touched.message && formData.message.trim().length > 0 && (
              <CheckCircle className="absolute right-3 top-3.5 text-green-500" size={20} />
            )}
          </div>
          {touched.message && formData.message.trim().length === 0 && (
            <p className="text-red-500 text-xs mt-1">Message is required</p>
          )}
        </div>

        <button 
          type="submit" 
          disabled={!isFormValid() || isLoading}
          className="w-full py-4 rounded-xl font-bold text-white bg-[var(--color-clic-orange)] hover:bg-opacity-90 transition-colors shadow-md mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Submitting...' : 'Join as Mentor'}
        </button>
        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
      </form>
    </div>
  );
};

const GetInvolved = () => {
  const { t } = useTranslation();
  const [activeRole, setActiveRole] = useState<'student' | 'mentor' | 'partner' | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const roles = [
    {
      id: 'student',
      title: 'I am a Student',
      icon: UserPlus,
      color: 'var(--color-clic-blue)',
      desc: 'Join our STEAM-IE courses and become an innovator.',
      cta: 'Register Now'
    },
    {
      id: 'mentor',
      title: 'I am a Mentor/Expert',
      icon: Lightbulb,
      color: 'var(--color-clic-orange)',
      desc: 'Share your knowledge and guide the next generation.',
      cta: 'Join as Mentor'
    },
    {
      id: 'partner',
      title: 'I am a Partner/Donor',
      icon: HeartHandshake,
      color: 'var(--color-clic-red)',
      desc: 'Support our mission and build the future of Ethiopia.',
      cta: 'Partner with Us'
    }
  ];

  useEffect(() => {
    if (activeRole && contentRef.current) {
      const offset = 100; // Adjust for navbar + some padding
      const elementPosition = contentRef.current.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, [activeRole]);

  return (
    <section id="get-involved" className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Subtle African Motif Pattern */}
      <div className="absolute inset-0 bg-pattern-zigzag opacity-[0.02] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 font-serif">Join Our Ecosystem</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.getInvolvedDesc}
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {roles.map((role) => (
            <motion.div
              key={role.id}
              whileHover={{ y: -10 }}
              className={`bg-white rounded-3xl p-8 shadow-lg cursor-pointer border-2 transition-all ${activeRole === role.id ? 'ring-4 ring-opacity-20' : 'border-transparent hover:border-gray-200'}`}
              onClick={() => setActiveRole(role.id as any)}
              style={{ 
                borderColor: activeRole === role.id ? role.color : undefined,
                boxShadow: activeRole === role.id ? `0 0 0 4px ${role.color}20` : undefined
              }}
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white shadow-md"
                style={{ backgroundColor: role.color }}
              >
                <role.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{role.title}</h3>
              <p className="text-gray-600 mb-6">{role.desc}</p>
              <div className="flex items-center font-bold text-sm uppercase tracking-wider" style={{ color: role.color }}>
                {role.cta} <ArrowRight size={16} className="ml-2" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Content Section */}
        <div ref={contentRef}>
          <AnimatePresence mode="wait">
            {activeRole === 'student' && (
              <motion.div
                key="student"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <RegisterContent />
              </motion.div>
            )}

            {activeRole === 'mentor' && (
              <motion.div
                key="mentor"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MentorContent />
              </motion.div>
            )}

            {activeRole === 'partner' && (
              <motion.div
                key="partner"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <DonateContent />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const SubscribeModal = ({ isOpen, onClose, initialEmail }: { isOpen: boolean; onClose: () => void; initialEmail: string }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: initialEmail || '',
    phone: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({ ...prev, email: initialEmail || '' }));
    }
  }, [isOpen, initialEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          action: 'subscribe_newsletter',
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setIsSubmitted(true);
      } else {
        throw new Error(result.message || 'Failed to subscribe');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
    setFormData({ name: '', email: '', phone: '' });
    setError(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-white dark:bg-gray-800 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            {isSubmitted ? (
              <div className="p-12 text-center relative">
                <button onClick={handleClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                  <X size={20} className="text-gray-600 dark:text-gray-400" />
                </button>
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Subscribed!</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8">Thank you for subscribing to our newsletter. We'll keep you updated!</p>
                <button onClick={handleClose} className="px-8 py-3 bg-[var(--color-clic-blue)] text-white rounded-xl font-bold hover:bg-opacity-90 transition-colors">
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 shrink-0">
                  <h3 className="text-xl font-bold font-serif text-gray-900 dark:text-white">Subscribe to Newsletter</h3>
                  <button onClick={handleClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
                    <X size={20} className="text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden flex-grow">
                  <div className="overflow-y-auto p-6 md:p-8 space-y-4 flex-grow">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                      <input 
                        required
                        type="text" 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-clic-blue)] outline-none"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Email</label>
                      <input 
                        required
                        type="email" 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-clic-blue)] outline-none"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                      <input 
                        required
                        type="tel" 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-clic-blue)] outline-none"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        placeholder="0911..."
                      />
                    </div>
                  </div>

                  <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 shrink-0">
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 rounded-xl font-bold text-white bg-[var(--color-clic-blue)] hover:bg-opacity-90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? 'Subscribing...' : 'Subscribe'}
                    </button>
                    {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Footer = () => {
  const { t } = useTranslation();
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState('');

  return (
    <footer className="bg-gray-900 text-white py-16 border-t border-gray-800 relative overflow-hidden">
      {/* Subtle African Motif Pattern */}
      <div className="absolute inset-0 bg-pattern-mudcloth opacity-[0.03] invert pointer-events-none mix-blend-overlay"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          <div className="col-span-1 md:col-span-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                <span className="text-3xl font-black text-[var(--color-clic-red)] tracking-tighter">C</span>
                <span className="text-3xl font-black text-[var(--color-clic-orange)] tracking-tighter">L</span>
                <span className="text-3xl font-black text-[var(--color-clic-green)] tracking-tighter">I</span>
                <span className="text-3xl font-black text-[var(--color-clic-blue)] tracking-tighter">C</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold leading-none text-white">Ethiopia</span>
              </div>
            </div>
            <p className="text-gray-400 max-w-sm mb-6">
              {t.footerDesc}
            </p>
            <div className="text-sm text-gray-400">
              <p>Email: frehun@fadlab.tech</p>
              <p>Phone: +251 911 69 2277</p>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#steam" className="hover:text-white transition-colors">What is STEAM?</a></li>
              <li><a href="#labs" className="hover:text-white transition-colors">Our Labs</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Projects</a></li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-lg font-bold mb-6">Get Involved</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#get-involved" className="hover:text-white transition-colors">Register as Student</a></li>
              <li><a href="#get-involved" className="hover:text-white transition-colors">Donate</a></li>
              <li><a href="#get-involved" className="hover:text-white transition-colors">Partner with Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-4">
            <h4 className="text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">{t.newsletterDesc}</p>
            <form 
              className="flex flex-col sm:flex-row gap-2" 
              onSubmit={(e) => { 
                e.preventDefault(); 
                const form = e.target as HTMLFormElement; 
                const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
                if (emailInput && emailInput.value) {
                  setSubscribeEmail(emailInput.value);
                  setIsSubscribeModalOpen(true);
                }
              }}
            >
              <input type="email" placeholder="Your email" required className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-clic-blue)] w-full" />
              <button type="submit" className="bg-[var(--color-clic-blue)] text-white px-6 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-colors whitespace-nowrap">Subscribe</button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p>&copy; {new Date().getFullYear()} CLIC Ethiopia. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Data Sources</a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p>Prepared by Prof. Frehun Adefris</p>
            <span className="hidden md:inline w-px h-3 bg-gray-700"></span>
            <p className="font-mono text-xs">v2.4.1 (Build 2026.04)</p>
          </div>
        </div>
      </div>
      <SubscribeModal 
        isOpen={isSubscribeModalOpen} 
        onClose={() => setIsSubscribeModalOpen(false)} 
        initialEmail={subscribeEmail} 
      />
    </footer>
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-6 z-50"
        >
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <div className="min-h-screen font-sans bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <main>
          {/* Phase 1: The Vision & Foundation */}
          <Hero />
          <About />
          <FounderMessage />
          <ImpactSection />
          
          {/* Phase 2: The Educational Engine */}
          <SteamSection />
          <IESection />
          <CurriculumSection />
          <TheoryOfChange />
          <CurriculumEngine />
          <ResourceHub />
          
          {/* Phase 3: The Application & Output */}
          <Labs />
          <Projects />
          
          {/* Phase 4: Community & Updates */}
          <NewsSection />
          <EventCalendar />
          <ShareStorySection />
          
          {/* Phase 5: Support & Engagement */}
          <GetInvolved />
          <DonationPortal />
          <MerchSection />
        </main>
        <Footer />
        <ChatBot />
        <ScrollToTop />
      </div>
    </LanguageContext.Provider>
  );
}
