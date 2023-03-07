export interface ScheduledEvent<ValueType> {
    scheduled: ValueType|null;
    actual: ValueType|null;
}