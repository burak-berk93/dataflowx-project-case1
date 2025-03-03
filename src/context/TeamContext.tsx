import  { createContext, useState, ReactNode, useContext } from 'react';
import { Team, TeamContextType, User } from '../types/TeamTypes'; 
import { v4 as uuidv4 } from 'uuid'; 

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [teams, setTeams] = useState<Team[]>([]);

  const addTeam = (name: string) => {
    setTeams((prevTeams) => [
      ...prevTeams,
      { 
        id: prevTeams.length + 1, 
        name, 
        users: [], 
        createdAt: new Date() 
      }
    ]);
  };

  const removeUserFromTeam = (userId: string) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) => ({
        ...team,
        users: team.users.filter((user) => user.id !== userId), 
      }))
    );
  };

  const addUserToTeam = (teamId: number, userName: string, email: string | null, phone: string | null, image: File | null) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) => {
        if (team.id === teamId) {
          return {
            ...team,
            users: [
              ...team.users,
              {
                id: uuidv4(),
                name: userName,
                email,
                phone,
                images: image,  
                createdAt: new Date(),
              } as User, 
            ],
          };
        }
        return team;
      })
    );
  };

  return (
    <TeamContext.Provider value={{ teams, addTeam, addUserToTeam, removeUserFromTeam }}>
 

      {children}
    </TeamContext.Provider>
  );
};

export const useTeamContext = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeamContext must be used within a TeamProvider');
  }
  return context;
};
