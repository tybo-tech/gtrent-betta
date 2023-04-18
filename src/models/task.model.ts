import { Customer } from './customer.model';
import { Machine } from './machine.model';
import { OrderModel } from './order.model';
import { LabourModel, ConsumableModel, PartModel } from './shared.model';
import { User } from './user.model';

export interface TaskModel {
  TaskId: number;
  Name: string;
  Description: string;
  TaskType: string;
  DueDate: string;
  AssignedTo: string;
  DueTime: string;
  AssignedTo2: string;
  CreatedBy: string;
  CustomerId: string;
  ComprossorId: string;
  Status: string;
  TimeLines: TimeLineModel[];
  Comments: CommentModel[];
  OverallTimeSpent: string;
  Loaction: string[];
  CreateDate: string;
  LastUpdateDate: string;
  LastUpdatedBy: string;
  StarDateTime: string;
  FinishDateTime: string;
  Assigned?: User;
  Assigned2?: User;
  Customer?: Customer;
  Machine?: Machine;
  OpenMenu?: boolean;
  Fsr: FsrModel;
  StatusClass?: string[];
  CardStatusClass?: string[];
  DaysElapes?: number;
}

export interface TimeLineModel {
  Id: number;
  StarDateTime: string;
  FinishDateTime: string;
  StartStatus: string;
  FinishStatus: string;
  FinishReason : string;
  Classes? : string[];
  FinishClasses? : string[];
}
export interface CommentModel {
  Id: number;
  UserId: string;
  UserName: string;
  UserType: string;
  DateTime: string;
  Content: string;
  Status: string;
}
export interface FsrModel {
  WorkDone: string;
  Report: string;
  Hours: string;
  Model: string;
  Serial: string;
  PartsUsed: PartModel[];
  Labour: LabourModel[];
  Consumables: ConsumableModel[];
  DistanceTravelled: string;
  Reference: string;
  CustomerSigniture: string;
  CustomerSignitureName: string;
  TechnicainSigniture: string;
  TechnicainName: string;
}
