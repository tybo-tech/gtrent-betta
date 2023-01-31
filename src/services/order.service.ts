import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { OrderModel, Orderproduct } from 'src/models/order.model';
import {
  GET_ORDERS_URL,
  ADD_ORDER_URL,
  UPDATE_ORDER_URL,
  GET_ORDER_URL,
  SERVICE_STATUS,
  GET_ORDER_BY_TASK_ID,
} from 'src/models/utits';
import { MachineParts } from 'src/models/machineparts.model';

@Injectable({
  providedIn: 'root',
})
export class FsrService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.API_URL;
  }

  getOrders(companyId: string, statusId = 1) {
    return this.http.get<OrderModel[]>(
      `${this.url}/${GET_ORDERS_URL}?CompanyId=${companyId}&StatusId=${statusId}`
    );
  }

  create(order: OrderModel) {
    return this.http.post<OrderModel>(`${this.url}/${ADD_ORDER_URL}`, order);
  }
  update(order: OrderModel) {
    return this.http.post<OrderModel>(`${this.url}/${UPDATE_ORDER_URL}`, order);
  }

  getOrderSync(OrderId: string) {
    return this.http.get<OrderModel>(
      `${this.url}/${GET_ORDER_URL}?OrderId=${OrderId}`
    );
  }

  getByTaskId(TaskId: number) {
    return this.http.get<OrderModel>(
      `${this.url}/${GET_ORDER_BY_TASK_ID}?TaskId=${TaskId}`
    );
  }

  saveService(service: OrderModel) {
    if (service && service.OrdersId && service.OrdersId.length > 5) {
      return this.update(service);
    } else {
      return this.create(service);
    }
  }

  saveServiceVoid(service: OrderModel) {
    if (service && service.OrdersId && service.OrdersId.length > 5) {
      this.update(service).subscribe((data) => {});
    } else {
      if (service.Status === SERVICE_STATUS.DRAFT_NOT_SAVED.Name)
        service.Status = SERVICE_STATUS.DRAFT_SAVED.Name;
      this.create(service).subscribe((data) => {});
    }
  }

  addPartsRange(orderProducts: Orderproduct[]) {
    return this.http.post<Orderproduct[]>(
      `${this.url}/api/order_products/add-order_product-range.php`,
      orderProducts
    );
  }
  addPart(orderProducts: Orderproduct) {
    return this.http.post<Orderproduct>(
      `${this.url}/api/order_products/add-order_product-range.php`,
      orderProducts
    );
  }

  updatePart(image: Orderproduct) {
    return this.http.post<Orderproduct>(
      `${this.url}/api/order_products/update-order_product.php`,
      image
    );
  }
  updatePartsRange(orderProducts: Orderproduct[]) {
    return this.http.post<Orderproduct[]>(
      `${this.url}/api/order_products/update-order_product-range.php`,
      orderProducts
    );
  }
  initNewService(
    companyId: string,
    createUserId: string,
    comprossorId: string,
    customerId: string,
    taskStatus: string
  ): OrderModel {
    return {
      OrdersId: '',
      OrderNo: '',
      CompanyId: companyId,
      CustomerId: customerId,
      MachineId: comprossorId,
      AddressId: '',
      Notes: '',
      OrderType: 'FSR',
      Total: 0,
      Paid: 0,
      Due: 0,
      InvoiceDate: new Date(),
      DueDate: '',
      CreateUserId: createUserId,
      ModifyUserId: createUserId,
      Status: taskStatus,
      StatusId: 1,
      ShippingPrice: 0,
      TaskId: 0,
      Consumables: [],
      Labour: [],
    };
  }

  mapOrderproduct(
    orderId: string,
    companyId: string,
    machinepart: MachineParts
  ): Orderproduct {
    return {
      Id: ``,
      OrderId: orderId,
      ProductId: machinepart.MachinePartId,
      CompanyId: companyId,
      ProductName: machinepart.ProductName,
      ProductType: machinepart.ProductType,
      UnitPrice: 0,
      FeaturedImageUrl: ``,
      Colour: ``,
      Size: ``,
      Quantity: machinepart.Qty || 1,
      SubTotal: 0,
      CreateUserId: '',
      ModifyUserId: '',
      StatusId: 1,
      Selected: machinepart.Selected,
    };
  }
  getMax() {
    return this.http.get<any>(`${this.url}/api/orders/get-max-id.php`);
  }
}
