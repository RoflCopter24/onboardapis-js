import { Position } from "./Position";
import { Station } from "./Station";

export interface VehicleInfo {
    destination: Station;
    position?: Position;
    speed: number;
}