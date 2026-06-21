import { writeFile } from "node:fs/promises";
import { join } from "node:path";

const md = `---
title: H1
---

## H2
`;

const name = Math.random().toString(36).slice(-6) + Math.random().toString(36).slice(-6);
const path = join("posts", `${name}.md`);

await writeFile(path, md);
