# @bjs/config

BunJS package for generate, compile and define `bunfig.toml` files.

## Install

```bash
bunx jsr add @bjs/config
```

## Usage

```ts
import { defineConfig } from "@bjs/config";

// declare your definitions (optional)
// next release will enable type-safety for definitions with code-gen
declare const definitions: {
  "process.env.NODE_ENV": `${string}`;
  "process.env.MODE": `${string}`;
};

export default defineConfig({
  jsx: "react-jsx",
  define: define<typeof definitions>({
    "process.env.NODE_ENV": `'development'`,
    "process.env.MODE": `'development'`,
  }),
});
```

### Compile

```bash
bun bjs-config compile --cwd=<path>
```

## Steps

- create a `bun.config.ts` file and define your config
- compile the config file to bunfig.toml using `bjs-config` cli
- run your bun app
