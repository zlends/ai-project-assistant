import { FunctionName } from './enums';

export type FunctionCallArguments = {
  [FunctionName.readFolder]: {
    folderName: string;
  };
  [FunctionName.readFile]: {
    fileName: string;
  };
  [FunctionName.replaceFile]: {
    fileName: string;
    content: string;
  };
  [FunctionName.createFolder]: {
    folderName: string;
  };
  [FunctionName.createFile]: {
    fileName: string;
    content: string;
  };
  [FunctionName.getGitDiff]: void;
  [FunctionName.print]: {
    message: string;
  };
};
