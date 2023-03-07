import { Position } from "./Position";
import { Connection } from "./Connection";
import { ScheduledEvent } from './ScheduledEvent';

export interface Station {
    arrival?: ScheduledEvent<Date>;
    departure?: ScheduledEvent<Date>;
    id?: string;
    name: string;
    platform?: ScheduledEvent<string>;
    position?: Position;
    connections: Array<Connection>;
}