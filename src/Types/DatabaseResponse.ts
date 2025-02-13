export type DatabaseResponse<T> = {
  success: boolean;
  reason: string;
  data: T;
};
