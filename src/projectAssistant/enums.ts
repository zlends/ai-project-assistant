export enum FunctionName {
  readFolder = 'readFolder',
  createFolder = 'createFolder',

  readFile = 'readFile',
  createFile = 'createFile',
  editFile = 'editFile',

  rename = 'rename',
  remove = 'remove',

  exec = 'exec',

  getGitDiff = 'getGitDiff',
  print = 'print',
}

export enum EChangeType {
  add = 'add',
  remove = 'remove',
  replace = 'replace',
}
