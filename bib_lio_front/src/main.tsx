import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { BrowserRouter, Routes } from 'react-router-dom'
// import router from './router/routes.tsx'
import './index.css'
import App from './App.tsx'


// index.js
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_KjL9iKbmR",
  client_id: "7455imgksuvh1ruunk5ctts1ur",
  redirect_uri: "http://localhost:5173/home",
  response_type: "code",
  scope: "phone openid email",
};


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App/>
    </AuthProvider>
  </StrictMode>,
)
