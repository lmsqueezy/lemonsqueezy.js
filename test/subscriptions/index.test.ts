import { beforeAll, describe, expect, it } from "bun:test";
import {
  cancelSubscription,
  getSubscription,
  lemonSqueezySetup,
  listSubscriptions,
  updateSubscription,
} from "../../src";
import { API_BASE_URL } from "../../src/internal";

const DATA_TYPE = "subscriptions";
const PATH = "/v1/subscriptions/";
let subscriptionId: number | string;
let storeId: number | string;
let orderId: number | string;
let orderItemId: number | string;
let productId: number | string;
let variantId: number | string;
let userEmail: string;

beforeAll(() => {
  lemonSqueezySetup({ apiKey: import.meta.env.LEMON_SQUEEZY_API_KEY });
});

describe("List all subscriptions", () => {
  it("Should return a paginated list of subscriptions", async () => {
    const { statusCode, error, data: _data } = await listSubscriptions();
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { meta, links, data } = _data!;

    expect(meta.page).toBeDefined();
    expect(links.first).toBeString();
    expect(links.last).toBeString();
    expect(data).toBeArray();
    expect(data[0]).toBeDefined();

    const { id, attributes } = data[0];
    const {
      store_id,
      order_id,
      order_item_id,
      product_id,
      variant_id,
      user_email,
    } = attributes;
    subscriptionId = id;
    storeId = store_id;
    orderId = order_id;
    orderItemId = order_item_id;
    productId = product_id;
    variantId = variant_id;
    userEmail = user_email;
  });

  it("Should return a paginated list of subscriptions with related resources", async () => {
    const {
      statusCode,
      error,
      data: _data,
    } = await listSubscriptions({ include: ["product"] });
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { meta, links, data, included } = _data!;
    expect(meta.page).toBeDefined();
    expect(links.first).toBeString();
    expect(links.last).toBeString();
    expect(data).toBeArray();
    expect(data[0]).toBeDefined();
    expect(included).toBeArray();
    expect(!!included?.filter((item) => item.type === "products")).toBeTrue();
  });

  it("Should return a paginated list of subscriptions filtered by store id", async () => {
    const {
      statusCode,
      error,
      data: _data,
    } = await listSubscriptions({ filter: { storeId } });
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { meta, links, data } = _data!;
    expect(meta.page).toBeDefined();
    expect(links.first).toBeString();
    expect(links.last).toBeString();
    expect(
      data.filter((item) => item.attributes.store_id === Number(storeId)).length
    ).toEqual(data.length);
  });

  it("Should return a paginated list of subscriptions filtered by order id", async () => {
    const {
      statusCode,
      error,
      data: _data,
    } = await listSubscriptions({ filter: { orderId } });
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { meta, links, data } = _data!;
    expect(meta.page).toBeDefined();
    expect(links.first).toBeString();
    expect(links.last).toBeString();
    expect(
      data.filter((item) => item.attributes.order_id === Number(orderId)).length
    ).toEqual(data.length);
  });

  it("Should return a paginated list of subscriptions filtered by product id", async () => {
    const {
      statusCode,
      error,
      data: _data,
    } = await listSubscriptions({ filter: { productId } });
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { meta, links, data } = _data!;
    expect(meta.page).toBeDefined();
    expect(links.first).toBeString();
    expect(links.last).toBeString();
    expect(
      data.filter((item) => item.attributes.product_id === Number(productId))
        .length
    ).toEqual(data.length);
  });

  it("Should return a paginated list of subscriptions filtered by order item id", async () => {
    const {
      statusCode,
      error,
      data: _data,
    } = await listSubscriptions({ filter: { orderItemId } });
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { meta, links, data } = _data!;
    expect(meta.page).toBeDefined();
    expect(links.first).toBeString();
    expect(links.last).toBeString();
    expect(
      data.filter(
        (item) => item.attributes.order_item_id === Number(orderItemId)
      ).length
    ).toEqual(data.length);
  });

  it("Should return a paginated list of subscriptions filtered by variant id", async () => {
    const {
      statusCode,
      error,
      data: _data,
    } = await listSubscriptions({ filter: { variantId } });
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { meta, links, data } = _data!;
    expect(meta.page).toBeDefined();
    expect(links.first).toBeString();
    expect(links.last).toBeString();
    expect(
      data.filter((item) => item.attributes.variant_id === Number(variantId))
        .length
    ).toEqual(data.length);
  });

  it("Should return a paginated list of subscriptions filtered by user email", async () => {
    const {
      statusCode,
      error,
      data: _data,
    } = await listSubscriptions({ filter: { userEmail } });
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { meta, links, data } = _data!;
    expect(meta.page).toBeDefined();
    expect(links.first).toBeString();
    expect(links.last).toBeString();
    expect(
      data.filter((item) => item.attributes.user_email === userEmail).length
    ).toEqual(data.length);
  });

  it("Should return a paginated list of subscriptions with page_number = 1 and page_size = 5", async () => {
    const {
      error,
      data: _data,
      statusCode,
    } = await listSubscriptions({
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

describe("Retrieve a subscription", () => {
  it("Throw an error about a parameter that must be provided", async () => {
    try {
      await getSubscription("");
    } catch (error) {
      expect((error as Error).message).toMatch(
        "Please provide the required parameter:"
      );
    }
  });

  it("Should return the subscription with the given subscription id", async () => {
    const {
      statusCode,
      error,
      data: _data,
    } = await getSubscription(subscriptionId);
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { data, links } = _data!;
    expect(data).toBeDefined();
    expect(links.self).toEqual(`${API_BASE_URL}${PATH}${subscriptionId}`);

    const { id, type, attributes, relationships } = data;
    expect(type).toBe(DATA_TYPE);
    expect(id).toEqual(subscriptionId.toString());
    expect(attributes).toBeDefined();
    expect(relationships).toBeDefined();

    const {
      store_id,
      customer_id,
      order_id,
      order_item_id,
      product_id,
      variant_id,
      product_name,
      variant_name,
      user_name,
      user_email,
      status,
      status_formatted,
      card_brand,
      card_last_four,
      pause,
      cancelled,
      trial_ends_at,
      billing_anchor,
      first_subscription_item,
      urls,
      renews_at,
      ends_at,
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
      variant_id,
      product_name,
      variant_name,
      user_name,
      user_email,
      status,
      status_formatted,
      card_brand,
      card_last_four,
      pause,
      cancelled,
      trial_ends_at,
      billing_anchor,
      first_subscription_item,
      urls,
      renews_at,
      ends_at,
      created_at,
      updated_at,
      test_mode,
    ];
    expect(Object.keys(attributes).length).toEqual(items.length);
    for (const item of items) expect(item).toBeDefined();

    if (first_subscription_item) {
      const {
        id,
        subscription_id,
        price_id,
        quantity,
        is_usage_based,
        created_at,
        updated_at,
      } = first_subscription_item;
      const firstItems = [
        id,
        subscription_id,
        price_id,
        quantity,
        is_usage_based,
        created_at,
        updated_at,
      ];
      expect(Object.keys(first_subscription_item).length).toEqual(
        firstItems.length
      );
      for (const item of firstItems) expect(item).toBeDefined();
    } else expect(first_subscription_item).toBeNull();

    // urls
    const {
      update_payment_method,
      customer_portal,
      customer_portal_update_subscription,
    } = urls;
    const urlItems = [
      update_payment_method,
      customer_portal,
      customer_portal_update_subscription,
    ];
    expect(Object.keys(urls).length).toEqual(urlItems.length);
    for (const item of urlItems) expect(item).toBeString();

    const {
      store,
      customer,
      order,
      "order-item": orderItem,
      product,
      variant,
      "subscription-items": subscriptionItems,
      "subscription-invoices": subscriptionInvoices,
    } = relationships;
    const relationshipItems = [
      store,
      customer,
      order,
      orderItem,
      product,
      variant,
      subscriptionItems,
      subscriptionInvoices,
    ];
    expect(Object.keys(relationships).length).toEqual(relationshipItems.length);
    for (const item of relationshipItems) expect(item.links).toBeDefined();
  });

  it("Should return the subscription with related resources", async () => {
    const {
      statusCode,
      error,
      data: _data,
    } = await getSubscription(subscriptionId, { include: ["product"] });
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { data, links, included } = _data!;
    expect(data).toBeDefined();
    expect(links.self).toEqual(`${API_BASE_URL}${PATH}${subscriptionId}`);
    expect(included).toBeArray();
    expect(!!included?.filter((item) => item.type === "products")).toBeTrue();

    const { id, type, attributes, relationships } = data;
    expect(type).toBe(DATA_TYPE);
    expect(id).toEqual(subscriptionId.toString());
    expect(attributes).toBeDefined();
    expect(relationships).toBeDefined();

    const {
      store_id,
      customer_id,
      order_id,
      order_item_id,
      product_id,
      variant_id,
      product_name,
      variant_name,
      user_name,
      user_email,
      status,
      status_formatted,
      card_brand,
      card_last_four,
      pause,
      cancelled,
      trial_ends_at,
      billing_anchor,
      first_subscription_item,
      urls,
      renews_at,
      ends_at,
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
      variant_id,
      product_name,
      variant_name,
      user_name,
      user_email,
      status,
      status_formatted,
      card_brand,
      card_last_four,
      pause,
      cancelled,
      trial_ends_at,
      billing_anchor,
      first_subscription_item,
      urls,
      renews_at,
      ends_at,
      created_at,
      updated_at,
      test_mode,
    ];
    expect(Object.keys(attributes).length).toEqual(items.length);
    for (const item of items) expect(item).toBeDefined();

    if (first_subscription_item) {
      const {
        id,
        subscription_id,
        price_id,
        quantity,
        is_usage_based,
        created_at,
        updated_at,
      } = first_subscription_item;
      const firstItems = [
        id,
        subscription_id,
        price_id,
        quantity,
        is_usage_based,
        created_at,
        updated_at,
      ];
      expect(Object.keys(first_subscription_item).length).toEqual(
        firstItems.length
      );
      for (const item of firstItems) expect(item).toBeDefined();
    } else expect(first_subscription_item).toBeNull();

    // urls
    const {
      update_payment_method,
      customer_portal,
      customer_portal_update_subscription,
    } = urls;
    const urlItems = [
      update_payment_method,
      customer_portal,
      customer_portal_update_subscription,
    ];
    expect(Object.keys(urls).length).toEqual(urlItems.length);
    for (const item of urlItems) expect(item).toBeString();

    const {
      store,
      customer,
      order,
      "order-item": orderItem,
      product,
      variant,
      "subscription-items": subscriptionItems,
      "subscription-invoices": subscriptionInvoices,
    } = relationships;
    const relationshipItems = [
      store,
      customer,
      order,
      orderItem,
      product,
      variant,
      subscriptionItems,
      subscriptionInvoices,
    ];
    expect(Object.keys(relationships).length).toEqual(relationshipItems.length);
    for (const item of relationshipItems) expect(item.links).toBeDefined();
  });
});

describe("Cancel a subscription", () => {
  it("Throw an error about a parameter that must be provided", async () => {
    try {
      await cancelSubscription("");
    } catch (error) {
      expect((error as Error).message).toMatch(
        "Please provide the required parameter:"
      );
    }
  });

  it("The current subscription should be successfully canceled", async () => {
    const {
      statusCode,
      error,
      data: _data,
    } = await cancelSubscription(subscriptionId);
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { data, links } = _data!;
    expect(data).toBeDefined();
    expect(links.self).toEqual(`${API_BASE_URL}${PATH}${subscriptionId}`);

    const { id, type, attributes } = data;
    expect(id).toEqual(subscriptionId.toString());
    expect(type).toBe(DATA_TYPE);
    expect(attributes.status).toEqual("cancelled");
  });
});

describe("Update a subscription", () => {
  it("Throw an error about a parameter that must be provided", async () => {
    try {
      await updateSubscription("", {});
    } catch (error) {
      expect((error as Error).message).toMatch(
        "Please provide the required parameter:"
      );
    }
  });

  it("The subscription should be successfully canceled", async () => {
    const {
      statusCode,
      error,
      data: _data,
    } = await updateSubscription(subscriptionId, {
      cancelled: true,
    });
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { data, links } = _data!;
    expect(data).toBeDefined();
    expect(links.self).toEqual(`${API_BASE_URL}${PATH}${subscriptionId}`);

    const { id, type, attributes } = data;
    expect(id).toEqual(subscriptionId.toString());
    expect(type).toBe(DATA_TYPE);
    expect(attributes).toBeDefined();

    const { cancelled } = attributes;
    expect(cancelled).toBeTrue();
  });

  it("The subscription should be successfully active", async () => {
    const {
      statusCode,
      error,
      data: _data,
    } = await updateSubscription(subscriptionId, {
      cancelled: false,
    });
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { data, links } = _data!;
    expect(data).toBeDefined();
    expect(links.self).toEqual(`${API_BASE_URL}${PATH}${subscriptionId}`);

    const { id, type, attributes } = data;
    expect(id).toEqual(subscriptionId.toString());
    expect(type).toBe(DATA_TYPE);
    expect(attributes).toBeDefined();

    const { cancelled } = attributes;
    expect(cancelled).toBeFalse();
  });

  it("The subscription should be changed to trial_ends_at", async () => {
    function formatISO8601(isoString: string) {
      const date = new Date(isoString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    const trialEndsAt = new Date("2024-04-25").toISOString();
    const {
      statusCode,
      error,
      data: _data,
    } = await updateSubscription(subscriptionId, {
      trialEndsAt,
    });

    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { data, links } = _data!;
    expect(data).toBeDefined();
    expect(links.self).toEqual(`${API_BASE_URL}${PATH}${subscriptionId}`);

    const { id, type, attributes } = data;
    expect(id).toEqual(subscriptionId.toString());
    expect(type).toBe(DATA_TYPE);
    expect(attributes).toBeDefined();

    const { trial_ends_at } = attributes;
    expect(formatISO8601(trial_ends_at!)).toEqual(formatISO8601(trialEndsAt));
  });

  it("The payment should be changed to pause", async () => {
    const mode = "void";
    const billingAnchor = 25;
    const {
      statusCode,
      error,
      data: _data,
    } = await updateSubscription(subscriptionId, {
      pause: {
        mode,
      },
      billingAnchor,
    });
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { data, links } = _data!;
    expect(data).toBeDefined();
    expect(links.self).toEqual(`${API_BASE_URL}${PATH}${subscriptionId}`);

    const { id, type, attributes } = data;
    expect(id).toEqual(subscriptionId.toString());
    expect(type).toBe(DATA_TYPE);
    expect(attributes).toBeDefined();

    const { pause, billing_anchor } = attributes;
    expect(pause).toEqual({ mode, resumes_at: null });
    expect(billing_anchor).toEqual(billingAnchor);
  });

  it("Successful call with invoiceImmediately parameter", async () => {
    const {
      statusCode,
      error,
      data: _data,
    } = await updateSubscription(subscriptionId, {
      invoiceImmediately: true,
    });
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { data, links } = _data!;
    expect(data).toBeDefined();
    expect(links.self).toEqual(`${API_BASE_URL}${PATH}${subscriptionId}`);

    const { id, type, attributes } = data;
    expect(id).toEqual(subscriptionId.toString());
    expect(type).toBe(DATA_TYPE);
    expect(attributes).toBeDefined();
  });

  it("Successful call with disableProrations parameter", async () => {
    const {
      statusCode,
      error,
      data: _data,
    } = await updateSubscription(subscriptionId, {
      disableProrations: true,
    });
    expect(statusCode).toEqual(200);
    expect(error).toBeNull();
    expect(_data).toBeDefined();

    const { data, links } = _data!;
    expect(data).toBeDefined();
    expect(links.self).toEqual(`${API_BASE_URL}${PATH}${subscriptionId}`);

    const { id, type, attributes } = data;
    expect(id).toEqual(subscriptionId.toString());
    expect(type).toBe(DATA_TYPE);
    expect(attributes).toBeDefined();
  });
});
