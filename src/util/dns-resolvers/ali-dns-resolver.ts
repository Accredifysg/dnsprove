import type { CustomDnsResolver, IDNSQueryResponse } from "../..";

export const aliDnsResolver: CustomDnsResolver = async (domain) => {
  const res = await fetch(`https://dns.alidns.com/resolve?name=${domain}&type=16`, {
    method: "GET",
  });
  return res.json() as Promise<IDNSQueryResponse>;
};
