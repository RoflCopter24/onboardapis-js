import { VehicleDataSource } from '../../../common/VehicleDataSource';
import { FlixTainmentTrainInfo } from './FlixTainmentTrainInfo';
import { PisPositionResponse } from './api/PisPositionResponse';

const API_URL = 'https://media.flixtrain.com';
const ENDPOINT_TRAIN_STATUS = '/services/pis/v1/position';

export class FlixTainmentDataSource implements VehicleDataSource<FlixTainmentTrainInfo> {

    async getValue(): Promise<FlixTainmentTrainInfo> {
        const positionRequest = new Request(`${API_URL}/${ENDPOINT_TRAIN_STATUS}`);
        const positionResponse = await positionRequest.json() as PisPositionResponse;

        return {
            speed: positionResponse.position.speed,
            position: {
                longitude: positionResponse.position.longitude,
                latitude: positionResponse.position.latitude
            },
            destination: {
                name: '',
                connections: []
            }
        }
    }
}