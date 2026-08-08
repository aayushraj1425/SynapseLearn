import CourseCard from './CourseCard.jsx'

function CourseGrid({
  courses,
  hasSearch,
  status = 'success',
  errorMessage,
  onRetry,
  onSelectCourse,
}) {
  if (status === 'loading') {
    return (
      <div className="course-grid" aria-label="Loading enrolled courses" aria-busy="true">
        {[1, 2, 3].map((item) => (
          <div className="course-card course-card--loading" key={item} aria-hidden="true">
            <div className="course-skeleton course-skeleton--visual" />
            <div className="course-card__body">
              <div className="course-skeleton course-skeleton--code" />
              <div className="course-skeleton course-skeleton--title" />
              <div className="course-skeleton course-skeleton--title-short" />
              <div className="course-skeleton course-skeleton--term" />
            </div>
          </div>
        ))}
        <span className="visually-hidden">Loading your enrolled courses.</span>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="course-empty course-empty--error" role="alert">
        <p className="state-label">Courses unavailable</p>
        <h3>We couldn&apos;t load your courses</h3>
        <p>{errorMessage || 'Canvas may be temporarily unavailable. Please try again.'}</p>
        <button className="state-button" type="button" onClick={onRetry}>
          Try again
        </button>
      </div>
    )
  }

  if (courses.length === 0) {
    return (
      <div className="course-empty" role="status">
        <h3>{hasSearch ? 'No matching courses' : 'No enrolled courses yet'}</h3>
        <p>
          {hasSearch
            ? 'Try searching by a different course name or course code.'
            : 'Your active Canvas courses will appear here when they are available.'}
        </p>
      </div>
    )
  }

  return (
    <div className="course-grid">
      {courses.map((course, index) => (
        <CourseCard
          key={course.id}
          course={course}
          index={index}
          onSelect={() => onSelectCourse?.(course)}
        />
      ))}
    </div>
  )
}

export default CourseGrid
