// Nav bar 

import { useAuth } from "react-oidc-context";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "./ui/navigation-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



export default function NavBar() {
    const auth = useAuth();

    const UserInfo: React.FC = () => {

        const signOutRedirect = () => {
            auth.removeUser();
            const clientId = "7455imgksuvh1ruunk5ctts1ur";
            const logoutUri = "http://localhost:5173/home";
            const cognitoDomain = "https://eu-central-1kjl9ikbmr.auth.eu-central-1.amazoncognito.com";
            window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
          };

        // if (auth.isLoading) {
        //     return <div>Loading user info...</div>;
        // }

        // if (auth.error) {
        //     return <div>Error loading user info: {auth.error.message}</div>;
        // }

        if (!auth.isAuthenticated) {
            return (
                <>
                    {/* <div>User is not authenticated.</div> */}
                    <Button type="button" onClick={() => auth.signinRedirect()}>Sign in</Button>
                </>
            );
        }

        const userProfile = auth.user?.profile; // Extract `profile` for user details

        console.log(auth);
        // console.log(data.clientId);
        return (
            <div>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="bg-slate-100"><Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent >
                                <NavigationMenuLink className="py-3">
                                    <Button type="button" className="w-full" onClick={signOutRedirect}>Sign out</Button>
                                </NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        );
    };

    return (
        <>
            <div className="flex justify-around mt-3">
                
                <div className="w-1/2 flex">
                    <Input placeholder="Search..." className="rounded-r-none" />
                    <Button className="rounded-l-none h-full">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </Button>
                </div>
                <UserInfo />
            </div>
        </>
    );
}