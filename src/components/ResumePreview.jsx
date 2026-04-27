import React from 'react'
import './PersonalInfo.css'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import CreativeTemplate from './templates/CreativeTemplate'

function ResumePreview({ data, template = 'modern' }) {
  const renderTemplate = () => {
    switch(template) {
      case 'minimal':
        return <MinimalTemplate data={data} />
      case 'creative':
        return <CreativeTemplate data={data} />
      case 'modern':
      default:
        return <ModernTemplate data={data} />
    }
  }

  return (
    <div className="resume-preview">
      {renderTemplate()}
    </div>
  )
}

export default ResumePreview
