import { d as defineEventHandler, r as requireUserSession, a as delayedResponse } from '../../nitro/nitro.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'ipx';

const patients_get = defineEventHandler(async (event) => {
  await requireUserSession(event);
  await delayedResponse();
  try {
    const dbPath = path.resolve(process.cwd(), "db.json");
    const data = await fs.readFile(dbPath, "utf-8");
    const db = JSON.parse(data);
    return db.patients || [];
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
});

export { patients_get as default };
//# sourceMappingURL=patients.get.mjs.map
