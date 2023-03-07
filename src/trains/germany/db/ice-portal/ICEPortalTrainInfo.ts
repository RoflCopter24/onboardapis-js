import { VehicleInfo } from '../../../../common';
import { InternetConnectionStatus } from './InternetConnectionStatus';
import { Station } from '../../../../common/Station';
import { WagonClass } from '../WagonClass';
import { TrainType } from './TrainType';

export interface ICEPortalTrainInfo extends VehicleInfo {
    currentStation?: Station;
    delay: number;
    id: string;
    number: string;
    wagonClass: WagonClass;
    hasBAP: boolean;
    bapActive: boolean;
    internetConnectionStatus: InternetConnectionStatus;
    type: TrainType;
    stations: Map<string, Station>;
}