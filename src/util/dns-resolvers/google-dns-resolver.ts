import type { CustomDnsResolver, IDNSQueryResponse } from "../..";

export const googleDnsResolver: CustomDnsResolver = async (domain) => {
  const res = await fetch(`https://dns.google/resolve?name=${domain}&type=TXT`, {
    method: "GET",
  });
  return res.json() as Promise<IDNSQueryResponse>;
};
