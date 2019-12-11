import Actions from "./actions.config";

const initialState = {
    user: null,
};

export default function root(state = initialState, action) {
    switch (action.type) {
        case Actions.SAVE_USER: {
            // return equals to global set state - setting the store
            return {
                ...state,
                user: "hello " + action.payload.user + "@gmail.com"
            };
        }

        default: {
            return state;
        }
    }
}
