# uuidfactory-ts

**TypeScript client for UUIDFactory API – generate and validate UUIDs online**

[UUIDFactory website](https://uuidfactory.com) | [API Documentation](https://uuidfactory.com/api) | [Online Validator](https://uuidfactory.com/validator) | [Online Generator](https://uuidfactory.com/generator)

---

## Overview

`uuidfactory-ts` is the official **TypeScript client** for the **UUIDFactory API**.  
Easily generate and validate UUIDs in your TypeScript or Node.js projects. Supports UUID versions v1, v4, v7, GUID, batch generation, and batch validation, with seamless integration with the [UUIDFactory online tools](https://uuidfactory.com).

**Key Features:**

- Generate UUID v1, v4, v7, and GUID programmatically  
- Validate single UUIDs or multiple UUIDs at once  
- Generate multiple UUIDs at once (batch generation)  
- Simple, lightweight TypeScript client  
- Fully compatible with Node.js and browser environments  
- Works with [UUIDFactory API](https://uuidfactory.com/api)  

---

## Installation

Install via npm:

```bash
npm install uuidfactory-ts
```

Or using Yarn:

```bash
yarn add uuidfactory-ts
```

---

## Usage

```ts
import { UuidFactoryClient } from "uuidfactory-ts";

const client = new UuidFactoryClient();

// Generate a UUID v4
const uuid = await client.generateV4();
console.log("Generated UUID v4:", uuid);

// Generate multiple UUIDs
const uuids = await client.generateMultiple('v4', 5);
console.log("Generated UUIDs:", uuids);

// Validate a single UUID
const isValid = await client.validate(uuids[0]);
console.log("Is single UUID valid?", isValid);

// Validate multiple UUIDs at once
const validationResults = await client.validateMultiple(uuids);
console.log("Batch validation results:", validationResults);
```

---

## Available Methods

| Method | Description |
|--------|-------------|
| `generateV1()` | Generate UUID version 1 |
| `generateV4()` | Generate UUID version 4 (random) |
| `generateV7()` | Generate UUID version 7 |
| `generateGUID()` | Generate a GUID |
| `generateMultiple(type: string, count: number)` | Generate multiple UUIDs of the given type |
| `validate(uuid: string)` | Validate if a string is a valid UUID |
| `validateMultiple(uuids: string[])` | Validate multiple UUIDs at once |

---

## Examples

Check the `examples/` folder for ready-to-run TypeScript code:

- `examples/basic.ts` – Generate and validate single UUIDs  
- `examples/batch.ts` – Generate and validate multiple UUIDs at once  

---

## Use Cases

- Quick UUID generation for backend and frontend projects  
- Validating single or multiple UUIDs before database insertion  
- Generating multiple UUIDs for bulk operations  
- Integration in TypeScript/Node.js apps  

---

## Links & References

- [Official UUIDFactory Website](https://uuidfactory.com)  
- [Online UUID Generator](https://uuidfactory.com/generator)  
- [UUID Validator](https://uuidfactory.com/validator)  
- [UUID API Documentation](https://uuidfactory.com/api)  

---

## Contributing

Contributions are welcome! Feel free to submit **issues**, **pull requests**, or **feature requests**.  
Check [CONTRIBUTING.md](CONTRIBUTING.md) (optional) for guidelines.

---

## License

This project is licensed under the [MIT License](LICENSE) – see the LICENSE file for details.

---

## SEO & Google Optimization Notes

This README is optimized for:

- **Brand recognition:** mentions `UUIDFactory` multiple times  
- **Anchor links:** direct links to `/api`, `/validator`, `/generator`  
- **Developer clarity:** installation and usage instructions  
- **Topical relevance:** keywords like `UUID`, `TypeScript client`, `UUID generator`, `UUID validator`, `GUID`, `batch UUID generation`, `batch validation`
