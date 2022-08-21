import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BaseOutput } from "../../types/BaseOutput";
import { User } from "@rns/prisma";

export const userEndpoints = (
  builder: EndpointBuilder<ReturnType<any>, string, "api">
) => ({
  getMe: builder.query<BaseOutput<User>, null>({
    query: () => ({
      url: "/user/me",
      method: "GET",
    }),
  }),
});
