export const ok = (data: any) => {
  return {
    data,
    succeed: true,
  };
};

export const error = (message: any) => {
  return {
    message,
    succeed: false,
  };
};
