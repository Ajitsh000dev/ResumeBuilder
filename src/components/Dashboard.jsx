import React from 'react'
import './Dashboard.css'

function Dashboard({
  authUser,
  resumes,
  resumesLoading,
  dataError,
  onCreateResume,
  onOpenResume,
  onSignOut,
  formatResumeDate
}) {
  return (
    <div className="dashboard-page">
      <header className="dashboard-topbar">
        <div className="topbar-brand">
          <span className="brand-mark">RB</span>
          <div>
            <p className="eyebrow topbar-eyebrow">Resume Builder</p>
            <strong className="brand-name">ResumeBuilder</strong>
          </div>
        </div>
        <div className="topbar-actions">
          <button className="toolbar-btn accent" onClick={onCreateResume}>
            New Resume
          </button>
          <button className="signout-btn" onClick={onSignOut}>
            Sign Out
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="dashboard-hero" id="dashboard-overview">
          <div className="dashboard-copy">
            <h1 className="dashboard-title">
              Build Your Professional Resume <span>in Minutes</span>
            </h1>
            <p className="intro-copy">
              Create ATS-friendly resumes that help you stand out and get more interviews.
            </p>

            <div className="feature-list">
              <article className="feature-item">
                <span className="feature-icon">TP</span>
                <div>
                  <strong>Professional Templates</strong>
                  <p>Choose from ATS-friendly layouts ready to use.</p>
                </div>
              </article>
              <article className="feature-item">
                <span className="feature-icon">ED</span>
                <div>
                  <strong>Easy Customization</strong>
                  <p>Edit sections, fonts, colors, and structure quickly.</p>
                </div>
              </article>
              <article className="feature-item">
                <span className="feature-icon">LV</span>
                <div>
                  <strong>Live Preview</strong>
                  <p>See changes in real time as you build your resume.</p>
                </div>
              </article>
              <article className="feature-item">
                <span className="feature-icon">DL</span>
                <div>
                  <strong>Download and Share</strong>
                  <p>Export as PDF/HTML and share your resume instantly.</p>
                </div>
              </article>
            </div>

            <div className="dashboard-actions">
              <button className="hero-cta" onClick={onCreateResume}>
                Build Your Resume Now
              </button>
            </div>
            <p className="session-note">Signed in as <strong>{authUser.displayName || authUser.email}</strong></p>
          </div>

          <div className="dashboard-resume-card" id="dashboard-resumes">
            <div className="workspace-topbar">
              <div className="workspace-dots">
                <span></span><span></span><span></span>
              </div>
              <div className="workspace-actions">
                <button className="signout-btn">Save</button>
                <button className="toolbar-btn accent" onClick={onCreateResume}>Download</button>
              </div>
            </div>
            <div className="dashboard-summary">
              <div className="summary-card">
                <span className="summary-label">Saved resumes</span>
                <strong>{resumes.length}</strong>
              </div>
            </div>

            {dataError ? <p className="auth-error">{dataError}</p> : null}

            {resumesLoading ? (
              <div className="empty-state">
                <h2>Loading resumes</h2>
                <p>Pulling your saved resumes from Firebase.</p>
              </div>
            ) : resumes.length === 0 ? (
              <div className="empty-state">
                <h2>No resumes yet</h2>
                <p>Your account is ready. Create the first resume and it will appear here after you save it.</p>
              </div>
            ) : (
              <div className="resume-grid">
                {resumes.map((resume) => (
                  <button key={resume.id} className="resume-card" onClick={() => onOpenResume(resume)}>
                    <span className="resume-card-label">Resume</span>
                    <h2>{resume.title || 'Untitled Resume'}</h2>
                    <p>{resume.data?.personalInfo?.professionalTitle || 'Professional title not set'}</p>
                    <span className="resume-card-date">Updated {formatResumeDate(resume.updatedAt)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Dashboard
