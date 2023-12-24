"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";

import { Skeleton } from "../ui/skeleton";
import { useTeams } from "@/contexts/teamsContext";
import { useAuth } from "@/contexts/authContext";
import { useSearch } from "@/hooks/useSearch";
import NewTeamForm from "./newTeamForm";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {}

const TeamSwitcher = ({ className }: TeamSwitcherProps) => {
  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);
  const { user } = useAuth();
  const { teams, selectedTeam, loadingTeams } = useTeams();
  const { updateSearch } = useSearch();
  const otherTeams = teams?.filter((team) => !team.is_personal) || [];

  const groups = [
    {
      label: "Personal Account",
      isPersonal: true,
      teams: [
        {
          name: user?.user_metadata?.full_name,
          id: user?.id,
          photo_url: user?.user_metadata?.picture,
        },
      ],
    },
    {
      label: "Teams",
      teams: otherTeams?.map((team) => ({
        name: team.name,
        id: team.identifier,
        photo_url: team.photo_url,
      })),
    },
  ];

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("w-[200px] justify-between", className)}
          >
            {loadingTeams ? (
              <div className="flex items-center space-x-2">
                <Skeleton className="mr-2 h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            ) : (
              <>
                <Avatar className="mr-2 h-5 w-5">
                  <AvatarImage
                    src={
                      (selectedTeam?.is_personal
                        ? user?.user_metadata.picture
                        : selectedTeam?.photo_url) ||
                      `https://avatar.vercel.sh/1.png`
                    }
                    alt={selectedTeam?.name}
                  />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                {selectedTeam?.name}
                <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search team..." />
              <CommandEmpty>No team found.</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {group.teams.map((team) => (
                    <CommandItem
                      key={team.id}
                      onSelect={() => {
                        if (group.isPersonal) {
                          updateSearch({ team: null });
                        } else {
                          updateSearch({ team: team.id! });
                        }
                        setOpen(false);
                      }}
                      className="text-sm"
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          src={
                            team.photo_url || `https://avatar.vercel.sh/1.png`
                          }
                          alt={team.name}
                          className="grayscale"
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      {team.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedTeam?.id === team.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewTeamDialog(true);
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Create Team
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <NewTeamForm onClose={() => setShowNewTeamDialog(false)} />
    </Dialog>
  );
};

export default TeamSwitcher;
