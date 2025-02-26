import User from "./User";

export default interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}
  