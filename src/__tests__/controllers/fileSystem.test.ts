import { FileSystem } from '../../controllers';

const testFolderName = 'testFolder';

describe('FileSystem Controller', () => {
  describe('createFolder', () => {
    afterEach(() => {
      const fileSystem = new FileSystem();
      fileSystem.remove(testFolderName);
    });

    it('should create a new folder', async () => {
      const fileSystem = new FileSystem();
      expect(() => fileSystem.createFolder(testFolderName)).not.toThrow();
    });

    it('should throw an error if folder already exists', async () => {
      const fileSystem = new FileSystem();
      fileSystem.createFolder(testFolderName);
      expect(() => fileSystem.createFolder(testFolderName)).toThrow(
        `Folder ${testFolderName} already exists`,
      );
    });
  });

  describe('readFolder', () => {
    beforeEach(() => {
      const fileSystem = new FileSystem();
      fileSystem.createFolder(testFolderName);
    });

    afterEach(() => {
      const fileSystem = new FileSystem();
      fileSystem.remove(testFolderName);
    });

    it('should list contents of a folder', async () => {
      const fileSystem = new FileSystem();
      const contents = fileSystem.readFolder(testFolderName);
      expect(contents).toEqual(expect.arrayContaining([]));
    });

    it('should throw an error if folder does not exist', async () => {
      const fileSystem = new FileSystem();
      expect(() => fileSystem.readFolder('nonExistentFolder')).toThrow(
        'Folder nonExistentFolder does not exist',
      );
    });
  });

  describe('createFile', () => {
    const testFileName = 'testFile.txt';
    const fileContent = 'Hello, world!';

    afterEach(() => {
      const fileSystem = new FileSystem();
      fileSystem.remove(testFileName);
    });

    it('should create a new file with content', async () => {
      const fileSystem = new FileSystem();
      expect(() => fileSystem.createFile(testFileName, fileContent)).not.toThrow();
    });

    it('should throw an error if file already exists', async () => {
      const fileSystem = new FileSystem();
      fileSystem.createFile(testFileName, fileContent);
      expect(() => fileSystem.createFile(testFileName, fileContent)).toThrow(
        `File ${testFileName} already exists`,
      );
    });
  });
});
