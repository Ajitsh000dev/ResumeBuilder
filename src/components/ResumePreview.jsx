import React, { useEffect, useRef, useState } from 'react'
import DemoTemplate from './templates/ModernTemplate'

function ResumePreview({ data, previewMode = 'desktop' }) {
  const viewportRef = useRef(null)
  const contentRef = useRef(null)
  const [mobileScale, setMobileScale] = useState(1)
  const [mobileHeight, setMobileHeight] = useState(null)

  useEffect(() => {
    if (previewMode !== 'mobile') {
      setMobileScale(1)
      setMobileHeight(null)
      return undefined
    }

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
      setMobileScale(nextScale)
      setMobileHeight(contentHeight * nextScale)
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

  if (previewMode === 'mobile') {
    return (
      <div className="resume-preview mobile-preview">
        <div className="mobile-preview-viewport" ref={viewportRef}>
          <div
            className="mobile-preview-canvas"
            style={mobileHeight ? { height: `${mobileHeight}px` } : undefined}
          >
            <div
              className="mobile-preview-content"
              ref={contentRef}
              style={{ transform: `scale(${mobileScale})` }}
            >
              <DemoTemplate data={data} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="resume-preview desktop-preview">
      <DemoTemplate data={data} />
    </div>
  )
}

export default ResumePreview
