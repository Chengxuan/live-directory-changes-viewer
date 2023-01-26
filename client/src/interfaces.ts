export enum IFileType {
  file = "file",
  directory = "dir",
  root = "root",
}

export interface IFile {
  type: IFileType;
  name: string;
  path: string;
  children: IFile[];
  timestamp: string;
}
