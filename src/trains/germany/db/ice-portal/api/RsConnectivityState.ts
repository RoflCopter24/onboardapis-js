export interface RsConnectivityState {
    currentState: string,
    nextState: string|null,
    remainingTimeSecondes: number|null
}