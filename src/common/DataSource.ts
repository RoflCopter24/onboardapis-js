
export interface DataSource<T> {
    getValue(): Promise<T>;
}