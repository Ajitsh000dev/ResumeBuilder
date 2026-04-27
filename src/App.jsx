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
import { auth, db, provider } from './firebase'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore'

const cloneResumeData = (data = prebuiltResumeData) => JSON.parse(JSON.stringify(data))

const getDefaultResumeTitle = (data) => {
  const fullName = data?.personalInfo?.fullName?.trim()
  const role = data?.personalInfo?.professionalTitle?.trim()

  if (fullName && role) {
    return `${fullName} - ${role}`
  }

  if (fullName) {
    return `${fullName} Resume`
  }

  return 'Untitled Resume'
}

const formatResumeDate = (value) => {
  if (!value) {
    return 'Just now'
  }

  const date = value?.toDate ? value.toDate() : new Date(value)
  if (Number.isNaN(date.getTime())) {
    return 'Just now'
  }

  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date)
}

const getFriendlyAuthError = (error) => {
  if (!error?.code) {
    return error?.message || 'Something went wrong while signing in.'
  }

  if (error.code === 'auth/configuration-not-found') {
    return 'Firebase Authentication is not fully configured yet. Enable Google sign-in in Firebase Console.'
  }

  if (error.code === 'auth/unauthorized-domain') {
    return 'This domain is not authorized in Firebase Authentication. Add localhost or 127.0.0.1 in the authorized domains list.'
  }

  return error.message || 'Something went wrong while signing in.'
}

function App() {
  const [resumeData, setResumeData] = useState(cloneResumeData())
  const [resumeTitle, setResumeTitle] = useState(getDefaultResumeTitle(prebuiltResumeData))
  const [selectedResumeId, setSelectedResumeId] = useState(null)
  const [currentView, setCurrentView] = useState('dashboard')
  const [resumes, setResumes] = useState([])
  const [resumesLoading, setResumesLoading] = useState(false)
  const [dataError, setDataError] = useState('')
  const [saveMessage, setSaveMessage] = useState('')
  const [savingResume, setSavingResume] = useState(false)

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

  useEffect(() => {
    if (!authUser) {
      setResumes([])
      setCurrentView('dashboard')
      setSelectedResumeId(null)
      return undefined
    }

    setResumesLoading(true)
    setDataError('')

    const resumesQuery = query(
      collection(db, 'users', authUser.uid, 'resumes'),
      orderBy('updatedAt', 'desc')
    )

    const unsubscribe = onSnapshot(
      resumesQuery,
      (snapshot) => {
        const nextResumes = snapshot.docs.map((resumeDoc) => ({
          id: resumeDoc.id,
          ...resumeDoc.data()
        }))

        setResumes(nextResumes)
        setResumesLoading(false)
      },
      (error) => {
        setDataError(error.message || 'Unable to load resumes from Firebase.')
        setResumesLoading(false)
      }
    )

    return unsubscribe
  }, [authUser])

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

  const fileBaseName = (resumeTitle || resumeData.personalInfo.fullName || 'Resume').trim().replace(/\s+/g, '_')
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
      setAuthError(getFriendlyAuthError(error))
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

  const handleCreateResume = () => {
    const freshResume = cloneResumeData()
    setResumeData(freshResume)
    setResumeTitle(getDefaultResumeTitle(freshResume))
    setSelectedResumeId(null)
    setSaveMessage('')
    setCurrentView('editor')
  }

  const handleOpenResume = (resume) => {
    setResumeData(cloneResumeData(resume.data || prebuiltResumeData))
    setResumeTitle(resume.title || getDefaultResumeTitle(resume.data || prebuiltResumeData))
    setSelectedResumeId(resume.id)
    setSaveMessage('')
    setCurrentView('editor')
  }

  const handleBackToDashboard = () => {
    setCurrentView('dashboard')
    setSaveMessage('')
  }

  const handleSaveResume = async () => {
    if (!authUser) {
      return
    }

    const trimmedTitle = resumeTitle.trim() || getDefaultResumeTitle(resumeData)
    const payload = {
      title: trimmedTitle,
      data: resumeData,
      ownerUid: authUser.uid,
      ownerEmail: authUser.email || '',
      updatedAt: serverTimestamp()
    }

    setSavingResume(true)
    setDataError('')
    setSaveMessage('')

    try {
      if (selectedResumeId) {
        await updateDoc(doc(db, 'users', authUser.uid, 'resumes', selectedResumeId), payload)
        setSaveMessage('Resume updated in Firebase.')
      } else {
        const created = await addDoc(collection(db, 'users', authUser.uid, 'resumes'), {
          ...payload,
          createdAt: serverTimestamp()
        })
        setSelectedResumeId(created.id)
        setSaveMessage('Resume saved to Firebase.')
      }

      setResumeTitle(trimmedTitle)
    } catch (error) {
      setDataError(error.message || 'Unable to save resume right now.')
    } finally {
      setSavingResume(false)
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

  if (currentView === 'dashboard') {
    return (
      <div className="app-shell">
        <div className="dashboard-layout">
          <section className="dashboard-panel">
            <div className="panel-topline">
              <div>
                <p className="eyebrow">Secure Workspace</p>
                <h1 className="dashboard-title">Your resumes</h1>
              </div>
              <button className="signout-btn" onClick={handleSignOut}>
                Sign Out
              </button>
            </div>

            <p className="intro-copy">
              Signed in as <strong>{authUser.displayName || authUser.email}</strong>. Pick a resume to continue or start a new one.
            </p>

            <div className="dashboard-summary">
              <div className="summary-card">
                <span className="summary-label">Saved resumes</span>
                <strong>{resumes.length}</strong>
              </div>
              <button className="toolbar-btn dark" onClick={handleCreateResume}>
                Create New Resume
              </button>
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
                  <button key={resume.id} className="resume-card" onClick={() => handleOpenResume(resume)}>
                    <span className="resume-card-label">Resume</span>
                    <h2>{resume.title || 'Untitled Resume'}</h2>
                    <p>{resume.data?.personalInfo?.professionalTitle || 'Professional title not set'}</p>
                    <span className="resume-card-date">Updated {formatResumeDate(resume.updatedAt)}</span>
                  </button>
                ))}
              </div>
            )}
          </section>
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
              <div className="topline-actions">
                <button className="signout-btn" onClick={handleBackToDashboard}>
                  All Resumes
                </button>
                <button className="signout-btn" onClick={handleSignOut}>
                  Sign Out
                </button>
              </div>
            </div>
            <h1>Edit selected resume</h1>
            <p className="intro-copy">
              Opened from your Firebase workspace. Save changes any time to keep this resume synced to your account.
            </p>
            <p className="session-note">
              Signed in as <strong>{authUser.displayName || authUser.email}</strong>
            </p>
          </div>

          <div className="resume-meta-card">
            <div className="form-group">
              <label>Resume Name</label>
              <input
                type="text"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                placeholder="Ajit Sharma - .NET Developer"
              />
            </div>
            <div className="meta-actions">
              <button className="toolbar-btn dark" onClick={handleCreateResume}>
                New Resume
              </button>
              <button className="toolbar-btn success" onClick={handleSaveResume} disabled={savingResume}>
                {savingResume ? 'Saving...' : selectedResumeId ? 'Save Changes' : 'Save Resume'}
              </button>
            </div>
            {saveMessage ? <p className="save-success">{saveMessage}</p> : null}
            {dataError ? <p className="auth-error">{dataError}</p> : null}
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
