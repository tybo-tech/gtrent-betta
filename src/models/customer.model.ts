import { Company } from './company.model';
import { Machine } from './machine.model';
import { OrderModel } from './order.model';

export interface Customer {
  CustomerId?: string;
  Email: string;
  Name: string;
  CustomerType?: string;
  Surname: string;
  Address?: string;
  Password: string;
  CompanyId?: string;
  CompanyName?: string;
  Slug?: string;
  RoleId?: number;
  CreateDate?: string;
  CreateUserId?: string;
  ModifyDate?: string;
  ModifyUserId?: string;
  NewPassword?: string;
  ConfirmPassword?: string;
  StatusId: any;
  UserToken?: any;
  Dp?: any;
  AddressLineHome: string;
  AddressUrlHome: string;
  AddressLineWork: string;
  AddressUrlWork: string;
  SystemRole?: string;
  SecurityToken?: string;
  Viewing?: boolean;
  PhoneNumber: any;
  Company?: Company;
  Machines?: Machine[];
  Fsrs: OrderModel[];
}

export const initCustomer = (): Customer => {
  return {
    CustomerId: '',
    CompanyId: 'f012a111-0476-11eb-bac2-c2cf57e9c3fe',
    CustomerType: 'Customer',
    Name: '',
    Surname: '',
    Email: '',
    PhoneNumber: '',
    Password: '',
    Dp: '',
    CreateDate: '',
    CreateUserId: '',
    ModifyDate: '',
    ModifyUserId: '',
    StatusId: '1',
    UserToken: '',
    AddressLineHome: '',
    AddressUrlHome: '',
    AddressLineWork: '',
    AddressUrlWork: '',
    Fsrs: [],
  };
};
