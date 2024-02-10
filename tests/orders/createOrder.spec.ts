import { OrderRequests } from '../../lib/apiClients/orders';
import orderData from '../../lib/fixtures/createOrder.data.json';
import { JSONSchemaValidator } from '../../lib/helpers/jsonSchemaValidator';
import { expect, test } from '@playwright/test';

const schemaValidator = new JSONSchemaValidator();
let orders: OrderRequests;

test.describe('Get all orders', () => {
  test.beforeEach(async ({ request }) => {
    orders = new OrderRequests(request);
  });

  test('should create details for given order @smoky', async () => {
    const res = await orders.createOrder(orderData.validBody);
    const resBody = await res.json();
    expect(res.status()).toEqual(201);
    expect(resBody._debug).toEqual(orderData.validBody._debug);
    expect(resBody.datetime).toEqual(orderData.validBody.datetime);
    expect(resBody.dietId).toEqual(orderData.validBody.dietId);
    expect(resBody.from_date).toEqual(orderData.validBody.from_date);
    expect(resBody.to_date).toEqual(orderData.validBody.to_date);
    expect(resBody.userId).toEqual(orderData.validBody.userId);
    await schemaValidator.validateJsonSchema('POST_order', 'orders', resBody, true);
    // await schemaValidator.validateJsonSchema('GET_all_orders', 'orders', res); // this only verify whether the existing schema template is the same as response or not
  });

  test('should return details for given order', async () => {
    const res = await orders.createOrder(orderData.startingDateAfter30Days);
    const resBody = await res.json();
    expect(res.status()).toEqual(403); // I made assumption that this is forbidden so schedule should not be created
    expect(resBody._debug).toEqual(orderData.startingDateAfter30Days._debug);
    await schemaValidator.validateJsonSchema('POST_order_dateAfter30', 'orders', resBody, true);
    // await schemaValidator.validateJsonSchema('GET_all_orders', 'orders', res); // this only verify whether the existing schema template is the same as response or not
  });
});
