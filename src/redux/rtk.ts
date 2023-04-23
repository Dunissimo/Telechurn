import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IData } from "../utils/interfaces";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://cohort-test.mywire.org/api" }),
  endpoints: (builder) => ({
    getStatistics: builder.query<
      IData[],
      { channelId: string; interval: number }
    >({
      query: ({ channelId, interval = 6 }) =>
        `/cohorts/${channelId}?interval=${interval}`,
    }),
  }),
});

export const { useGetStatisticsQuery } = api;
