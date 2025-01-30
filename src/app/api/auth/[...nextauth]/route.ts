export { auth as middleware } from "../../../../auth/auth";

import { handlers } from "../../../../auth/auth"; // Referring to the auth.ts we just created
export const { GET, POST } = handlers

