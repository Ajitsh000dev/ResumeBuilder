import React, { useState } from 'react'
import './App.css'
import PersonalInfo from './components/PersonalInfo'
import Education from './components/Education'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import ResumePreview from './components/ResumePreview'
import { prebuiltResumeData } from './data/prebuiltData'
import { downloadAsHTML, downloadAsPDF, printResume } from './utils/downloadUtils'

function App() {
  const [resumeData, setResumeData] = useState(prebuiltResumeData)
  const [emailTo, setEmailTo] = useState('')
  const [emailSubject, setEmailSubject] = useState('Application for .NET Developer Position')
  const [emailBody, setEmailBody] = useState(`Hello mam,

I hope you are doing well.

I am writing to express my interest in the .NET Developer position.`)

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

  return (
    <div className="app-shell">
      <div className="builder-layout">
        <section className="editor-panel">
          <div className="panel-intro">
            <p className="eyebrow">Resume Builder</p>
            <h1>Update the demo resume in React</h1>
            <p className="intro-copy">
              The editor keeps the structure from <code>resumedemo.htm</code> while giving you live updates in the preview.
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
