import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { authEndpoints } from "./endpoints/authEndpoints";
import { emailEndpoints } from "./endpoints/emailEndpoints";
import { API_URL } from "../constants";
import { selectAuthToken } from "../slices/authSlice";
import { userEndpoints } from "./endpoints/userEndpoints";
import { featuresEndpoints } from "./endpoints/featuresEndpoints";

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = selectAuthToken(getState() as RootState);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({
    ...authEndpoints(builder),
    ...userEndpoints(builder),
    ...emailEndpoints(builder),
    ...featuresEndpoints(builder),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useVerifyEmailMutation,
  useResendVerificationMutation,
  useListFeaturesQuery,
} = api;
