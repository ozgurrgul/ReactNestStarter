export type BaseOutput<T> = {
  succeed: boolean;
  data: T;
  message?: string;
};
