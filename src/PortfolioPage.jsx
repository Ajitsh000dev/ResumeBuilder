import React from 'react'
import PortfolioTemplate from './components/templates/PortfolioTemplate'

function PortfolioPage({ data, onBack, onShare, isShared = false }) {
  return (
    <div className={`min-vh-100 ${isShared ? 'bg-white' : 'bg-light py-4'}`}>
      {!isShared && (
        <div className="container">
          <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
            <div>
              <p className="text-uppercase text-secondary small mb-2">Portfolio Page</p>
              <h1 className="h3 mb-0">{data?.personalInfo?.fullName || 'My Portfolio'}</h1>
            </div>
            <div className="d-flex flex-wrap gap-2">
              {onShare && (
                <button type="button" className="btn btn-success" onClick={onShare}>
                  Share Portfolio
                </button>
              )}
              <button type="button" className="btn btn-primary" onClick={onBack}>
                Back to app
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container py-3">
        <PortfolioTemplate data={data} />
      </div>
    </div>
  )
}

export default PortfolioPage
