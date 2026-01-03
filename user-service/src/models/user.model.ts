export const createUserEvent = (user: any) => {
  return {
    type: "USER_REGISTERED",
    payload: {
      name: user.name,
      email: user.email,
    },
    timestamp: new Date(),
  };
};