import SetLog from "./SetLog";

export default interface Exercise {
    id: string;
    name: string;
    sets: SetLog[];
}