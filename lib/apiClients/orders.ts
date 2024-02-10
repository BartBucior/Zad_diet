import { APIRequestContext, APIResponse } from '@playwright/test';

export class OrderRequests {
  constructor(private request: APIRequestContext) {}
  url = process.env.URL;

  /**
   * Retrieves a list of all orders.
   *
   * @method getAllOrders
   * @param {Object} [params={}] - An optional object containing key-value pairs for query parameters.
   * @returns {Promise<APIResponse>} A promise that resolves to the API response object.
   */
  async getAllOrders(params?: { [key: string]: string | number | boolean }): Promise<APIResponse> {
    const response = await this.request.get(`${this.url}/orders`, {
      params: params,
    });
    return response;
  }

  /**
   * Retrieves the details for a specific order by ID.
   *
   * @method getOrderDetailsForGivenOrder
   * @param {string} orderId - The ID of the order to retrieve details for.
   * @returns {Promise<APIResponse>} A promise that resolves to the API response object.
   */
  async getOrderDetailsForGivenOrder(orderId: string): Promise<APIResponse> {
    const response = await this.request.get(`${this.url}/orders/${orderId}`);
    return response;
  }

  /**
   * Creates a new order with the provided data.
   *
   * @method createOrder
   * @param {Object} data - The order data to send in the request.
   * @returns {Promise<APIResponse>} A promise that resolves to the API response object.
   */
  async createOrder(data: object): Promise<APIResponse> {
    const response = await this.request.post(`${this.url}/orders`, {
      data: data,
    });
    return response;
  }
}
