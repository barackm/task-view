"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "@/contexts/authContext";

type Props = {
  isSidebarCollapsed: boolean;
};

const UserLink = (props: Props) => {
  const { isSidebarCollapsed } = props;
  const { user } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-full">
        <Button
          variant="ghost"
          className="relative gap-2 flex justify-start px-2 py-4"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.user_metadata?.picture} alt={user?.email} />
            <AvatarFallback>
              {user?.user_metadata?.full_name.split(" ").map((name) => name[0])}
            </AvatarFallback>
          </Avatar>
          {!isSidebarCollapsed && (
            <div className="flex flex-1 flex-col text-left w-full gap-1">
              <p className="text-sm font-medium leading-none">
                {user?.user_metadata?.full_name}
              </p>
              <p className="text-xs block w-full leading-none text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ml-2" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">shadcn</p>
            <p className="text-xs leading-none text-muted-foreground">
              m@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserLink;
