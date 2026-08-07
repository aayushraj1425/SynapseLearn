function CourseCard({ course, index, onSelect }) {
  return (
    <article className="course-card">
      <button
        className="course-card__button"
        type="button"
        aria-label={`Open ${course.name}`}
        onClick={onSelect}
      >
        <div className={`course-card__visual course-card__visual--${(index % 4) + 1}`}>
          <span aria-hidden="true">{course.courseCode.slice(0, 3)}</span>
        </div>
        <div className="course-card__body">
          <p className="course-code">{course.courseCode}</p>
          <h3>{course.name}</h3>
          <p className="course-term">{course.termLabel}</p>
        </div>
      </button>
    </article>
  )
}

export default CourseCard

