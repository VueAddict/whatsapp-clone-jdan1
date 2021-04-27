export const initialState = {
    user: null
}

export const setUser = () => ({
    type: "SET_USER",
    user: null
})

const reducer = (state, action) => {
    if(action.type === "SET_USER") {
        return {
            ...state,
            user: action.user
        }

    }
    return state
}

export default reducer