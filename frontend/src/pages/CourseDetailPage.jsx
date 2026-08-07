import { useMemo, useState } from 'react'
import AppHeader from '../components/AppHeader.jsx'

function CourseDetailPage({ course, onBack }) {
  const [query, setQuery] = useState('')

  const visibleFolders = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return course.folders || []

    return (course.folders || [])
      .map((folder) => {
        const folderMatches = `${folder.name} ${folder.summary || ''}`
          .toLowerCase()
          .includes(normalizedQuery)
        const matchingFiles = folder.files.filter((file) =>
          `${file.name} ${file.summary || ''} ${(file.concepts || []).join(' ')}`
            .toLowerCase()
            .includes(normalizedQuery),
        )

        if (!folderMatches && matchingFiles.length === 0) return null
        return { ...folder, files: folderMatches ? folder.files : matchingFiles }
      })
      .filter(Boolean)
  }, [course.folders, query])

  return (
    <div className="dashboard-page">
      <AppHeader
        query={query}
        onQueryChange={setQuery}
        searchLabel="Search course resources"
        searchPlaceholder="Search folders or files"
      />

      <main className="course-detail-main">
        <button className="back-button" type="button" onClick={onBack}>
          <span aria-hidden="true">←</span> Back to courses
        </button>

        <header className="course-detail-intro">
          <p className="course-detail-code">{course.courseCode}</p>
          <h1>{course.name}</h1>
          <p>Folders and files currently available through your Canvas course.</p>
        </header>

        <section className="resource-directory" aria-labelledby="directory-title">
          <div className="directory-heading">
            <h2 id="directory-title">Course resources</h2>
            <p>{visibleFolders.length} {visibleFolders.length === 1 ? 'folder' : 'folders'}</p>
          </div>

          {visibleFolders.length === 0 ? (
            <div className="course-empty" role="status">
              <h3>{query.trim() ? 'No matching resources' : 'No resources shared yet'}</h3>
              <p>
                {query.trim()
                  ? 'Try searching with a different folder or file name.'
                  : 'Canvas folders and files will appear here when available.'}
              </p>
            </div>
          ) : (
            <div className="folder-list">
              {visibleFolders.map((folder) => (
                <details className="resource-folder" key={folder.id} open>
                  <summary>
                    <span className="folder-icon" aria-hidden="true">■</span>
                    <span className="folder-copy">
                      <strong>{folder.name}</strong>
                      <span>{folder.summary}</span>
                    </span>
                  </summary>

                  <div className="file-list">
                    {folder.files.length === 0 ? (
                      <p className="folder-empty">This folder has no files.</p>
                    ) : folder.files.map((file) => (
                      <article className="resource-file" key={file.id}>
                        <div className="file-icon" aria-hidden="true">▤</div>
                        <div className="file-copy">
                          <div className="file-title-row">
                            <h3>{file.name}</h3>
                            <span>{file.type}</span>
                          </div>
                          <p>{file.summary}</p>
                          {(file.concepts || []).length > 0 && (
                            <div className="concept-list" aria-label={`Concepts connected to ${file.name}`}>
                              {file.concepts.map((concept) => <span key={concept}>{concept}</span>)}
                            </div>
                          )}
                        </div>
                        {file.url ? (
                          <a className="file-action" href={file.url} target="_blank" rel="noreferrer">Open</a>
                        ) : (
                          <button type="button" className="file-action" disabled title="No Canvas file URL available">Open</button>
                        )}
                      </article>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default CourseDetailPage
