import { setupServer, SetupServerApi } from "msw/node";
import { http, HttpResponse } from "msw";
import { aliDnsResolver } from "./ali-dns-resolver";
import { cloudflareDnsResolver } from "./cloudflare-dns-resolver";
import { googleDnsResolver } from "./google-dns-resolver";

const emptyDnsJson = {
  Status: 0,
  TC: false,
  RD: true,
  RA: true,
  AD: false,
  CD: false,
  Answer: [] as [],
};

describe("googleDnsResolver", () => {
  let server: SetupServerApi;

  afterEach(() => {
    server.close();
  });

  test("requests Google DNS JSON with name and TXT type", async () => {
    server = setupServer(
      http.get("https://dns.google/resolve", ({ request }) => {
        const url = new URL(request.url);
        expect(url.searchParams.get("name")).toBe("my.domain.test");
        expect(url.searchParams.get("type")).toBe("TXT");
        return HttpResponse.json(emptyDnsJson);
      })
    );
    server.listen();

    const out = await googleDnsResolver("my.domain.test");
    expect(out).toMatchObject({ Status: 0, Answer: [] });
  });
});

describe("cloudflareDnsResolver", () => {
  let server: SetupServerApi;

  afterEach(() => {
    server.close();
  });

  test("requests Cloudflare DNS JSON with name, TXT type, and expected headers", async () => {
    server = setupServer(
      http.get("https://cloudflare-dns.com/dns-query", ({ request }) => {
        const url = new URL(request.url);
        expect(url.searchParams.get("name")).toBe("cf.example.test");
        expect(url.searchParams.get("type")).toBe("TXT");
        expect(request.headers.get("accept")).toBe("application/dns-json");
        expect(request.headers.get("connection")).toBe("keep-alive");
        expect(request.headers.get("contenttype")).toBe("application/json");
        return HttpResponse.json(emptyDnsJson);
      })
    );
    server.listen();

    const out = await cloudflareDnsResolver("cf.example.test");
    expect(out).toMatchObject({ Status: 0, Answer: [] });
  });
});

describe("aliDnsResolver", () => {
  let server: SetupServerApi;

  afterEach(() => {
    server.close();
  });

  test("requests Ali DNS JSON with name and type 16 (TXT)", async () => {
    server = setupServer(
      http.get("https://dns.alidns.com/resolve", ({ request }) => {
        const url = new URL(request.url);
        expect(url.searchParams.get("name")).toBe("ali.example.test");
        expect(url.searchParams.get("type")).toBe("16");
        return HttpResponse.json(emptyDnsJson);
      })
    );
    server.listen();

    const out = await aliDnsResolver("ali.example.test");
    expect(out).toMatchObject({ Status: 0, Answer: [] });
  });
});
