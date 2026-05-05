import React from 'react'
import './PersonalInfo.css'

const skillCategories = [
  'Languages & Frameworks',
  'Backend & Architecture',
  'Database & ORM',
  'Tools & Concepts',
  'Additional Skills'
]

function Skills({ data, onUpdate }) {
  const addSkill = () => {
    onUpdate([
      ...data,
      {
        id: Date.now(),
        category: 'Additional Skills',
        skill: '',
        proficiency: 'Intermediate'
      }
    ])
  }

  const updateSkill = (id, field, value) => {
    onUpdate(data.map((skill) => (skill.id === id ? { ...skill, [field]: value } : skill)))
  }

  const removeSkill = (id) => {
    onUpdate(data.filter((skill) => skill.id !== id))
  }

  return (
    <div className="section">
      {data.map((skill) => (
        <details key={skill.id} className="entry">
          <summary className="entry-summary">
            {skill.skill || 'New Skill'}
            {skill.category ? ` • ${skill.category}` : ''}
          </summary>
          <div className="entry-content">
            <div className="form-group">
              <label>Category</label>
              <select
                value={skill.category || 'Additional Skills'}
                onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
              >
                {skillCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
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
            <button onClick={() => removeSkill(skill.id)} className="btn-remove">
              Remove
            </button>
          </div>
        </details>
      ))}
      <button onClick={addSkill} className="btn-add">
        Add Skill
      </button>
    </div>
  )
}

export default Skills
