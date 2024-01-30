import { EChangeType, FunctionName } from './enums';

export type FunctionCallArguments = Record<FunctionName, void> & {
  [FunctionName.readFolder]: {
    folderName: string;
  };
  [FunctionName.readFile]: {
    fileName: string;
    isWithRowNumbers?: boolean;
  };
  [FunctionName.replaceFile]: {
    fileName: string;
    content: string;
  };
  [FunctionName.updateFile]: {
    fileName: string;
    changes: IChange[];
  };
  [FunctionName.createFolder]: {
    folderName: string;
  };
  [FunctionName.createFile]: {
    fileName: string;
    content: string;
  };
  [FunctionName.print]: {
    message: string;
  };
};

export interface IChange {
  type: EChangeType;
  startRow: number; // rows are counted from 1
  endRow: number; // rows are counted from 1
  content?: string; // is not required for remove type
}
