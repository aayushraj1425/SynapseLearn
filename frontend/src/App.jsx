import { useEffect, useState } from 'react'
import DashboardPage from './pages/DashboardPage.jsx'
import CourseDetailPage from './pages/CourseDetailPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import { getCourseDirectory, getCourses } from './api.js'
import { getMe, logout } from './auth.js'

function normalizeCourse(course) {
  return {
    id: String(course.id),
    name: course.name,
    courseCode: course.course_code || 'COURSE',
    termLabel: 'Canvas course',
  }
}

function App() {
  const [user, setUser] = useState(null)
  const [authPage, setAuthPage] = useState('login')
  const [authChecked, setAuthChecked] = useState(false)
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [status, setStatus] = useState('loading')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    getMe()
      .then((u) => setUser(u))
      .catch(() => {})
      .finally(() => setAuthChecked(true))
  }, [])

  async function handleAuthenticated() {
    const u = await getMe()
    setUser(u)
  }

  async function handleLogout() {
    await logout()
    setUser(null)
    setCourses([])
    setSelectedCourse(null)
  }

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
    if (!user) return
    loadCourses()
  }, [user])

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

  if (!authChecked) return null

  if (!user) {
    return authPage === 'login'
      ? <LoginPage onAuthenticated={handleAuthenticated} onGoToSignup={() => setAuthPage('signup')} />
      : <SignupPage onAuthenticated={handleAuthenticated} onGoToLogin={() => setAuthPage('login')} />
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
      user={user}
      onLogout={handleLogout}
    />
  )
}

export default App
