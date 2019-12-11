import Actions from "./actions.config";

export const saveUserAction = (user) => {
  return {
    type: Actions.SAVE_USER,
    payload: { user }
  };
};
