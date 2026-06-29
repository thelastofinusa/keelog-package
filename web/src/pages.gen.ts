// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages } from 'waku/router'

// prettier-ignore
type Page =
  | { path: '/api/leveled-logs'; render: 'static' }
  | { path: '/api/modifiers'; render: 'static' }
  | { path: '/api/simple-log'; render: 'static' }
  | { path: '/changelog'; render: 'static' }
  | { path: '/configuration/environment-variables'; render: 'static' }
  | { path: '/features/context-extraction'; render: 'static' }
  | { path: '/features/deferred-output'; render: 'static' }
  | { path: '/features/pretty-printing'; render: 'static' }
  | { path: '/'; render: 'static' }
  | { path: '/introduction/getting-started'; render: 'static' }
  | { path: '/introduction/what-is-keelog'; render: 'static' }

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>
  }
  interface CreatePagesConfig {
    pages: Page
  }
}
