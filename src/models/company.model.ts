export interface Company {
  CompanyId: string;
  Name: string;
  Slug: string;
  Description?: any;
  CompanyType: string;
  Dp?: any;
  IsDeleted: string;
  CreateDate: string;
  CreateUserId: string;
  ModifyDate: string;
  ModifyUserId: string;
  StatusId: string;
  Products?: any[];   // togo
  Promotions?: any []; // togo
  GeCategoryNames?: any[]; // togo

  Background: string;
  Color: string;
  Phone: string;
  Email: string;
  AddressLine: string;
  Location: string;
  BankName: string;
  BankAccNo: string;
  BankAccHolder: string;
  BankBranch: string;
  ProductsCount?: any

}