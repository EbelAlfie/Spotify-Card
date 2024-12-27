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