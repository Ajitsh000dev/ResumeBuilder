import React from 'react'
import './ModernTemplate.css'

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

function ModernTemplate({ data }) {
  const skillGroups = groupSkills(data.skills || [])

  return (
    <article className="demo-resume">
      <aside className="demo-sidebar">
        <h1>{data.personalInfo.fullName || 'Your Name'}</h1>
        <p className="sidebar-role">{data.personalInfo.professionalTitle || 'Professional Title'}</p>

        <section className="sidebar-section">
          <h2>Contact</h2>
          {data.personalInfo.address && <p>{data.personalInfo.address}</p>}
          {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
          {data.personalInfo.email && (
            <p>
              <a href={`mailto:${data.personalInfo.email}`}>{data.personalInfo.email}</a>
            </p>
          )}
          {data.personalInfo.linkedin && (
            <p>
              <a href={data.personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </p>
          )}
          {data.personalInfo.portfolio && (
            <p>
              <a href={data.personalInfo.portfolio} target="_blank" rel="noopener noreferrer">
                Portfolio
              </a>
            </p>
          )}
        </section>

        {skillGroups.map((group) => (
          <section key={group.category} className="sidebar-section">
            <h2>{group.category}</h2>
            <ul>
              {group.items.map((item) => (
                <li key={`${group.category}-${item}`}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </aside>

      <main className="demo-main">
        <header className="demo-header">
          <h2 className="demo-name">{data.personalInfo.fullName || 'Your Name'}</h2>
          {data.personalInfo.professionalTitle && <p className="demo-title">{data.personalInfo.professionalTitle}</p>}
        </header>

        {data.personalInfo.summary && (
          <section className="demo-section">
            <h3>Professional Summary</h3>
            <p>{data.personalInfo.summary}</p>
          </section>
        )}

        {data.experience?.length > 0 && (
          <section className="demo-section">
            <h3>Work History</h3>
            {data.experience.map((experience) => (
              <div key={experience.id} className="demo-item">
                <div className="demo-item-header">
                  <span>{[experience.position, experience.company].filter(Boolean).join(', ')}</span>
                  <span className="demo-date">{formatRange(experience.startDate, experience.endDate)}</span>
                </div>
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
          <section className="demo-section">
            <h3>Projects</h3>
            {data.projects.map((project) => (
              <div key={project.id} className="demo-item">
                <div className="project-heading">
                  <strong>{project.title}</strong>
                  {project.duration && <em>{project.duration}</em>}
                </div>
                {project.description && <p>{project.description}</p>}
                {project.technologies && (
                  <p className="project-tech">
                    <strong>Tech:</strong> {project.technologies}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {data.education?.length > 0 && (
          <section className="demo-section">
            <h3>Education</h3>
            <div className="education-list">
              {data.education.map((education) => (
                <p key={education.id}>
                  <strong>{education.field || education.degree}</strong>
                  {education.school ? `, ${education.school}` : ''}
                  {education.endDate ? ` (${formatMonth(education.endDate)})` : education.startDate ? ` (${formatMonth(education.startDate)})` : ''}
                </p>
              ))}
            </div>
          </section>
        )}
      </main>
    </article>
  )
}

export default ModernTemplate
