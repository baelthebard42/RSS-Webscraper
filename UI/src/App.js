import { useState } from 'react';
import { useApi } from './hooks/useApi';
import Header from './components/Header';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import './styles/main.css';
import './styles/animations.css';

function App() {
  const {
    apiKey,
    user,
    loading,
    error,
    login,
    logout,
    createUser,
  } = useApi();
  const [activeTab, setActiveTab] = useState('posts');

  if (!apiKey) {
    return (
      <div className="app">
        <Header />
        <Auth onCreateUser={createUser} onLogin={login} loading={loading} error={error} />
      </div>
    );
  }

  return (
    <div className="app">
      <Header user={user} onLogout={logout} />
      <Dashboard 
        user={user} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
    </div>
  );
}

export default App;