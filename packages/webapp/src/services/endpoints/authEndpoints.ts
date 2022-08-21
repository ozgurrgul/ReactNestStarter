import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BaseOutput } from "../../types/BaseOutput";
import { LoginInput, RegisterInput } from "@rns/dtos";

export const authEndpoints = (
  builder: EndpointBuilder<ReturnType<any>, string, "api">
) => ({
  login: builder.mutation<BaseOutput<string>, LoginInput>({
    query: (body) => ({
      url: "/auth/login",
      method: "POST",
      body,
    }),
  }),
  register: builder.mutation<BaseOutput<string>, RegisterInput>({
    query: (body) => ({
      url: "/auth/register",
      method: "POST",
      body,
    }),
  }),
});
