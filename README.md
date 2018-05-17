# Autohook

Autohook allows you to easily subscribe your npm scripts to git hooks

## Usage

The simplest way to use autohook is to create a npm script that will generate git hook for you.

### Install

```
npm i autohook --save-dev
```

### Create a hooking script

Somewhere in `package.json`
```
{
  "scripts": {
    "check": "eslint ./src stylelint ./src && npm test",
    "hook": "autohook check pre-push"
  }
}
```

This will create a `pre-push` git hook for you that runs `check` npm script.

### Install a hook

Thereafter one may run `hook` script manually by executing
```
npm run hook
```

Or you may prefer to automate this by adding your `hook` script to one of npm's [lifecycle scripts](https://docs.npmjs.com/misc/scripts)
like `prepare`. This will automatically hook anyone who runs local `npm install`.
