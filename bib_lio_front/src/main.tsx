import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { BrowserRouter, Routes } from 'react-router-dom'
// import router from './router/routes.tsx'
// import './index.css'
import App from './App.tsx'

// index.js
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_jRf7LuFwO",
  client_id: "6gklp93qca7spv8gaamh4v3ml0",
  redirect_uri: "http://localhost:5173/",
  response_type: "code",
  scope: "email openid phone",
};


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App/>
    </AuthProvider>
  </StrictMode>,
)
