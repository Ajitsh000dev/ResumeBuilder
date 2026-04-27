import React from 'react'
import './ModernTemplate.css'

function ModernTemplate({ data }) {
  return (
    <div className="modern-template">
      {/* Header */}
      <div className="modern-header">
        <h1>{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="contact-bar">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>•</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.address && <span>•</span>}
          {data.personalInfo.address && <span>{data.personalInfo.address}</span>}
        </div>
        {data.personalInfo.summary && (
          <div className="summary-text">
            {data.personalInfo.summary}
          </div>
        )}
      </div>

      <div className="modern-content">
        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="modern-section">
            <h2>Experience</h2>
            <div className="section-divider"></div>
            {data.experience.map(exp => (
              <div key={exp.id} className="modern-entry">
                <div className="entry-title-row">
                  <h3>{exp.position}</h3>
                  <span className="date">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="company">{exp.company}</p>
                {exp.description && <p className="description">{exp.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="modern-section">
            <h2>Education</h2>
            <div className="section-divider"></div>
            {data.education.map(edu => (
              <div key={edu.id} className="modern-entry">
                <div className="entry-title-row">
                  <h3>{edu.degree} in {edu.field}</h3>
                  <span className="date">{edu.startDate} - {edu.endDate}</span>
                </div>
                <p className="company">{edu.school}</p>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section className="modern-section">
            <h2>Skills</h2>
            <div className="section-divider"></div>
            <div className="skills-grid">
              {data.skills.map(skill => (
                <div key={skill.id} className="skill-tag">
                  <span className="skill-name">{skill.skill}</span>
                  <span className="skill-badge">{skill.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default ModernTemplate
