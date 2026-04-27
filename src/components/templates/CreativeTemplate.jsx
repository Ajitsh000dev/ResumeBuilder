import React from 'react'
import './CreativeTemplate.css'

function CreativeTemplate({ data }) {
  return (
    <div className="creative-template">
      <div className="creative-sidebar">
        <div className="creative-header">
          <h1>{data.personalInfo.fullName || 'Your Name'}</h1>
        </div>

        {/* Contact Info */}
        <section className="creative-section">
          <h3>Contact</h3>
          <div className="creative-contact">
            {data.personalInfo.email && (
              <div className="contact-item">
                <span className="icon">✉</span>
                <span>{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="contact-item">
                <span className="icon">☎</span>
                <span>{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.address && (
              <div className="contact-item">
                <span className="icon">📍</span>
                <span>{data.personalInfo.address}</span>
              </div>
            )}
          </div>
        </section>

        {/* Skills in Sidebar */}
        {data.skills.length > 0 && (
          <section className="creative-section">
            <h3>Skills</h3>
            {data.skills.map(skill => (
              <div key={skill.id} className="creative-skill">
                <div className="skill-label">{skill.skill}</div>
                <div className="skill-bar">
                  <div 
                    className={`skill-fill ${skill.proficiency.toLowerCase()}`}
                  ></div>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>

      <div className="creative-main">
        {data.personalInfo.summary && (
          <section className="creative-intro">
            <p>{data.personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="creative-section">
            <h2>Experience</h2>
            {data.experience.map((exp, idx) => (
              <div key={exp.id} className="creative-timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>{exp.position}</h3>
                  <p className="company">{exp.company}</p>
                  <p className="date">{exp.startDate} - {exp.endDate}</p>
                  {exp.description && <p>{exp.description}</p>}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="creative-section">
            <h2>Education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="creative-timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>{edu.degree} in {edu.field}</h3>
                  <p className="company">{edu.school}</p>
                  <p className="date">{edu.startDate} - {edu.endDate}</p>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}

export default CreativeTemplate
