import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './components/Login'
import SignUp from './components/SignUp'
import ForgotPassword from './components/ForgotPassword'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import CursorFollower from './components/CursorFollower'
import Confetti from './components/Confetti'
import EmailVerification from './components/EmailVerification'

function App() {
  const [showConfetti, setShowConfetti] = useState(false)

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <CursorFollower />
          <Confetti
            isActive={showConfetti}
            onComplete={() => setShowConfetti(false)}
          />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login onSignInSuccess={() => setShowConfetti(true)} />} />
            <Route path="/signup" element={<SignUp onSignInSuccess={() => setShowConfetti(true)} />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App 