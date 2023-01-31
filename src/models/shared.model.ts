export interface TabModel {
  Id: any;
  Name: string;
  Classes: string[];
}
export interface ListItemModel {
  Id: string;
  Col1: ListItemColModel;
  Col2?: ListItemColModel;
  Col3?: ListItemColModel;
  Col4?: ListItemColModel;
  Col5?: ListItemColModel;
  Col6?: ListItemColModel;
  Col7?: ListItemColModel;
  Col8?: ListItemColModel;
  Col9?: ListItemColModel;
  Col10?: ListItemColModel;
  ShowId: boolean;
  Classes: string[];
}

export interface ListItemColModel {
  Id: string;
  Value: string;
  Type: string;
  ShowOptions: boolean;
  Editing: boolean;
  Classes: string[];
}
export interface ListItemEventModel {
  Value: ListItemModel;
  Column: ListItemColModel;
}
export interface TimeDiffModel {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
export interface ConsumableModel {
  Id: number;
  Name: string;
  Price: number;
}


export interface LabourModel {
  Id: number;
  Name: string;
  Hours: string;
}
export interface PartModel {
  ProductId: string;
  Quantity: number;
  Type: string;
  Name: string;
}


export interface AdminStatModel {
  DraftOrders?: string;
  Customers?: string;
  Products?: string;
  Users?: string;
  ActiveOrders?: string;
  HistoryOrders?: string;
  Questions?: string;
  Testingreports?: string;
}