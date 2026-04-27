import React from 'react'
import './PersonalInfo.css'

function Projects({ data, onUpdate }) {
  const addProject = () => {
    onUpdate([
      ...data,
      {
        id: Date.now(),
        title: '',
        duration: '',
        description: '',
        technologies: ''
      }
    ])
  }

  const updateProject = (id, field, value) => {
    onUpdate(data.map(project =>
      project.id === id ? { ...project, [field]: value } : project
    ))
  }

  const removeProject = (id) => {
    onUpdate(data.filter(project => project.id !== id))
  }

  return (
    <div className="section">
      <h2>Projects</h2>
      {data.map(project => (
        <div key={project.id} className="entry">
          <div className="form-group">
            <label>Project Title</label>
            <input
              type="text"
              value={project.title}
              onChange={(e) => updateProject(project.id, 'title', e.target.value)}
              placeholder="Project Name"
            />
          </div>
          <div className="form-group">
            <label>Duration</label>
            <input
              type="text"
              value={project.duration}
              onChange={(e) => updateProject(project.id, 'duration', e.target.value)}
              placeholder="e.g., Mar 2023 – Aug 2023"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={project.description}
              onChange={(e) => updateProject(project.id, 'description', e.target.value)}
              placeholder="Project details and achievements"
              rows="4"
            />
          </div>
          <div className="form-group">
            <label>Technologies Used</label>
            <input
              type="text"
              value={project.technologies}
              onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
              placeholder="e.g., React, Node.js, MongoDB"
            />
          </div>
          <button onClick={() => removeProject(project.id)} className="btn-remove">Remove</button>
        </div>
      ))}
      <button onClick={addProject} className="btn-add">Add Project</button>
    </div>
  )
}

export default Projects
