import type { CustomDnsResolver, IDNSQueryResponse } from "../..";

export const aliDnsResolver: CustomDnsResolver = async (domain) => {
  const url = new URL("https://dns.alidns.com/resolve");

  if (!domain) {
    throw new Error("Domain is required");
  }

  url.searchParams.set("name", domain);
  url.searchParams.set("type", "16");

  const res = await fetch(url, { method: "GET" });

  if (!res.ok) {
    throw new Error(`Ali DNS request failed: HTTP ${res.status}`);
  }

  return res.json() as Promise<IDNSQueryResponse>;
};
