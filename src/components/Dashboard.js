import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner'

const Dashboard = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (!error) {
      navigate('/login')
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-bg-3 relative overflow-hidden">
      {/* Navigation */}
      <nav className="glass backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-black text-white">✨ Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                {user.user_metadata?.avatar_url ? (
                  <img
                    className="h-10 w-10 rounded-full avatar-modern"
                    src={user.user_metadata.avatar_url}
                    alt="Avatar"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center glow">
                    <span className="text-white text-sm font-bold">
                      {user.user_metadata?.first_name?.[0] || user.email[0].toUpperCase()}
                    </span>
                  </div>
                )}
                <span className="text-white font-semibold">
                  {user.user_metadata?.first_name && user.user_metadata?.last_name
                    ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
                    : user.email}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="btn-modern px-6 py-2 text-sm font-semibold"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8 relative z-10">
        <div className="px-4 py-6 sm:px-0">
          <div className="modern-card p-8">
            <h2 className="text-4xl font-black text-gray-900 mb-8 text-center">🎉 Welcome to your Dashboard!</h2>
            
            {/* User Information Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8 border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Your Profile Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <p className="text-lg font-medium text-gray-900">{user.email}</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">User ID</label>
                  <p className="text-sm font-mono text-gray-600">{user.id}</p>
                </div>
                {user.user_metadata?.first_name && (
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                    <p className="text-lg font-medium text-gray-900">{user.user_metadata.first_name}</p>
                  </div>
                )}
                {user.user_metadata?.last_name && (
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                    <p className="text-lg font-medium text-gray-900">{user.user_metadata.last_name}</p>
                  </div>
                )}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Verified</label>
                  <p className="mt-1">
                    {user.email_confirmed_at ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        ✅ Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        ⚠️ Not Verified
                      </span>
                    )}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Account Created</label>
                  <p className="text-lg font-medium text-gray-900">
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Avatar Display */}
            {user.user_metadata?.avatar_url && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-8 border border-purple-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Your Avatar
                </h3>
                <div className="flex items-center space-x-6">
                  <img
                    className="h-24 w-24 rounded-full object-cover avatar-modern"
                    src={user.user_metadata.avatar_url}
                    alt="Avatar"
                  />
                  <div>
                    <p className="text-lg text-gray-700 font-medium">
                      Your profile picture uploaded via Cloudinary
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Beautiful avatar! 🌟
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="btn-modern py-4 text-lg font-semibold">
                  ✏️ Edit Profile
                </button>
                <button className="btn-modern py-4 text-lg font-semibold" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                  ⚙️ View Settings
                </button>
                <button className="btn-modern py-4 text-lg font-semibold" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}>
                  💬 Help & Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 