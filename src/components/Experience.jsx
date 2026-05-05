import React from 'react'
import './PersonalInfo.css'

function Experience({ data, onUpdate }) {
  const addExperience = () => {
    onUpdate([
      ...data,
      {
        id: Date.now(),
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ])
  }

  const updateExperience = (id, field, value) => {
    onUpdate(data.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    ))
  }

  const removeExperience = (id) => {
    onUpdate(data.filter(exp => exp.id !== id))
  }

  return (
    <div className="section">
      {data.map(exp => (
        <details key={exp.id} className="entry">
          <summary className="entry-summary">
            {exp.position || 'New Experience'}
            {exp.company ? ` • ${exp.company}` : ''}
          </summary>
          <div className="entry-content">
            <div className="form-group">
              <label>Company</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                placeholder="Company Name"
              />
            </div>
            <div className="form-group">
              <label>Position</label>
              <input
                type="text"
                value={exp.position}
                onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                placeholder="Job Title"
              />
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="month"
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="month"
                value={exp.endDate}
                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                placeholder="Job responsibilities and achievements"
                rows="4"
              />
            </div>
            <button onClick={() => removeExperience(exp.id)} className="btn-remove">Remove</button>
          </div>
        </details>
      ))}
      <button onClick={addExperience} className="btn-add">Add Experience</button>
    </div>
  )
}

export default Experience
