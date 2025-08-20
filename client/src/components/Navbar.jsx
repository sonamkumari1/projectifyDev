import { LogOut, School } from "lucide-react";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { useLogoutUserMutation } from "@/redux/features/api/authApi";
import DarkMode from "./DarkMode";

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      navigate("/login");
    }
  }, [isSuccess]);
  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border m-5 rounded-full dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <Link to="/" className="flex items-center gap-2">
          <School size={"30"} />
          <h1 className="hidden md:block font-extrabold text-2xl">
            Projectify
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src={user?.photoUrl} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/my-learning")}>
                  My Learning
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  Edit Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logoutHandler}>
                  Log out
                  <DropdownMenuShortcut>
                    <LogOut size={"16"} />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {user?.role === "instructor" && (
                  <DropdownMenuItem>
                    <Button
                      onClick={() => navigate("/admin/dashboard")}
                      className="w-full mt-2 bg-purple-300 text-purple-700 hover:bg-purple-300"
                    >
                      Dashboard
                    </Button>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate("/login")} className="rounded-full">
                Log in
              </Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
