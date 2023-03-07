import { RsStation } from './RsStation';
import { ScheduledEvent } from '../../../../../common/ScheduledEvent';

export interface RsStop {
    station: RsStation;
    track: ScheduledEvent<string>;
    timetable: {
        scheduledArrivalTime: number|null;
        actualArrivalTime: number|null;
        scheduledDepartureTime: number|null;
        actualDepartureTime: number|null;
    },
    info: {
        distanceFromStart: number|null
    }
}