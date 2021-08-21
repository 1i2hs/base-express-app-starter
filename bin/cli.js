#!/usr/bin/env node

const { exec } = require("child_process");
const path = require("path");
const editJsonFile = require("edit-json-file");
const { createWriteStream } = require("fs");
const { promisify } = require("util");
const chalk = require("chalk");
const { ncp } = require("ncp");
const ora = require("ora");
const { writeFile } = require("gitignore");

const asyncExec = promisify(exec);
const writeGitignore = promisify(writeFile);

async function copyProjectFiles(destination) {
  return new Promise((resolve, reject) => {
    const source = path.join(__dirname, `../project_files`);

    ncp.limit = 16;
    ncp(source, destination, { clobber: true, stopOnErr: true }, (error) => {
      if (error) reject(error);
      resolve();
    });
  });
}

function updatePackageJson(destination) {
  const file = editJsonFile(`${destination}/package.json`, { autosave: true });

  file.set("name", path.basename(destination));
}

async function installNodeModules(destination) {
  await asyncExec("npm install", { cwd: destination });
}

async function createGitignore(destination) {
  const file = createWriteStream(path.join(destination, ".gitignore"), {
    flags: "a",
  });

  return writeGitignore({
    type: "Node",
    file: file,
  });
}

async function initializeGit(destination) {
  await asyncExec("git init", { cwd: destination });
}

async function createProject(projectName) {
  const destination = path.join(process.cwd(), projectName);

  try {
    console.log(`\nHi there👋, thank you for using base-express-app starter.`);
    console.log(
      `We are now initiating the project setup for ${chalk.inverse.cyan(
        projectName
      )}\n`
    );

    const spinner = ora();
    spinner.color = "cyan";
    spinner.start(
      `Copying project files to '${chalk.cyan(projectName)}' directory...`
    );
    await copyProjectFiles(destination);
    spinner.succeed();

    spinner.start(
      `Setting package.json name property as '${chalk.cyan(projectName)}'...`
    );
    updatePackageJson(destination);
    spinner.succeed();

    spinner.start(`Install dependencies...`);
    await installNodeModules(destination);
    spinner.succeed();

    spinner.start("Creating .gitignore file...");
    await createGitignore(destination);
    spinner.succeed();

    spinner.start("Initialize git...");
    await initializeGit(destination);
    spinner.succeed();

    console.log(`\nThat's it! We've got yourself prepared 😁`);
    console.log(`Good luck with your project 👍`);
    console.log(`Bye 👋`);
  } catch (error) {
    console.log(chalk.red(error.message));
    spinner.fail();
  }
}

createProject(process.argv[2]);
