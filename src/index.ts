import { ProjectAssistant } from './ai';
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
projectAssistant
  .ask(
    'Create me a commit message for current changes using Conventional Commits pattern. Note that adding rename/remove functionality is main feature of this commit along with some other changes.',
  )
  .then(console.log);

// projectAssistant.ask('Remove `EChangeType` enum in src/ai/enums.ts').then(console.log);
// projectAssistant.ask('Remove `createFile` method from fileSystem controller.').then(console.log);
// projectAssistant
//   .ask(
//     'Add check for folder existence after `filePath` constant in `createFolder` method of src/controllers/fileSystem.ts',
//   )
//   .then(console.log);
// projectAssistant
//   .ask(
//     // 'Add missing check for folder existence in src/controllers/fileSystem.ts',
//     'Add check for folder existence in `createFolder` method of src/controllers/fileSystem.ts',
//     // 'Add check for folder existence in `createFolder` method of src/controllers/fileSystem.ts',
//     // 'Add console.debug before folderPath in `createFolder` method of src/controllers/fileSystem.ts',
//     // 'Add console.debug just after folderPath in `createFolder` method of src/controllers/fileSystem.ts',
//   )
//   .then(console.log);

// projectAssistant
//   .ask('Add console.debug of filePath in `createFile` method of src/controllers/fileSystem.ts')
//   .then(console.log);
// projectAssistant
//   .ask(
//     'Remove console.debug in `createFile` method of src/controllers/fileSystem.ts',
//   )
//   .then(console.log);

// const fileSystem = new FileSystem(projectPath);
// console.log(fileSystem.getRootDirectoryName());
// fileSystem.getGitDiff().then(console.log);

// fileSystem.createFolder('src/test');
// fileSystem.createFile('src/test/test.txt', 'test content');
// fileSystem.rename('src/test_2', 'src/ai');
// fileSystem.remove('src/test_2');

// const gitController = new GitController(projectPath);
// gitController.getGitDiff().then(console.log);
