import { Position } from './Position';
import { Station } from './Station';
import { VehicleInfo } from './VehicleInfo';
import { VehicleDataSource } from './VehicleDataSource';

export class Vehicle<Info extends VehicleInfo> {
    private info?: Info;
    private initialized: boolean = false;

    constructor(private dataSource: VehicleDataSource<Info>) {
        this.dataSource.getValue().then((data: Info) => {
            this.info = data;
            this.initialized = true;
        });
    }

    public get currentStation(): Station|undefined {
        return this.vehicleInfo.currentStation;
    }

    public get delay(): number {
        return this.vehicleInfo.delay;
    }

    public get destination(): string {
        return this.vehicleInfo.destination;
    }

    public get position(): Position|undefined {
        return this.vehicleInfo.position;
    }

    public get speed(): number {
        return this.vehicleInfo.speed;
    }

    public get type(): string {
        return this.vehicleInfo.type;
    }

    private get vehicleInfo(): Info {
        if (this.info === undefined) {
            throw new Error('VehicleInfo is undefined!');
        }
        return this.info;
    }

    public isInitialized(): boolean {
        return this.initialized;
    }

    public async refresh(): Promise<void> {
        this.info = await this.dataSource.getValue();
    }
}