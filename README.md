<a href="https://codeclimate.com/github/looker-open-source/components/test_coverage"><img src="https://api.codeclimate.com/v1/badges/0e8fc40b90a494f80cc1/test_coverage" /></a>
![Test Suite](https://github.com/looker-open-source/components/workflows/Test/badge.svg?branch=main)

This repository hosts the Looker UI Components library and the platform needed to generate our style guide. If you're looking for documentation for using Looker UI Components within your own application, you can view the documentation online on our web site.

## Bugs & Feature Requests

Please file issues on [Github Issues](https://github.com/looker-open-source/components/issues)

# Contents

1. [Setting up the Project](#setting-up)
1. [Looker UI Components Development](#@looker/components-development)
1. [Yarn Link](#yarn-link)

# Setting up

## Yarn

This is a monorepo utilizing [Lerna](https://lerna.js.org) and [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/). It is composed of a collection of packages.

If you don't have [`yarn`](https://yarnpkg.com/en/) installed, have a look at https://yarnpkg.com/en/docs/install and choose the appropriate installation for your environment.

We recommend using [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm#installation-and-update) to manage multiple versions of Node. Once installed you can simply type `nvm use` in side the repository to get the appropriate version of Node installed. Then you'll need to install Yarn globally via NPM - `npm install --global yarn`

## Clone Repository & Setup

1. `git clone git@github.com:looker-open-source/components.git`
1. `yarn install`
1. ✅

## Packages

- [@looker/components](./packages/components/README.md) — The shared component library which powers various Looker applications
- [@looker/design-tokens](./packagen/design-tokens/README.md) — Default design values as well as our connection to styled-system
- [@looker/icons](./packages/icons/README.md) — SVG icon library, normally consumed by the `<Icon />` component in our shared component library
- [@looker/components-test-utils](./packages/test-utils/README.md) — Useful functions for mocking values and testing components.

## Applications

- [playground](./apps/playground/README.md) — A convenient React environment used for developing Looker UI Components
- [storybook](./apps/storybook/README.md) — Storybook is a tool for developing UI components in isolation
- [www](./www/README.md) — The Gatsby site which powers our living style guide

### Common Project Commands

- **yarn playground** starts a bare-bones React app used for developing components
- **yarn gatsby** starts the Gatsby server (powers our documentation site)
- **yarn storybook** starts Storybook in "Docs" mode (includes stories from all packages)
- **yarn build** runs build across all packages. This calls several subtasks
  - **yarn build** runs build:\* in parallel (see below)
  - **yarn build:es** use lerna to do babel build on all packages in proper order
  - **yarn build:ts** use lerna to typescript declarations in proper order
- **yarn lint** runs all lint checks in parallel
  - **yarn lint:css** run stylelint
  - **yarn lint:es** run eslint
  - **yarn lint:ts** run tsc
- **yarn fix** fix any ESLint errors and warnings than can be automatically fixed
- **yarn clean** remove all build artifacts
- **yarn test** runs Jest across all packages

### Workspace Commands

If you're working with a specific workspace you can run commands within that specific workspace (package) by pre-pending the yarn command like so:

`yarn workspace [workspace-package-name] [command]`

E.g.: `yarn workspace playground develop`

# Publishing Components

See [RELEASING](./RELEASING.md)

# Tooling

## Automate code formatting and correctness whenever possible

This project takes the perspective that, as much as possible, code style (code formatting, alignment, interchangeable idioms, etc) should be dictated by automated tooling. This means tooling that can statically analyze code and actually rewrite it, either for the purpose of consistent formatting or correctness. This approach not only saves time by eliminating arguments about preferred code styles, it also reduces arbitrary diff noise for code reviewers, and decreases an engineer's overhead needed to keep code consistent with a code style or linter.

## Use lint rules to eliminate dangerous anti-patterns

When automated tooling cannot reformat code without causing logical errors, this project employs linter rules to ensure it produces consistent, correct code. An example of one of these rules is the TSLint `no-namespace` rule. Namespacing, while a valid feature in Typescript, is the byproduct of Typescript evolving during a time when ES6 style modules did not exist (nor did the tooling around them). [Typescript itself calls out ES6 modules as the best approach to code organization moving forward](https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html#using-modules):

> Starting with ECMAScript 2015, modules are native part of the language, and should be supported by all compliant engine implementations. Thus, for new projects modules would be the recommended code organization mechanism.

To ensure Typescript namespaces are never introduced into this project (because we use ES6 modules), our linter configuration disallows any use of them in code.

### Automated Tooling

The monorepo leverages with a few code tools baked into the component authoring workflow:

- [Prettier](https://prettier.io/) simply reformats code. It has few options, intentionally, to eliminate discussion about how to configure those options.
- [ESLint](https://eslint.org/) is the standard Javascript & Typescript linting tool. It comes with a `--fix` flag which can fix many of the errors it finds.
- [Stylelint](https://stylelint.io/) lints the CSS code in the app.

### Using the tooling

The majority of the time, using these tools should be transparent as they are hooked into a fast pre-commit hook that is enabled for all developers. If one of the lint or prettier steps fail during the pre-commit hook you'll have to fix the error before committing.

You can also configure some editors to apply their formatting on save, this is discussed in a different section below. Sometimes, however you might want to run each command manually. Below is a list of the available commands:

`yarn <command>`

- **lint** Runs all of the linters in order
- **lint:es** Lint all of the ES6 & Typescript files, including tests
- **lint:css** Lint all of the CSS, including inlined CSS
- **lint:ts** Run Typescript compiler to verify type-safety

## IDE Support & Configuration

Code in this project is written in Typescript and the core team uses VSCode as our IDE of choice. Please feel free to add your favorite editor's mechanism of support if you wish.

### VS Code

A [settings.json](https://github.com/looker-open-source/components/blob/main/.vscode/settings.json) file is checked into the repository, which contains some required settings for VS Code.

Additionally a simplistic [launch.json](https://github.com/looker-open-source/components/blob/main/.vscode/launch.json) file is also included which should allow developers to quickly run and debug tests locally, through the Jest test runner. [This file is based off of the recommendations here](https://github.com/Microsoft/vscode-recipes/tree/main/debugging-jest-tests).

#### Running Tests

1.  Go to the "Debug" panel in VS Code
2.  In the top left choose either "Jest All" or "Jest Current File"
3.  Click the Play button

#### Recommended Plugins

- [Styled Components](https://github.com/styled-components/vscode-styled-components) enables sytax highlighting and intellisense for inline CSS.
- [ESLint](https://github.com/Microsoft/vscode-eslint) enables inline linting and fixing of code on save. If you have the older vscode-tslint plugin installed, uninstall it first.

#### Useful Plugins

- [Spell Check](https://github.com/Jason-Rev/vscode-spell-checker) enables spell checking in code
- [Colorize](https://github.com/kamikillerto/vscode-colorize) displays known colors (string values, hex, rgb, etc) as their actual color value
- [Prettier](https://github.com/prettier/prettier-vscode) enables Prettier code formatting on save
- [Rewrap](https://github.com/stkb/Rewrap) wraps comments at the 80 character column mark automatically
- [Sort Lines](https://github.com/Tyriar/vscode-sort-lines) quickly resort lines of code
