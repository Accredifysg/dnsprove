import type { CustomDnsResolver, IDNSQueryResponse } from "../..";

export const cloudflareDnsResolver: CustomDnsResolver = async (domain) => {
  const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=TXT`, {
    method: "GET",
    headers: { accept: "application/dns-json", contentType: "application/json", connection: "keep-alive" },
  });
  return res.json() as Promise<IDNSQueryResponse>;
};
