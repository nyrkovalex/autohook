#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const npmScriptName = process.argv[2];
const gitHookName = process.argv[3];

if (!npmScriptName || !gitHookName) {
    console.log('Usage: autohook <npm-script-name> <git-hook-name>');
    process.exit(1);
}

const gitHooksRoot = path.join(process.cwd(), '.git', 'hooks');

if (!fs.existsSync(gitHooksRoot)) {
    console.log(`${gitHooksRoot} does not exist. Looks like you're running this outside git repository.`);
}

const hookPath = path.join(gitHooksRoot, gitHookName);
const hookTemplate =
`#!/bin/sh

exec 1>&2
npm run ${npmScriptName}
`;

fs.writeFileSync(hookPath, hookTemplate);
fs.chmodSync(
    hookPath,
    fs.constants.S_IRWXU | fs.constants.S_IRWXG | fs.constants.S_IROTH | fs.constants.S_IXOTH,
);

console.log(`Successfully linked '${gitHookName}' git hook to '${npmScriptName}' npm script`);

