import React from 'react'
import './PersonalInfo.css'

function PersonalInfo({ data, onUpdate }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    onUpdate({
      ...data,
      [name]: value
    })
  }

  return (
    <div className="section">
      <h2>Personal Information</h2>
      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={data.fullName}
          onChange={handleChange}
          placeholder="John Doe"
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="john@example.com"
        />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          placeholder="+1 (555) 123-4567"
        />
      </div>
      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={data.address}
          onChange={handleChange}
          placeholder="City, State"
        />
      </div>
      <div className="form-group">
        <label>Professional Summary</label>
        <textarea
          name="summary"
          value={data.summary}
          onChange={handleChange}
          placeholder="Write a brief summary about yourself..."
          rows="4"
        />
      </div>
    </div>
  )
}

export default PersonalInfo
