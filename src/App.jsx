import React, { useState } from 'react'
import './App.css'
import PersonalInfo from './components/PersonalInfo'
import Education from './components/Education'
import Experience from './components/Experience'
import Skills from './components/Skills'
import ResumePreview from './components/ResumePreview'

function App() {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      summary: ''
    },
    education: [],
    experience: [],
    skills: []
  })

  const [selectedTemplate, setSelectedTemplate] = useState('modern')

  const updatePersonalInfo = (data) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: data
    }))
  }

  const updateEducation = (data) => {
    setResumeData(prev => ({
      ...prev,
      education: data
    }))
  }

  const updateExperience = (data) => {
    setResumeData(prev => ({
      ...prev,
      experience: data
    }))
  }

  const updateSkills = (data) => {
    setResumeData(prev => ({
      ...prev,
      skills: data
    }))
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="app">
      <div className="container">
        <div className="form-section">
          <h1>Resume Builder</h1>
          <PersonalInfo data={resumeData.personalInfo} onUpdate={updatePersonalInfo} />
          <Education data={resumeData.education} onUpdate={updateEducation} />
          <Experience data={resumeData.experience} onUpdate={updateExperience} />
          <Skills data={resumeData.skills} onUpdate={updateSkills} />
          <button className="print-btn" onClick={handlePrint}>Print Resume</button>
        </div>
        <div className="preview-section">
          <div className="template-selector">
            <label>Template:</label>
            <div className="template-buttons">
              <button 
                className={`template-btn ${selectedTemplate === 'modern' ? 'active' : ''}`}
                onClick={() => setSelectedTemplate('modern')}
              >
                Modern
              </button>
              <button 
                className={`template-btn ${selectedTemplate === 'minimal' ? 'active' : ''}`}
                onClick={() => setSelectedTemplate('minimal')}
              >
                Minimal
              </button>
              <button 
                className={`template-btn ${selectedTemplate === 'creative' ? 'active' : ''}`}
                onClick={() => setSelectedTemplate('creative')}
              >
                Creative
              </button>
            </div>
          </div>
          <ResumePreview data={resumeData} template={selectedTemplate} />
        </div>
      </div>
    </div>
  )
}

export default App
