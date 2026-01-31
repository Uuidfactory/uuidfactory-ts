import { UuidFactoryClient } from "../src/client";

async function runBatchExample() {
  const client = new UuidFactoryClient();

  // Generate multiple UUIDs
  const batchUUIDs = await client.generateMultiple("v4", 5);
  console.log("Batch generated UUIDs:", batchUUIDs);

  // Validate multiple UUIDs
  const validationResults = await client.validateMultiple(batchUUIDs);
  console.log("Batch validation results:", validationResults);
}

runBatchExample().catch(console.error);
