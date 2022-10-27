# set-env-to-github_env [![Actions Status: test](https://github.com/azu/set-env-to-github_env/workflows/test/badge.svg)](https://github.com/azu/set-env-to-github_env/actions?query=workflow%3A"test")

A migration tools convert `::set-env` to $GITHUB_ENV on GitHub Actions.

## Supported Migration

- [x] `echo "::set-env name={name}::{value}"` → `echo "{name}={value}" >> $GITHUB_ENV`
- [x] `echo "::set-output name={name}::{value}"` → `echo "{name}={value}" >> $GITHUB_OUTPUT`
- [x] `echo "::set-state name={name}::{value}"` → `echo "{name}={value}" >> $GITHUB_STATE`

For more details, see GitHub blog and documentation.

- [GitHub Actions: Deprecating set-env and add-path commands - GitHub Changelog](https://github.blog/changelog/2020-10-01-github-actions-deprecating-set-env-and-add-path-commands/)
- [GitHub Actions: Deprecating save-state and set-output commands | GitHub Changelog](https://github.blog/changelog/2022-10-11-github-actions-deprecating-save-state-and-set-output-commands/)
- [Workflow commands for GitHub Actions - GitHub Docs](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-commands-for-github-actions#environment-files)

TODO: This tool does not support `::add-path` migration yet.
If you are interesting in this, please see https://github.com/azu/set-env-to-github_env/issues/2

## Install

Install with [npm](https://www.npmjs.com/):

    npm install set-env-to-github_env
    
or Just use `npx` command in project root directory.

    npx set-env-to-github_env

**Require:** Node.js 14+

## Usage

Run command in project root directory.

    Usage
      $ set-env-to-github_env
 
    Examples
      $ set-env-to-github_env
      # migration ./github/workflows/*.{yml,yaml}

## Example

Before

```yaml
name: test
on: [push, pull_request]
jobs:
  test:
    name: "Test"
    runs-on: ubuntu-18.04
    steps:
      - name: set env for prod
        if: github.ref == 'refs/heads/main'
        run: |
          echo "::set-env name=FILE_ID::${FILE_ID}"
          echo "::set-env name=BUCKET_NAME::${BUCKET_NAME}"
        env:
          FILE_ID: 123456789012
          BUCKET_NAME: deploy-prod
```

After

```yaml
name: test
on: [push, pull_request]
jobs:
  test:
    name: "Test"
    runs-on: ubuntu-18.04
    steps:
      - name: set env for prod
        if: github.ref == 'refs/heads/main'
        run: |
          echo "FILE_ID=${FILE_ID}" >> $GITHUB_ENV
          echo "BUCKET_NAME=${BUCKET_NAME}" >> $GITHUB_ENV
        env:
          FILE_ID: 123456789012
          BUCKET_NAME: deploy-prod
```

## Changelog

See [Releases page](https://github.com/azu/set-env-to-github_env/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/set-env-to-github_env/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- azu: [GitHub](https://github.com/azu), [Twitter](https://twitter.com/azu_re)

## License

MIT © azu
