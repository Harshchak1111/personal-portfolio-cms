import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form); // ✅ Correct endpoint
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })}
        value={form.email}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={e => setForm({ ...form, password: e.target.value })}
        value={form.password}
      />
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
