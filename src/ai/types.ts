import { FunctionName } from './enums';

export type FunctionCallArguments = {
  [FunctionName.list]: void;
  [FunctionName.openFolder]: {
    folderName: string;
  };
  [FunctionName.goBack]: void;
  [FunctionName.readFile]: {
    fileName: string;
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
