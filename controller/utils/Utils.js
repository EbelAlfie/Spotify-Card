export const createStateRef = (stateMachine, stateRef) => {
    if (!stateRef)
        return null;
    const state = stateMachine.states[stateRef.state_index];
    if (!state)
        throw new Error("TP_CANNOT_CREATE_STATE_REF","Invalid state reference.");
    return {
        state_machine_id: stateMachine.state_machine_id,
        state_id: state.state_id,
        paused: stateMachine.paused
    }
}

export function parseTrack(stateMachine) {
    const stateRef = command.state_ref
    const stateIndex = stateRef.stateIndex

    const state = stateMachine.states[stateIndex] 
    const track = stateMachine.tracks[state.track]

    const manifestProps = ["file_ids_mp4", "file_ids_mp4_dual"]
    const trackManifestList = track.manifest
    const trackUri = track.metadata.uri

    const trackManifest = trackManifestList[manifestProps[0]] //Temporary get 0

    const manifest = Array.isArray(trackManifest) && trackManifest.length && trackManifest[0]
    
    return {
        fileId: manifest?.fileId ?? ""
    }
}