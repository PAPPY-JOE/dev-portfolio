import type { SiteContent } from '../types';

export const initialContent: SiteContent = {
  "projects": [
    {
      "id": "valet",
      "title": "Valet",
      "filename": "valet.tsx",
      "description": "A wardrobe planner built around the clothes you own and the days ahead.",
      "fullDescription": "Valet helps people add a usable wardrobe, plan outfits for the week, make swaps and record what they actually wore. I lead the product and technical development as a solo founder, using AI coding tools for implementation and review.",
      "tech": [
        "Next.js",
        "TypeScript",
        "Supabase",
        "PostgreSQL"
      ],
      "features": [
        "Photo entry and editable reference pieces",
        "Weekly planning with availability and dressing preferences",
        "Outfit changes and separate actual-wear records"
      ],
      "image": "/images/valet-today.webp",
      "links": {
        "demo": "https://valet-os.netlify.app/",
        "repo": ""
      },
      "published": true
    },
    {
      "id": "1769884489751",
      "description": "An organisation website with publishing tools for its staff.",
      "features": [
        "Secure Firebase-backed admin dashboard,",
        "Content abstraction layer,",
        "Publish/unpublish workflows,",
        "External media integration"
      ],
      "filename": "missions-aid.tsx",
      "tech": [
        "React",
        "Firebase",
        "CMS Architecture"
      ],
      "image": "https://res.cloudinary.com/dkjucbdpq/image/upload/v1770024923/yk32henhp07ipkv5f3ih.png",
      "fullDescription": "Designed and built a multi-page React website and lightweight admin platform for a faith-based NGO, enabling non-technical staff to manage content independently.",
      "links": {
        "repo": "",
        "demo": "https://missions-aid.netlify.app/"
      },
      "published": true,
      "title": "Missions Aid International"
    },
    {
      "filename": "nurse-naija.tsx",
      "title": "NurseNaija",
      "tech": [
        "React",
        "Zustand",
        "N-ATLaS LLM"
      ],
      "image": "https://res.cloudinary.com/dkjucbdpq/image/upload/v1770024954/gq0vlwpibdot2kfvya6i.png",
      "fullDescription": "A prototype exploring how multilingual interfaces could support communication in healthcare settings. The work covers React-based interaction flows and application state; it is presented here as a prototype, not a validated clinical product.",
      "published": true,
      "links": {
        "repo": "https://github.com/PAPPY-JOE/nurse-naija",
        "demo": "https://nursenaija.netlify.app/"
      },
      "id": "1769891319657",
      "description": "A prototype exploring multilingual healthcare communication.",
      "features": [
        "Offline-first architecture",
        "Real-time translation with N-ATLaS",
        "Privacy-first interface",
        "Selected for Awari Developer Challenge 2025"
      ]
    },
    {
      "title": "Bxpense",
      "fullDescription": "Built with university roommates as a student side project. I led the frontend work on transaction entry, multi-currency views and dashboards. The project did not become a founded startup.",
      "tech": [
        "React",
        "State Management"
      ],
      "image": "https://res.cloudinary.com/dkjucbdpq/image/upload/v1770024986/rnrxgd1fz6xycffg7ick.png",
      "published": true,
      "links": {
        "repo": "#",
        "demo": "https://bxpense-3000.web.app/"
      },
      "filename": "bxpense.tsx",
      "features": [
        "Multi-currency support",
        "Interactive dashboards",
        "Categorized transactions",
        "State-driven UI updates"
      ],
      "id": "1769891589216",
      "description": "A university side project exploring shared expense-tracking workflows."
    },
    {
      "id": "1779445656933",
      "description": "A property website connected to listing, content and enquiry management.",
      "features": [
        "Role-based admin dashboard with permission controls",
        "Lead capture and CRM pipeline management",
        "Internal notes and activity logging system",
        "Project and content management workflows",
        "Media upload and asset administration",
        "Lead analytics and conversion tracking",
        "Responsive public property showcase pages",
        "Supabase authentication and row-level security",
        "Search, filtering, and export functionality",
        "SEO optimization and metadata management",
        "Performance-focused state management with Zustand"
      ],
      "filename": "citicompass-developments.tsx",
      "title": "CitiCompass Developments Platform",
      "links": {
        "demo": "https://citicompass.netlify.app/",
        "repo": ""
      },
      "published": true,
      "image": "https://res.cloudinary.com/dkjucbdpq/image/upload/v1779445737/vluufsj0vugawjwm4aze.png",
      "fullDescription": "Designed and developed a full-stack real estate platform for CitiCompass Developments featuring a responsive public website and role-based admin dashboard. Implemented CRM workflows including lead capture, pipeline tracking, activity logs, content/media management, analytics, and authentication using Supabase, with a focus on performance and usability.",
      "tech": [
        "React",
        "TypeScript",
        "Vite",
        "Supabase",
        "PostgreSQL",
        "Zustand",
        "Tailwind CSS",
        "Framer Motion",
        "Netlify"
      ]
    }
  ],
  "about": {
    "bio": "I’m a software engineer with a mechatronics background. I work across interfaces, data and administrative workflows, with an emphasis on clear interactions and dependable behaviour. Alongside client work, I’m building Valet and learning from the details that make a product useful in everyday life.",
    "profileImage": "https://res.cloudinary.com/dkjucbdpq/image/upload/v1770026629/yxpig1jdzzd6baa5gkbx.jpg",
    "education": {
      "gpa": "4.89/5.00",
      "school": "Bowen University",
      "degree": "Bachelor of Engineering in Mechatronics Engineering",
      "rank": "Ranked 1st of 50"
    }
  },
  "skills": [
    {
      "name": "Frontend",
      "id": "1",
      "items": [
        {
          "level": 5,
          "id": "1a",
          "name": "React.js"
        },
        {
          "name": "Next.js",
          "id": "1b",
          "level": 5
        },
        {
          "id": "1c",
          "name": "TypeScript",
          "level": 5
        },
        {
          "level": 5,
          "name": "TailwindCSS",
          "id": "1e"
        },
        {
          "level": 5,
          "name": "TanStack",
          "id": "1770036474492"
        },
        {
          "name": "Zustand",
          "level": 5,
          "id": "1772178660035"
        },
        {
          "name": "Framer Motion",
          "level": 5,
          "id": "1779447699349"
        },
        {
          "id": "1779447701359",
          "level": 5,
          "name": "HTML/CSS"
        }
      ]
    },
    {
      "items": [
        {
          "name": "Supabase",
          "level": 5,
          "id": "1779447452994"
        },
        {
          "name": "Firebase",
          "id": "1779447461098",
          "level": 5
        },
        {
          "level": 5,
          "name": "REST APIs",
          "id": "1779447469408"
        },
        {
          "level": 4,
          "name": "PostgreSQL",
          "id": "1779447477308"
        },
        {
          "level": 4,
          "id": "1779447518345",
          "name": "Node.js"
        },
        {
          "id": "1779447528440",
          "name": "Authentication & RLS",
          "level": 5
        }
      ],
      "id": "1779447537710",
      "name": "Backend"
    },
    {
      "items": [
        {
          "name": "JavaScript",
          "id": "1779447846321",
          "level": 5
        },
        {
          "level": 5,
          "id": "1779447855615",
          "name": "TypeScript"
        },
        {
          "id": "1779447858173",
          "name": "Python",
          "level": 4
        },
        {
          "name": "SQL",
          "level": 4,
          "id": "1779447858517"
        },
        {
          "level": 3,
          "name": "C++",
          "id": "1779447859557"
        }
      ],
      "id": "1779447883954",
      "name": "Languages"
    },
    {
      "items": [
        {
          "id": "1779447898022",
          "name": "Component Design",
          "level": 5
        },
        {
          "name": "State Management",
          "level": 5,
          "id": "1779447904902"
        },
        {
          "level": 5,
          "id": "1779447905454",
          "name": "CMS Systems"
        },
        {
          "id": "1779447906083",
          "level": 5,
          "name": "Dashboard Architecture"
        },
        {
          "level": 5,
          "id": "1779447906621",
          "name": "CRUD & Admin Platforms"
        }
      ],
      "name": "Architecture",
      "id": "1779447960028"
    },
    {
      "items": [
        {
          "level": 5,
          "id": "1779448013731",
          "name": "Computer Vision"
        },
        {
          "name": "ROS2",
          "id": "1779448024252",
          "level": 5
        },
        {
          "id": "1779448031330",
          "name": "OpenCV",
          "level": 5
        },
        {
          "id": "1779448041924",
          "level": 5,
          "name": "vSLAM"
        },
        {
          "level": 5,
          "id": "1779448050587",
          "name": "Embedded Systems"
        }
      ],
      "id": "1779448065970",
      "name": "Robotics & AI"
    },
    {
      "items": [
        {
          "level": 5,
          "name": "Git",
          "id": "1779448077698"
        },
        {
          "name": "GitHub",
          "level": 5,
          "id": "1779448084710"
        },
        {
          "name": "Supabase",
          "level": 5,
          "id": "1779448085362"
        },
        {
          "id": "1779448086028",
          "level": 5,
          "name": "Netlify"
        },
        {
          "name": "Cloudinary",
          "level": 5,
          "id": "1779448086776"
        },
        {
          "id": "1779448087411",
          "name": "Jira",
          "level": 5
        },
        {
          "id": "1779448088006",
          "name": "Figma",
          "level": 5
        },
        {
          "name": "Linux",
          "id": "1779448088541",
          "level": 5
        },
        {
          "name": "Firebase",
          "level": 5,
          "id": "1779448122744"
        },
        {
          "level": 5,
          "id": "1779448127790",
          "name": "Vercel"
        }
      ],
      "name": "Tools",
      "id": "1779448160012"
    }
  ],
  "hero": {
    "title": "Software Engineer",
    "bio": "I build web products that make complex workflows easier to use, from public websites to the systems behind them. My work spans React, TypeScript and full-stack application development.",
    "location": "Lagos, Nigeria",
    "subtitle": "Useful software. Built with care.",
    "profileImage": "https://avatars.githubusercontent.com/u/65419351?v=4",
    "name": "Joseph Fatoye"
  },
  "experience": [
    {
      "id": "valet-founder",
      "company": "Valet",
      "role": "Founder and software engineer",
      "period": "Sep 2026 to present",
      "location": "Independent product, part-time",
      "description": "Leading the product and technical development of a wardrobe-planning web pilot.",
      "achievements": [
        "Turned the initial idea into a working product with accounts, wardrobe entry, outfit planning and wear recording.",
        "Iterating on setup, mobile interactions and recommendation quality using feedback and testing."
      ]
    },
    {
      "id": "1779447368283",
      "period": "Apr 2026 – May 2026",
      "description": "Designed and developed a full-stack real estate platform and administrative dashboard to support property showcase, lead generation, customer engagement, and internal business operations.",
      "achievements": [
        "Built a responsive React + Vite frontend with modern UI/UX principles",
        "Integrated Supabase authentication, database, and media workflows",
        "Implemented CRM features including lead capture, notes, and pipeline tracking",
        "Developed role-based admin dashboard with analytics and activity logging",
        "Optimized state management and data fetching using Zustand",
        "Configured SEO improvements and production deployment on Netlify"
      ],
      "company": "CitiCompass Developments",
      "role": "Software Engineer (Contract)",
      "location": "Remote"
    },
    {
      "company": "Nitax Technologies Limited (NXT)",
      "id": "1779448507361",
      "period": "Apr 2024 – Jul 2024",
      "achievements": [
        "Focused on form validation, UI state management, and user flow reliability",
        "Performed validation and verification testing to improve product stability",
        "Automated repetitive workflows using scripting to improve team efficiency",
        "Managed complex UI state with Redux and Zustand"
      ],
      "description": "Developed and maintained core frontend features for a live React-based platform.",
      "location": "Abuja, NG (Remote)",
      "role": "Frontend Engineer"
    },
    {
      "location": "Remote",
      "role": "Frontend Engineer (Contract)",
      "company": "Freelancing",
      "description": "Designed and built responsive websites for clients seeking professional portfolios and business visibility.",
      "achievements": [
        "Delivered complete solutions from layout design to deployment",
        "Built responsive UI components",
        "Ensured consistent cross-browser behavior"
      ],
      "id": "1779448542310",
      "period": "Jan 2024 – Apr 2024"
    },
    {
      "id": "1779448578364",
      "company": "Netverse Studio",
      "role": "Frontend Engineer",
      "period": "Sep 2023 – Oct 2023",
      "location": "Ontario, CA (Remote)",
      "description": "Delivered a fully functional React-based job board for a healthcare services company.",
      "achievements": [
        "Completed project within a one-month sprint",
        "Collaborated across time zones with designers and backend engineers",
        "Implemented form workflows and responsive components"
      ]
    }
  ],
  "social": {
    "linkedin": "https://linkedin.com/in/josephfatoye",
    "email": "fatoyejoseph@gmail.com",
    "phone": "+234-803-482-3847",
    "github": "https://github.com/PAPPY-JOE"
  }
};
