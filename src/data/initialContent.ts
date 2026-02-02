import { SiteContent } from '../types';

export const initialContent: SiteContent = {
  hero: {
    name: 'Joseph Fatoye',
    title: 'Frontend Engineer',
    subtitle: 'Building accessible, pixel-perfect web experiences',
    location: 'NG (Remote)',
    bio: 'Frontend Engineer with 5+ years of experience building and maintaining production React applications, including SaaS-style platforms and internal admin dashboards.',
    profileImage: 'https://avatars.githubusercontent.com/u/65419351?v=4' // Add your profile image URL here
  },
  about: {
    bio: 'I am a Frontend Engineer with 5+ years of web development experience building and maintaining production React applications. I specialize in state management (Redux, Zustand), CMS-driven architectures, and shipping reliable user-facing features in fast-paced, product-driven environments.',
    profileImage: 'https://res.cloudinary.com/dkjucbdpq/image/upload/v1770026629/yxpig1jdzzd6baa5gkbx.jpg', // Add your about section image URL here
    education: {
      school: 'Bowen University',
      degree: 'Bachelor of Engineering in Mechatronics Engineering',
      gpa: '4.89/5.00',
      rank: 'Ranked 1st of 50'
    }
  },
  projects: [
  {
    id: '1',
    title: 'Missions Aid International',
    filename: 'missions-aid.tsx',
    description: 'CMS-Driven NGO Platform with admin dashboard.',
    fullDescription:
    'Designed and built a multi-page React website and lightweight admin platform for a faith-based NGO, enabling non-technical staff to manage content independently.',
    tech: ['React', 'Firebase', 'CMS Architecture'],
    features: [
    'Secure Firebase-backed admin dashboard',
    'Content abstraction layer',
    'Publish/unpublish workflows',
    'External media integration'],

    image: 'https://res.cloudinary.com/dkjucbdpq/image/upload/v1770024923/yk32henhp07ipkv5f3ih.png', // Add project screenshot URL
    links: {
      demo: 'https://missions-aid.netlify.app/',
      repo: '#'
    },
    published: true
  },
  {
    id: '2',
    title: 'NurseNaija',
    filename: 'nurse-naija.ts',
    description: 'Offline Multilingual Healthcare Triage App.',
    fullDescription:
    'Developed an offline-first multilingual triage assistant for Nigerian clinics, enabling patient-provider communication in Yoruba, Igbo, Hausa, Pidgin, and English.',
    tech: ['React', 'Zustand', 'N-ATLaS LLM'],
    features: [
    'Offline-first architecture',
    'Real-time translation with N-ATLaS',
    'Privacy-first interface',
    'Selected for Awari Developer Challenge 2025'],

    image: 'https://res.cloudinary.com/dkjucbdpq/image/upload/v1770024954/gq0vlwpibdot2kfvya6i.png', // Add project screenshot URL
    links: {
      demo: 'https://nursenaija.netlify.app/',
      repo: 'https://github.com/PAPPY-JOE/nurse-naija'
    },
    published: true
  },
  {
    id: '3',
    title: 'Bxpense',
    filename: 'bxpense.tsx',
    description: 'SaaS-style expense tracking application.',
    fullDescription:
    'Led frontend development of a SaaS-style expense tracking application supporting multi-currency use cases, dashboards, categorized transactions, and state-driven UI updates.',
    tech: ['React', 'State Management'],
    features: [
    'Multi-currency support',
    'Interactive dashboards',
    'Categorized transactions',
    'State-driven UI updates'],

    image: 'https://res.cloudinary.com/dkjucbdpq/image/upload/v1770024986/rnrxgd1fz6xycffg7ick.png', // Add project screenshot URL
    links: {
      demo: '#',
      repo: '#'
    },
    published: true
  }],

  experience: [
  {
    id: '1',
    company: 'Nitax Technologies Limited (NXT)',
    role: 'Frontend Engineer',
    period: 'Apr 2024 – Jul 2024',
    location: 'Abuja, NG (Remote)',
    description:
    'Developed and maintained core frontend features for a live React-based platform.',
    achievements: [
    'Focused on form validation, UI state management, and user flow reliability',
    'Performed validation and verification testing to improve product stability',
    'Automated repetitive workflows using scripting to improve team efficiency',
    'Managed complex UI state with Redux and Zustand']

  },
  {
    id: '2',
    company: 'Freelancing',
    role: 'Frontend Engineer (Contract)',
    period: 'Jan 2024 – Apr 2024',
    location: 'Remote',
    description:
    'Designed and built responsive websites for clients seeking professional portfolios and business visibility.',
    achievements: [
    'Delivered complete solutions from layout design to deployment',
    'Built responsive UI components',
    'Ensured consistent cross-browser behavior']

  },
  {
    id: '3',
    company: 'Netverse Studio',
    role: 'Frontend Engineer',
    period: 'Sep 2023 – Oct 2023',
    location: 'Ontario, CA (Remote)',
    description:
    'Delivered a fully functional React-based job board for a healthcare services company.',
    achievements: [
    'Completed project within a one-month sprint',
    'Collaborated across time zones with designers and backend engineers',
    'Implemented form workflows and responsive components']

  }],

  skills: [
  {
    id: '1',
    name: 'Frontend',
    items: [
    { id: '1a', name: 'React.js', level: 5 },
    { id: '1b', name: 'Next.js', level: 5 },
    { id: '1c', name: 'Redux', level: 5 },
    { id: '1d', name: 'Zustand', level: 5 },
    { id: '1e', name: 'TailwindCSS', level: 5 }]

  },
  {
    id: '2',
    name: 'Languages',
    items: [
    { id: '2a', name: 'JavaScript', level: 5 },
    { id: '2b', name: 'TypeScript', level: 5 },
    { id: '2c', name: 'Python', level: 4 },
    { id: '2d', name: 'C++', level: 3 }]

  },
  {
    id: '3',
    name: 'Architecture',
    items: [
    { id: '3a', name: 'Component Design', level: 5 },
    { id: '3b', name: 'CMS Systems', level: 4 },
    { id: '3c', name: 'SaaS Patterns', level: 4 },
    { id: '3d', name: 'REST APIs', level: 4 }]

  }],

  social: {
    email: 'fatoyejoseph@gmail.com',
    phone: '+234-803-482-3847',
    github: 'https://github.com/PAPPY-JOE',
    linkedin: 'https://linkedin.com/in/josephfatoye'
  }
};