import React from 'react'
import './MinimalTemplate.css'

function MinimalTemplate({ data }) {
  return (
    <div className="minimal-template">
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
        {data.experience.length > 0 && (
          <section className="minimal-section">
            <h2>Experience</h2>
            {data.experience.map(exp => (
              <div key={exp.id} className="minimal-entry">
                <div className="entry-header-minimal">
                  <strong>{exp.position}</strong>
                  <span className="date">{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="company-minimal">{exp.company}</div>
                {exp.description && <p>{exp.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="minimal-section">
            <h2>Education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="minimal-entry">
                <div className="entry-header-minimal">
                  <strong>{edu.degree} in {edu.field}</strong>
                  <span className="date">{edu.startDate} - {edu.endDate}</span>
                </div>
                <div className="company-minimal">{edu.school}</div>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
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
