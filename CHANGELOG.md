# Changelog

## [2.0.2](https://github.com/npm/create-oss/compare/v2.0.1...v2.0.2) (2024-04-21)

### Chores

* [`7e37da5`](https://github.com/npm/create-oss/commit/7e37da54b2b880d481dbd93afc15d5e2281c002e) [#70](https://github.com/npm/create-oss/pull/70) postinstall for dependabot template-oss PR (@lukekarrys)
* [`20a9917`](https://github.com/npm/create-oss/commit/20a9917a18518fc79e322a9a6323865e06d15dfe) [#70](https://github.com/npm/create-oss/pull/70) bump @npmcli/template-oss from 4.21.3 to 4.21.4 (@dependabot[bot])

## [2.0.1](https://github.com/npm/create-oss/compare/v2.0.0...v2.0.1) (2022-12-14)

### Dependencies

* [`009e661`](https://github.com/npm/create-oss/commit/009e6618166a9a8dfecb64353861cc93b047bc71) [#28](https://github.com/npm/create-oss/pull/28) bump read from 1.0.7 to 2.0.0 (#28)

## [2.0.0](https://github.com/npm/create-oss/compare/v1.1.0...v2.0.0) (2022-12-12)

### ⚠️ BREAKING CHANGES

* no longer copies files or runs commands, only sets up the package.json and informs the user to install the template package

### Features

* [`6d25781`](https://github.com/npm/create-oss/commit/6d2578112adcdb4c9dfc6a12b37e42eb5f7d17b8) refactor to do far less work (@nlf)

### Bug Fixes

* [`4b3a7f7`](https://github.com/npm/create-oss/commit/4b3a7f70a72ee5f54490c985715192fd16ca02d7) remove @npmcli/fs (@lukekarrys)

## 1.0.0

- first implementation. creates a package.json, copies files, and runs commands.
