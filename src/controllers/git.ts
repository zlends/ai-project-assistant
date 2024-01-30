import simpleGit from 'simple-git';

export class Git {
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
