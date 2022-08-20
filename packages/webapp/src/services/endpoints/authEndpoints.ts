import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BaseOutput } from "../../types/BaseOutput";

export const authEndpoints = (
  builder: EndpointBuilder<ReturnType<any>, string, "api">
) => ({
  login: builder.mutation<
    BaseOutput<string>,
    {
      email: string;
      password: string;
    }
  >({
    query: (body) => ({
      url: "/auth/login",
      method: "POST",
      body,
    }),
  }),
  register: builder.mutation<
    BaseOutput<string>,
    {
      fullName: string;
      email: string;
      password: string;
    }
  >({
    query: (body) => ({
      url: "/auth/register",
      method: "POST",
      body,
    }),
  }),
});
