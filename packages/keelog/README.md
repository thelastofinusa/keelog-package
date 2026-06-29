<p align="center" style="margin-top: 30px;">
  <picture>
    <source srcset="https://keelog.vercel.app/icon-dark.svg" media="(prefers-color-scheme: dark)" alt="Keelog logo" width="64" height="64" />
    <source srcset="https://keelog.vercel.app/icon-light.svg" media="(prefers-color-scheme: light)" alt="Keelog logo" width="64" height="64" />
    <img src="https://keelog.vercel.app/icon-dark.svg" alt="Keelog logo" width="64" height="64" />
  </picture>
</p>

<h1 align="center">keelog</h1>

<p align="center">
  A lightweight zero-config console logger with automatic context, <br /> clean tree output, and production-ready JSON.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/keelog"><img src="https://img.shields.io/npm/v/keelog.svg" alt="npm version" /></a>
  <a href="https://github.com/thelastofinusa/keelog-package/blob/main/LICENSE"><img src="https://img.shields.io/github/license/thelastofinusa/keelog" alt="License" /></a>
</p>

### Why keelog?

- **Automatic context** – file, function, and line number are captured without any manual setup.
- **Fluent API** – chain `.depth(n)` and `.options({ label, ctx })` on every log call.
- **Structured by default** – objects are pretty‑printed as Unicode trees with syntax colors.
- **Dual‑mode output** – beautiful TTY in development, formatted JSON in production (`NODE_ENV=production`).
- **Lightweight dependencies** – picocolors and prettyoutput (both tiny and fast).
- **Smart level filtering** via `LOG_LEVEL` env variable.
- **Simple default log** – call `log("message")` for a clean, prefix‑free output.

### Installation

```bash
npm install keelog
# or
bun add keelog
```

### Quick Start

```ts
import { log } from "keelog";

// Plain, clean output
log("Hello, world!");
log("User data", { id: 1, name: "Ada" });

// Leveled, contextual logs
log.info("Server started", { port: 3000 });
log.error("Database connection failed", { code: "ECONNREFUSED" });
```

**Output (development)**

```
Hello, world!
User data
id: 1
name: Ada

[/app.ts:5 main] INFO Server started
port: 3000

[/app.ts:6 main] ERROR Database connection failed
code: ECONNREFUSED
```

**Output (production)**

```json
{
  "level": "log",
  "message": "Hello, world!",
  "ctx": {
    "file": "/app.ts",
    "func": "main",
    "line": 2
  }
}
{
  "level": "log",
  "message": "User data",
  "data": {
    "id": 1,
    "name": "Ada"
  },
  "ctx": {
    "file": "/app.ts",
    "func": "main",
    "line": 3
  }
}
{
  "level": "info",
  "message": "Server started",
  "data": {
    "port": 3000
  },
  "ctx": {
    "file": "/app.ts",
    "func": "main",
    "line": 5
  }
}
{
  "level": "error",
  "message": "Database connection failed",
  "data": {
    "code": "ECONNREFUSED"
  },
  "ctx": {
    "file": "/app.ts",
    "func": "main",
    "line": 6
  }
}
```

### API

#### Simple Log

**`log(message?, data?)`**

A label‑less, context‑free log. Always prints regardless of `LOG_LEVEL`.  
Ideal for quick debugging or output that should never be filtered.

- `log("message")` → plain text
- `log("message", data)` → plain text + formatted object tree
- `log(data)` → just the object tree
- `log()` → empty line

Chaining works as usual:

```ts
log("Complex data", deepObj).depth(2);
log("Just data", obj).options({ ctx: true }); // you can optionally enable context
```

#### Leveled Logs

`log.debug()`, `log.info()`, `log.warn()`, `log.error()`

These respect the `LOG_LEVEL` environment variable and include the level label and caller context by default.

Each accepts the same argument patterns:

- `(message: string, data?: any)`
- `(data: any)` – message becomes `undefined`
- `()` – just the level and context

```ts
log.info("User fetched", { id: 42 });
log.warn({ diskUsage: "90%" });
log.error();
```

#### Fluent Modifiers

**`.depth(n: number)`**

Control how many levels of nested objects are displayed.  
Default: `Infinity` (unlimited).

```ts
log.info("Shallow view", deepObject).depth(2);
```

**`.options({ label?: boolean, ctx?: boolean })`**

Toggle visibility of the level label or the file/line context.  
Both default to `true` for leveled logs; `false` for `log()`.

```ts
log.info("Simple message").options({ ctx: false });
log.warn("No label").options({ label: false });
log.error("Bare").options({ label: false, ctx: false });
```

Modifiers can be chained:

```ts
log.info("Data", obj).depth(3).options({ ctx: false });
```

### Configuration

#### `LOG_LEVEL`

Set the minimum log level for leveled methods.  
Valid values: `debug`, `info`, `warn`, `error`.  
Default: `info`.

```bash
LOG_LEVEL=debug bun run app.ts
```

`log()` is **not** affected by `LOG_LEVEL` – it always prints.

#### `NODE_ENV`

When set to `production`, logs are output as formatted JSON suitable for log aggregators.

```bash
NODE_ENV=production node app.js
```

### Features in Detail

- **Context extraction** – uses the V8 stack trace API to automatically detect the caller’s file, function, and line number. No `child()` or manual naming required.
- **Pretty‑printing** – leverages `prettyoutput` for Unicode tree diagrams with syntax highlighting (strings yellow, numbers cyan, booleans magenta, etc.).
- **Deferred output** – logs without `.depth()` are flushed after a microtask, so they can still receive options later. Calling `.depth()` outputs immediately.
- **Error object handling** – errors are fully expanded with stack traces when passed as data.
- **Zero impact on suppressed logs** – chaining `.depth()` on a suppressed log level is safe and does nothing.

### Examples

#### Quick debugging

```ts
log("Reached this point");
log("Current state", { user, session });
```

#### Full control

```ts
const complexData = { users: [{ name: "Alice" }, { name: "Bob" }] };

log.info("User list", complexData).options({ ctx: false }).depth(1);
// Output: INFO  User list
// users: [Array]
```

#### Debug with context

```ts
function processTask(taskId: string) {
  log.debug("Processing", { taskId });
}
// [/src/tasks.ts:2 processTask] DEBUG  Processing
// taskId: abc-123
```

#### Simple output with chaining

```ts
log("Important data", { key: "value" }).depth(1);
// Output: Important data
// key: value
```
