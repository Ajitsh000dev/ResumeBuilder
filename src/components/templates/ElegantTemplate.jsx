import React from 'react'
import './ElegantTemplate.css'

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

function ElegantTemplate({ data }) {
  const skillGroups = groupSkills(data.skills || [])

  return (
    <article className="elegant-resume demo-resume">
      <div className="elegant-container">
        <header className="elegant-header">
          <div className="name-section">
            <h1>{data.personalInfo.fullName || 'Your Name'}</h1>
            <div className="title-decoration"></div>
            <h2>{data.personalInfo.professionalTitle || 'Professional Title'}</h2>
          </div>

          <div className="contact-section">
            {data.personalInfo.email && (
              <div className="contact-item">
                <span className="contact-icon">✉</span>
                <span>{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.address && (
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>{data.personalInfo.address}</span>
              </div>
            )}
            {data.personalInfo.linkedin && (
              <div className="contact-item">
                <span className="contact-icon">🔗</span>
                <a href={data.personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            )}
            {data.personalInfo.portfolio && (
              <div className="contact-item">
                <span className="contact-icon">🌐</span>
                <a href={data.personalInfo.portfolio} target="_blank" rel="noopener noreferrer">Portfolio</a>
              </div>
            )}
          </div>
        </header>

        {data.personalInfo.summary && (
          <section className="elegant-section">
            <h3 className="section-title">About Me</h3>
            <p className="summary-text">{data.personalInfo.summary}</p>
          </section>
        )}

        <div className="content-grid">
          <div className="main-content">
            {data.experience?.length > 0 && (
              <section className="elegant-section">
                <h3 className="section-title">Experience</h3>
                {data.experience.map((experience) => (
                  <div key={experience.id} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="item-header">
                        <h4>{experience.position}</h4>
                        <span className="item-date">{formatRange(experience.startDate, experience.endDate)}</span>
                      </div>
                      <p className="item-subtitle">{experience.company}</p>
                      {experience.description && (
                        <ul className="item-description">
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
                  </div>
                ))}
              </section>
            )}

            {data.projects?.length > 0 && (
              <section className="elegant-section">
                <h3 className="section-title">Projects</h3>
                {data.projects.map((project) => (
                  <div key={project.id} className="project-card">
                    <div className="card-header">
                      <h4>{project.title}</h4>
                      {project.duration && <span className="card-date">{project.duration}</span>}
                    </div>
                    {project.description && <p className="card-description">{project.description}</p>}
                    {project.technologies && (
                      <p className="card-tech">
                        <strong>Tech Stack:</strong> {project.technologies}
                      </p>
                    )}
                  </div>
                ))}
              </section>
            )}

            {data.education?.length > 0 && (
              <section className="elegant-section">
                <h3 className="section-title">Education</h3>
                {data.education.map((education) => (
                  <div key={education.id} className="education-item">
                    <div className="edu-header">
                      <h4>{education.degree} in {education.field}</h4>
                      <span className="edu-date">{formatRange(education.startDate, education.endDate)}</span>
                    </div>
                    <p className="edu-school">{education.school}</p>
                  </div>
                ))}
              </section>
            )}
          </div>

          <aside className="sidebar-content">
            {skillGroups.map((group) => (
              <section key={group.category} className="skill-section">
                <h3 className="skill-title">{group.category}</h3>
                <div className="skill-tags">
                  {group.items.map((item) => (
                    <span key={`${group.category}-${item}`} className="skill-tag">{item}</span>
                  ))}
                </div>
              </section>
            ))}
          </aside>
        </div>
      </div>
    </article>
  )
}

export default ElegantTemplate