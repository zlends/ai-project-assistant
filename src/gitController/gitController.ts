import simpleGit from 'simple-git';

// ToDo: move to controllers/git
export class GitController {
  public simpleGit;

  constructor(rootDirectory = './') {
    this.simpleGit = simpleGit(rootDirectory);
  }

  public async getGitDiff() {
    const stagedChanges = await this.simpleGit.diff(['--staged', '--minimal', ':!*.lock']);
    const unStagedChanges = await this.simpleGit.diff(['--minimal', ':!*.lock']);

    return `${stagedChanges}\n\n${unStagedChanges}`;
  }
}
