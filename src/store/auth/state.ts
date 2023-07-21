export interface UserState {
    token: string | null;
    user: Record<string, unknown> | null;
}

function state(): UserState {
    return {
        token: null,
        user: null
    }
}

export default state;