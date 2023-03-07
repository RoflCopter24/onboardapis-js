import { Vehicle } from "../../../../common";
import { ICEPortalTrainInfo } from './ICEPortalTrainInfo';
import { ICEPortalTrainInfoDataSource } from './ICEPortalTrainInfoDataSource';

export class ICEPortal extends Vehicle<ICEPortalTrainInfo> {
    
    constructor() {
        super(new ICEPortalTrainInfoDataSource());
    }
}