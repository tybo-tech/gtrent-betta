import { Company } from './company.model';
import { Item } from './item.model';

export interface User {
  UserId: string;
  Email: string;
  Name: string;
  UserType?: string;
  Surname: string;
  Address?: string;
  Password: string;
  CompanyId: string;
  CompanyName?: string;
  CompanyDp?: string;
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
  Chats?: Item[];
  LastChat?: Item;
  ChatCount?: number;
}

export const initUser = (): User => {
  return {
    UserId: '',
    CompanyId: 'f012a111-0476-11eb-bac2-c2cf57e9c3fe',
    UserType: '',
    Name: '',
    Surname: '',
    Email: '',
    PhoneNumber: '',
    Password: '',
    Dp: 'https://gtrent.tybo.co.za/api//api/upload/uploads/1674620509magicpattern-KfFmwa7m5VQ-unsplash.jpg',
    CreateDate: '',
    CreateUserId: 'add-by-admin',
    ModifyDate: '',
    ModifyUserId: 'add-by-admin',
    StatusId: '1',
    UserToken: '',
    AddressLineHome: '',
    AddressUrlHome: '',
    AddressLineWork:
      '',
    AddressUrlWork: '',
  };
};
