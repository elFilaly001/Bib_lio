// App.js

import { useAuth } from "react-oidc-context";
import { RouterProvider } from "react-router-dom";
import router from "./router/routes";

function App() {
  const auth = useAuth();

  // const signOutRedirect = () => {
  //   const clientId = "6gklp93qca7spv8gaamh4v3ml0";
  //   const logoutUri = "<logout uri>";
  //   const cognitoDomain = "https://<user pool domain>";
  //   window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  // };
  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  // if (auth.isAuthenticated) {
  //   return auth.user
  // }

  return (
    // <div>
    //   <button onClick={() => auth.signinRedirect()}>Sign in</button>
    //   <button onClick={() => signOutRedirect()}>Sign out</button>
    // </div>

    // auth.signinRedirect()

    <>
    <RouterProvider router={router} />
    </>
  );
}
  
export default App;