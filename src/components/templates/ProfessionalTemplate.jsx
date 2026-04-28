import React from 'react'
import './ProfessionalTemplate.css'

const skillCategoryOrder = [
  'Languages & Frameworks',
  'Backend & Architecture',
  'Database & ORM',
  'Tools & Concepts'
]

const formatMonth = (value) => {
  if (!value) {
    return ''
  }

  const [year, month] = value.split('-')
  if (!year || !month) {
    return value
  }

  const date = new Date(Number(year), Number(month) - 1, 1)
  return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date)
}

const formatRange = (startDate, endDate) => {
  const start = formatMonth(startDate)
  const end = endDate ? formatMonth(endDate) : 'Current'

  if (!start && !endDate) {
    return ''
  }

  if (!start) {
    return end
  }

  return `${start} - ${end}`
}

const groupSkills = (skills) => {
  const groups = skills.reduce((acc, skill) => {
    const category = skill.category || 'Additional Skills'
    if (!acc[category]) {
      acc[category] = []
    }
    if (skill.skill?.trim()) {
      acc[category].push(skill.skill.trim())
    }
    return acc
  }, {})

  const orderedKeys = [
    ...skillCategoryOrder.filter((category) => groups[category]?.length),
    ...Object.keys(groups).filter((category) => !skillCategoryOrder.includes(category))
  ]

  return orderedKeys.map((category) => ({
    category,
    items: groups[category]
  }))
}

function ProfessionalTemplate({ data }) {
  const skillGroups = groupSkills(data.skills || [])

  return (
    <article className="professional-resume demo-resume">
      <header className="professional-header">
        <div className="header-content">
          <h1 className="professional-name">{data.personalInfo.fullName || 'Your Name'}</h1>
          <p className="professional-title">{data.personalInfo.professionalTitle || 'Professional Title'}</p>
          <div className="contact-info">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo.address && <span>{data.personalInfo.address}</span>}
          </div>
        </div>
      </header>

      <div className="professional-content">
        <aside className="professional-sidebar">
          {skillGroups.map((group) => (
            <section key={group.category} className="sidebar-section">
              <h3>{group.category}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={`${group.category}-${item}`}>{item}</li>
                ))}
              </ul>
            </section>
          ))}

          {data.personalInfo.linkedin && (
            <section className="sidebar-section">
              <h3>Links</h3>
              <p>
                <a href={data.personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn Profile
                </a>
              </p>
              {data.personalInfo.portfolio && (
                <p>
                  <a href={data.personalInfo.portfolio} target="_blank" rel="noopener noreferrer">
                    Portfolio Website
                  </a>
                </p>
              )}
            </section>
          )}
        </aside>

        <main className="professional-main">
          {data.personalInfo.summary && (
            <section className="main-section">
              <h2>Professional Summary</h2>
              <p>{data.personalInfo.summary}</p>
            </section>
          )}

          {data.experience?.length > 0 && (
            <section className="main-section">
              <h2>Work Experience</h2>
              {data.experience.map((experience) => (
                <div key={experience.id} className="experience-item">
                  <div className="item-header">
                    <h3>{experience.position}</h3>
                    <span className="date">{formatRange(experience.startDate, experience.endDate)}</span>
                  </div>
                  <p className="company">{experience.company}</p>
                  {experience.description && (
                    <ul>
                      {experience.description
                        .split('\n')
                        .map((line) => line.trim())
                        .filter(Boolean)
                        .map((line) => (
                          <li key={`${experience.id}-${line}`}>{line}</li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {data.projects?.length > 0 && (
            <section className="main-section">
              <h2>Projects</h2>
              {data.projects.map((project) => (
                <div key={project.id} className="project-item">
                  <div className="item-header">
                    <h3>{project.title}</h3>
                    {project.duration && <span className="duration">{project.duration}</span>}
                  </div>
                  {project.description && <p>{project.description}</p>}
                  {project.technologies && (
                    <p className="technologies">
                      <strong>Technologies:</strong> {project.technologies}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {data.education?.length > 0 && (
            <section className="main-section">
              <h2>Education</h2>
              {data.education.map((education) => (
                <div key={education.id} className="education-item">
                  <div className="item-header">
                    <h3>{education.degree} in {education.field}</h3>
                    <span className="date">{formatRange(education.startDate, education.endDate)}</span>
                  </div>
                  <p className="school">{education.school}</p>
                </div>
              ))}
            </section>
          )}
        </main>
      </div>
    </article>
  )
}

export default ProfessionalTemplate