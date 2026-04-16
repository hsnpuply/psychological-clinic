import { d as defineEventHandler, a as delayedResponse, b as readBody, c as createError, s as setUserSession } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'ipx';

const login_post = defineEventHandler(async (event) => {
  await delayedResponse();
  const body = await readBody(event);
  const { phone } = body;
  const users = {
    "09104646471": { role: "admin", name: "\u0645\u062F\u06CC\u0631 \u06A9\u0644\u06CC\u0646\u06CC\u06A9" },
    "09928717698": { role: "secretary", name: "\u0645\u0646\u0634\u06CC \u06A9\u0644\u06CC\u0646\u06CC\u06A9" }
  };
  const user = users[phone];
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "\u0634\u0645\u0627\u0631\u0647 \u062A\u0645\u0627\u0633 \u0648\u0627\u0631\u062F \u0634\u062F\u0647 \u0645\u0639\u062A\u0628\u0631 \u0646\u06CC\u0633\u062A"
    });
  }
  await setUserSession(event, {
    user: {
      phone,
      role: user.role,
      name: user.name
    }
  });
  return { success: true };
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
