import React from 'react'
import DemoTemplate from './templates/ModernTemplate'

function ResumePreview({ data }) {
  return (
    <div className="resume-preview">
      <DemoTemplate data={data} />
    </div>
  )
}

export default ResumePreview
