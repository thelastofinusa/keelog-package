import pc from "picocolors";
import prettyoutput from "prettyoutput";
import type { LogLevel, LogEntry, LogOptions } from "./types";

export const levelColors: Record<LogLevel, (s: string) => string> = {
  debug: pc.cyan,
  info: pc.blue,
  warn: pc.yellow,
  error: pc.red,
  log: (s) => s, // plain – no color
};

/**
 * Formats a log entry for TTY (colorful, with optional tree).
 */
export function formatTTY(
  entry: LogEntry,
  depth: number,
  opts: LogOptions,
): string {
  const color = levelColors[entry.level];

  const ctxStr = opts.ctx
    ? pc.dim(
        `[${entry.ctx.file}:${entry.ctx.line}${entry.ctx.func ? ` ${entry.ctx.func}` : ""}]`,
      )
    : null;

  const labelStr = opts.label ? color(entry.level.toUpperCase()) : "";

  const prefixParts = [ctxStr, labelStr].filter(Boolean);
  const prefix = prefixParts.length > 0 ? prefixParts.join(" ") + " " : "";

  const msgStr = color(entry.message ?? "");

  let meta = "";
  if (entry.data !== undefined) {
    meta = prettyoutput(entry.data, {
      maxDepth: depth === Infinity ? undefined : depth,
      colors: true,
      indentationLength: 4,
    });
  }

  if (meta) return `${prefix}${msgStr}\n${meta}`;
  return `${prefix}${msgStr}`;
}

/**
 * Formats a log entry as indented JSON.
 */
export function formatJSON(entry: LogEntry): string {
  return JSON.stringify(entry, null, 2);
}
