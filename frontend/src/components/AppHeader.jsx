function AppHeader({ query, onQueryChange, searchLabel, searchPlaceholder, user, onLogout }) {
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
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 14 }}>{user.email}</span>
            <button onClick={onLogout} style={{ fontSize: 14, cursor: 'pointer' }}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default AppHeader
