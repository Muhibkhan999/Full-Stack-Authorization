# Modern Authentication App

A beautiful, modern authentication application built with React, Supabase, and Tailwind CSS. Features email verification, Google OAuth, and a stunning UI with custom cursor effects.

## ✨ Features

### 🔐 Authentication
- **Email/Password Sign Up & Sign In**
- **Google OAuth Integration** - Sign up/sign in with Google
- **Email Verification** - Automatic email verification after signup
- **Password Reset** - Forgot password functionality
- **Protected Routes** - Secure dashboard access

### 🎨 UI/UX
- **Modern Design** - Beautiful gradient backgrounds and glassmorphism effects
- **Custom Cursor** - Smooth cursor following with trail effects
- **Confetti Animation** - Celebration effects on successful signup/signin
- **Responsive Design** - Works perfectly on all devices
- **Loading States** - Smooth loading animations
- **Error Handling** - User-friendly error messages

### 🚀 Performance
- **Lightweight** - Optimized for low memory devices
- **Fast Loading** - Minimal dependencies and efficient code
- **Smooth Animations** - 60fps cursor and UI animations

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router DOM
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Auth, Database)
- **Animations**: Custom CSS animations
- **Icons**: Heroicons (SVG)

## 📋 Prerequisites

Before running this application, you need:

1. **Node.js** (v14 or higher)
2. **npm** or **yarn**
3. **Supabase Account** - [Sign up here](https://supabase.com)
4. **Google OAuth** - Set up Google OAuth in Supabase

## ⚙️ Setup Instructions

### 1. Clone and Install

```bash
git clone <repository-url>
cd my-app
npm install
```

### 2. Supabase Configuration

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note down your project URL and anon key

2. **Configure Authentication**
   - Go to Authentication > Settings
   - Enable Email confirmations
   - Configure redirect URLs:
     - `http://localhost:3000/dashboard`
     - `http://localhost:3000/verify-email`

3. **Set up Google OAuth**
   - Go to Authentication > Providers
   - Enable Google provider
   - Add your Google OAuth credentials

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase Configuration
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the Application

```bash
npm start
```

The app will be available at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/
│   ├── Login.js              # Login form with Google OAuth
│   ├── SignUp.js             # Signup form with email verification
│   ├── ForgotPassword.js     # Password reset functionality
│   ├── Dashboard.js          # Protected dashboard
│   ├── EmailVerification.js  # Email verification page
│   ├── ProtectedRoute.js     # Route protection component
│   ├── CursorFollower.js     # Custom cursor effects
│   └── Confetti.js           # Celebration animations
├── context/
│   └── AuthContext.js        # Authentication context
├── config/
│   └── supabase.js           # Supabase client configuration
└── App.js                    # Main application component
```

## 🔧 Configuration

### Email Verification

The app automatically sends verification emails when users sign up. Users must verify their email before they can sign in.

### Google OAuth

Google OAuth is configured to redirect users back to the dashboard after successful authentication.

### Custom Cursor

The custom cursor effect includes:
- Main cursor dot (10px)
- Border circle with trail effect (50px)
- Smooth 60fps animations

## 🎯 Usage

### Sign Up Process
1. User fills out signup form
2. Clicks "Create Account" or "Sign up with Google"
3. If using email/password:
   - Verification email is sent
   - User clicks link in email
   - Email is verified automatically
4. User can then sign in

### Sign In Process
1. User enters email/password or clicks "Sign in with Google"
2. If email not verified, appropriate error is shown
3. Successful signin redirects to dashboard

### Password Reset
1. User clicks "Forgot your password?"
2. Enters email address
3. Reset email is sent
4. User clicks link to reset password

## 🔒 Security Features

- **Email Verification** - Ensures valid email addresses
- **Protected Routes** - Dashboard only accessible to authenticated users
- **Secure Authentication** - Handled by Supabase
- **OAuth Security** - Google OAuth with proper redirect handling

## 🎨 Customization

### Colors
The app uses a purple/pink gradient theme. You can customize colors in:
- `src/index.css` - Global styles
- Component files - Individual styling

### Animations
- Cursor effects in `CursorFollower.js`
- Confetti animations in `Confetti.js`
- CSS animations in `index.css`

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel/Netlify

1. Push your code to GitHub
2. Connect your repository to Vercel or Netlify
3. Set environment variables in deployment platform
4. Deploy!

## 🐛 Troubleshooting

### Common Issues

1. **Google OAuth not working**
   - Check Google OAuth credentials in Supabase
   - Verify redirect URLs are correct

2. **Email verification not working**
   - Check Supabase email settings
   - Verify email templates

3. **Cursor not showing**
   - Check if cursor is hidden by other CSS
   - Verify z-index values

### Error Messages

- **"Invalid login credentials"** - Wrong email/password or unverified email
- **"Email not confirmed"** - User needs to verify email
- **"Google OAuth error"** - Check Google OAuth configuration

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub. 