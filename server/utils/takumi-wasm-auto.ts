// Replaces @takumi-rs/wasm/auto (aliased in nuxt.config). The published
// bundler shims break under nitro's unwasm transform: it rewrites the .wasm
// import into a lazy Promise, and next.mjs's Object.setPrototypeOf(promise,
// WebAssembly.Module.prototype) destroys the promise's thenability. Exporting
// the import untouched lets takumi's initWasm await it into a real module.
import mod from '@takumi-rs/wasm/takumi_wasm_bg.wasm?module';

export default mod;
