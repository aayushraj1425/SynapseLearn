const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

async function request(path) {
  let response

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { Accept: 'application/json' },
    })
  } catch {
    throw new Error('The SynapseLearn backend is not reachable. Start it and try again.')
  }

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    const detail = typeof body.detail === 'string' ? body.detail : ''

    if (response.status === 401 || response.status === 403) {
      throw new Error('Canvas rejected the configured API token. Check the token in your root .env file.')
    }

    throw new Error(detail || `The backend returned an error (${response.status}).`)
  }

  return response.json()
}

export function getCourses() {
  return request('/courses')
}

export async function getCourseDirectory(courseId) {
  const encodedId = encodeURIComponent(courseId)
  const [folders, files] = await Promise.all([
    request(`/courses/${encodedId}/folders`),
    request(`/courses/${encodedId}/files`),
  ])

  return folders.map((folder) => ({
    id: String(folder.id),
    name: folder.name,
    summary: folder.full_name || 'Canvas course folder',
    files: files
      .filter((file) => String(file.folder_id) === String(folder.id))
      .map((file) => ({
        id: String(file.id),
        name: file.name,
        type: file.content_type || 'File',
        summary: file.size ? formatFileSize(file.size) : 'Shared through Canvas',
        concepts: [],
        url: file.url || null,
        modifiedAt: file.updated_at || null,
      })),
  }))
}

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 ** 2).toFixed(1)} MB`
}
