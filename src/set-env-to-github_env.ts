export function convert(content: string) {
    const ENV_PATTERN = [
        /echo ["']::set-env name=(?<name>\${?.+}?|.+)::(?<variableName>\${?.+}?|.+)["']/g,
        `echo "$<name>=$<variableName>" >> $GITHUB_ENV`
    ] as const;
    const SAVE_PATTERN = [
        /echo ["']::set-state name=(?<name>\${?.+}?|.+)::(?<variableName>\${?.+}?|.+)["']/g,
        `echo "$<name>=$<variableName>" >> $GITHUB_STATE`
    ] as const;
    const OUTPUT_PATTERN = [
        /echo ["']::set-output name=(?<name>\${?.+}?|.+)::(?<variableName>\${?.+}?|.+)["']/g,
        `echo "$<name>=$<variableName>" >> $GITHUB_OUTPUT`
    ] as const;
    return [ENV_PATTERN, SAVE_PATTERN, OUTPUT_PATTERN].reduce((output, [pattern, replacement]) => {
        return output.replace(pattern, replacement);
    }, content);
}
