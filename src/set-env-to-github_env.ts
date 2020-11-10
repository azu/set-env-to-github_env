export function convert(content: string) {
    const PATTERN = /echo ["']::set-env name=(?<name>\${?.+}?|.+)::(?<variableName>\${?.+}?|.+)["']/g;
    return content.replace(PATTERN, `echo "$<name>=$<variableName>" >> $GITHUB_ENV`);
}
