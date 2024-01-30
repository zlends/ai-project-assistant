import { ProjectAssistant } from './projectAssistant';
// import { FileSystem } from './controllers';
// import { GitController } from './gitController';

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
// projectAssistant
//   .ask(
//     'Create me a commit message for current changes using Conventional Commits pattern. Note that adding rename/remove functionality is main feature of this commit along with some other changes.',
//   )
//   .then(console.log);

projectAssistant
  .ask(
    'Add tests for `createFile` method of fileSystem controller class (read it). After that run the test, if you made a mistake, fix it',
    // 'Add tests for `readFolder` method of fileSystem controller class.',
    // 'Write test for `createFolder` method of fileSystem controller class (check it). After that run the test.',
  )
  .then(console.log);

// const fileSystem = new FileSystem(projectPath);
// fileSystem.exec('yarn remove jest --silent').then(console.log).catch(console.error);

// const gitController = new GitController(projectPath);
// gitController.getGitDiff().then(console.log);
