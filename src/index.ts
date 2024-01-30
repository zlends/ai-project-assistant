import { ProjectAssistant } from './ai';
// import { GitController } from './gitController';
// import { FileSystem } from './fileSystem';

const projectPath = './';
// const projectPath = '/Users/dtabaka/projects/forbytes/guesty/mobile-app-v3';

const projectAssistant = new ProjectAssistant(projectPath);

// gpt.ask('What can you tell about file constants.ts that present in ai folder?').then(console.log);
// gpt.ask('Open src folder').then(console.log);
// gpt.ask('What type of project is it?').then(console.log);
// gpt.ask('What do you think, should I add some another lines to the .gitignore file, based on the current project structure?').then(console.log);
// gpt.ask('Is my src folder structure ok for this kind of project?').then(console.log);
// gpt
//   .ask('Create readme file that describes your functionality based on ALL project files')
//   .then(console.log);
projectAssistant
  .ask('Create me a commit message for current changes using Conventional Commits pattern.')
  .then(console.log);

// gpt.ask('Return me changes that removing `createFile` method from fileSystem controller. It should be array of objects').then(console.log);

// const fileSystem = new FileSystem();
// console.log(fileSystem.getRootDirectoryName());
// fileSystem.getGitDiff().then(console.log);

// const gitController = new GitController(projectPath);
// gitController.getGitDiff().then(console.log);
