import { Position, Station, VehicleInfo } from "../../../common";

export interface FlixTainmentTrainInfo extends VehicleInfo {
    destination: Station;
    position?: Position | undefined;
    speed: number;
}