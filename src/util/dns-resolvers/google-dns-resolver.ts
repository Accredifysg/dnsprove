import type { CustomDnsResolver, IDNSQueryResponse } from "../..";

export const googleDnsResolver: CustomDnsResolver = async (domain) => {
  const url = new URL("https://dns.google/resolve");
  url.searchParams.set("name", domain);
  url.searchParams.set("type", "TXT");

  const res = await fetch(url, { method: "GET" });

  if (!res.ok) {
    throw new Error(`Google DNS request failed: HTTP ${res.status}`);
  }

  return res.json() as Promise<IDNSQueryResponse>;
};
