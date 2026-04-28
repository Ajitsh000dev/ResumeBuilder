import React from 'react'
import './MinimalTemplate.css'

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

const groupSkills = (skills = []) => {
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

  return [
    ...skillCategoryOrder.filter((category) => groups[category]?.length),
    ...Object.keys(groups).filter((category) => !skillCategoryOrder.includes(category))
  ]
    .map((category) => ({ category, items: groups[category] }))
    .filter((group) => group.items?.length)
}

function MinimalTemplate({ data }) {
  return (
    <div className="minimal-template demo-resume">
      <div className="minimal-header">
        <h1>{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="contact-info-minimal">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.address && <span>{data.personalInfo.address}</span>}
        </div>
      </div>

      {data.personalInfo.summary && (
        <div className="minimal-summary">
          {data.personalInfo.summary}
        </div>
      )}

      <div className="minimal-content">
        {/* Experience */}
        {data.experience?.length > 0 && (
          <section className="minimal-section">
            <h2>Experience</h2>
            {data.experience.map(exp => (
              <div key={exp.id} className="minimal-entry">
                <div className="entry-header-minimal">
                  <strong>{exp.position}</strong>
                  <span className="date">{formatRange(exp.startDate, exp.endDate)}</span>
                </div>
                <div className="company-minimal">{exp.company}</div>
                {exp.description && <p>{exp.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <section className="minimal-section">
            <h2>Education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="minimal-entry">
                <div className="entry-header-minimal">
                  <strong>{edu.degree} in {edu.field}</strong>
                  <span className="date">{formatRange(edu.startDate, edu.endDate)}</span>
                </div>
                <div className="company-minimal">{edu.school}</div>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {data.skills?.length > 0 && (
          <section className="minimal-section">
            <h2>Skills</h2>
            <div className="skills-list-minimal">
              {data.skills.map(skill => (
                <span key={skill.id} className="skill-item-minimal">
                  {skill.skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default MinimalTemplate
