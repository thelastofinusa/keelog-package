import { fileURLToPath } from "node:url";
import type { LogContext } from "./types";

// Absolute path of this file, used to skip internal stack frames
const loggerFilePath = fileURLToPath(import.meta.url);

/**
 * Extracts caller context (file, function, line) by walking the V8 stack trace.
 * Skips any frame that originates from the logger's own source file.
 */
export function extractContext(): LogContext {
  const original = Error.prepareStackTrace;
  Error.prepareStackTrace = (_, stack) => stack;
  const err = new Error();
  const stack = err.stack as unknown as NodeJS.CallSite[];
  Error.prepareStackTrace = original;

  for (const frame of stack) {
    const fileName = frame.getFileName();
    if (fileName && fileName !== loggerFilePath) {
      return {
        file: fileName.replace(process.cwd(), ""),
        func: frame.getFunctionName() ?? "anonymous",
        line: frame.getLineNumber() ?? 0,
      };
    }
  }

  return { file: "unknown", func: "anonymous", line: 0 };
}
