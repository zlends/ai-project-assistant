import fs from 'fs';
import path from 'path';

// ToDo: move to controllers/fileSystem
export class FileSystemController {
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

  // Read file content. It returns file content as a string
  public readFile(fileName: string) {
    const filePath = path.resolve(this.rootDirectory, fileName);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`File ${fileName} does not exist`);
    }

    return fs.readFileSync(filePath, 'utf8');
  }

  // Update file content
  public updateFile(fileName: string, content: string) {
    const filePath = path.resolve(this.rootDirectory, fileName);

    if (!fs.existsSync(filePath)) {
      throw new Error(`File ${fileName} does not exist`);
    }

    fs.writeFileSync(filePath, content);
  }

  public createFolder(folderName: string) {
    const folderPath = path.resolve(this.rootDirectory, folderName);

    if (fs.existsSync(folderPath)) {
      throw new Error(`Folder ${folderName} already exists`);
    }

    fs.mkdirSync(folderPath);
  }

  public createFile(fileName: string, content: string) {
    const filePath = path.resolve(this.rootDirectory, fileName);

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      throw new Error(`File ${fileName} already exists`);
    }

    fs.writeFileSync(filePath, content);
  }
}
