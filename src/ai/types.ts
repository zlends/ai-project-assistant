import { FunctionName } from './enums';

export type FunctionCallArguments = {
  [FunctionName.list]: {};
  [FunctionName.openFolder]: {
    folderName: string;
  };
  [FunctionName.goBack]: {};
  [FunctionName.readFile]: {
    fileName: string;
  };
  [FunctionName.createFile]: {
    fileName: string;
    content: string;
  };
  [FunctionName.print]: {
    message: string;
  };
};
