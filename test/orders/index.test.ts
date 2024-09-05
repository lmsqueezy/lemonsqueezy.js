import { test, beforeAll, describe, expect, it } from "bun:test";
import {
  getOrder,
  lemonSqueezySetup,
  listOrders,
  generateOrderInvoice,
} from "../../src";
import { API_BASE_URL } from "../../src/internal";
import { issueOrderRefund } from "../../src/orders";

const DATA_TYPE = "orders";
const PATH = "/v1/orders/";
let storeId: any;
let orderId: any;
let userEmail: any;
let refundableOrderId: any;

beforeAll(() => {
  lemonSqueezySetup({ apiKey: import.meta.env.LEMON_SQUEEZY_API_KEY });
});

describe("List all orders", () => {
  it("Should return a paginated list of orders", async () => {
    const { statusCode, error, data: _data } = await listOrders();
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { meta, links, data } = _data!;
    expect(meta.page).toBeDefined();
    expect(links.first).toBeDefined();
    expect(links.last).toBeDefined();
    expect(data).toBeArray();

    const { currentPage, from, lastPage, perPage, to, total } = meta.page;
    for (const item of [currentPage, from, lastPage, perPage, to, total]) {
      expect(item).toBeNumber();
    }

    // Find refundable order
    const foundOrder = data.find((order) => {
      const total = order.attributes.total;
      const refundedAmount = order.attributes.refunded_amount;
      return total > 0 && total + refundedAmount < 1;
    });

    if (foundOrder) {
      refundableOrderId = foundOrder.id;
    }

    const {
      store,
      customer,
      "order-items": orderItems,
      subscriptions,
      "license-keys": licenseKeys,
      "discount-redemptions": discountRedemptions,
    } = data[0].relationships;

    for (const item of [
      store,
      customer,
      orderItems,
      subscriptions,
      licenseKeys,
      discountRedemptions,
    ]) {
      expect(item.links).toBeDefined();
    }

    orderId = data[0].id;
    storeId = data[0].attributes.store_id;
    userEmail = data[0].attributes.user_email;
  });

  it("Should return a paginated list of orders with related resources", async () => {
    const {
      statusCode,
      error,
      data: _data,
    } = await listOrders({ include: ["customer"] });
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { meta, links, data, included } = _data!;
    expect(meta.page).toBeDefined();
    expect(links.first).toBeDefined();
    expect(links.last).toBeDefined();
    expect(data).toBeArray();
    expect(included).toBeArray();
    expect(!!included?.filter((item) => item.type === "customers")).toBeTrue();

    const { currentPage, from, lastPage, perPage, to, total } = meta.page;
    for (const item of [currentPage, from, lastPage, perPage, to, total]) {
      expect(item).toBeNumber();
    }

    const {
      store,
      customer,
      "order-items": orderItems,
      subscriptions,
      "license-keys": licenseKeys,
      "discount-redemptions": discountRedemptions,
    } = data[0].relationships;
    for (const item of [
      store,
      customer,
      orderItems,
      subscriptions,
      licenseKeys,
      discountRedemptions,
    ]) {
      expect(item.links).toBeDefined();
    }
  });

  it("Should return a paginated list of orders filtered by store id", async () => {
    const {
      statusCode,
      error,
      data: _data,
    } = await listOrders({ filter: { storeId } });
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { meta, links, data } = _data!;
    expect(meta.page).toBeDefined();
    expect(links.first).toBeDefined();
    expect(links.last).toBeDefined();
    expect(
      data.filter((item) => item.attributes.store_id === Number(storeId)).length
    ).toEqual(data.length);

    const { currentPage, from, lastPage, perPage, to, total } = meta.page;
    for (const item of [currentPage, from, lastPage, perPage, to, total]) {
      expect(item).toBeNumber();
    }

    const {
      store,
      customer,
      "order-items": orderItems,
      subscriptions,
      "license-keys": licenseKeys,
      "discount-redemptions": discountRedemptions,
    } = data[0].relationships;
    for (const item of [
      store,
      customer,
      orderItems,
      subscriptions,
      licenseKeys,
      discountRedemptions,
    ]) {
      expect(item.links).toBeDefined();
    }
  });

  it("Should return a paginated list of orders filtered by user email", async () => {
    const {
      statusCode,
      error,
      data: _data,
    } = await listOrders({ filter: { userEmail } });
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { meta, links, data } = _data!;
    expect(meta.page).toBeDefined();
    expect(links.first).toBeDefined();
    expect(links.last).toBeDefined();
    expect(
      data.filter((item) => item.attributes.user_email === userEmail).length
    ).toEqual(data.length);

    const { currentPage, from, lastPage, perPage, to, total } = meta.page;
    for (const item of [currentPage, from, lastPage, perPage, to, total]) {
      expect(item).toBeNumber();
    }

    const {
      store,
      customer,
      "order-items": orderItems,
      subscriptions,
      "license-keys": licenseKeys,
      "discount-redemptions": discountRedemptions,
    } = data[0].relationships;
    for (const item of [
      store,
      customer,
      orderItems,
      subscriptions,
      licenseKeys,
      discountRedemptions,
    ]) {
      expect(item.links).toBeDefined();
    }
  });

  it("Should return a paginated list of orders with page_number = 1 and page_size = 5", async () => {
    const {
      error,
      data: _data,
      statusCode,
    } = await listOrders({
      page: {
        number: 1,
        size: 5,
      },
    });
    expect(error).toBeNull();
    expect(statusCode).toEqual(200);
    expect(_data).toBeDefined();

    const { meta, data, links } = _data!;
    expect(meta).toBeDefined();
    expect(data).toBeArray();
    expect(links.first).toBeDefined();
    expect(links.last).toBeDefined();

    const { currentPage, from, to, perPage, lastPage, total } = meta.page;
    const items = [currentPage, from, to, perPage, lastPage, total];
    for (const item of items) expect(item).toBeInteger();
    expect(Object.keys(meta.page).length).toEqual(items.length);
    expect(currentPage).toEqual(1);
    expect(perPage).toEqual(5);
  });
});

describe("Retrieve an order", () => {
  it("Throw an error about a parameter that must be provided", async () => {
    try {
      await getOrder("");
    } catch (error) {
      expect((error as Error).message).toMatch(
        "Please provide the required parameter:"
      );
    }
  });

  it("Should return the order with the given order id", async () => {
    const { statusCode, error, data: _data } = await getOrder(orderId);
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { links, data } = _data!;
    expect(links.self).toEqual(`${API_BASE_URL}${PATH}${orderId}`);
    expect(data).toBeDefined();

    const { id, type, attributes, relationships } = data;
    expect(id).toEqual(orderId.toString());
    expect(type).toEqual(DATA_TYPE);
    expect(attributes).toBeDefined();
    expect(relationships).toBeDefined();

    // attributes
    const {
      store_id,
      customer_id,
      identifier,
      order_number,
      user_name,
      user_email,
      currency,
      currency_rate,
      tax_name,
      tax_rate,
      tax_inclusive,
      status,
      status_formatted,
      refunded,
      refunded_at,
      subtotal,
      discount_total,
      tax,
      setup_fee,
      total,
      refunded_amount,
      subtotal_usd,
      discount_total_usd,
      tax_usd,
      setup_fee_usd,
      total_usd,
      refunded_amount_usd,
      subtotal_formatted,
      discount_total_formatted,
      tax_formatted,
      setup_fee_formatted,
      total_formatted,
      refunded_amount_formatted,
      first_order_item,
      urls,
      created_at,
      updated_at,
      test_mode,
    } = attributes;

    const items = [
      store_id,
      customer_id,
      identifier,
      order_number,
      user_name,
      user_email,
      currency,
      currency_rate,
      tax_name,
      tax_rate,
      tax_inclusive,
      status,
      status_formatted,
      refunded,
      refunded_at,
      subtotal,
      discount_total,
      tax,
      setup_fee,
      total,
      refunded_amount,
      subtotal_usd,
      discount_total_usd,
      tax_usd,
      setup_fee_usd,
      total_usd,
      refunded_amount_usd,
      subtotal_formatted,
      discount_total_formatted,
      tax_formatted,
      setup_fee_formatted,
      total_formatted,
      refunded_amount_formatted,
      first_order_item,
      urls,
      created_at,
      updated_at,
      test_mode,
    ];

    expect(store_id).toEqual(Number(storeId));
    expect(urls.receipt).toBeDefined();
    expect(Object.keys(attributes).length).toEqual(items.length);
    for (const item of items) {
      expect(item).toBeDefined();
    }

    // first_order_item
    const {
      id: firstOrderItemId,
      order_id,
      product_id,
      variant_id,
      price_id,
      product_name,
      variant_name,
      price,
      quantity,
      created_at: createdAt,
      updated_at: updatedAt,
      test_mode: testMode,
    } = first_order_item;
    const firstOrderItems = [
      firstOrderItemId,
      order_id,
      product_id,
      variant_id,
      price_id,
      product_name,
      variant_name,
      price,
      quantity,
      createdAt,
      updatedAt,
      testMode,
    ];
    expect(Object.keys(first_order_item).length).toEqual(
      firstOrderItems.length
    );
    for (const item of firstOrderItems) {
      expect(item).toBeDefined();
    }

    // relationships
    const {
      store,
      customer,
      "order-items": orderItems,
      subscriptions,
      "license-keys": licenseKeys,
      "discount-redemptions": discountRedemptions,
    } = relationships;
    const relationshipItems = [
      store,
      customer,
      orderItems,
      subscriptions,
      licenseKeys,
      discountRedemptions,
    ];
    expect(Object.keys(relationships).length).toEqual(relationshipItems.length);
    for (const item of relationshipItems) {
      expect(item.links).toBeDefined();
    }
  });

  it("Should return the order with related resources", async () => {
    const {
      statusCode,
      error,
      data: _data,
    } = await getOrder(orderId, { include: ["customer"] });
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { links, data, included } = _data!;
    expect(links.self).toEqual(`${API_BASE_URL}${PATH}${orderId}`);
    expect(data).toBeDefined();
    expect(included).toBeArray();
    expect(!!included?.filter((item) => item.type === "customers")).toBeTrue();

    const { id, type, attributes, relationships } = data;
    expect(id).toEqual(orderId.toString());
    expect(type).toEqual(DATA_TYPE);
    expect(attributes).toBeDefined();
    expect(relationships).toBeDefined();

    // attributes
    const {
      store_id,
      customer_id,
      identifier,
      order_number,
      user_name,
      user_email,
      currency,
      currency_rate,
      tax_name,
      tax_rate,
      tax_inclusive,
      status,
      status_formatted,
      refunded,
      refunded_at,
      subtotal,
      discount_total,
      tax,
      setup_fee,
      total,
      refunded_amount,
      subtotal_usd,
      discount_total_usd,
      tax_usd,
      setup_fee_usd,
      total_usd,
      refunded_amount_usd,
      subtotal_formatted,
      discount_total_formatted,
      tax_formatted,
      setup_fee_formatted,
      total_formatted,
      refunded_amount_formatted,
      first_order_item,
      urls,
      created_at,
      updated_at,
      test_mode,
    } = attributes;
    const items = [
      store_id,
      customer_id,
      identifier,
      order_number,
      user_name,
      user_email,
      currency,
      currency_rate,
      tax_name,
      tax_rate,
      tax_inclusive,
      status,
      status_formatted,
      refunded,
      refunded_at,
      subtotal,
      discount_total,
      tax,
      setup_fee,
      total,
      refunded_amount,
      subtotal_usd,
      discount_total_usd,
      tax_usd,
      setup_fee_usd,
      total_usd,
      refunded_amount_usd,
      subtotal_formatted,
      discount_total_formatted,
      tax_formatted,
      setup_fee_formatted,
      total_formatted,
      refunded_amount_formatted,
      first_order_item,
      urls,
      created_at,
      updated_at,
      test_mode,
    ];
    expect(store_id).toEqual(Number(storeId));
    expect(urls.receipt).toBeDefined();
    expect(Object.keys(attributes).length).toEqual(items.length);
    for (const item of items) {
      expect(item).toBeDefined();
    }

    // first_order_item
    const {
      id: firstOrderItemId,
      order_id,
      product_id,
      variant_id,
      price_id,
      product_name,
      variant_name,
      price,
      quantity,
      created_at: createdAt,
      updated_at: updatedAt,
      test_mode: testMode,
    } = first_order_item;
    const firstOrderItems = [
      firstOrderItemId,
      order_id,
      product_id,
      variant_id,
      price_id,
      product_name,
      variant_name,
      price,
      quantity,
      createdAt,
      updatedAt,
      testMode,
    ];
    expect(Object.keys(first_order_item).length).toEqual(
      firstOrderItems.length
    );
    for (const item of firstOrderItems) {
      expect(item).toBeDefined();
    }

    // relationships
    const {
      store,
      customer,
      "order-items": orderItems,
      subscriptions,
      "license-keys": licenseKeys,
      "discount-redemptions": discountRedemptions,
    } = relationships;
    const relationshipItems = [
      store,
      customer,
      orderItems,
      subscriptions,
      licenseKeys,
      discountRedemptions,
    ];
    expect(Object.keys(relationships).length).toEqual(relationshipItems.length);
    for (const item of relationshipItems) {
      expect(item.links).toBeDefined();
    }
  });
});

describe("Generate order invoice", () => {
  it("Throw an error about a parameter that must be provided", async () => {
    try {
      await generateOrderInvoice("");
    } catch (error) {
      expect((error as Error).message).toMatch(
        "Please provide the required parameter:"
      );
    }
  });

  it("Should returns a link with the given order id", async () => {
    const {
      statusCode,
      error,
      data: _data,
    } = await generateOrderInvoice(orderId);
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { meta } = _data!;
    expect(meta).toBeDefined();
    expect(meta.urls).toBeDefined();
    expect(meta.urls.download_invoice).toStartWith(
      "https://app.lemonsqueezy.com/my-orders/"
    );
  });

  it("Should returns a link with the given order id and params", async () => {
    const params = {
      name: "John Doe",
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      country: "US",
      zipCode: 12345,
      notes: "Thank you for your business!",
    };
    const {
      statusCode,
      error,
      data: _data,
    } = await generateOrderInvoice(orderId, params);
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { meta } = _data!;
    expect(meta).toBeDefined();
    expect(meta.urls).toBeDefined();
    expect(meta.urls.download_invoice).toBeDefined();

    const invoiceUrl = new URL(meta.urls.download_invoice);
    const searchParams = invoiceUrl.searchParams;

    expect(searchParams.get("name")).toEqual(params.name);
    expect(searchParams.get("address")).toEqual(params.address);
    expect(searchParams.get("city")).toEqual(params.city);
    expect(searchParams.get("state")).toEqual(params.state);
    expect(searchParams.get("country")).toEqual(params.country);
    expect(searchParams.get("zip_code")).toEqual(params.zipCode.toString());
    expect(searchParams.get("notes")).toEqual(params.notes);
  });
});

describe("Issue order refund", () => {
  it("Should throw an error when `orderId` parameter is not provided", async () => {
    try {
      await issueOrderRefund("", 1);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toMatch(
        "Please provide the required parameter: orderId."
      );
    }
  });

  it("Should throw an error when `amount` parameter is not provided", async () => {
    try {
      await issueOrderRefund(orderId, 0);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toMatch(
        "Please provide the required parameter: amount."
      );
    }
  });

  test.skipIf(!refundableOrderId)(
    "Should issue a refund for a qualifying order",
    async () => {
      const { statusCode, error, data } = await issueOrderRefund(
        refundableOrderId,
        1
      );
      expect(statusCode).toEqual(200);
      expect(error).toBeNull();
      expect(data).toBeDefined();
    }
  );
});
