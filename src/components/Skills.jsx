import React from 'react'
import './PersonalInfo.css'

function Skills({ data, onUpdate }) {
  const addSkill = () => {
    onUpdate([
      ...data,
      {
        id: Date.now(),
        skill: '',
        proficiency: 'Intermediate'
      }
    ])
  }

  const updateSkill = (id, field, value) => {
    onUpdate(data.map(skill =>
      skill.id === id ? { ...skill, [field]: value } : skill
    ))
  }

  const removeSkill = (id) => {
    onUpdate(data.filter(skill => skill.id !== id))
  }

  return (
    <div className="section">
      <h2>Skills</h2>
      {data.map(skill => (
        <div key={skill.id} className="entry">
          <div className="form-group">
            <label>Skill</label>
            <input
              type="text"
              value={skill.skill}
              onChange={(e) => updateSkill(skill.id, 'skill', e.target.value)}
              placeholder="e.g., JavaScript, React, Python"
            />
          </div>
          <div className="form-group">
            <label>Proficiency Level</label>
            <select
              value={skill.proficiency}
              onChange={(e) => updateSkill(skill.id, 'proficiency', e.target.value)}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          <button onClick={() => removeSkill(skill.id)} className="btn-remove">Remove</button>
        </div>
      ))}
      <button onClick={addSkill} className="btn-add">Add Skill</button>
    </div>
  )
}

export default Skills
