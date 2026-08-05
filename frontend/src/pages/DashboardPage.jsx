import { useMemo, useState } from 'react'
import AppHeader from '../components/AppHeader.jsx'
import CourseGrid from '../components/CourseGrid.jsx'

function DashboardPage({ courses, status, errorMessage, onRetry, onSelectCourse }) {
  const [query, setQuery] = useState('')

  const filteredCourses = useMemo(() => {
    const search = query.trim().toLowerCase()
    if (!search) return courses

    return courses.filter((course) =>
      `${course.name} ${course.courseCode}`.toLowerCase().includes(search),
    )
  }, [courses, query])

  return (
    <div className="dashboard-page">
      <AppHeader
        query={query}
        onQueryChange={setQuery}
        searchLabel="Search courses"
        searchPlaceholder="Search courses"
      />

      <main className="dashboard-main">
        <section className="dashboard-intro" aria-labelledby="dashboard-title">
          <h1 id="dashboard-title">Your Canvas courses</h1>
          <p>Courses loaded from the Canvas account configured in the backend.</p>
        </section>

        <section aria-labelledby="courses-title">
          <div className="section-heading">
            <div>
              <h2 id="courses-title">Courses</h2>
              {status === 'success' && <p>{filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}</p>}
            </div>
          </div>
          <CourseGrid
            courses={filteredCourses}
            hasSearch={Boolean(query.trim())}
            status={status}
            errorMessage={errorMessage}
            onRetry={onRetry}
            onSelectCourse={onSelectCourse}
          />
        </section>
      </main>
    </div>
  )
}

export default DashboardPage
