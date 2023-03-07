import { DataSource } from "./DataSource";
import { VehicleInfo } from "./VehicleInfo";

export interface VehicleDataSource<T extends VehicleInfo> extends DataSource<T> {
    
}