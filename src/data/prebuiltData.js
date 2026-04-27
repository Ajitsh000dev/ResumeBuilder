// Prebuilt resume data extracted from resumedemo.htm
export const prebuiltResumeData = {
  personalInfo: {
    fullName: 'Ajit Sharma',
    professionalTitle: 'Software Developer',
    email: 'ajitsh000@gmail.com',
    phone: '+91 8968653440',
    address: 'Chandigarh, India - 110034',
    linkedin: 'https://www.linkedin.com/in/ajit-sharma-600047132',
    portfolio: 'https://ajitsh000dev.github.io/MyResume/',
    summary:
      'Software Developer with 4+ years of experience in ASP.NET Core, Angular, and Microservices. Skilled in building scalable applications, REST APIs, and cloud-based deployments.'
  },
  education: [
    {
      id: 1,
      school: 'DotnetCs Infotech',
      degree: 'Certification',
      field: 'Software Engineering',
      startDate: '2022-01',
      endDate: '2022-01'
    },
    {
      id: 2,
      school: 'Chandigarh University',
      degree: 'Diploma',
      field: 'Diploma',
      startDate: '2016-01',
      endDate: '2016-01'
    },
    {
      id: 3,
      school: 'GMSSS',
      degree: '12th',
      field: '12th',
      startDate: '2014-01',
      endDate: '2014-01'
    },
    {
      id: 4,
      school: 'GMSSS',
      degree: '10th',
      field: '10th',
      startDate: '2012-01',
      endDate: '2012-01'
    }
  ],
  experience: [
    {
      id: 1,
      company: 'CS Soft Solutions',
      position: 'Software Developer',
      startDate: '2022-01',
      endDate: '',
      description:
        'Developed scalable applications using ASP.NET Core and Angular\nWorked on microservices and SSO integration (OpenID)\nDeployed applications using AKS, AWS, and Azure\nImproved system performance and API efficiency'
    }
  ],
  skills: [
    { id: 1, category: 'Languages & Frameworks', skill: 'C#', proficiency: 'Advanced' },
    { id: 2, category: 'Languages & Frameworks', skill: 'JavaScript', proficiency: 'Advanced' },
    { id: 3, category: 'Languages & Frameworks', skill: 'TypeScript', proficiency: 'Advanced' },
    { id: 4, category: 'Languages & Frameworks', skill: 'ASP.NET, ASP.NET Core, MVC', proficiency: 'Advanced' },
    { id: 5, category: 'Languages & Frameworks', skill: 'ASP.NET Web APIs, Razor Pages', proficiency: 'Advanced' },
    { id: 6, category: 'Languages & Frameworks', skill: 'Blazor, Angular, React.js, jQuery', proficiency: 'Advanced' },
    { id: 7, category: 'Backend & Architecture', skill: 'Microservices Architecture', proficiency: 'Advanced' },
    { id: 8, category: 'Backend & Architecture', skill: 'RESTful API Development', proficiency: 'Advanced' },
    { id: 9, category: 'Database & ORM', skill: 'SQL Server, MySQL, MongoDB', proficiency: 'Advanced' },
    { id: 10, category: 'Database & ORM', skill: 'Entity Framework Core, LINQ', proficiency: 'Advanced' },
    { id: 11, category: 'Tools & Concepts', skill: 'Git, Visual Studio, Docker', proficiency: 'Advanced' },
    { id: 12, category: 'Tools & Concepts', skill: 'Azure, AWS, Cloud Services', proficiency: 'Advanced' },
    { id: 13, category: 'Tools & Concepts', skill: 'Agile Methodologies', proficiency: 'Advanced' }
  ],
  projects: [
    {
      id: 1,
      title: 'Restaurant Management System (Rithm Draft)',
      duration: 'Mar 2023 - Aug 2023',
      description:
        'Designed and developed a restaurant management system for order processing and billing. Built interactive UI using Blazor and handled backend logic with C#. Managed database operations and optimized queries for performance.',
      technologies: 'Blazor, C#, JavaScript, SQL Server'
    },
    {
      id: 2,
      title: 'iPass',
      duration: 'Aug 2021 - Dec 2021',
      description:
        'Integrated OCR functionality using Azure and AWS services. Automated document processing and validation workflows. Improved data extraction accuracy and reduced manual effort.',
      technologies: 'ASP.NET Core, Azure Cognitive Services, AWS'
    },
    {
      id: 3,
      title: 'VerimyRC',
      duration: 'Jan 2024 - Jun 2024',
      description:
        'Developed a cross-platform application using .NET MAUI. Integrated Firebase for real-time data and authentication. Built backend services using Web API for seamless communication.',
      technologies: '.NET MAUI, Firebase, ASP.NET Core Web API'
    }
  ]
}
