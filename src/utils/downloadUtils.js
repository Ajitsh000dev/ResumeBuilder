import html2pdf from 'html2pdf.js'

const skillCategoryOrder = [
  'Languages & Frameworks',
  'Backend & Architecture',
  'Database & ORM',
  'Tools & Concepts'
]

const formatMonth = (value) => {
  if (!value) {
    return ''
  }

  const [year, month] = value.split('-')
  if (!year || !month) {
    return value
  }

  const date = new Date(Number(year), Number(month) - 1, 1)
  return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date)
}

const formatRange = (startDate, endDate) => {
  const start = formatMonth(startDate)
  const end = endDate ? formatMonth(endDate) : 'Current'

  if (!start && !endDate) {
    return ''
  }

  if (!start) {
    return end
  }

  return `${start} - ${end}`
}

const groupSkills = (skills = []) => {
  const groups = skills.reduce((acc, skill) => {
    const category = skill.category || 'Additional Skills'
    if (!acc[category]) {
      acc[category] = []
    }
    if (skill.skill?.trim()) {
      acc[category].push(skill.skill.trim())
    }
    return acc
  }, {})

  return [
    ...skillCategoryOrder.filter((category) => groups[category]?.length),
    ...Object.keys(groups).filter((category) => !skillCategoryOrder.includes(category))
  ]
    .map((category) => ({ category, items: groups[category] }))
    .filter((group) => group.items?.length)
}

// Download utility functions for resume
export const downloadAsHTML = (data, template, fileName = 'Resume.html') => {
  const htmlContent = generateHTMLContent(data, template)
  const blob = new Blob([htmlContent], { type: 'text/html' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}

export const downloadAsPDF = (data, template, fileName = 'Resume.pdf') => {
  const resumeElement = document.querySelector('.demo-resume')
  if (!resumeElement) {
    alert('Resume preview not found')
    return
  }

  const opt = {
    margin: 10,
    filename: fileName,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
  }

  html2pdf().set(opt).from(resumeElement).save()
}

export const printResume = () => {
  const resumeElement = document.querySelector('.demo-resume')

  if (!resumeElement) {
    window.print()
    return
  }

  const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
    .map((node) => node.outerHTML)
    .join('\n')

  const iframe = document.createElement('iframe')
  iframe.style.position = 'fixed'
  iframe.style.right = '0'
  iframe.style.bottom = '0'
  iframe.style.width = '0'
  iframe.style.height = '0'
  iframe.style.border = '0'
  iframe.setAttribute('aria-hidden', 'true')
  document.body.appendChild(iframe)

  const frameDocument = iframe.contentWindow?.document

  if (!frameDocument || !iframe.contentWindow) {
    iframe.remove()
    window.print()
    return
  }

  frameDocument.open()
  frameDocument.write(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Print Resume</title>
        ${styles}
        <style>
          body {
            margin: 0;
            padding: 0;
            background: #ffffff;
          }
          .demo-resume {
            margin: 0 auto;
            box-shadow: none !important;
            border-radius: 0 !important;
            max-width: none !important;
          }
        </style>
      </head>
      <body>
        ${resumeElement.outerHTML}
      </body>
    </html>
  `)
  frameDocument.close()

  const triggerPrint = () => {
    iframe.contentWindow?.focus()
    iframe.contentWindow?.print()
    window.setTimeout(() => {
      iframe.remove()
    }, 1000)
  }

  if (frameDocument.readyState === 'complete') {
    window.setTimeout(triggerPrint, 150)
  } else {
    iframe.onload = () => {
      window.setTimeout(triggerPrint, 150)
    }
  }
}

const generateHTMLContent = (data) => {
  const skillGroups = groupSkills(data.skills)

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${data.personalInfo.fullName} - Resume</title>
      <style>
        :root {
          --primary-color: #2c3e50;
          --accent-color: #3498db;
          --text-color: #333333;
        }
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          padding: 20px;
          background: #eeeeee;
          color: var(--text-color);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .resume-scroll {
          overflow-x: auto;
        }
        .resume-container {
          max-width: 950px;
          min-width: 950px;
          margin: 0 auto;
          display: flex;
          background: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        .sidebar {
          width: 320px;
          padding: 40px;
          background: var(--primary-color);
          color: #ffffff;
        }
        .sidebar h1 {
          margin: 0;
          font-size: 2rem;
        }
        .sidebar-role {
          margin: 10px 0 0;
          color: #bdc3c7;
        }
        .sidebar h2 {
          margin: 24px 0 10px;
          padding-bottom: 6px;
          border-bottom: 2px solid var(--accent-color);
          color: #ecf0f1;
          font-size: 1rem;
          text-transform: uppercase;
        }
        .sidebar p, .sidebar li {
          margin: 0 0 8px;
          color: #bdc3c7;
          font-size: 0.92rem;
          line-height: 1.5;
        }
        .sidebar ul {
          margin: 0;
          padding-left: 20px;
        }
        .sidebar a {
          color: #ffffff;
          text-decoration: none;
          word-break: break-word;
        }
        .main-content {
          flex: 1;
          padding: 40px;
        }
        .name {
          margin: 0;
          color: var(--primary-color);
          font-size: 2.2rem;
        }
        .title {
          margin: 8px 0 0;
          color: var(--accent-color);
          font-size: 1.2rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .main-content h3 {
          margin: 28px 0 14px;
          padding-bottom: 6px;
          border-bottom: 2px solid var(--accent-color);
          color: var(--primary-color);
          font-size: 1.12rem;
        }
        .item {
          margin-bottom: 22px;
        }
        .item-header,
        .project-heading {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          color: var(--primary-color);
        }
        .item-header {
          font-weight: 700;
        }
        .date,
        .project-heading em {
          color: #7f8c8d;
          font-size: 0.9rem;
          font-style: italic;
          white-space: nowrap;
        }
        .item ul {
          margin: 10px 0 0;
          padding-left: 20px;
        }
        .item p {
          margin: 10px 0 0;
          line-height: 1.6;
        }
        .education-list p {
          margin: 0 0 10px;
        }
        @media (max-width: 768px) {
          body {
            padding: 12px;
            background: #ffffff;
          }
          .resume-scroll {
            margin: 0 -12px;
            padding: 0 12px 12px;
          }
          .resume-container {
            border-radius: 8px;
          }
        }
        @media print {
          body {
            padding: 0;
            background: #ffffff;
          }
          .resume-scroll {
            overflow: visible;
          }
          .resume-container {
            min-width: 0;
            box-shadow: none;
            border-radius: 0;
          }
        }
      </style>
    </head>
    <body>
      <div class="resume-scroll">
      <div class="resume-container">
        <aside class="sidebar">
          <h1>${data.personalInfo.fullName || 'Your Name'}</h1>
          <p class="sidebar-role">${data.personalInfo.professionalTitle || 'Professional Title'}</p>

          <h2>Contact</h2>
          ${data.personalInfo.address ? `<p>${data.personalInfo.address}</p>` : ''}
          ${data.personalInfo.phone ? `<p>${data.personalInfo.phone}</p>` : ''}
          ${data.personalInfo.email ? `<p><a href="mailto:${data.personalInfo.email}">${data.personalInfo.email}</a></p>` : ''}
          ${data.personalInfo.linkedin ? `<p><a href="${data.personalInfo.linkedin}">LinkedIn</a></p>` : ''}
          ${data.personalInfo.portfolio ? `<p><a href="${data.personalInfo.portfolio}">Portfolio</a></p>` : ''}

          ${skillGroups
            .map(
              (group) => `
                <h2>${group.category}</h2>
                <ul>
                  ${group.items.map((item) => `<li>${item}</li>`).join('')}
                </ul>
              `
            )
            .join('')}
        </aside>

        <main class="main-content">
          <h2 class="name">${data.personalInfo.fullName || 'Your Name'}</h2>
          ${data.personalInfo.professionalTitle ? `<div class="title">${data.personalInfo.professionalTitle}</div>` : ''}

          ${data.personalInfo.summary ? `
            <h3>Professional Summary</h3>
            <p>${data.personalInfo.summary}</p>
          ` : ''}

          ${data.experience?.length ? `
            <h3>Work History</h3>
            ${data.experience
              .map(
                (experience) => `
                  <div class="item">
                    <div class="item-header">
                      <span>${[experience.position, experience.company].filter(Boolean).join(', ')}</span>
                      <span class="date">${formatRange(experience.startDate, experience.endDate)}</span>
                    </div>
                    ${
                      experience.description
                        ? `<ul>${experience.description
                            .split('\n')
                            .map((line) => line.trim())
                            .filter(Boolean)
                            .map((line) => `<li>${line}</li>`)
                            .join('')}</ul>`
                        : ''
                    }
                  </div>
                `
              )
              .join('')}
          ` : ''}

          ${data.projects?.length ? `
            <h3>Projects</h3>
            ${data.projects
              .map(
                (project) => `
                  <div class="item">
                    <div class="project-heading">
                      <strong>${project.title}</strong>
                      ${project.duration ? `<em>${project.duration}</em>` : ''}
                    </div>
                    ${project.description ? `<p>${project.description}</p>` : ''}
                    ${project.technologies ? `<p><strong>Tech:</strong> ${project.technologies}</p>` : ''}
                  </div>
                `
              )
              .join('')}
          ` : ''}

          ${data.education?.length ? `
            <h3>Education</h3>
            <div class="education-list">
              ${data.education
                .map(
                  (education) => `
                    <p>
                      <strong>${education.field || education.degree}</strong>
                      ${education.school ? `, ${education.school}` : ''}
                      ${education.endDate ? ` (${formatMonth(education.endDate)})` : education.startDate ? ` (${formatMonth(education.startDate)})` : ''}
                    </p>
                  `
                )
                .join('')}
            </div>
          ` : ''}
        </main>
      </div>
      </div>
    </body>
    </html>
  `
}
