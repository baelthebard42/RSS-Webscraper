export default function Header({ user, onLogout }) {
  return (
    <header className="header">
      <h1 className="logo">RSS Reader</h1>
      {user && (
        <div className="user-info">
          <span>Welcome, {user.name}</span>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
