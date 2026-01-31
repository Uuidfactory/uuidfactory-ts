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
    const res = await fetch(`${this.baseUrl}/generate-multiple?type=${type}&count=${count}`);
    const data = await res.json();
    return data.uuids;
  }

  // Validate single UUID
  async validate(uuid: string): Promise<boolean> {
    const res = await fetch(`${this.baseUrl}/validate/${uuid}`);
    const data = await res.json();
    return data.valid;
  }

  // Validate multiple UUIDs
  async validateMultiple(uuids: string[]): Promise<{ [uuid: string]: boolean }> {
    const res = await fetch(`${this.baseUrl}/validate-multiple`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uuids }),
    });
    const data = await res.json();
    return data.results; // expects { uuid1: true, uuid2: false, ... }
  }

  // Internal helper
  private async fetchUUID(type: string): Promise<string> {
    const res = await fetch(`${this.baseUrl}/generate/${type}`);
    const data = await res.json();
    return data.uuid;
  }
}
