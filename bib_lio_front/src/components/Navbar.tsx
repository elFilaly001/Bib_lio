// Nav bar 

import { useAuth } from "react-oidc-context";

export default function NavBar() {
    const auth = useAuth();

    const UserInfo: React.FC = () => {
        const signOutRedirect = async () => {
            try {
                // const clientId = "6gklp93qca7spv8gaamh4v3ml0";
                // const logoutUri = "<logout uri>";
                // const cognitoDomain = "https://us-east-1jrf7lufwo.auth.us-east-1.amazoncognito.com";
                await auth.signoutRedirect();
                // window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
            } catch (error) {
                console.error("Error during sign out", error);
            }
        };

        if (auth.isLoading) {
            return <div>Loading user info...</div>;
        }

        if (auth.error) {
            return <div>Error loading user info: {auth.error.message}</div>;
        }

        if (!auth.isAuthenticated) {
            return (
                <>
                    <div>User is not authenticated.</div>
                    <button onClick={() => auth.signinRedirect()}>Sign in</button>
                </>
            );
        }

        const userProfile = auth.user?.profile; // Extract `profile` for user details

        return (
            <div>
                <p><strong>{userProfile?.given_name || "User"}!</strong></p>
                <p>Email: {userProfile?.email || "Not provided"}</p>
                <button onClick={() => signOutRedirect()}>Sign out</button>
            </div>
        );
    };

    return (
        <>
            <div>
                <h1>NavBar</h1>
                <UserInfo />
            </div>
        </>
    );
}