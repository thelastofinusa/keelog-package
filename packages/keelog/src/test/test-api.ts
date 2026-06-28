import { log } from "../index";

// Plain simple log – no level, no context
log("Hello, world!");
log("User data", { id: 1, name: "Ada" }).depth(2);

// Leveled logs (context, label, colour)
log.info("Server started", { port: 3000 });
log.warn("Disk space low");
log.error("Fatal error", { code: 500 }).options({ ctx: false });

// // test.ts – Comprehensive feature demo for keelog
// // Run with: bun run test.ts
// // Optional: LOG_LEVEL=debug bun run test.ts

// import { log } from "./src/index";

// // ------------------------------------------------------------------
// // 1. Basic logs with message + data
// // ------------------------------------------------------------------
// log.info("Server starting", { port: 3000, host: "localhost" });

// // ------------------------------------------------------------------
// // 2. Log without message (data only)
// // ------------------------------------------------------------------
// log.warn({ diskUsage: "92%", threshold: "90%" });

// // ------------------------------------------------------------------
// // 3. Log without data (message only)
// // ------------------------------------------------------------------
// log.debug("This won't appear unless LOG_LEVEL=debug");

// // ------------------------------------------------------------------
// // 4. Hide context via .options()
// // ------------------------------------------------------------------
// log.info("No context shown", { user: "alice" }).options({ ctx: false });

// // ------------------------------------------------------------------
// // 5. Hide level label via .options()
// // ------------------------------------------------------------------
// log.error("No level label", { fatal: true }).options({ label: false });

// // ------------------------------------------------------------------
// // 6. Hide both label and context
// // ------------------------------------------------------------------
// log.warn("Bare message only").options({ label: false, ctx: false });

// // ------------------------------------------------------------------
// // 7. Control depth with .depth(n)
// // ------------------------------------------------------------------
// const deepData = { level1: { level2: { level3: { secret: 42 } } } };
// log.info("Deep object (depth=2)", deepData).depth(2);
// log.info("Deep object (depth=Infinity)", deepData); // unlimited

// // ------------------------------------------------------------------
// // 8. Error logging with Error object
// // ------------------------------------------------------------------
// try {
//   throw new Error("Something went wrong");
// } catch (err) {
//   log.error("Caught an error", { error: err });
// }

// // ------------------------------------------------------------------
// // 9. API call simulation (from previous test)
// // ------------------------------------------------------------------
// interface Post {
//   userId: number;
//   id: number;
//   title: string;
//   body: string;
// }

// async function fetchPost(id: number): Promise<Post> {
//   log.warn("Calling the fetchPost() function");
//   log.info("Fetching post", { id });

//   const response = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${id}`,
//   );

//   if (!response.ok) {
//     log.error("Fetch failed", { status: response.status });
//     throw new Error(`HTTP ${response.status}`);
//   }

//   const post = (await response.json()) as Post;
//   log.info("Post retrieved", { post }).depth(2);
//   return post;
// }

// async function main() {
//   try {
//     const post = await fetchPost(1);
//     log.info("Processing post", { title: post.title }).options({ ctx: false });

//     // Force a 404
//     await fetchPost(99999);
//   } catch (err) {
//     log.error(err instanceof Error ? err.message : String(err));
//   }
// }

// // Run the async part
// main();

// // ------------------------------------------------------------------
// // 10. Context across different call sites
// // ------------------------------------------------------------------
// function helperFunction() {
//   log.warn("Inside helperFunction");
// }

// class MyService {
//   doWork() {
//     log.info("Doing work from a class method");
//     helperFunction();
//   }
// }

// const service = new MyService();
// service.doWork();
