import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BaseOutput } from "../../types/BaseOutput";
import { AppFeatures } from "../../types/features";

export const featuresEndpoints = (
  builder: EndpointBuilder<ReturnType<any>, string, "api">
) => ({
  listFeatures: builder.query<BaseOutput<AppFeatures>, null>({
    query: () => ({
      url: "/features/list",
      method: "GET",
    }),
  }),
});
