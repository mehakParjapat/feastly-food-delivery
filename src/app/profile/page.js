'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

function ProfileInner() {
  const { user, refresh } = useAuth();
  const [tab, setTab] = useState('profile');
  const [form, setForm] = useState({ name: '', phone: '' });
  const [pwd, setPwd] = useState({ currentPassword: '', newPassword: '' });
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) setForm({ name: user.name || '', phone: user.phone || '' });
  }, [user]);

  const saveProfile = async (e) => {
    e.preventDefault();
    setMsg(''); setError('');
    try {
      await api.put('auth/profile', form);
      await refresh();
      setMsg('Profile updated successfully');
    } catch (err) {
      setError(err.message);
    }
  };

  const changePwd = async (e) => {
    e.preventDefault();
    setMsg(''); setError('');
    try {
      await api.post('auth/change-password', pwd);
      setPwd({ currentPassword: '', newPassword: '' });
      setMsg('Password changed successfully');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">My Profile</h1>
      <p className="text-gray-500 mb-8">Manage your account details</p>

      <div className="flex gap-2 mb-6">
        <button onClick={() => setTab('profile')} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === 'profile' ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
          Profile
        </button>
        <button onClick={() => setTab('password')} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === 'password' ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
          Password
        </button>
      </div>

      {msg && <div className="bg-green-50 text-green-700 text-sm rounded-lg px-4 py-3 mb-4"><i className="fa-solid fa-circle-check mr-2" />{msg}</div>}
      {error && <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3 mb-4"><i className="fa-solid fa-circle-exclamation mr-2" />{error}</div>}

      {tab === 'profile' ? (
        <form onSubmit={saveProfile} className="card p-6 space-y-4 max-w-lg">
          <div>
            <label className="label">Email</label>
            <input className="input bg-gray-50" value={user?.email || ''} disabled />
          </div>
          <div>
            <label className="label">Full Name</label>
            <input className="input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="label">Phone</label>
            <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <button type="submit" className="btn-primary">Save Changes</button>
        </form>
      ) : (
        <form onSubmit={changePwd} className="card p-6 space-y-4 max-w-lg">
          <div>
            <label className="label">Current Password</label>
            <input type="password" className="input" required value={pwd.currentPassword} onChange={(e) => setPwd({ ...pwd, currentPassword: e.target.value })} />
          </div>
          <div>
            <label className="label">New Password</label>
            <input type="password" className="input" required value={pwd.newPassword} onChange={(e) => setPwd({ ...pwd, newPassword: e.target.value })} placeholder="At least 6 characters" />
          </div>
          <button type="submit" className="btn-primary">Change Password</button>
        </form>
      )}
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileInner />
    </ProtectedRoute>
  );
}
