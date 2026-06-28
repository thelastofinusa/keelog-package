import { formatTTY, formatJSON } from "./formatter";
import type { LogEntry, LogOptions } from "./types";

const DEFAULT_DEPTH = Infinity;
const DEFAULT_OPTIONS: LogOptions = { label: true, ctx: true };

/**
 * Fluent log call that supports .depth() and .options().
 * Output is deferred by default (microtask), unless .depth() is called.
 */
export class LogCall {
  private entry: LogEntry;
  private timer: ReturnType<typeof setTimeout> | null;
  private active: boolean;
  private opts: LogOptions;

  constructor(entry: LogEntry, active: boolean) {
    this.entry = entry;
    this.active = active;
    this.opts = { ...DEFAULT_OPTIONS };
    if (active) {
      this.timer = setTimeout(() => this.output(DEFAULT_DEPTH), 0);
    } else {
      this.timer = null;
    }
  }

  private output(depth: number) {
    if (!this.active) return;
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    const isProduction = process.env.NODE_ENV === "production";
    const isTTY = process.stdout.isTTY && !isProduction;
    const formatted = isTTY
      ? formatTTY(this.entry, depth, this.opts)
      : formatJSON(this.entry);

    const stream =
      this.entry.level === "error" ? process.stderr : process.stdout;
    stream.write(formatted + "\n");
  }

  /** Override depth and output immediately. */
  depth(n: number) {
    if (this.active) {
      this.output(n);
    }
  }

  /** Customize display options. Returns `this` for chaining. */
  options(opts: Partial<LogOptions>) {
    this.opts = { ...this.opts, ...opts };
    return this;
  }
}
