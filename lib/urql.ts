import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
  ssrExchange,
} from "urql";

const isServerSide = typeof window === "undefined";
const ssrCache = ssrExchange({ isClient: !isServerSide });

const client = createClient({
  url: "https://api-sa-east-1.hygraph.com/v2/cl8bn7h0600wu01taa9bq9uxe/master",
  exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
  requestPolicy: "network-only",
});

export { client, ssrCache };
