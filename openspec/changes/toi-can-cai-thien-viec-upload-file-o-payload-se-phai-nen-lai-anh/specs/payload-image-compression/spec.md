## ADDED Requirements

### Requirement: Automatic image compression on upload
The system SHALL process every uploaded image through a configurable pipeline that resizes and compresses the file before storing it. The pipeline MUST support defining multiple target widths (e.g., original max width, large, medium, thumbnail) and compression quality per size via Payload config.

#### Scenario: Upload matches supported mime type
- **WHEN** a user uploads an image file to the media collection
- **THEN** the system SHALL generate all configured resized/compressed variants and store them along with the optimized original

#### Scenario: Unsupported file type
- **WHEN** a user uploads a file whose MIME type is not in the configured list
- **THEN** the system SHALL bypass the compression pipeline and store the file unmodified

### Requirement: Variant metadata exposure
The system SHALL persist metadata for each generated variant (width, height, file size, url). This metadata MUST be stored with the media document and exposed through Payload REST/GraphQL APIs so frontend callers can select the appropriate size.

#### Scenario: CMS admin views media document
- **WHEN** an admin opens a media entry after upload
- **THEN** the API response SHALL include metadata for each generated variant (name, dimensions, file size, url)

#### Scenario: Frontend fetches media via REST API
- **WHEN** the public site queries `/api/media` for an item with generated variants
- **THEN** the JSON payload SHALL include the variant metadata so the client can choose a size without additional requests

### Requirement: Configurable quality and sizes
Administrators SHALL be able to adjust compression quality and target widths without code changes by editing `payload.config.ts`. Defaults MUST be provided so the system works out of the box.

#### Scenario: Admin updates compression settings
- **WHEN** the operator updates the quality/size configuration and restarts Payload
- **THEN** subsequent uploads SHALL use the new settings automatically

### Requirement: Error handling and fallback
If the compression pipeline fails for a specific variant, the system SHALL log the error, skip that variant, and continue storing any successfully produced files. The upload request SHALL still succeed unless every variant fails.

#### Scenario: Sharp throws error for one size
- **WHEN** the resize operation fails for the "thumbnail" variant due to corrupt source data
- **THEN** the system SHALL log the error, attach metadata noting the failure, and still store the other generated variants plus the original optimized image

#### Scenario: All variants fail
- **WHEN** the compression pipeline fails for all configured sizes
- **THEN** the upload SHALL fall back to storing the original file without optimization and return a warning in server logs for operators

### Requirement: Build approval for native dependencies
The project SHALL automatically approve `sharp` (and other required native modules) via pnpm configs so developers can install dependencies without manual interactive steps.

#### Scenario: Developer runs `pnpm install`
- **WHEN** a new developer installs dependencies
- **THEN** the install SHALL finish without prompting for `pnpm approve-builds` because required native packages are pre-approved in repo config
