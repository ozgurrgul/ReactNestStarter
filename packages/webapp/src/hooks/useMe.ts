import { useGetMeQuery } from "../services/api";

export const useMe = () => {
  const { data, isLoading } = useGetMeQuery(null);
  return {
    isLoading,
    me: data?.data,
  };
};
