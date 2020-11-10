import meow from "meow";
import glob from "glob";
import fs from "fs/promises";
import { convert } from "./set-env-to-github_env";

export const cli = meow(
    `
    Usage
      $ set-env-to-github_env
 
    Examples
      $ set-env-to-github_env
      # migration ./github/workflows/*.{yml,yaml}
`,
    {
        flags: {},
        autoHelp: true,
        autoVersion: true
    }
);

export const run = async (
    _input = cli.input,
    _flags = cli.flags
): Promise<{ exitStatus: number; stdout: string | null; stderr: Error | null }> => {
    const workflows = glob.sync("./.github/workflows/*.{yaml,yml}");
    for (const workflowFilePath of workflows) {
        const content = await fs.readFile(workflowFilePath, "utf-8");
        const newContent = convert(content);
        if (content !== newContent) {
            await fs.writeFile(workflowFilePath, newContent, "utf-8");
            console.log(`Migrate ${workflowFilePath}`);
        }
    }
    return {
        stdout: "Migration is completed",
        stderr: null,
        exitStatus: 0
    };
};
