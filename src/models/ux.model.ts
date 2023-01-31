import { TaskModel } from "./task.model";

export interface UxModel {
  Toast?: ToastModel;
  Loading?: boolean;
}
export interface ToastModel {
  Message: string;
  Title: string;
  Classes: string[];
}

export interface ITab {
  Id: string;
  Name: string;
  Classes: string[];
}
export interface ITaskGroupedByDateModel {
  Id: string;
  Name: string;
  Count: number;
  Date: string;
  Active: boolean;
  Progress: string;
  Classes: string[];
  Tasks: TaskModel[];
  AllTasks: TaskModel[];
}
export interface ITaskGroupedByStatusModel {
  Id: string;
  Name: string;
  Count: number;
  Status: string;
  Active: boolean;
  Progress: string;
  Classes: string[];
  Tasks: TaskModel[];
  AllTasks: TaskModel[];
}
