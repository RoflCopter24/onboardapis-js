import { RsConnectivityState } from './RsConnectivityState';

export interface RsStatusResponse {
    connection: boolean;
    serviceLevel: string;
    gpsStatus: string;
    internet: string;
    latitude: number;
    longitude: number;
    tileY: number;
    tileX: number;
    series: string|null;
    serverTime: number;
    speed: number;
    trainType: string;
    tzn: string;
    wagonClass: string;
    connectivity: RsConnectivityState;
    bapInstalled: boolean;
}