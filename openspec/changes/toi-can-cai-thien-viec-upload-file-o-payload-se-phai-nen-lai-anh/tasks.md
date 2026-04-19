## 1. Dependency & Config Setup

- [x] 1.1 Add `sharp` dependency and update `.npmrc`/pnpm config to pre-approve build
- [x] 1.2 Run `pnpm install` and verify `sharp` builds successfully

## 2. Payload Configuration Changes

- [ ] 2.1 Update `payload.config.ts` to define image size/quality configuration and register media hook
- [ ] 2.2 Extend `media` collection schema with `variants` metadata field
- [ ] 2.3 Implement hook logic using `sharp` to generate variants, handle errors, and populate metadata

## 3. Testing & Documentation

- [ ] 3.1 Test uploads (happy path, unsupported MIME, partial failures) and verify metadata via REST API
- [ ] 3.2 Document new configuration options and deployment notes for team