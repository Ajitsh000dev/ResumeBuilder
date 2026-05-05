import React from 'react'
import './PersonalInfo.css'

function Education({ data, onUpdate }) {
  const addEducation = () => {
    onUpdate([
      ...data,
      {
        id: Date.now(),
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: ''
      }
    ])
  }

  const updateEducation = (id, field, value) => {
    onUpdate(data.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    ))
  }

  const removeEducation = (id) => {
    onUpdate(data.filter(edu => edu.id !== id))
  }

  return (
    <div className="section">
      {data.map(edu => (
        <details key={edu.id} className="entry">
          <summary className="entry-summary">
            {edu.school || 'New Education'}
            {edu.degree ? ` • ${edu.degree}` : ''}
          </summary>
          <div className="entry-content">
            <div className="form-group">
              <label>School/University</label>
              <input
                type="text"
                value={edu.school}
                onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                placeholder="School Name"
              />
            </div>
            <div className="form-group">
              <label>Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                placeholder="e.g., Bachelor, Master"
              />
            </div>
            <div className="form-group">
              <label>Field of Study</label>
              <input
                type="text"
                value={edu.field}
                onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                placeholder="e.g., Computer Science"
              />
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="month"
                value={edu.startDate}
                onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="month"
                value={edu.endDate}
                onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
              />
            </div>
            <button onClick={() => removeEducation(edu.id)} className="btn-remove">Remove</button>
          </div>
        </details>
      ))}
      <button onClick={addEducation} className="btn-add">Add Education</button>
    </div>
  )
}

export default Education