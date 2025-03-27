import User from "./User";

export default interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    guestLogin: () => void;
    signup: (name: string, email: string, password: string) => void;
    isAuthenticated: boolean;
    isGuest: boolean;
}
  