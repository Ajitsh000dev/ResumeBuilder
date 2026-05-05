import React from 'react'
import ResumePreview from './ResumePreview'
import './Welcome.css'

function Welcome({ publicResumeData, authError, signingIn, onDemoClick, onLoginClick }) {
  return (
    <div className="welcome-page">
      <header className="welcome-topbar">
        <div className="topbar-left">
          <div className="topbar-brand">
            <span className="brand-mark">RB</span>
            <div>
              <p className="eyebrow topbar-eyebrow">Resume Builder</p>
              <strong className="brand-name">Expert Resume</strong>
            </div>
          </div>
        </div>

        <nav className="topbar-nav">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#demo">Demo</a>
        </nav>

        <div className="topbar-actions">
          <button className="auth-btn welcome-login-btn" onClick={onLoginClick} disabled={signingIn}>
            {signingIn ? 'Signing In...' : 'Login'}
          </button>
        </div>
      </header>

      <main className="welcome-main">
        <section className="welcome-hero" id="hero">
          <div className="hero-copy card-surface">
            <span className="welcome-badge">Public Demo</span>
            <h1>Build resumes that get noticed — no design experience needed.</h1>
            <p>
              Create modern resumes with easy editing, live preview, download, print, and email-ready output. Start with a demo and sign in when you're ready to save.
            </p>

            <div className="hero-grid">
              <div>
                <strong>Modern templates</strong>
                <p>Choose from clean, creative, and professional layouts.</p>
              </div>
              <div>
                <strong>Live preview</strong>
                <p>Watch changes update instantly as you type.</p>
              </div>
              <div>
                <strong>Share & export</strong>
                <p>Download HTML/PDF, print, or share with a link.</p>
              </div>
            </div>

            <div className="welcome-actions">
              <button className="toolbar-btn accent" onClick={onDemoClick} type="button">
                Open Demo Resume
              </button>
              <button className="toolbar-btn dark" onClick={onLoginClick} disabled={signingIn} type="button">
                {signingIn ? 'Signing In...' : 'Login to Edit'}
              </button>
            </div>

            {authError ? <p className="auth-error welcome-error">{authError}</p> : null}
          </div>

          <div className="welcome-preview-card card-surface" id="demo">
            <div className="preview-window-bar">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <ResumePreview data={publicResumeData} previewMode="desktop" />
          </div>
        </section>

        <section className="welcome-features-section" id="features">
          <div className="section-header">
            <p className="eyebrow">Features</p>
            <h2>Everything you need to create resumes quickly</h2>
          </div>

          <div className="feature-cards">
            <article className="feature-card">
              <h3>Smart resume editor</h3>
              <p>Use structured sections and accordions to edit personal info, experience, skills, projects, and education.</p>
            </article>
            <article className="feature-card">
              <h3>Template preview</h3>
              <p>Switch between modern, minimal, creative, professional, and elegant templates instantly.</p>
            </article>
            <article className="feature-card">
              <h3>Export & share</h3>
              <p>Download polished HTML/PDF resumes or generate shareable links.</p>
            </article>
          </div>
        </section>

        <section className="welcome-about" id="about">
          <div className="about-copy card-surface">
            <div className="section-header">
              <p className="eyebrow">About</p>
              <h2>Your resume workflow in one place</h2>
            </div>
            <p>
              This resume builder is designed to move you from blank page to professional application faster. Manage sections, preview your final document, and export with confidence.
            </p>
            <div className="about-list">
              <div>
                <strong>Easy editing</strong>
                <p>Expand and collapse editor sections for a clean workspace.</p>
              </div>
              <div>
                <strong>Live review</strong>
                <p>See exactly how your resume looks before exporting.</p>
              </div>
              <div>
                <strong>Share-friendly</strong>
                <p>Use built-in download and email tools to send strong applications fast.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Welcome
