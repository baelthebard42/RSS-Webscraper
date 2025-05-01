import { useState } from "react";

export default function Auth({ onCreateUser, onLogin, loading, error }) {
  const [name, setName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isSignup, setIsSignup] = useState(true);
  const [generatedKey, setGeneratedKey] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      const user = await onCreateUser(name);
      setGeneratedKey(user.api_key);
    } else {
      onLogin(apiKey);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>

        {error && <div className="error-message">{error}</div>}

        {generatedKey ? (
          <div className="key-display">
            <p>Your API Key (save this securely):</p>
            <code className="api-key">{generatedKey}</code>
            <button
              onClick={() => {
                navigator.clipboard.writeText(generatedKey);
                setIsSignup(false);
                setApiKey(generatedKey);
              }}
              className="copy-btn"
            >
              Copy & Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            {!isSignup && (
              <div className="form-group">
                <label htmlFor="apiKey">API Key</label>
                <input
                  id="apiKey"
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  required
                />
              </div>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "Loading..." : isSignup ? "Sign Up" : "Login"}
            </button>

            <p className="toggle-auth" onClick={() => setIsSignup(!isSignup)}>
              {isSignup
                ? "Already have an API key? Login"
                : "Need an API key? Sign up"}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
