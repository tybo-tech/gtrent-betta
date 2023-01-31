import { Company } from './company.model';
import { Customer } from './customer.model';
import { Item } from './item.model';
import { Machine } from './machine.model';
import { ConsumableModel, LabourModel } from './shared.model';
import { TaskModel } from './task.model';


export interface OrderModel {
  
  OrdersId: string;
  OrderNo: string;
  CompanyId: string;
  CustomerId: string;
  MachineId: string;
  AddressId: string;
  Notes: string;
  OrderType: string;
  Total: number;
  Shipping?: string;
  ShippingPrice?: any;
  Paid: number;
  Due: number;
  InvoiceDate: Date;
  DueDate: string;
  TaskId: number;
  OrderSource?: string;
  CreateDate?: string;
  CreateUserId: string;
  ModifyDate?: string;
  ModifyUserId: string;
  Status: string;
  StatusId: number;
  Orderproducts?: Orderproduct[];
  Customer?: Customer;
  Company?: Company;
  GoBackToCreateOrder?: boolean;
  Machine?: Machine;
  
  CustomerSigniture?: string;
  CustomerSignitureName?: string;
  TechnicainSigniture?: string;
  TechnicainName?: string;
  Hours?: string;
  Model?: string;
  Serial?: string;
  Items?: Item[];
  Heading?: string;
  Task?: TaskModel;
  Labour: LabourModel[];
  Consumables: ConsumableModel[];
}

export interface Orderproduct {
  Id: string;
  OrderId: string;
  ProductId: string;
  CompanyId: string;
  ProductName: string;
  ProductType: string;
  Size: string;
  Colour: string;
  FeaturedImageUrl: string;
  UnitPrice: number;
  Quantity: number;
  SubTotal: number;
  CreateDate?: string;
  CreateUserId: string;
  ModifyDate?: string;
  ModifyUserId: string;
  StatusId: number;
  Selected?: boolean;
};