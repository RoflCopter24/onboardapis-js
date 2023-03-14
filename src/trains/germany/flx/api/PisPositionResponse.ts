import { Position } from '../../../../common/Position';

export interface PisPositionResponse {
    position: {
        latitude: number,
        longitude: number,
        speed: number
    }
}