import { pathToFileURL } from 'node:url'

// Placeholder seed entry point. Implemented in Phase 11.
export async function seed(): Promise<void> {
  // No-op in Phase 01
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  seed()
    .then(() => {
      process.exit(0)
    })
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
