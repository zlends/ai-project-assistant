import gpt from './ai/gpt';
// import { FileSystem } from './fileSystem';

// gpt.ask('What can you tell about file constants.ts that present in ai folder?').then(console.log);
// gpt.ask('Open src folder').then(console.log);
// gpt.ask('What type of project is it?').then(console.log);
// gpt.ask('What do you think, should I add some another lines to the .gitignore file, based on the current project structure?').then(console.log);
// gpt.ask('Is my src folder structure ok for this kind of project?').then(console.log);
// gpt
//   .ask('Create readme file that describes your functionality based on ALL project files')
//   .then(console.log);
// gpt
//   .ask('Create file src/database/test.txt with content "test"')
//   .then(console.log);
gpt
  .ask('Create me a commit message for current changes using Conventional Commits pattern')
  .then(console.log);

// const fileSystem = new FileSystem();
// console.log(fileSystem.getRootDirectoryName());
// fileSystem.getGitDiff().then(console.log);
