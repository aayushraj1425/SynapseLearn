import { useEffect, useState } from 'react'
import DashboardPage from './pages/DashboardPage.jsx'
import CourseDetailPage from './pages/CourseDetailPage.jsx'
import { getCourseDirectory, getCourses } from './api.js'

function normalizeCourse(course) {
  return {
    id: String(course.id),
    name: course.name,
    courseCode: course.course_code || 'COURSE',
    termLabel: 'Canvas course',
  }
}

function App() {
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [status, setStatus] = useState('loading')
  const [errorMessage, setErrorMessage] = useState('')

  async function loadCourses() {
    setStatus('loading')
    setErrorMessage('')

    try {
      const canvasCourses = await getCourses()
      setCourses(canvasCourses.map(normalizeCourse))
      setStatus('success')
    } catch (error) {
      setStatus('error')
      setErrorMessage(error.message)
    }
  }

  useEffect(() => {
    getCourses()
      .then((canvasCourses) => {
        setCourses(canvasCourses.map(normalizeCourse))
        setStatus('success')
      })
      .catch((error) => {
        setStatus('error')
        setErrorMessage(error.message)
      })
  }, [])

  async function openCourse(course) {
    setStatus('loading')
    setErrorMessage('')

    try {
      const folders = await getCourseDirectory(course.id)
      setSelectedCourse({ ...course, folders })
      setStatus('success')
    } catch (error) {
      setStatus('error')
      setErrorMessage(error.message)
    }
  }

  if (selectedCourse) {
    return (
      <CourseDetailPage
        course={selectedCourse}
        onBack={() => setSelectedCourse(null)}
      />
    )
  }

  return (
    <DashboardPage
      courses={courses}
      status={status}
      errorMessage={errorMessage}
      onRetry={loadCourses}
      onSelectCourse={openCourse}
    />
  )
}

export default App
