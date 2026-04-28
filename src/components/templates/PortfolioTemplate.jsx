import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './PortfolioTemplate.css'

const PortfolioTemplate = ({ data }) => {
  const skills = data?.skills || []
  const projects = data?.projects || []
  const experience = data?.experience || []

  return (
    <div className="modern-wrapper">

      {/* 🔹 NAVBAR */}
      <nav className="navbar navbar-expand-lg modern-nav px-4">
        <span className="navbar-brand fw-bold">
          {data?.personalInfo?.fullName || 'Your Name'}
        </span>
      </nav>

      {/* 🔹 HERO */}
      <section className="container py-5 text-center">
        <h1 className="display-5 fw-bold">
          {data?.personalInfo?.professionalTitle}
        </h1>
        <p className="text-muted w-50 mx-auto">
          {data?.personalInfo?.summary}
        </p>

        <div className="mt-4">
          <a className="btn btn-primary me-2">Hire Me</a>
          <a className="btn btn-outline-dark">Download CV</a>
        </div>
      </section>

      {/* 🔹 SKILLS */}
      <section className="container py-5">
        <h3 className="mb-4">Skills</h3>

        <div className="d-flex flex-wrap gap-2">
          {skills.map((s, i) => (
            <span key={i} className="badge skill-badge">
              {s.skill}
            </span>
          ))}
        </div>
      </section>

      {/* 🔹 EXPERIENCE */}
      <section className="container py-5">
        <h3 className="mb-4">Experience</h3>

        {experience.map((exp, i) => (
          <div key={i} className="modern-card mb-3">
            <div className="d-flex justify-content-between">
              <strong>{exp.position}</strong>
              <small>{exp.startDate} - {exp.endDate || 'Present'}</small>
            </div>
            <p className="text-muted mb-1">{exp.company}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </section>

      {/* 🔹 PROJECTS */}
      <section className="container py-5">
        <h3 className="mb-4">Projects</h3>

        <div className="row">
          {projects.map((p, i) => (
            <div className="col-md-4 mb-4" key={i}>
              <div className="modern-card h-100">
                <h5>{p.title}</h5>
                <p className="text-muted">{p.description}</p>
                <small>{p.technologies}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 CONTACT */}
      <section className="container py-5 text-center">
        <h3>Contact</h3>
        <p className="text-muted">{data?.personalInfo?.email}</p>
      </section>

    </div>
  )
}

export default PortfolioTemplate