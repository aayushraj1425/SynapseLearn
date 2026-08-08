function AppHeader({ query, onQueryChange, searchLabel, searchPlaceholder }) {
  return (
    <header className="dashboard-header">
      <div className="dashboard-header__inner dashboard-header__inner--simple">
        <p className="dashboard-brand">SynapseLearn</p>
        <div className="course-search">
          <label htmlFor="app-search">{searchLabel}</label>
          <input
            id="app-search"
            type="search"
            placeholder={searchPlaceholder}
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
        </div>
      </div>
    </header>
  )
}

export default AppHeader
