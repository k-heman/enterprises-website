import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    if (isRegistering && !mobileNumber) {
      setError('Please enter your mobile number.');
      return;
    }

    setLoading(true);
    let success = false;
    
    if (isRegistering) {
      success = await register(username, password, mobileNumber);
      if (!success) {
        setError('Registration failed. Username might already exist.');
      }
    } else {
      success = await login(username, password);
      if (!success) {
        setError('Invalid credentials.');
      }
    }
    
    setLoading(false);

    if (success) {
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="section container flex-center" style={{ minHeight: '100vh', background: 'var(--color-bg-light)' }}>
      <div className="card glass animate-fade-in" style={{ width: '100%', maxWidth: '400px', padding: '3rem 2rem' }}>
        <div className="text-center mb-6" style={{ marginBottom: '2rem' }}>
          <h2 className="heading-md">{isRegistering ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="text-muted" style={{ marginTop: '0.5rem' }}>
            {isRegistering ? 'Sign up to continue' : 'Login to access your dashboard'}
          </p>
        </div>

        {error && (
          <div style={{ background: '#FEE2E2', color: '#B91C1C', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="label" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="input-group" style={{ marginBottom: isRegistering ? '1.5rem' : '2rem' }}>
            <label className="label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          {isRegistering && (
            <div className="input-group" style={{ marginBottom: '2rem' }}>
              <label className="label" htmlFor="mobileNumber">Mobile Number</label>
              <input
                type="tel"
                id="mobileNumber"
                className="input"
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                disabled={loading}
              />
            </div>
          )}

          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', marginBottom: '1rem' }}>
            {loading ? 'Processing...' : (isRegistering ? 'Sign Up' : 'Login')}
          </button>
          
          <div className="text-center">
            <button 
              type="button" 
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
              }} 
              style={{ background: 'none', border: 'none', color: 'var(--color-primary)', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.9rem' }}
            >
              {isRegistering ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
