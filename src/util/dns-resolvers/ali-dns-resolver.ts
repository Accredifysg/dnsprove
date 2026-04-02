import type { CustomDnsResolver, IDNSQueryResponse } from "../..";

export const aliDnsResolver: CustomDnsResolver = async (domain) => {
  const url = new URL("https://dns.alidns.com/resolve");
  url.searchParams.set("name", domain);
  url.searchParams.set("type", "16");

  const res = await fetch(url, { method: "GET" });

  if (!res.ok) {
    throw new Error(`Ali DNS request failed: HTTP ${res.status}`);
  }

  return res.json() as Promise<IDNSQueryResponse>;
};
