import React, { useEffect, useState } from 'react'
import './App.css'
import PersonalInfo from './components/PersonalInfo'
import Education from './components/Education'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import ResumePreview from './components/ResumePreview'
import { prebuiltResumeData } from './data/prebuiltData'
import { downloadAsHTML, downloadAsPDF, printResume } from './utils/downloadUtils'
import { auth, provider } from './firebase'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'

function App() {
  const [resumeData, setResumeData] = useState(prebuiltResumeData)
  const [authUser, setAuthUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [authError, setAuthError] = useState('')
  const [signingIn, setSigningIn] = useState(false)
  const [emailTo, setEmailTo] = useState('')
  const [emailSubject, setEmailSubject] = useState('Application for .NET Developer Position')
  const [emailBody, setEmailBody] = useState(`Hello mam,

I hope you are doing well.

I am writing to express my interest in the .NET Developer position.`)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user)
      setAuthLoading(false)
    })

    return unsubscribe
  }, [])

  const updatePersonalInfo = (data) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: data
    }))
  }

  const updateEducation = (data) => {
    setResumeData((prev) => ({
      ...prev,
      education: data
    }))
  }

  const updateExperience = (data) => {
    setResumeData((prev) => ({
      ...prev,
      experience: data
    }))
  }

  const updateSkills = (data) => {
    setResumeData((prev) => ({
      ...prev,
      skills: data
    }))
  }

  const updateProjects = (data) => {
    setResumeData((prev) => ({
      ...prev,
      projects: data
    }))
  }

  const fileBaseName = resumeData.personalInfo.fullName?.trim().replace(/\s+/g, '_') || 'Resume'
  const attachmentReminder = '\n\nPlease find my resume attached as a PDF.'

  const getEmailBodyWithAttachmentReminder = () => (
    emailBody.includes('Please find my resume attached as a PDF.')
      ? emailBody
      : `${emailBody}${attachmentReminder}`
  )

  const handleCopyEmail = async () => {
    const toLine = emailTo ? `To: ${emailTo}\n` : ''
    const composedEmail = `${toLine}Subject: ${emailSubject}\n\n${getEmailBodyWithAttachmentReminder()}`
    try {
      await navigator.clipboard.writeText(composedEmail)
      window.alert('Email content copied.')
    } catch (error) {
      window.alert('Clipboard access is not available in this browser.')
    }
  }

  const handleOpenMail = () => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailTo)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(getEmailBodyWithAttachmentReminder())}`
    window.open(gmailUrl, '_blank', 'noopener,noreferrer')
  }

  const handleDownloadPdfAndOpenMail = () => {
    downloadAsPDF(resumeData, 'demo', `${fileBaseName}_Resume.pdf`)
    window.setTimeout(() => {
      handleOpenMail()
    }, 400)
  }

  const handleGoogleSignIn = async () => {
    setAuthError('')
    setSigningIn(true)

    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      setAuthError(error.message || 'Unable to sign in with Google.')
    } finally {
      setSigningIn(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      setAuthError(error.message || 'Unable to sign out right now.')
    }
  }

  if (authLoading) {
    return (
      <div className="auth-shell">
        <div className="auth-card">
          <p className="eyebrow">Resume Builder</p>
          <h1>Checking secure access</h1>
          <p className="auth-copy">Connecting to Firebase Authentication.</p>
        </div>
      </div>
    )
  }

  if (!authUser) {
    return (
      <div className="auth-shell">
        <div className="auth-card">
          <p className="eyebrow">Secure Access</p>
          <h1>Sign in to open your resume builder</h1>
          <p className="auth-copy">
            This app now uses Firebase Authentication. Sign in with Google to edit, export, and email your resume.
          </p>
          <button className="auth-btn" onClick={handleGoogleSignIn} disabled={signingIn}>
            {signingIn ? 'Signing In...' : 'Continue with Google'}
          </button>
          {authError ? <p className="auth-error">{authError}</p> : null}
        </div>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <div className="builder-layout">
        <section className="editor-panel">
          <div className="panel-intro">
            <div className="panel-topline">
              <p className="eyebrow">Resume Builder</p>
              <button className="signout-btn" onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
            <h1>Update the demo resume in React</h1>
            <p className="intro-copy">
              The editor keeps the structure from <code>resumedemo.htm</code> while giving you live updates in the preview.
            </p>
            <p className="session-note">
              Signed in as <strong>{authUser.displayName || authUser.email}</strong>
            </p>
          </div>

          <div className="toolbar-card">
            <button className="toolbar-btn success" onClick={() => downloadAsHTML(resumeData, 'demo', `${fileBaseName}_Resume.html`)}>
              Download HTML
            </button>
            <button className="toolbar-btn accent" onClick={() => downloadAsPDF(resumeData, 'demo', `${fileBaseName}_Resume.pdf`)}>
              Download PDF
            </button>
            <button className="toolbar-btn danger" onClick={printResume}>
              Print
            </button>
          </div>

          <div className="email-card">
            <div className="email-card-header">
              <div>
                <p className="eyebrow">Quick Email Sender</p>
                <h2>Application message</h2>
              </div>
              <p className="email-help">`To` is optional. Gmail will open with a reminder to attach the PDF.</p>
            </div>

            <div className="form-group">
              <label>To</label>
              <input
                type="email"
                value={emailTo}
                onChange={(e) => setEmailTo(e.target.value)}
                placeholder="hr@company.com"
              />
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Application for .NET Developer Position"
              />
            </div>

            <div className="form-group">
              <label>Email Body</label>
              <textarea
                className="email-body"
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                rows="8"
              />
            </div>

            <div className="email-actions">
              <button className="toolbar-btn accent" onClick={handleCopyEmail}>
                Copy Email
              </button>
              <button className="toolbar-btn success" onClick={handleOpenMail}>
                Open Gmail
              </button>
              <button className="toolbar-btn dark" onClick={handleDownloadPdfAndOpenMail}>
                Download PDF + Gmail
              </button>
            </div>
          </div>

          <div className="editor-sections">
            <PersonalInfo data={resumeData.personalInfo} onUpdate={updatePersonalInfo} />
            <Experience data={resumeData.experience} onUpdate={updateExperience} />
            <Projects data={resumeData.projects || []} onUpdate={updateProjects} />
            <Education data={resumeData.education} onUpdate={updateEducation} />
            <Skills data={resumeData.skills} onUpdate={updateSkills} />
          </div>
        </section>

        <section className="preview-panel">
          <div className="preview-header">
            <p className="preview-label">Live Preview</p>
            <p className="preview-note">Styled to match `resumedemo.htm`</p>
          </div>
          <ResumePreview data={resumeData} />
        </section>
      </div>
    </div>
  )
}

export default App
