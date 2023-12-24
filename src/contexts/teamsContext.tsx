"use client";
import { getUserTeams } from "@/actions/teams";
import { useApi } from "@/hooks/useApi";
import { useSearch } from "@/hooks/useSearch";
import { Team } from "@/lib/types/teams";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type TeamContextProps = {
  teams: Team[];
  loadingTeams: boolean;
  selectedTeam: Team | null;
};

const TeamContext = createContext<TeamContextProps | null>(null);

export const useTeams = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error("useTeamContext must be used within a TeamProvider");
  }
  return context;
};

type Props = {
  children: React.ReactNode;
};

export const TeamProvider = ({ children }: Props) => {
  const searchParams = useSearchParams();
  const team = searchParams.get("team");
  const router = useRouter();
  const { updateSearch } = useSearch();

  const { data, error, loading } = useApi<any>({
    url: "teams",
    fetcher: getUserTeams,
  });

  const { data: teams } = data || {};
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  useEffect(() => {
    if (loading) return;
    const userTeam = teams?.find((t: Team) => t.is_personal);

    if (team) {
      const selectedTeam = teams?.find((t: Team) => t.identifier === team);
      if (selectedTeam) {
        setSelectedTeam(selectedTeam);
      } else {
        if (userTeam) {
          setSelectedTeam(userTeam);
          updateSearch({ team: userTeam.id });
        }
      }
    } else {
      if (userTeam) {
        setSelectedTeam(userTeam);
      }
    }
  }, [team, router, teams, loading, updateSearch]);

  const value = {
    teams,
    loadingTeams: loading,
    selectedTeam,
  };

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>;
};
