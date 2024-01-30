import { EChangeType, FunctionName } from './enums';

export type FunctionCallArguments = Record<FunctionName, void> & {
  [FunctionName.readFolder]: {
    folderName: string;
  };
  [FunctionName.createFolder]: {
    folderName: string;
  };

  [FunctionName.readFile]: {
    fileName: string;
    isWithRowNumbers?: boolean;
  };
  [FunctionName.createFile]: {
    fileName: string;
    content: string;
  };
  [FunctionName.editFile]: {
    fileName: string;
    changes: IChange[];
  };

  [FunctionName.rename]: {
    currentPath: string;
    newPath: string;
  };
  [FunctionName.remove]: {
    name: string;
  };

  [FunctionName.print]: {
    message: string;
  };
  [FunctionName.exec]: {
    command: string;
  };
};

export interface IChange {
  type: EChangeType;
  startRow: number; // rows are counted from 1
  endRow?: number; // rows are counted from 1
  content?: string; // is not required for remove type
}
