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
