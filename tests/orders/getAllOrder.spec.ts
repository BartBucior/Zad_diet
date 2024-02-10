import { OrderRequests } from '../../lib/apiClients/orders';
import { JSONSchemaValidator } from '../../lib/helpers/jsonSchemaValidator';
import { expect, test } from '@playwright/test';

const schemaValidator = new JSONSchemaValidator();

test.describe('Get all orders', () => {
  let orders: OrderRequests;
  test.beforeEach(async ({ request }) => {
    orders = new OrderRequests(request);
  });

  test('should return list of all orders @smoky', async () => {
    const res = await orders.getAllOrders();
    const resBody = await res.json();
    expect(res.status()).toEqual(200);
    await schemaValidator.validateJsonSchema('GET_all_orders', 'orders', resBody, true);
    // await schemaValidator.validateJsonSchema('GET_all_orders', 'orders', res); // this only verify whether the existing schema template is the same as response or not
  });

  test('should return list of orders filtered by dietId', async () => {
    const params = {
      ['dietId']: 1,
    };

    const res = await orders.getAllOrders(params);
    const resBody = await res.json();
    expect(res.status()).toEqual(200);
    await schemaValidator.validateJsonSchema('GET_all_orders', 'orders', resBody); // this only verify whether the existing schema template is the same as response or not
  });
});
