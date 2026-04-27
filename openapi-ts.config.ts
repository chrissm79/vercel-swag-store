import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "vercel-swag-api.json",
  output: "apps/store/lib/api/generated",
  plugins: ["@hey-api/client-fetch", "@hey-api/typescript", "@hey-api/sdk"],
});
