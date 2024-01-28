import simpleGit from 'simple-git';

export class GitController {
  public simpleGit;

  constructor(rootDirectory = './') {
    this.simpleGit = simpleGit(rootDirectory);
  }

  public async getGitDiff() {
    return simpleGit().diff(['--minimal', ':!*.lock']);
  }
}
