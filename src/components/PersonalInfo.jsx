import React from 'react'

function PersonalInfo({ data, onUpdate }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    onUpdate({
      ...data,
      [name]: value
    })
  }

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label className="form-label">Full Name</label>
            <input
              className="form-control"
              type="text"
              name="fullName"
              value={data.fullName}
              onChange={handleChange}
              placeholder="John Doe"
            />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label">Professional Title</label>
            <input
              className="form-control"
              type="text"
              name="professionalTitle"
              value={data.professionalTitle}
              onChange={handleChange}
              placeholder="e.g., Software Developer"
            />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="john@example.com"
            />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label">Phone</label>
            <input
              className="form-control"
              type="tel"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label">Address</label>
            <input
              className="form-control"
              type="text"
              name="address"
              value={data.address}
              onChange={handleChange}
              placeholder="City, State"
            />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label">LinkedIn URL</label>
            <input
              className="form-control"
              type="url"
              name="linkedin"
              value={data.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/..."
            />
          </div>
          <div className="col-12">
            <label className="form-label">Portfolio URL</label>
            <input
              className="form-control"
              type="url"
              name="portfolio"
              value={data.portfolio}
              onChange={handleChange}
              placeholder="https://yourportfolio.com"
            />
          </div>
          <div className="col-12">
            <label className="form-label">Professional Summary</label>
            <textarea
              className="form-control"
              name="summary"
              value={data.summary}
              onChange={handleChange}
              placeholder="Write a brief summary about yourself..."
              rows="4"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfo
