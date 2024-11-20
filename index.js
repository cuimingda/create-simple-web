#!/usr/bin/env node

const { version } = require('./package.json');
console.log(`Running create-simple-web version ${version}`);

const fs = require('fs');
const path = require('path');

const templateDir = path.join(__dirname, './template');
const targetDir = path.join(process.cwd(), 'app');

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
  if (fs.existsSync(targetDir)) {
    console.error('Error: app directory already exists.');
    process.exit(1);
  }
  fs.mkdirSync(targetDir);
  console.log('Copying template files to app directory...');
  copyTemplateFiles(templateDir, targetDir);
  console.log('Template files copied successfully.');
}

init();