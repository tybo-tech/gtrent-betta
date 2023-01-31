export const roles = {
  Admin: 'Admin',
  Technician: 'Technician',
};

export const UPDATE_ORDER_URL = `api/orders/update-order.php`;

export const SERVICE_STATUS = {
  DRAFT_NOT_SAVED: {
    Name: 'Draft not saved',
    Id: 0,
  },
  DRAFT_SAVED: {
    Name: 'Draft saved',
    Id: 55,
  },
  PENDING_INVOICE: {
    Name: 'Pending',
    Id: 1,
  },
  RUNNING_TEST: {
    Name: 'Running test',
    Id: 1,
  },
  INVOICED: {
    Name: 'Invoiced',
    Id: 2,
  },
  PUBLISHED: {
    Name: 'Published',
  },
  SENT_FOR_QOUTE: {
    Name: 'Sent for quotation',
  },
};
export const ADD_ORDER_URL = `api/orders/add-order.php`;
export const GET_ORDERS_BY_USER_ID_URL = `api/orders/get-orders-by-user.php`;
export const GET_ORDERS_URL = `api/orders/get-orders.php`;
export const GET_ORDER_URL = `api/orders/get-order-by-id.php`;
export const GET_ORDER_BY_TASK_ID = `api/orders/get-order-by-task-id.php`;
