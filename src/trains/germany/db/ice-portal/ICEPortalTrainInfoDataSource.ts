import { VehicleDataSource } from '../../../../common/VehicleDataSource';
import { ICEPortalTrainInfo } from './ICEPortalTrainInfo';
import { Connection } from '../../../../common/Connection';
import { RsStatusResponse } from './api/RsStatusResponse';
import { Position } from '../../../../common';
import { RsTripInfoResponse } from './api/RsTripInfoResponse';
import { Station } from '../../../../common/Station';
import { RsStop } from './api/RsStop';
import { RsConnectionsResponse, RsConnection } from './api/RsConnectionsResponse';
import { BapStatusResponse } from './api/BapStatusResponse';

const API_URL = 'https://iceportal.de';
const ENDPOINT_TRAIN_STATUS = '/api1/rs/status';
const ENDPOINT_TRIP_INFO = '/api1/rs/tripInfo/trip';
const ENDPOINT_TRIP_CONNECTIONS = '/api1/rs/tripInfo/connection';
const ENDPOINT_BAP_STATUS = '/bap/api/bap-service-status'

export class ICEPortalTrainInfoDataSource implements VehicleDataSource<ICEPortalTrainInfo> {

    async getValue(): Promise<ICEPortalTrainInfo> {
        const rsStatusRequest = new Request(this.url(ENDPOINT_TRAIN_STATUS));
        const rsTripRequest = new Request(this.url(ENDPOINT_TRIP_INFO));
        const rsStatusData = await rsStatusRequest.json() as RsStatusResponse;
        const rsTripData = await rsTripRequest.json() as RsTripInfoResponse;

        const stations = this.buildStationMap(rsTripData);
        const currentStation = stations.get(rsTripData.trip.stopInfo.actualNext ?? '');
        const delay = (currentStation?.arrival?.actual && currentStation.arrival.scheduled) 
            ? currentStation?.arrival?.actual.getTime() - currentStation?.arrival?.scheduled.getTime()
            : 0;

        return {
            hasBAP: rsStatusData.bapInstalled,
            bapActive: rsStatusData.bapInstalled ? await this.getBapStatus(): false,
            delay: delay,
            destination: [...stations][stations.size-1][1],
            internetConnectionStatus: rsStatusData.internet,
            id: rsStatusData.tzn,
            number: rsTripData.trip.vzn,
            speed: rsStatusData.speed,
            type: rsStatusData.trainType,
            wagonClass: rsStatusData.wagonClass,
            stations: stations,
            currentStation: currentStation,
            position: { latitude: rsStatusData.latitude, longitude: rsStatusData.longitude } as Position
        } as ICEPortalTrainInfo;
    }

    async getConnectionsForStation(stationId: string): Promise<Connection[]> {
        const request = new Request(`${ENDPOINT_TRIP_CONNECTIONS}/${stationId}`);
        const result = await request.json() as RsConnectionsResponse;
        return result.connections.map((connection: RsConnection) => {
            const conn = {
                destination: connection.station.name,
                departure: {
                    actual: new Date(connection.timetable.actualDepartureTime/1000),
                    scheduled: new Date(connection.timetable.scheduledDepartureTime/1000),
                },
                lineNumber: connection.vzn,
                platform: connection.track,
                type: connection.trainType
            };
            return conn;
        });
    }

    private url(endpoint: string): string {
        return `${API_URL}${endpoint}`;
    }

    private buildStationMap(tripData: RsTripInfoResponse): Map<string, Station> {
        let map = new Map<string, Station>();
        tripData.trip.stops.forEach(async (stop: RsStop) => {
            map.set(stop.station.evaNr, { 
                id: stop.station.evaNr,
                name: stop.station.name,
                platform: stop.track,
                arrival: {
                    scheduled: stop.timetable.scheduledArrivalTime ? new Date(stop.timetable.scheduledArrivalTime) : null,
                    actual: stop.timetable.actualArrivalTime ? new Date(stop.timetable.actualArrivalTime) : null
                },
                departure: {
                    scheduled: stop.timetable.scheduledDepartureTime ? new Date(stop.timetable.scheduledDepartureTime) : null,
                    actual: stop.timetable.actualDepartureTime ? new Date(stop.timetable.actualDepartureTime) : null
                },
                position: stop.station.geocoordinates,
                connections: await this.getConnectionsForStation(stop.station.evaNr)
            })
        });
        return map;
    }

    private async getBapStatus(): Promise<boolean> {
        const request = new Request(`${API_URL}/${ENDPOINT_BAP_STATUS}`);
        const bapStatusResponse = await request.json() as BapStatusResponse;
        return bapStatusResponse.status;
    }
}