import { ScheduledEvent } from './ScheduledEvent';
export interface Connection {
    departure: ScheduledEvent<Date>;
    destination: string;
    lineNumber?: string;
    platform?: ScheduledEvent<string>;
    type?: string;
}