import fs from 'fs';
import path from 'path';
import simpleGit from 'simple-git';

export class FileSystem {
  public rootDirectory: string;
  public openedDirectory: string;

  constructor(rootDirectory = './') {
    this.rootDirectory = path.resolve(rootDirectory);
    this.openedDirectory = path.resolve(rootDirectory);
  }

  public getRootDirectoryName() {
    return path.basename(this.rootDirectory);
  }

  // List of folders/files in the currently opened folder
  public getList() {
    return fs.readdirSync(this.openedDirectory);
  }

  // Open a folder. It returns array of folders/files in the opened folder
  public openFolder(folderName: string) {
    const newFolder = path.resolve(this.openedDirectory, folderName);

    // Check if the folder exists
    if (!fs.existsSync(newFolder)) {
      throw new Error(`Folder ${folderName} does not exist`);
    }

    this.openedDirectory = newFolder;

    return this.getList();
  }

  // Go back to the previous folder. It returns array of folders/files in the opened folder
  public goBack() {
    this.openedDirectory = path.resolve(this.openedDirectory, '..');

    return this.getList();
  }

  // Read file content. It returns file content as a string
  public readFile(fileName: string) {
    const filePath = path.resolve(this.openedDirectory, fileName);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`File ${fileName} does not exist`);
    }

    return fs.readFileSync(filePath, 'utf8');
  }

  public createFile(fileName: string, content: string) {
    const filePath = path.resolve(this.openedDirectory, fileName);

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      throw new Error(`File ${fileName} already exists`);
    }

    fs.writeFileSync(filePath, content);
  }

  public async getGitDiff() {
    return simpleGit().diff([':!*.lock']);
  }
}
