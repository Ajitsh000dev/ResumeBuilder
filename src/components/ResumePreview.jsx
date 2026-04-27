import React, { useEffect, useRef, useState } from 'react'
import DemoTemplate from './templates/ModernTemplate'

function ResumePreview({ data, previewMode = 'desktop' }) {
  const viewportRef = useRef(null)
  const contentRef = useRef(null)
  const [previewScale, setPreviewScale] = useState(1)
  const [previewHeight, setPreviewHeight] = useState(null)

  useEffect(() => {
    const updateScale = () => {
      const viewport = viewportRef.current
      const content = contentRef.current

      if (!viewport || !content) {
        return
      }

      const availableWidth = viewport.clientWidth
      const contentWidth = content.scrollWidth
      const contentHeight = content.scrollHeight

      if (!availableWidth || !contentWidth || !contentHeight) {
        return
      }

      const nextScale = Math.min(1, availableWidth / contentWidth)
      setPreviewScale(nextScale)
      setPreviewHeight(contentHeight * nextScale)
    }

    updateScale()

    const resizeObserver = new ResizeObserver(() => {
      updateScale()
    })

    if (viewportRef.current) {
      resizeObserver.observe(viewportRef.current)
    }

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current)
    }

    window.addEventListener('resize', updateScale)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateScale)
    }
  }, [data, previewMode])

  const scaledResume = (
    <div className={`${previewMode === 'mobile' ? 'mobile-preview-viewport' : 'desktop-preview-viewport'}`} ref={viewportRef}>
      <div
        className={`${previewMode === 'mobile' ? 'mobile-preview-canvas' : 'desktop-preview-canvas'}`}
        style={previewHeight ? { height: `${previewHeight}px` } : undefined}
      >
        <div
          className={`${previewMode === 'mobile' ? 'mobile-preview-content' : 'desktop-preview-content'}`}
          ref={contentRef}
          style={{ transform: `scale(${previewScale})` }}
        >
          <DemoTemplate data={data} />
        </div>
      </div>
    </div>
  )

  if (previewMode === 'mobile') {
    return (
      <div className="resume-preview mobile-preview">
        {scaledResume}
      </div>
    )
  }

  return (
    <div className="resume-preview desktop-preview">
      {scaledResume}
    </div>
  )
}

export default ResumePreview
