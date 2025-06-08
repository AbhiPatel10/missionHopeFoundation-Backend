export interface ApiResponse<T = any> {
  status?: number;
  message: string;
  data: T;
}

export const apiResponse = ({ message, data = {}, status = 200 }: ApiResponse) => ({
  status,
  message,
  data,
});
