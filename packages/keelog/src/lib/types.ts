// ------------------------------------------------------------------
// All shared types for keelog
// ------------------------------------------------------------------
export type LogLevel = "debug" | "info" | "warn" | "error" | "log";

export interface LogContext {
  file: string;
  func: string;
  line: number;
}

export interface LogEntry {
  level: LogLevel;
  message?: string;
  data?: unknown;
  ctx: LogContext;
}

export interface LogOptions {
  label: boolean;
  ctx: boolean;
}
