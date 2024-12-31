// Nav bar 

import { useAuth } from "react-oidc-context";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "./ui/navigation-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { group } from "console";

export default function NavBar() {
    const auth = useAuth();

    const UserInfo: React.FC = () => {

        const signOutRedirect = () => {
            auth.removeUser();
            const clientId = "5ccjs58hh11ntv0sue6b7qeb0a";
            const logoutUri = "http://localhost:5173/home";
            const cognitoDomain = "https://eu-central-1rofxhnupw.auth.eu-central-1.amazoncognito.com";
            window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
          };


        if (!auth.isAuthenticated) {
            return (
                <>
                    <Button type="button" onClick={() => auth.signinRedirect()}>Sign in</Button>
                </>
            );
        }


        console.log(auth.user);
        
        return (
            <div>
                <NavigationMenu className="w-full">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="bg-slate-100">
                                <Avatar>
                                    {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                                    <AvatarFallback>{auth.user?.profile?.["cognito:username"][0].toUpperCase()}</AvatarFallback>
                                </Avatar>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <NavigationMenuLink className="py-3 xs:w-5">
                                    <Button type="button" className="w-full " onClick={signOutRedirect}>Sign out</Button>
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
            <div className="flex xs:flex-col md:flex-row justify-around mt-4">
                <div className="flex w-11/12 xs:mx-auto md:w-1/2 mr-4">
                    <Input placeholder="Isbn ..." className="rounded-r-none" />
                    <Input placeholder="Title ..." className="rounded-r-none rounded-l-none" />
                    <Button className="rounded-l-none xs:h-10">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </Button>
                </div>
                <div className="flex xs:mx-auto md:ml-4 md:mt-0 xs:mt-3 md:justify-end">
                    <UserInfo />
                </div>
            </div>
        </>
    );
}