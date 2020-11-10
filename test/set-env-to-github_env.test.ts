import * as fs from "fs";
import * as path from "path";
import * as assert from "assert";
// transform function
import { convert } from "../src/set-env-to-github_env";

const fixturesDir = path.join(__dirname, "snapshots");
describe("Snapshot testing", () => {
    fs.readdirSync(fixturesDir).map((caseName) => {
        const normalizedTestName = caseName.replace(/-/g, " ");
        it(`Test ${normalizedTestName}`, async function () {
            const fixtureDir = path.join(fixturesDir, caseName);
            const actualFilePath = path.join(fixtureDir, "input.yml");
            const actualContent = fs.readFileSync(actualFilePath, "utf-8");
            const actual = convert(actualContent);
            const expectedFilePath = path.join(fixtureDir, "output.yml");
            // Usage: update snapshots
            // UPDATE_SNAPSHOT=1 npm test
            if (!fs.existsSync(expectedFilePath) || process.env.UPDATE_SNAPSHOT) {
                fs.writeFileSync(expectedFilePath, actual);
                this.skip(); // skip when updating snapshots
                return;
            }
            // compare input and output
            const expectedContent = fs.readFileSync(expectedFilePath, "utf-8");
            assert.deepStrictEqual(actual, expectedContent);
        });
    });
});
