import gpt from './ai/ai';
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
//   .ask(
//     'Please, read ai.ts and fileSystemController.ts and suggest how to add `updateFile` method? What OpenAI tool should I add, what parameters? The goal is that you need to you tool that will help you to update file content, remove some lines, add some lines, change some lines.',
//   )
//   .then(console.log);
gpt
  .ask('Create me a commit message for current changes using Conventional Commits pattern')
  .then(console.log);
// gpt
//   .ask(
//     'Create git controller, take `fileSystem` as template for it. Grab all git related methods from `fileSystem`',
//   )
//   .then(console.log);

// const fileSystem = new FileSystem();
// console.log(fileSystem.getRootDirectoryName());
// fileSystem.getGitDiff().then(console.log);
