#!/usr/bin/env node

const { version } = require('./package.json');
console.log(`Running create-simple-web version ${version}`);

const fs = require('fs');
const path = require('path');

const templateDir = path.join(__dirname, './template');
const targetDir = process.cwd();

function isDirectoryEmpty(directory) {
  return fs.readdirSync(directory).length === 0;
}

function copyTemplateFiles(templateDir, targetDir) {
  fs.readdirSync(templateDir).forEach(file => {
    const srcFile = path.join(templateDir, file);
    const destFile = path.join(targetDir, file);

    if (fs.lstatSync(srcFile).isDirectory()) {
      fs.mkdirSync(destFile);
      copyTemplateFiles(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  });
}

function init() {
  if (!isDirectoryEmpty(targetDir)) {
    console.error('Error: target directory is not empty.');
    process.exit(1);
  }
  console.log('Copying template files to target directory...');
  copyTemplateFiles(templateDir, targetDir);
  console.log('Template files copied successfully.');
}

init();