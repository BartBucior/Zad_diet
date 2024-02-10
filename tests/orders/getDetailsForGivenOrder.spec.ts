import { OrderRequests } from '../../lib/apiClients/orders';
import orderData from '../../lib/fixtures/orderDetails.data.json';
import { JSONSchemaValidator } from '../../lib/helpers/jsonSchemaValidator';
import { expect, test } from '@playwright/test';

const schemaValidator = new JSONSchemaValidator();
let orders: OrderRequests;

test.describe('Get all orders', () => {
  test.beforeEach(async ({ request }) => {
    orders = new OrderRequests(request);
  });

  test('should return details for given order @smoky', async () => {
    const res = await orders.getOrderDetailsForGivenOrder('1');
    const resBody = await res.json();
    expect(res.status()).toEqual(200);
    expect(resBody).toEqual(orderData.id_1);
    await schemaValidator.validateJsonSchema('GET_orderID', 'orders', res, true);
    // await schemaValidator.validateJsonSchema('GET_all_orders', 'orders', res); // this only verify whether the existing schema template is the same as response or not
  });
});
