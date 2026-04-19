// default open-next.config.ts file created by @opennextjs/cloudflare
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
// import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

const config = defineCloudflareConfig({
	// For best results consider enabling R2 caching
	// See https://opennext.js.org/cloudflare/caching for more details
	// incrementalCache: r2IncrementalCache
});

export default {
	...config,
	buildCommand: "node scripts/patch-jose-workerd.mjs && node scripts/patch-opennext-env-shim.mjs && node scripts/patch-undici-workerd.mjs && node scripts/patch-payload-workerd.mjs && npm run build -- --webpack",
} as any;
