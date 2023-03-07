import { RsStop } from "./RsStop";
import { RsStopInfo } from "./RsStopInfo";

export interface RsTrip {
    trainType: string;
    vzn: string;
    stops: Array<RsStop>;
    stopInfo: RsStopInfo;
    actualPosition: number;
    distanceFromLastStop: number;
}