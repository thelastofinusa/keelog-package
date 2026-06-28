import { LogCall } from "./log-call";
import { extractContext } from "./context";
import type { LogLevel, LogEntry } from "./types";

type LeveledLogLevel = Exclude<LogLevel, "log">;

const levelOrder: Record<LeveledLogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

/**
 * Internal logger class that handles leveled logging and plain logging.
 */
class Logger {
  private currentLevel: LeveledLogLevel;

  constructor() {
    const envLevel = process.env.LOG_LEVEL?.toLowerCase() as
      | LeveledLogLevel
      | undefined;
    this.currentLevel =
      envLevel && levelOrder[envLevel] !== undefined ? envLevel : "info";
  }

  private shouldLog(level: LeveledLogLevel): boolean {
    return levelOrder[level] >= levelOrder[this.currentLevel];
  }

  /** Leveled log methods (debug, info, warn, error). */
  leveledLog(
    level: LeveledLogLevel,
    ...args: [message?: string, data?: unknown] | [data: unknown]
  ) {
    if (!this.shouldLog(level)) {
      return new LogCall(
        { level, message: "", ctx: { file: "", func: "", line: 0 } },
        false,
      );
    }

    let message: string | undefined;
    let data: unknown;

    if (typeof args[0] === "string") {
      message = args[0];
      data = args[1];
    } else {
      message = undefined;
      data = args[0];
    }

    const ctx = extractContext();
    const entry: LogEntry = { level, message, data, ctx };
    return new LogCall(entry, true);
  }

  /**
   * Simple, label‑less, context‑free log (always prints).
   */
  plainLog(...args: [message?: string, data?: unknown] | [data: unknown]) {
    let message: string | undefined;
    let data: unknown;

    if (typeof args[0] === "string") {
      message = args[0];
      data = args[1];
    } else {
      message = undefined;
      data = args[0];
    }

    const ctx = extractContext();
    const entry: LogEntry = { level: "log", message, data, ctx };
    const call = new LogCall(entry, true);
    // Default: no label, no context
    call.options({ label: false, ctx: false });
    return call;
  }
}

// ------------------------------------------------------------------
// Exported `log` function with attached leveled methods
// ------------------------------------------------------------------
const logger = new Logger();

/**
 * Callable function for plain logging (no prefix, no level).
 */
const log = (...args: [message?: string, data?: unknown] | [data: unknown]) =>
  logger.plainLog(...args);

log.debug = (...args: [message?: string, data?: unknown] | [data: unknown]) =>
  logger.leveledLog("debug", ...args);
log.info = (...args: [message?: string, data?: unknown] | [data: unknown]) =>
  logger.leveledLog("info", ...args);
log.warn = (...args: [message?: string, data?: unknown] | [data: unknown]) =>
  logger.leveledLog("warn", ...args);
log.error = (...args: [message?: string, data?: unknown] | [data: unknown]) =>
  logger.leveledLog("error", ...args);

export { log };
