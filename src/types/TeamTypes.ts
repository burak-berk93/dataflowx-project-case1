export type User = {
    id: string; // UUID ile benzersiz ID
    name: string;
    email: string | null;
    phone: string | null;
    images: File | null;  // Burada File türünü kullanıyoruz
    createdAt: Date | null;
    Description?: string;
  };
  
  export type Team = {
    id: number;
    name: string;
    createdAt: Date | null;  // Burada createdAt özelliğini ekliyoruz

    users: User[];
  };
  
  export type TeamContextType = {
    teams: Team[];
    removeUserFromTeam: (userId: string) => void;
    addTeam: (name: string) => void;
    addUserToTeam: (teamId: number, userName: string, email: string | null, phone: string | null, images: File | null, createdAt: Date | null, Description: string) => void;
  };
  