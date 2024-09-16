#!/usr/bin/env bun

declare const command: "compile" | "watch" | "init";

declare const arg: `--cwd=${string}` | `--mode=${string}`;

const [_command, ...params] = process.argv.slice(2) as
  | [typeof command, ...(typeof arg)[]];

const context = {
  tag: _command as typeof command,
  command: _command,
  args: Object.fromEntries(
    params.map((arg) => arg.split("=")) as [typeof arg, string][]
  ),
};

const run = async (
  ctx: typeof context,
  handler: (ctx: typeof context) => Promise<void>
) => {
  return await handler(ctx);
};

switch (context.command) {
  case "compile": {
    await run(context, async ({ args }) => {
      const config =
        await Bun.$`bun --print 'const mod = await import("./bun.config.ts"); JSON.stringify(mod.default);'`
          .cwd(args["--cwd"] ?? process.cwd())
          .text();

      await Bun.$`nu -c '${[
        JSON.stringify(config),
        "|",
        "from json",
        "|",
        "to toml",
        "|",
        "save -f ./bunfig.toml",
      ].join(" ")}'`.text();
    });
  }
}
