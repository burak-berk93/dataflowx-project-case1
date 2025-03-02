export type User = {
    id: string; 
    name: string;
    email: string | null;
    phone: string | null;
    images: File | null;  
    createdAt: Date | null;
    Description?: string;
  };
  
  export type Team = {
    id: number;
    name: string;
    createdAt: Date | null;  

    users: User[];
  };
  
  export type TeamContextType = {
    teams: Team[];
    removeUserFromTeam: (userId: string) => void;
    addTeam: (name: string) => void;
    addUserToTeam: (teamId: number, userName: string, email: string | null, phone: string | null, images: File | null, createdAt: Date | null, Description: string) => void;
  };
  