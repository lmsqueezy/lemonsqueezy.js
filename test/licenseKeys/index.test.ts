import { beforeAll, describe, expect, it } from "bun:test";
import {
  getLicenseKey,
  lemonSqueezySetup,
  listLicenseKeys,
  updateLicenseKey,
} from "../../src";
import { API_BASE_URL } from "../../src/internal";
import type { LicenseKey } from "../../src/licenseKeys/types";

const DATA_TYPE = "license-keys";
const PATH = `/v1/${DATA_TYPE}/`;
let licenseKeyId: number | string;
let storeId: number | string;
let orderId: number | string;
let orderItemId: number | string;
let productId: number | string;
let licenseKeyStatus: LicenseKey["data"]["attributes"]["status"];

beforeAll(() => {
  lemonSqueezySetup({ apiKey: import.meta.env.LEMON_SQUEEZY_API_KEY });
});

describe("List all license keys", () => {
  it("Should return all license keys", async () => {
    const { statusCode, error, data: _data } = await listLicenseKeys();
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { meta, data, links } = _data!;
    expect(meta.page).toBeDefined();
    expect(data).toBeArray();
    expect(data[0]).toBeDefined();
    expect(links.first).toBeDefined();
    expect(links.last).toBeDefined();

    const { currentPage, from, to, perPage, lastPage, total } = meta.page;
    const items = [currentPage, from, to, perPage, lastPage, total];
    for (const item of items) expect(item).toBeInteger();
    expect(Object.keys(meta.page).length).toEqual(items.length);

    const { id, attributes } = data[0];
    const { store_id, order_id, order_item_id, product_id, status } =
      attributes;
    licenseKeyId = id;
    storeId = store_id;
    orderId = order_id;
    orderItemId = order_item_id;
    productId = product_id;
    licenseKeyStatus = status;
  });

  it("Should return all license keys with related resources", async () => {
    const {
      statusCode,
      error,
      data: _data,
    } = await listLicenseKeys({ include: ["order"] });
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { meta, data, links, included } = _data!;
    expect(meta.page).toBeDefined();
    expect(data).toBeArray();
    expect(data[0]).toBeDefined();
    expect(links.first).toBeDefined();
    expect(links.last).toBeDefined();
    expect(included).toBeArray();
    expect(!!included?.filter((item) => item.type === "orders")).toBeTrue();

    const { currentPage, from, to, perPage, lastPage, total } = meta.page;
    const items = [currentPage, from, to, perPage, lastPage, total];
    for (const item of items) expect(item).toBeInteger();
    expect(Object.keys(meta.page).length).toEqual(items.length);

    const { id, attributes } = data[0];
    const { store_id, order_id, order_item_id, product_id, status } =
      attributes;
    licenseKeyId = id;
    storeId = store_id;
    orderId = order_id;
    orderItemId = order_item_id;
    productId = product_id;
    licenseKeyStatus = status;
  });

  it("Should return all license keys filtered by store id", async () => {
    const {
      statusCode,
      error,
      data: _data,
    } = await listLicenseKeys({
      filter: { storeId },
    });
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { meta, data, links } = _data!;
    expect(meta.page).toBeDefined();
    expect(
      data.filter((item) => item.attributes.store_id === Number(storeId)).length
    ).toEqual(data.length);
    expect(links.first).toBeDefined();
    expect(links.last).toBeDefined();

    const { currentPage, from, to, perPage, lastPage, total } = meta.page;
    const items = [currentPage, from, to, perPage, lastPage, total];
    for (const item of items) expect(item).toBeInteger();
    expect(Object.keys(meta.page).length).toEqual(items.length);
  });

  it("Should return all license keys filtered by order id", async () => {
    const {
      statusCode,
      error,
      data: _data,
    } = await listLicenseKeys({
      filter: { orderId },
    });
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { meta, data, links } = _data!;
    expect(meta.page).toBeDefined();
    expect(
      data.filter((item) => item.attributes.order_id === Number(orderId)).length
    ).toEqual(data.length);
    expect(links.first).toBeDefined();
    expect(links.last).toBeDefined();

    const { currentPage, from, to, perPage, lastPage, total } = meta.page;
    const items = [currentPage, from, to, perPage, lastPage, total];
    for (const item of items) expect(item).toBeInteger();
    expect(Object.keys(meta.page).length).toEqual(items.length);
  });

  it("Should return all license keys filtered by order item id", async () => {
    const {
      statusCode,
      error,
      data: _data,
    } = await listLicenseKeys({
      filter: { orderItemId },
    });
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { meta, data, links } = _data!;
    expect(meta.page).toBeDefined();
    expect(
      data.filter(
        (item) => item.attributes.order_item_id === Number(orderItemId)
      ).length
    ).toEqual(data.length);
    expect(links.first).toBeDefined();
    expect(links.last).toBeDefined();

    const { currentPage, from, to, perPage, lastPage, total } = meta.page;
    const items = [currentPage, from, to, perPage, lastPage, total];
    for (const item of items) expect(item).toBeInteger();
    expect(Object.keys(meta.page).length).toEqual(items.length);
  });

  it("Should return all license keys filtered by product id", async () => {
    const {
      statusCode,
      error,
      data: _data,
    } = await listLicenseKeys({
      filter: { productId },
    });
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { meta, data, links } = _data!;
    expect(meta.page).toBeDefined();
    expect(
      data.filter((item) => item.attributes.product_id === Number(productId))
        .length
    ).toEqual(data.length);
    expect(links.first).toBeDefined();
    expect(links.last).toBeDefined();

    const { currentPage, from, to, perPage, lastPage, total } = meta.page;
    const items = [currentPage, from, to, perPage, lastPage, total];
    for (const item of items) expect(item).toBeInteger();
    expect(Object.keys(meta.page).length).toEqual(items.length);
  });

  it("Should return all license keys filtered by status", async () => {
    const {
      statusCode,
      error,
      data: _data,
    } = await listLicenseKeys({ filter: { status: licenseKeyStatus } });
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { meta, data, links } = _data!;
    expect(meta.page).toBeDefined();
    expect(
      data.filter((item) => item.attributes.status === licenseKeyStatus).length
    ).toEqual(data.length);
    expect(links.first).toBeDefined();
    expect(links.last).toBeDefined();

    const { currentPage, from, to, perPage, lastPage, total } = meta.page;
    const items = [currentPage, from, to, perPage, lastPage, total];
    for (const item of items) expect(item).toBeInteger();
    expect(Object.keys(meta.page).length).toEqual(items.length);
  });

  it("Should return all license keys with page_number = 1 and page_size = 5", async () => {
    const {
      error,
      data: _data,
      statusCode,
    } = await listLicenseKeys({
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

describe("Retrieve a license key", () => {
  it("Throw an error about a parameter that must be provided", async () => {
    try {
      await getLicenseKey("");
    } catch (error) {
      expect((error as Error).message).toMatch(
        "Please provide the required parameter:"
      );
    }
  });

  it("Should return a license key object", async () => {
    const {
      statusCode,
      error,
      data: _data,
    } = await getLicenseKey(licenseKeyId);
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { data, links } = _data!;
    expect(links.self).toEqual(`${API_BASE_URL}${PATH}${licenseKeyId}`);

    const { type, id, attributes, relationships } = data;
    expect(type).toEqual(DATA_TYPE);
    expect(id).toEqual(licenseKeyId.toString());
    expect(attributes).toBeDefined();
    expect(relationships).toBeDefined();

    const {
      store_id,
      customer_id,
      order_id,
      order_item_id,
      product_id,
      user_name,
      user_email,
      key,
      key_short,
      activation_limit,
      instances_count,
      disabled,
      status,
      status_formatted,
      expires_at,
      created_at,
      updated_at,
      test_mode,
    } = attributes;
    const items = [
      store_id,
      customer_id,
      order_id,
      order_item_id,
      product_id,
      status,
      key,
      user_name,
      user_email,
      key_short,
      activation_limit,
      instances_count,
      disabled,
      status_formatted,
      expires_at,
      created_at,
      updated_at,
      test_mode,
    ];
    for (const item of items) expect(item).toBeDefined();
    expect(Object.keys(attributes).length).toEqual(items.length);
    expect(store_id).toEqual(Number(storeId));
    expect(order_id).toEqual(Number(orderId));
    expect(order_item_id).toEqual(Number(orderItemId));
    expect(product_id).toEqual(Number(productId));
    expect(status).toEqual(licenseKeyStatus);

    const {
      store,
      customer,
      order,
      "order-item": orderItem,
      product,
      "license-key-instances": licenseKeyInstances,
    } = relationships;
    const relationshipItems = [
      store,
      customer,
      order,
      orderItem,
      product,
      licenseKeyInstances,
    ];
    for (const item of relationshipItems) expect(item).toBeDefined();
    expect(Object.keys(relationships).length).toEqual(relationshipItems.length);
  });

  it("Should return a license key object with related resources", async () => {
    const {
      statusCode,
      error,
      data: _data,
    } = await getLicenseKey(licenseKeyId, { include: ["order"] });
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { data, links, included } = _data!;
    expect(links.self).toEqual(`${API_BASE_URL}${PATH}${licenseKeyId}`);
    expect(included).toBeArray();
    expect(!!included?.filter((item) => item.type === "orders")).toBeTrue();

    const { type, id, attributes, relationships } = data;
    expect(type).toEqual(DATA_TYPE);
    expect(id).toEqual(licenseKeyId.toString());
    expect(attributes).toBeDefined();
    expect(relationships).toBeDefined();

    const {
      store_id,
      customer_id,
      order_id,
      order_item_id,
      product_id,
      user_name,
      user_email,
      key,
      key_short,
      activation_limit,
      instances_count,
      disabled,
      status,
      status_formatted,
      expires_at,
      created_at,
      updated_at,
      test_mode,
    } = attributes;
    const items = [
      store_id,
      customer_id,
      order_id,
      order_item_id,
      product_id,
      status,
      key,
      user_name,
      user_email,
      key_short,
      activation_limit,
      instances_count,
      disabled,
      status_formatted,
      expires_at,
      created_at,
      updated_at,
      test_mode,
    ];
    for (const item of items) expect(item).toBeDefined();
    expect(Object.keys(attributes).length).toEqual(items.length);
    expect(store_id).toEqual(Number(storeId));
    expect(order_id).toEqual(Number(orderId));
    expect(order_item_id).toEqual(Number(orderItemId));
    expect(product_id).toEqual(Number(productId));
    expect(status).toEqual(licenseKeyStatus);

    const {
      store,
      customer,
      order,
      "order-item": orderItem,
      product,
      "license-key-instances": licenseKeyInstances,
    } = relationships;
    const relationshipItems = [
      store,
      customer,
      order,
      orderItem,
      product,
      licenseKeyInstances,
    ];
    for (const item of relationshipItems) expect(item).toBeDefined();
    expect(Object.keys(relationships).length).toEqual(relationshipItems.length);
  });
});

describe("Update a license key", () => {
  it("Throw an error about a parameter that must be provided", async () => {
    try {
      await updateLicenseKey("", {});
    } catch (error) {
      expect((error as Error).message).toMatch(
        "Please provide the required parameter:"
      );
    }
  });

  it("Should return a license key object with activation_limit is 5 and disabled is false", async () => {
    const newActivationLimit = 5;
    const {
      statusCode,
      error,
      data: _data,
    } = await updateLicenseKey(licenseKeyId, {
      disabled: false,
      activationLimit: newActivationLimit,
    });
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { data, links } = _data!;
    expect(links.self).toEqual(`${API_BASE_URL}${PATH}${licenseKeyId}`);

    const { type, id, attributes, relationships } = data;
    expect(type).toEqual(DATA_TYPE);
    expect(id).toEqual(licenseKeyId.toString());
    expect(attributes).toBeDefined();
    expect(relationships).toBeDefined();

    const {
      store_id,
      customer_id,
      order_id,
      order_item_id,
      product_id,
      status,
      key,
      user_name,
      user_email,
      key_short,
      activation_limit,
      instances_count,
      disabled,
      status_formatted,
      expires_at,
      created_at,
      updated_at,
      test_mode,
    } = attributes;
    const items = [
      store_id,
      customer_id,
      order_id,
      order_item_id,
      product_id,
      status,
      key,
      user_name,
      user_email,
      key_short,
      activation_limit,
      instances_count,
      disabled,
      status_formatted,
      expires_at,
      created_at,
      updated_at,
      test_mode,
    ];
    for (const item of items) expect(item).toBeDefined();
    expect(Object.keys(attributes).length).toEqual(items.length);
    expect(store_id).toEqual(Number(storeId));
    expect(order_id).toEqual(Number(orderId));
    expect(order_item_id).toEqual(Number(orderItemId));
    expect(product_id).toEqual(Number(productId));
    expect(activation_limit).toEqual(newActivationLimit);

    const {
      store,
      customer,
      order,
      "order-item": orderItem,
      product,
      "license-key-instances": licenseKeyInstances,
    } = relationships;
    const relationshipItems = [
      store,
      customer,
      order,
      orderItem,
      product,
      licenseKeyInstances,
    ];
    for (const item of relationshipItems) expect(item).toBeDefined();
    expect(Object.keys(relationships).length).toEqual(relationshipItems.length);
  });

  it("Should return a license key object with expires_at is null", async () => {
    const {
      statusCode,
      error,
      data: _data,
    } = await updateLicenseKey(licenseKeyId, {
      expiresAt: null,
    });
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { data, links } = _data!;
    expect(links.self).toEqual(`${API_BASE_URL}${PATH}${licenseKeyId}`);

    const { type, id, attributes, relationships } = data;
    expect(type).toEqual(DATA_TYPE);
    expect(id).toEqual(licenseKeyId.toString());
    expect(attributes).toBeDefined();
    expect(relationships).toBeDefined();

    const {
      store_id,
      customer_id,
      order_id,
      order_item_id,
      product_id,
      status,
      key,
      user_name,
      user_email,
      key_short,
      activation_limit,
      instances_count,
      disabled,
      status_formatted,
      expires_at,
      created_at,
      updated_at,
      test_mode,
    } = attributes;
    const items = [
      store_id,
      customer_id,
      order_id,
      order_item_id,
      product_id,
      status,
      key,
      user_name,
      user_email,
      key_short,
      activation_limit,
      instances_count,
      disabled,
      status_formatted,
      expires_at,
      created_at,
      updated_at,
      test_mode,
    ];
    for (const item of items) expect(item).toBeDefined();
    expect(Object.keys(attributes).length).toEqual(items.length);
    expect(store_id).toEqual(Number(storeId));
    expect(order_id).toEqual(Number(orderId));
    expect(order_item_id).toEqual(Number(orderItemId));
    expect(product_id).toEqual(Number(productId));
    expect(expires_at).toBeNull();

    const {
      store,
      customer,
      order,
      "order-item": orderItem,
      product,
      "license-key-instances": licenseKeyInstances,
    } = relationships;
    const relationshipItems = [
      store,
      customer,
      order,
      orderItem,
      product,
      licenseKeyInstances,
    ];
    for (const item of relationshipItems) expect(item).toBeDefined();
    expect(Object.keys(relationships).length).toEqual(relationshipItems.length);
  });

  it("Should return a license key object with expires_at is 2024-05-26", async () => {
    const date = new Date(new Date().getTime() + 86400000)
      .toISOString()
      .split("T")[0];
    const expiresAt = `${date}T00:00:00.000000Z`;
    const {
      statusCode,
      error,
      data: _data,
    } = await updateLicenseKey(licenseKeyId, {
      expiresAt,
    });
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { data, links } = _data!;
    expect(links.self).toEqual(`${API_BASE_URL}${PATH}${licenseKeyId}`);

    const { type, id, attributes, relationships } = data;
    expect(type).toEqual(DATA_TYPE);
    expect(id).toEqual(licenseKeyId.toString());
    expect(attributes).toBeDefined();
    expect(relationships).toBeDefined();

    const {
      store_id,
      customer_id,
      order_id,
      order_item_id,
      product_id,
      status,
      key,
      user_name,
      user_email,
      key_short,
      activation_limit,
      instances_count,
      disabled,
      status_formatted,
      expires_at,
      created_at,
      updated_at,
      test_mode,
    } = attributes;
    const items = [
      store_id,
      customer_id,
      order_id,
      order_item_id,
      product_id,
      status,
      key,
      user_name,
      user_email,
      key_short,
      activation_limit,
      instances_count,
      disabled,
      status_formatted,
      expires_at,
      created_at,
      updated_at,
      test_mode,
    ];
    for (const item of items) expect(item).toBeDefined();
    expect(Object.keys(attributes).length).toEqual(items.length);
    expect(store_id).toEqual(Number(storeId));
    expect(order_id).toEqual(Number(orderId));
    expect(order_item_id).toEqual(Number(orderItemId));
    expect(product_id).toEqual(Number(productId));
    expect(expires_at).toEqual(expiresAt);

    const {
      store,
      customer,
      order,
      "order-item": orderItem,
      product,
      "license-key-instances": licenseKeyInstances,
    } = relationships;
    const relationshipItems = [
      store,
      customer,
      order,
      orderItem,
      product,
      licenseKeyInstances,
    ];
    for (const item of relationshipItems) expect(item).toBeDefined();
    expect(Object.keys(relationships).length).toEqual(relationshipItems.length);
  });

  it("Should return a license key object with disabled is true", async () => {
    const {
      statusCode,
      error,
      data: _data,
    } = await updateLicenseKey(licenseKeyId, {
      disabled: true,
    });
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { data, links } = _data!;
    expect(links.self).toEqual(`${API_BASE_URL}${PATH}${licenseKeyId}`);

    const { type, id, attributes, relationships } = data;
    expect(type).toEqual(DATA_TYPE);
    expect(id).toEqual(licenseKeyId.toString());
    expect(attributes).toBeDefined();
    expect(relationships).toBeDefined();

    const {
      store_id,
      customer_id,
      order_id,
      order_item_id,
      product_id,
      status,
      key,
      user_name,
      user_email,
      key_short,
      activation_limit,
      instances_count,
      disabled,
      status_formatted,
      expires_at,
      created_at,
      updated_at,
      test_mode,
    } = attributes;
    const items = [
      store_id,
      customer_id,
      order_id,
      order_item_id,
      product_id,
      status,
      key,
      user_name,
      user_email,
      key_short,
      activation_limit,
      instances_count,
      disabled,
      status_formatted,
      expires_at,
      created_at,
      updated_at,
      test_mode,
    ];
    for (const item of items) expect(item).toBeDefined();
    expect(Object.keys(attributes).length).toEqual(items.length);
    expect(store_id).toEqual(Number(storeId));
    expect(order_id).toEqual(Number(orderId));
    expect(order_item_id).toEqual(Number(orderItemId));
    expect(product_id).toEqual(Number(productId));
    expect(disabled).toBeTrue();

    const {
      store,
      customer,
      order,
      "order-item": orderItem,
      product,
      "license-key-instances": licenseKeyInstances,
    } = relationships;
    const relationshipItems = [
      store,
      customer,
      order,
      orderItem,
      product,
      licenseKeyInstances,
    ];
    for (const item of relationshipItems) expect(item).toBeDefined();
    expect(Object.keys(relationships).length).toEqual(relationshipItems.length);
  });
});
