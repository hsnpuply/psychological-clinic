import { d as defineEventHandler, r as requireUserSession, a as delayedResponse, g as getQuery } from '../../nitro/nitro.mjs';
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

const therapists_get = defineEventHandler(async (event) => {
  await requireUserSession(event);
  await delayedResponse();
  try {
    const dbPath = path.resolve(process.cwd(), "db.json");
    const data = await fs.readFile(dbPath, "utf-8");
    const db = JSON.parse(data);
    const query = getQuery(event);
    if (query.id) {
      return db.therapists.find((t) => t.id === query.id);
    }
    return db.therapists || [];
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
});

export { therapists_get as default };
//# sourceMappingURL=therapists.get.mjs.map
