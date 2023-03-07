import { ScheduledEvent } from '../../../../../common/ScheduledEvent';
import { RsStation } from './RsStation';

export interface RsConnectionsResponse {
    connections: Array<RsConnection>;
}

export interface RsConnection {
    trainType: string;
    vzn: string;
    track: ScheduledEvent<string>;
    station: RsStation;
    timetable: {
        actualArrivalTime: number,
        actualDepartureTime: number,
        scheduledArrivalTime: number,
        scheduledDepartureTime: number,
    }
}