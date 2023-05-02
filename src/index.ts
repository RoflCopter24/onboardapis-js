import { ICEPortal } from "./trains/germany/db";

const portal = new ICEPortal();
portal.refresh().then(() => {
    console.debug(portal.position);
    console.debug(portal.speed);
});