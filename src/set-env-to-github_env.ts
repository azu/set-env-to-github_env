export function convert(content: string) {
    const ENV_PATTERN = [
        /echo\s+(["'])?::set-env name=(?<name>\${?.+}?|.+)::(?<variableName>\${?.+}?|.+)\1/g,
        `echo "$<name>=$<variableName>" >> "$GITHUB_ENV"`
    ] as const;
    const SAVE_PATTERN = [
        /echo\s+(["'])?::set-state name=(?<name>\${?.+}?|.+)::(?<variableName>\${?.+}?|.+)\1/g,
        `echo "$<name>=$<variableName>" >> "$GITHUB_STATE"`
    ] as const;
    const OUTPUT_PATTERN = [
        /echo\s+(["'])?::set-output name=(?<name>\${?.+}?|.+)::(?<variableName>\${?.+}?|.+)\1/g,
        `echo "$<name>=$<variableName>" >> "$GITHUB_OUTPUT"`
    ] as const;
    return [ENV_PATTERN, SAVE_PATTERN, OUTPUT_PATTERN].reduce((output, [pattern, replacement]) => {
        return output.replace(pattern, replacement);
    }, content);
}
