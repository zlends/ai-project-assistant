import fs from 'fs';
import path from 'path';
import { EChangeType } from '../projectAssistant/enums';
import { IChange } from '../projectAssistant/types';

export class FileSystem {
  public rootDirectory: string;

  constructor(rootDirectory = './') {
    this.rootDirectory = path.resolve(rootDirectory);
  }

  public getRootDirectoryName() {
    return path.basename(this.rootDirectory);
  }

  // Open a folder. It returns array of folders/files in the opened folder
  public readFolder(folderName: string = './') {
    const folderPath = path.resolve(this.rootDirectory, folderName);

    // Check if the folder exists
    if (!fs.existsSync(folderPath)) {
      throw new Error(`Folder ${folderName} does not exist`);
    }

    return fs.readdirSync(folderPath);
  }

  public createFolder(folderName: string) {
    const folderPath = path.resolve(this.rootDirectory, folderName);

    if (fs.existsSync(folderPath)) {
      throw new Error(`Folder ${folderName} already exists`);
    }

    fs.mkdirSync(folderPath);
  }

  // Read file content. It returns file content as a string, with number of rows at the beginning
  public readFile(fileName: string, isWithRowNumbers = false) {
    const filePath = path.resolve(this.rootDirectory, fileName);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`File ${fileName} does not exist`);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');

    if (!isWithRowNumbers) {
      return fileContent;
    }

    const fileContentLines = fileContent.split('\n');
    const fileContentWithRowNumbers = fileContentLines.map((line, index) => {
      return `${index + 1}| ${line}`;
    });

    return fileContentWithRowNumbers.join('\n');
  }

  public createFile(fileName: string, content: string) {
    const filePath = path.resolve(this.rootDirectory, fileName);

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      throw new Error(`File ${fileName} already exists`);
    }

    fs.writeFileSync(filePath, content);
  }

  // Update file content
  public editFile(fileName: string, changes: IChange[]) {
    const filePath = path.resolve(this.rootDirectory, fileName);

    if (!fs.existsSync(filePath)) {
      throw new Error(`File ${fileName} does not exist`);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const fileContentLines = fileContent.split('\n');

    changes.forEach((change) => {
      const startRow = change.startRow - 1;
      const endRow = change.endRow - 1;

      switch (change.type) {
        case EChangeType.add:
          fileContentLines.splice(startRow, 0, change.content!);
          break;
        case EChangeType.remove:
          fileContentLines.splice(startRow, 1 + endRow - startRow);
          break;
        case EChangeType.replace:
          fileContentLines.splice(startRow, 1 + endRow - startRow, change.content!);
          break;
        default:
          throw new Error(`Unknown change type: ${change.type}`);
      }
    });

    fs.writeFileSync(filePath, fileContentLines.join('\n'));
  }

  public rename(currentPath: string, newPath: string) {
    const fileOrFolderPath = path.resolve(this.rootDirectory, currentPath);
    const newFileOrFolderPath = path.resolve(this.rootDirectory, newPath);

    if (!fs.existsSync(fileOrFolderPath)) {
      throw new Error(`File or folder ${currentPath} does not exist`);
    }

    if (fs.existsSync(newFileOrFolderPath)) {
      throw new Error(`File or folder ${newPath} already exists`);
    }

    fs.renameSync(fileOrFolderPath, newFileOrFolderPath);
  }

  public remove(name: string) {
    const fileOrFolderPath = path.resolve(this.rootDirectory, name);

    if (!fs.existsSync(fileOrFolderPath)) {
      throw new Error(`File or folder ${name} does not exist`);
    }

    fs.rmSync(fileOrFolderPath, { recursive: true, force: true });
  }
}
