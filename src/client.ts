const API_PATH: Record<string, string> = {
  v1: "version1",
  v4: "version4",
  v7: "version7",
  guid: "guid",
};

const DEFAULT_HEADERS = {
  "User-Agent": "uuidfactory-ts/1.0",
  "Accept": "application/json",
};

/** Wynik walidacji UUID z API: uuid, status ("valid" | "invalid"), type (wersja: "1", "4", "7" itd.) */
export interface ValidateResult {
  uuid: string;
  status: "valid" | "invalid";
  type: string;
}

export class UuidFactoryClient {
  private baseUrl: string;

  constructor(baseUrl = "https://uuidfactory.com/api") {
    this.baseUrl = baseUrl;
  }

  // Generate UUID v1
  async generateV1(): Promise<string> {
    return this.fetchUUID("v1");
  }

  // Generate UUID v4
  async generateV4(): Promise<string> {
    return this.fetchUUID("v4");
  }

  // Generate UUID v7
  async generateV7(): Promise<string> {
    return this.fetchUUID("v7");
  }

  // Generate GUID
  async generateGUID(): Promise<string> {
    return this.fetchUUID("guid");
  }

  // Generate multiple UUIDs
  async generateMultiple(type: "v1" | "v4" | "v7" | "guid", count: number): Promise<string[]> {
    const path = API_PATH[type];
    const res = await fetch(`${this.baseUrl}/${path}/${count}`, { headers: DEFAULT_HEADERS });
    const data = (await this.parseJsonResponse(res)) as string[] | { uuids?: string[] };
    return Array.isArray(data) ? data : data.uuids ?? [];
  }

  // Validate single UUID – zwraca pełną odpowiedź API (uuid, status, type)
  async validate(uuid: string): Promise<ValidateResult> {
    const res = await fetch(`${this.baseUrl}/validate/${encodeURIComponent(uuid)}`, {
      headers: DEFAULT_HEADERS,
    });
    const data = (await this.parseJsonResponse(res)) as {
      uuid?: string;
      status?: string;
      type?: string;
    };
    return {
      uuid: data.uuid ?? uuid,
      status: data.status === "valid" ? "valid" : "invalid",
      type: data.type ?? "",
    };
  }

  // Validate multiple UUIDs – wywołuje validate() dla każdego UUID (endpoint POST batch nie jest dostępny)
  async validateMultiple(uuids: string[]): Promise<ValidateResult[]> {
    return Promise.all(uuids.map((uuid) => this.validate(uuid)));
  }

  // Internal helper – API zwraca tablicę JSON (np. ["uuid-string"])
  private async fetchUUID(type: string): Promise<string> {
    const path = API_PATH[type] ?? type;
    const res = await fetch(`${this.baseUrl}/${path}`, { headers: DEFAULT_HEADERS });
    const data = (await this.parseJsonResponse(res)) as
      | string[]
      | { uuid?: string; message?: string };
    if (!res.ok) {
      const err = data as { message?: string };
      throw new Error(err?.message ?? `API error: ${res.status}`);
    }
    if (Array.isArray(data) && data.length > 0) {
      return data[0];
    }
    if (data && typeof data === "object" && "uuid" in data && data.uuid) {
      return data.uuid;
    }
    throw new Error("Invalid API response: expected UUID array or object");
  }

  private async parseJsonResponse(res: Response): Promise<unknown> {
    const text = await res.text();
    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      throw new Error(
        `Expected JSON from ${res.url}, got ${contentType}. Response: ${text.slice(0, 200)}`
      );
    }
    return JSON.parse(text);
  }
}
