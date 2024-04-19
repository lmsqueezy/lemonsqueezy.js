import { beforeAll, describe, expect, it } from "bun:test";
import {
  createCheckout,
  getCheckout,
  lemonSqueezySetup,
  listCheckouts,
  listVariants,
} from "../../src";
import type { NewCheckout } from "../../src/checkouts/types";
import { API_BASE_URL } from "../../src/internal";

const DATA_TYPE = "checkouts";
const storeId = import.meta.env.LEMON_SQUEEZY_STORE_ID!;
let variantId: number | string;
let newCheckoutId: number | string;

beforeAll(async () => {
  lemonSqueezySetup({
    apiKey: import.meta.env.LEMON_SQUEEZY_API_KEY,
  });
  const { error, data } = await listVariants();
  if (error) return;
  variantId = data.data[0].id;
});

describe("Create a checkout", () => {
  it("Throw an error about a parameter that must be provided", async () => {
    try {
      await createCheckout(storeId, "");
    } catch (error) {
      expect((error as Error).message).toMatch(
        "Please provide the required parameter:"
      );
    }
  });

  it("A new checkout should be created with the given store id and variant id", async () => {
    const {
      error,
      data: _data,
      statusCode,
    } = await createCheckout(storeId, variantId);
    expect(error).toBeNull();
    expect(statusCode).toEqual(201);
    expect(_data).toBeDefined();

    const { data, links } = _data!;
    expect(data).toBeDefined();
    expect(links).toBeDefined();

    const { id, type, attributes, relationships } = data;
    expect(id).toBeDefined();
    expect(type).toEqual(DATA_TYPE);
    expect(attributes).toBeDefined();
    expect(relationships).toBeDefined();

    // attributes
    const {
      store_id,
      variant_id,
      custom_price,
      product_options,
      checkout_options,
      checkout_data,
      preview,
      expires_at,
      created_at,
      updated_at,
      test_mode,
      url,
    } = attributes;
    const items = [
      store_id,
      variant_id,
      custom_price,
      product_options,
      checkout_options,
      checkout_data,
      preview,
      expires_at,
      created_at,
      updated_at,
      test_mode,
      url,
    ];
    for (const item of items) expect(item).toBeDefined();
    expect(Object.keys(attributes).length).toEqual(items.length);
    expect(store_id).toEqual(Number(storeId));
    expect(variant_id).toEqual(Number(variantId));
    console.log("url", url);

    // product_options
    const {
      name,
      description,
      media,
      redirect_url,
      receipt_button_text,
      receipt_link_url,
      receipt_thank_you_note,
      enabled_variants,
      confirmation_title,
      confirmation_message,
      confirmation_button_text,
    } = product_options;
    const productOptionItems = [
      name,
      description,
      media,
      redirect_url,
      receipt_button_text,
      receipt_link_url,
      receipt_thank_you_note,
      enabled_variants,
      confirmation_title,
      confirmation_message,
      confirmation_button_text,
    ];
    for (const item of productOptionItems) expect(item).toBeDefined();
    expect(Object.keys(product_options).length).toEqual(
      productOptionItems.length
    );

    // checkout_options
    const {
      embed,
      media: checkoutOptionMedia,
      logo,
      desc,
      discount,
      skip_trial,
      quantity,
      dark,
      subscription_preview,
      button_color,
    } = checkout_options;
    const checkoutOptionItems = [
      embed,
      checkoutOptionMedia,
      logo,
      desc,
      discount,
      skip_trial,
      quantity,
      dark,
      subscription_preview,
      button_color,
    ];
    for (const item of checkoutOptionItems) expect(item).toBeDefined();
    expect(Object.keys(checkout_options).length).toEqual(
      checkoutOptionItems.length
    );

    // checkout_data
    const {
      email,
      name: checkoutDataName,
      billing_address,
      tax_number,
      discount_code,
      custom,
      variant_quantities,
    } = checkout_data;
    const checkoutDataItems = [
      email,
      checkoutDataName,
      billing_address,
      tax_number,
      discount_code,
      custom,
      variant_quantities,
    ];
    for (const item of checkoutDataItems) expect(item).toBeDefined();
    expect(Object.keys(checkout_data).length).toEqual(checkoutDataItems.length);

    // preview
    if (preview) {
      const {
        currency,
        currency_rate,
        subtotal,
        discount_total,
        tax,
        total,
        subtotal_usd,
        discount_total_usd,
        tax_usd,
        total_usd,
        subtotal_formatted,
        discount_total_formatted,
        tax_formatted,
        total_formatted,
      } = preview;
      const previewItems = [
        currency,
        currency_rate,
        subtotal,
        discount_total,
        tax,
        total,
        subtotal_usd,
        discount_total_usd,
        tax_usd,
        total_usd,
        subtotal_formatted,
        discount_total_formatted,
        tax_formatted,
        total_formatted,
      ];
      for (const item of previewItems) expect(item).toBeDefined();
      expect(Object.keys(preview).length).toEqual(previewItems.length);
    } else {
    }

    const { variant, store } = relationships;
    expect(variant.links).toBeDefined();
    expect(store.links).toBeDefined();

    const { self } = links;
    expect(self).toEqual(`${API_BASE_URL}/v1/${DATA_TYPE}/${id}`);

    newCheckoutId = id;
  });

  it("A new checkout should be created with the given store id, variant id and new checkout info", async () => {
    // NewCheckout
    const newCheckout = {
      // customPrice: 1,
      productOptions: {
        name: "New Checkout Test",
        description: "a new checkout test",
        media: ["https://google.com"],
        redirectUrl: "https://google.com",
        receiptButtonText: "Text Receipt",
        receiptLinkUrl: "https://lemonsqueezy.com",
        receiptThankYouNote: "Thanks to lemonsqueezy",
        enabledVariants: [Number(variantId)],
        confirmationTitle: "Thank you for your support",
        confirmationMessage: "Thank you for subscribing and have a great day",
        confirmationButtonText: "View Order",
      },
      checkoutOptions: {
        embed: true,
        media: true,
        logo: true,
        desc: true,
        dark: true,
        skipTrial: true,
        discount: false,
        buttonColor: "#ccc",
        subscriptionPreview: true,
      },
      checkoutData: {
        email: "tita0x00@gmail.com",
        name: "Lemon Squeezy Test",
        billingAddress: {
          country: "US",
        },
        taxNumber: "12345",
        // discountCode: 'Q3MJI5MG',
        custom: {
          userId: "1234567890",
          userName: "Mrs.A",
          nickName: "AAA",
        },
        variantQuantities: [],
      },
      expiresAt: null,
      preview: true,
      testMode: true,
    };
    const {
      error,
      data: _data,
      statusCode,
    } = await createCheckout(storeId, variantId, newCheckout as NewCheckout);
    expect(error).toBeNull();
    expect(statusCode).toEqual(201);
    expect(_data).toBeDefined();

    const { data, links } = _data!;
    expect(data).toBeDefined();
    expect(links).toBeDefined();

    const { id, type, attributes, relationships } = data;
    expect(id).toBeDefined();
    expect(type).toEqual(DATA_TYPE);
    expect(attributes).toBeDefined();
    expect(relationships).toBeDefined();

    // attributes
    const {
      store_id,
      variant_id,
      custom_price,
      product_options,
      checkout_options,
      checkout_data,
      preview,
      expires_at,
      created_at,
      updated_at,
      test_mode,
      url,
    } = attributes;
    const items = [
      store_id,
      variant_id,
      custom_price,
      product_options,
      checkout_options,
      checkout_data,
      preview,
      expires_at,
      created_at,
      updated_at,
      test_mode,
      url,
    ];
    for (const item of items) expect(item).toBeDefined();
    expect(Object.keys(attributes).length).toEqual(items.length);
    expect(store_id).toEqual(Number(storeId));
    expect(variant_id).toEqual(Number(variantId));
    console.log("url", url);

    // product_options
    const {
      name,
      description,
      media,
      redirect_url,
      receipt_button_text,
      receipt_link_url,
      receipt_thank_you_note,
      enabled_variants,
      confirmation_title,
      confirmation_message,
      confirmation_button_text,
    } = product_options;
    const productOptionItems = [
      name,
      description,
      media,
      redirect_url,
      receipt_button_text,
      receipt_link_url,
      receipt_thank_you_note,
      enabled_variants,
      confirmation_title,
      confirmation_message,
      confirmation_button_text,
    ];
    for (const item of productOptionItems) expect(item).toBeDefined();
    expect(Object.keys(product_options).length).toEqual(
      productOptionItems.length
    );
    expect(name).toEqual(newCheckout.productOptions.name);
    expect(description).toEqual(newCheckout.productOptions.description);
    expect(receipt_button_text).toEqual(
      newCheckout.productOptions.receiptButtonText
    );
    expect(receipt_link_url).toEqual(newCheckout.productOptions.receiptLinkUrl);
    expect(receipt_thank_you_note).toEqual(
      newCheckout.productOptions.receiptThankYouNote
    );

    // checkout_options
    const {
      embed,
      media: checkoutOptionMedia,
      logo,
      desc,
      discount,
      skip_trial,
      quantity,
      dark,
      subscription_preview,
      button_color,
    } = checkout_options;
    const checkoutOptionItems = [
      embed,
      checkoutOptionMedia,
      logo,
      desc,
      discount,
      skip_trial,
      quantity,
      dark,
      subscription_preview,
      button_color,
    ];
    for (const item of checkoutOptionItems) expect(item).toBeDefined();
    expect(Object.keys(checkout_options).length).toEqual(
      checkoutOptionItems.length
    );
    expect(logo).toEqual(newCheckout.checkoutOptions.logo);
    expect(desc).toEqual(newCheckout.checkoutOptions.desc);
    expect(dark).toEqual(newCheckout.checkoutOptions.dark);
    expect(button_color).toEqual(newCheckout.checkoutOptions.buttonColor);
    expect(subscription_preview).toEqual(
      newCheckout.checkoutOptions.subscriptionPreview
    );

    // checkout_data
    const {
      email,
      name: checkoutDataName,
      billing_address,
      tax_number,
      discount_code,
      custom,
      variant_quantities,
    } = checkout_data;
    const checkoutDataItems = [
      email,
      checkoutDataName,
      billing_address,
      tax_number,
      discount_code,
      custom,
      variant_quantities,
    ];
    for (const item of checkoutDataItems) expect(item).toBeDefined();
    expect(Object.keys(checkout_data).length).toEqual(checkoutDataItems.length);
    expect(email).toEqual(newCheckout.checkoutData.email);
    expect(checkoutDataName).toEqual(newCheckout.checkoutData.name);

    // preview
    if (preview) {
      const {
        currency,
        currency_rate,
        subtotal,
        discount_total,
        tax,
        total,
        subtotal_usd,
        setup_fee,
        setup_fee_usd,
        discount_total_usd,
        tax_usd,
        total_usd,
        subtotal_formatted,
        discount_total_formatted,
        setup_fee_formatted,
        tax_formatted,
        total_formatted,
      } = preview;
      const previewItems = [
        currency,
        currency_rate,
        subtotal,
        discount_total,
        tax,
        setup_fee,
        setup_fee_usd,
        total,
        subtotal_usd,
        discount_total_usd,
        tax_usd,
        total_usd,
        subtotal_formatted,
        discount_total_formatted,
        setup_fee_formatted,
        tax_formatted,
        total_formatted,
      ];
      for (const item of previewItems) expect(item).toBeDefined();
      expect(Object.keys(preview).length).toEqual(previewItems.length);
    } else {
    }

    const { variant, store } = relationships;
    expect(variant.links).toBeDefined();
    expect(store.links).toBeDefined();

    const { self } = links;
    expect(self).toEqual(`${API_BASE_URL}/v1/${DATA_TYPE}/${id}`);
  });

  it("Failed to create a new checkout with 404 status code", async () => {
    const { error, data, statusCode } = await createCheckout(storeId, "123");
    expect(error).toBeDefined();
    expect(statusCode).toEqual(404);
    expect(data).toBeNull();
  });
});

describe("Retrieve a checkout", () => {
  it("Throw an error about a parameter that must be provided", async () => {
    try {
      await getCheckout("");
    } catch (error) {
      expect((error as Error).message).toMatch(
        "Please provide the required parameter:"
      );
    }
  });

  it("Should return the checkout with the given checkout id", async () => {
    const { error, data: _data, statusCode } = await getCheckout(newCheckoutId);
    expect(error).toBeNull();
    expect(statusCode).toEqual(200);
    expect(_data).toBeDefined();

    const { data, links } = _data!;
    expect(data).toBeDefined();
    expect(links).toBeDefined();

    const { id, type, attributes, relationships } = data;
    expect(id).toEqual(newCheckoutId.toString());
    expect(type).toEqual(DATA_TYPE);
    expect(attributes).toBeDefined();
    expect(relationships).toBeDefined();

    // attributes
    const {
      store_id,
      variant_id,
      custom_price,
      product_options,
      checkout_options,
      checkout_data,
      preview,
      expires_at,
      created_at,
      updated_at,
      test_mode,
      url,
    } = attributes;
    const items = [
      store_id,
      variant_id,
      custom_price,
      product_options,
      checkout_options,
      checkout_data,
      preview,
      expires_at,
      created_at,
      updated_at,
      test_mode,
      url,
    ];
    for (const item of items) expect(item).toBeDefined();
    expect(Object.keys(attributes).length).toEqual(items.length);
    expect(store_id).toEqual(Number(storeId));
    expect(variant_id).toEqual(Number(variantId));
    expect(url).toMatch(id);
    console.log("url", url);

    // product_options
    const {
      name,
      description,
      media,
      redirect_url,
      receipt_button_text,
      receipt_link_url,
      receipt_thank_you_note,
      enabled_variants,
      confirmation_title,
      confirmation_message,
      confirmation_button_text,
    } = product_options;
    const productOptionItems = [
      name,
      description,
      media,
      redirect_url,
      receipt_button_text,
      receipt_link_url,
      receipt_thank_you_note,
      enabled_variants,
      confirmation_title,
      confirmation_message,
      confirmation_button_text,
    ];
    for (const item of productOptionItems) expect(item).toBeDefined();
    expect(Object.keys(product_options).length).toEqual(
      productOptionItems.length
    );

    // checkout_options
    const {
      embed,
      media: checkoutOptionMedia,
      logo,
      desc,
      discount,
      quantity,
      dark,
      subscription_preview,
      button_color,
    } = checkout_options;
    const checkoutOptionItems = [
      embed,
      checkoutOptionMedia,
      logo,
      desc,
      discount,
      quantity,
      dark,
      subscription_preview,
      button_color,
    ];
    for (const item of checkoutOptionItems) expect(item).toBeDefined();
    expect(Object.keys(checkout_options).length).toEqual(
      checkoutOptionItems.length
    );

    // checkout_data
    const {
      email,
      name: checkoutDataName,
      billing_address,
      tax_number,
      discount_code,
      custom,
      variant_quantities,
    } = checkout_data;
    const checkoutDataItems = [
      email,
      checkoutDataName,
      billing_address,
      tax_number,
      discount_code,
      custom,
      variant_quantities,
    ];
    for (const item of checkoutDataItems) expect(item).toBeDefined();
    expect(Object.keys(checkout_data).length).toEqual(checkoutDataItems.length);

    // preview
    if (preview) {
      const {
        currency,
        currency_rate,
        subtotal,
        discount_total,
        tax,
        total,
        subtotal_usd,
        discount_total_usd,
        tax_usd,
        total_usd,
        subtotal_formatted,
        discount_total_formatted,
        tax_formatted,
        total_formatted,
      } = preview;
      const previewItems = [
        currency,
        currency_rate,
        subtotal,
        discount_total,
        tax,
        total,
        subtotal_usd,
        discount_total_usd,
        tax_usd,
        total_usd,
        subtotal_formatted,
        discount_total_formatted,
        tax_formatted,
        total_formatted,
      ];
      for (const item of previewItems) expect(item).toBeDefined();
      expect(Object.keys(preview).length).toEqual(previewItems.length);
    } else {
    }

    const { variant, store } = relationships;
    expect(variant.links).toBeDefined();
    expect(store.links).toBeDefined();

    const { self } = links;
    expect(self).toEqual(`${API_BASE_URL}/v1/${DATA_TYPE}/${newCheckoutId}`);
  });

  it("Should return the checkout with the given checkout id and related resources", async () => {
    const {
      error,
      data: _data,
      statusCode,
    } = await getCheckout(newCheckoutId, { include: ["store"] });
    expect(error).toBeNull();
    expect(statusCode).toEqual(200);
    expect(_data).toBeDefined();

    const { data, links, included } = _data!;
    expect(data).toBeDefined();
    expect(links).toBeDefined();
    expect(included).toBeArray();
    expect(!!included?.filter((item) => item.type === "stores")).toBeTrue();

    const { id, type, attributes, relationships } = data;
    expect(id).toEqual(newCheckoutId.toString());
    expect(type).toEqual(DATA_TYPE);
    expect(attributes).toBeDefined();
    expect(relationships).toBeDefined();

    // attributes
    const {
      store_id,
      variant_id,
      custom_price,
      product_options,
      checkout_options,
      checkout_data,
      preview,
      expires_at,
      created_at,
      updated_at,
      test_mode,
      url,
    } = attributes;
    const items = [
      store_id,
      variant_id,
      custom_price,
      product_options,
      checkout_options,
      checkout_data,
      preview,
      expires_at,
      created_at,
      updated_at,
      test_mode,
      url,
    ];
    for (const item of items) expect(item).toBeDefined();
    expect(Object.keys(attributes).length).toEqual(items.length);
    expect(store_id).toEqual(Number(storeId));
    expect(variant_id).toEqual(Number(variantId));
    expect(url).toMatch(id);
    console.log("url", url);

    // product_options
    const {
      name,
      description,
      media,
      redirect_url,
      receipt_button_text,
      receipt_link_url,
      receipt_thank_you_note,
      enabled_variants,
      confirmation_title,
      confirmation_message,
      confirmation_button_text,
    } = product_options;
    const productOptionItems = [
      name,
      description,
      media,
      redirect_url,
      receipt_button_text,
      receipt_link_url,
      receipt_thank_you_note,
      enabled_variants,
      confirmation_title,
      confirmation_message,
      confirmation_button_text,
    ];
    for (const item of productOptionItems) expect(item).toBeDefined();
    expect(Object.keys(product_options).length).toEqual(
      productOptionItems.length
    );

    // checkout_options
    const {
      embed,
      media: checkoutOptionMedia,
      logo,
      desc,
      discount,
      quantity,
      dark,
      subscription_preview,
      button_color,
    } = checkout_options;
    const checkoutOptionItems = [
      embed,
      checkoutOptionMedia,
      logo,
      desc,
      discount,
      quantity,
      dark,
      subscription_preview,
      button_color,
    ];
    for (const item of checkoutOptionItems) expect(item).toBeDefined();
    expect(Object.keys(checkout_options).length).toEqual(
      checkoutOptionItems.length
    );

    // checkout_data
    const {
      email,
      name: checkoutDataName,
      billing_address,
      tax_number,
      discount_code,
      custom,
      variant_quantities,
    } = checkout_data;
    const checkoutDataItems = [
      email,
      checkoutDataName,
      billing_address,
      tax_number,
      discount_code,
      custom,
      variant_quantities,
    ];
    for (const item of checkoutDataItems) expect(item).toBeDefined();
    expect(Object.keys(checkout_data).length).toEqual(checkoutDataItems.length);

    // preview
    if (preview) {
      const {
        currency,
        currency_rate,
        subtotal,
        discount_total,
        tax,
        total,
        subtotal_usd,
        discount_total_usd,
        tax_usd,
        total_usd,
        subtotal_formatted,
        discount_total_formatted,
        tax_formatted,
        total_formatted,
      } = preview;
      const previewItems = [
        currency,
        currency_rate,
        subtotal,
        discount_total,
        tax,
        total,
        subtotal_usd,
        discount_total_usd,
        tax_usd,
        total_usd,
        subtotal_formatted,
        discount_total_formatted,
        tax_formatted,
        total_formatted,
      ];
      for (const item of previewItems) expect(item).toBeDefined();
      expect(Object.keys(preview).length).toEqual(previewItems.length);
    } else {
    }

    const { variant, store } = relationships;
    expect(variant.links).toBeDefined();
    expect(store.links).toBeDefined();

    const { self } = links;
    expect(self).toEqual(`${API_BASE_URL}/v1/${DATA_TYPE}/${newCheckoutId}`);
  });
});

describe("List all checkouts", () => {
  it("Should return a paginated list of checkouts", async () => {
    const { error, data: _data, statusCode } = await listCheckouts();
    expect(error).toBeNull();
    expect(statusCode).toEqual(200);
    expect(_data).toBeDefined();

    const { meta, data, links } = _data!;
    expect(meta).toBeDefined();
    expect(data).toBeDefined();
    expect(data).toBeArray();
    expect(links.first).toBeDefined();
    expect(links.last).toBeDefined();

    const { currentPage, from, to, perPage, lastPage, total } = meta.page;
    const items = [currentPage, from, to, perPage, lastPage, total];
    for (const item of items) expect(item).toBeInteger();
    expect(Object.keys(meta.page).length).toEqual(items.length);
  });

  it("Should return a paginated list of checkouts with related resources", async () => {
    const {
      error,
      data: _data,
      statusCode,
    } = await listCheckouts({ include: ["store"] });
    expect(error).toBeNull();
    expect(statusCode).toEqual(200);
    expect(_data).toBeDefined();

    const { meta, data, links, included } = _data!;
    expect(meta).toBeDefined();
    expect(data).toBeDefined();
    expect(data).toBeArray();
    expect(links.first).toBeDefined();
    expect(links.last).toBeDefined();
    expect(included).toBeArray();
    expect(!!included?.filter((item) => item.type === "stores")).toBeTrue();

    const { currentPage, from, to, perPage, lastPage, total } = meta.page;
    const items = [currentPage, from, to, perPage, lastPage, total];
    for (const item of items) expect(item).toBeInteger();
    expect(Object.keys(meta.page).length).toEqual(items.length);
  });

  it("Should return a paginated list of checkouts filtered by store id", async () => {
    const {
      error,
      data: _data,
      statusCode,
    } = await listCheckouts({
      filter: { storeId },
    });

    expect(error).toBeNull();
    expect(statusCode).toEqual(200);
    expect(_data).toBeDefined();

    const { meta, data, links } = _data!;
    expect(meta).toBeDefined();
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

  it("Should return a paginated list of checkouts filtered by variant id", async () => {
    const {
      error,
      data: _data,
      statusCode,
    } = await listCheckouts({
      filter: { variantId },
    });
    expect(error).toBeNull();
    expect(statusCode).toEqual(200);
    expect(_data).toBeDefined();

    const { meta, data, links } = _data!;
    expect(meta).toBeDefined();
    expect(
      data.filter((item) => item.attributes.variant_id === Number(variantId))
        .length
    ).toEqual(data.length);
    expect(links.first).toBeDefined();
    expect(links.last).toBeDefined();

    const { currentPage, from, to, perPage, lastPage, total } = meta.page;
    const items = [currentPage, from, to, perPage, lastPage, total];
    for (const item of items) expect(item).toBeInteger();
    expect(Object.keys(meta.page).length).toEqual(items.length);
  });

  it("Should return a paginated list of checkouts with page_number = 1 and page_size = 5", async () => {
    const {
      error,
      data: _data,
      statusCode,
    } = await listCheckouts({
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
