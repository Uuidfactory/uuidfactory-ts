import { UuidFactoryClient } from "../src/client";

async function runBasicExample() {
  const client = new UuidFactoryClient();

  // Generate UUIDs
  const uuidV1 = await client.generateV1();
  const uuidV4 = await client.generateV4();
  const uuidV7 = await client.generateV7();
  const guid = await client.generateGUID();

  console.log("UUID v1:", uuidV1);
  console.log("UUID v4:", uuidV4);
  console.log("UUID v7:", uuidV7);
  console.log("GUID:", guid);

  // Validate single UUID (pełny wynik: uuid, status, type)
  const validation = await client.validate(uuidV4);
  console.log("Validate UUID v4:", validation);
  console.log("Is UUID v4 valid?", validation.status === "valid");
}

runBasicExample().catch(console.error);
