import { beforeAll, describe, expect, it } from "bun:test";
import {
  activateLicense,
  deactivateLicense,
  lemonSqueezySetup,
  listLicenseKeys,
  updateLicenseKey,
  validateLicense,
} from "../../src";

const LicenseKey = import.meta.env.LEMON_SQUEEZY_LICENSE_KEY!;
let instanceId: string;
let licenseKeyId: string;

beforeAll(async () => {
  lemonSqueezySetup({ apiKey: import.meta.env.LEMON_SQUEEZY_API_KEY });
  const { data } = await listLicenseKeys();
  licenseKeyId =
    data?.data.find((item) => item.attributes.key === LicenseKey)?.id ?? "";
});

describe("Activate a license key", () => {
  it("Should return a response", async () => {
    // Before running, enable the license
    await updateLicenseKey(licenseKeyId, { disabled: false });

    const {
      statusCode,
      error: _error,
      data: _data,
    } = await activateLicense(LicenseKey, "Test");
    expect(statusCode).toEqual(200);
    expect(_error).toBeNull();
    expect(_data).toBeDefined();

    const { activated, error, license_key, instance, meta } = _data!;
    expect(activated).toBeTrue();
    expect(error).toBeNull();
    expect(license_key).toBeDefined();
    expect(instance).toBeDefined();
    expect(meta).toBeDefined();

    // license_key
    const {
      id,
      status,
      key,
      activation_limit,
      activation_usage,
      created_at,
      expires_at,
      test_mode,
    } = license_key;
    const items = [
      id,
      status,
      key,
      activation_limit,
      activation_usage,
      created_at,
      expires_at,
      test_mode,
    ];
    for (const item of items) expect(item).toBeDefined();

    // instance
    const instanceItems = [instance!.id, instance!.name, instance!.created_at];
    for (const item of instanceItems) expect(item).toBeDefined();

    // meta
    const {
      store_id,
      order_id,
      order_item_id,
      variant_id,
      variant_name,
      product_id,
      product_name,
      customer_id,
      customer_name,
      customer_email,
    } = meta;
    const metaItems = [
      store_id,
      order_id,
      order_item_id,
      variant_id,
      variant_name,
      product_id,
      product_name,
      customer_id,
      customer_name,
      customer_email,
    ];
    for (const item of metaItems) expect(item).toBeDefined();

    instanceId = instance!.id;
  });
});

describe("Failed to activate a license key", () => {
  it("Throw an error about a parameter that must be provided", async () => {
    try {
      await activateLicense("", "");
    } catch (error) {
      expect((error as Error).message).toMatch(
        "Please provide the required parameter:"
      );
    }
  });

  it("Should return a response with 400 statusCode and a error when it fails", async () => {
    // Before running, disable the license
    await updateLicenseKey(licenseKeyId, { disabled: true });

    const {
      statusCode,
      error: _error,
      data: _data,
    } = await activateLicense(LicenseKey, "Test");
    expect(statusCode).toEqual(400);
    expect(_error).toBeDefined();
    expect(_data).toBeDefined();

    const { activated, error, license_key, instance, meta } = _data!;
    expect(activated).toBeFalse();
    expect(error).toBeDefined();
    expect(license_key).toBeDefined();
    expect(instance).toBeUndefined();
    expect(meta).toBeDefined();

    // license_key
    const {
      id,
      status,
      key,
      activation_limit,
      activation_usage,
      created_at,
      expires_at,
      test_mode,
    } = license_key;
    const items = [
      id,
      status,
      key,
      activation_limit,
      activation_usage,
      created_at,
      expires_at,
      test_mode,
    ];
    for (const item of items) expect(item).toBeDefined();

    // meta
    const {
      store_id,
      order_id,
      order_item_id,
      variant_id,
      variant_name,
      product_id,
      product_name,
      customer_id,
      customer_name,
      customer_email,
    } = meta;
    const metaItems = [
      store_id,
      order_id,
      order_item_id,
      variant_id,
      variant_name,
      product_id,
      product_name,
      customer_id,
      customer_name,
      customer_email,
    ];
    for (const item of metaItems) expect(item).toBeDefined();

    // After running, enable the license
    await updateLicenseKey(licenseKeyId, { disabled: false });
  });

  it("Should return a response with 404 statusCode and a error when it fails", async () => {
    const {
      statusCode,
      error: _error,
      data: _data,
    } = await activateLicense(`${LicenseKey}B`, "Test");

    expect(statusCode).toEqual(404);
    expect(_error).toBeDefined();
    expect(_data).toBeDefined();

    const { activated, error } = _data!;
    expect(activated).toBeFalse();
    expect(error).toBeDefined();
  });
});

describe("Validate a license key", () => {
  it("Should return a response that does not contain an instance", async () => {
    const {
      statusCode,
      error: _error,
      data: _data,
    } = await validateLicense(LicenseKey);
    expect(statusCode).toEqual(200);
    expect(_error).toBeNull();
    expect(_data).toBeDefined();

    const { valid, error, license_key, meta } = _data!;
    expect(valid).toBeTrue();
    expect(error).toBeNull();
    expect(license_key).toBeDefined();
    expect(meta).toBeDefined();

    // license_key
    const {
      id,
      status,
      key,
      activation_limit,
      activation_usage,
      created_at,
      expires_at,
      test_mode,
    } = license_key;
    const items = [
      id,
      status,
      key,
      activation_limit,
      activation_usage,
      created_at,
      expires_at,
      test_mode,
    ];
    for (const item of items) expect(item).toBeDefined();

    // meta
    const {
      store_id,
      order_id,
      order_item_id,
      variant_id,
      variant_name,
      product_id,
      product_name,
      customer_id,
      customer_name,
      customer_email,
    } = meta;
    const metaItems = [
      store_id,
      order_id,
      order_item_id,
      variant_id,
      variant_name,
      product_id,
      product_name,
      customer_id,
      customer_name,
      customer_email,
    ];
    for (const item of metaItems) expect(item).toBeDefined();
  });

  it("Should return a response containing the instance", async () => {
    const {
      statusCode,
      error: _error,
      data: _data,
    } = await validateLicense(LicenseKey, instanceId);
    expect(statusCode).toEqual(200);
    expect(_error).toBeNull();
    expect(_data).toBeDefined();

    const { valid, error, license_key, meta, instance } = _data!;
    expect(valid).toBeTrue();
    expect(error).toBeNull();
    expect(license_key).toBeDefined();
    expect(meta).toBeDefined();
    expect(instance).toBeDefined();

    // license_key
    const {
      id,
      status,
      key,
      activation_limit,
      activation_usage,
      created_at,
      expires_at,
      test_mode,
    } = license_key;
    const items = [
      id,
      status,
      key,
      activation_limit,
      activation_usage,
      created_at,
      expires_at,
      test_mode,
    ];
    for (const item of items) expect(item).toBeDefined();

    // instance
    const instanceItems = [instance!.id, instance!.name, instance!.created_at];
    for (const item of instanceItems) expect(item).toBeDefined();

    // meta
    const {
      store_id,
      order_id,
      order_item_id,
      variant_id,
      variant_name,
      product_id,
      product_name,
      customer_id,
      customer_name,
      customer_email,
    } = meta;
    const metaItems = [
      store_id,
      order_id,
      order_item_id,
      variant_id,
      variant_name,
      product_id,
      product_name,
      customer_id,
      customer_name,
      customer_email,
    ];
    for (const item of metaItems) expect(item).toBeDefined();
  });
});

describe("Failed to validate a license key", async () => {
  it("Throw an error about a parameter that must be provided", async () => {
    try {
      await validateLicense("");
    } catch (error) {
      expect((error as Error).message).toMatch(
        "Please provide the required parameter:"
      );
    }
  });

  it("Should return a response with 400 statusCode and a error when it fails", async () => {
    // Before running, disable the license
    await updateLicenseKey(licenseKeyId, { disabled: true });

    const {
      statusCode,
      error: _error,
      data: _data,
    } = await validateLicense(LicenseKey);

    expect(statusCode).toEqual(400);
    expect(_error).toBeDefined();
    expect(_data).toBeDefined();

    const { valid, error, license_key, instance, meta } = _data!;
    expect(valid).toBeFalse();
    expect(error).toBeDefined();
    expect(license_key).toBeDefined();
    expect(instance).toBeNull();
    expect(meta).toBeDefined();

    // license_key
    const {
      id,
      status,
      key,
      activation_limit,
      activation_usage,
      created_at,
      expires_at,
      test_mode,
    } = license_key;
    const items = [
      id,
      status,
      key,
      activation_limit,
      activation_usage,
      created_at,
      expires_at,
      test_mode,
    ];
    for (const item of items) expect(item).toBeDefined();

    // meta
    const {
      store_id,
      order_id,
      order_item_id,
      variant_id,
      variant_name,
      product_id,
      product_name,
      customer_id,
      customer_name,
      customer_email,
    } = meta;
    const metaItems = [
      store_id,
      order_id,
      order_item_id,
      variant_id,
      variant_name,
      product_id,
      product_name,
      customer_id,
      customer_name,
      customer_email,
    ];
    for (const item of metaItems) expect(item).toBeDefined();

    // After running, enable the license
    await updateLicenseKey(licenseKeyId, { disabled: false });
  });

  it("Should return a response with 404 statusCode and a error when it fails", async () => {
    const {
      statusCode,
      error: _error,
      data: _data,
    } = await validateLicense(`${LicenseKey}B`);

    expect(statusCode).toEqual(404);
    expect(_error).toBeDefined();
    expect(_data).toBeDefined();

    const { valid, error } = _data!;
    expect(valid).toBeFalse();
    expect(error).toBeDefined();
  });
});

describe("Failed to deactivate a license key", async () => {
  it("Throw an error about a parameter that must be provided", async () => {
    try {
      await deactivateLicense("", "");
    } catch (error) {
      expect((error as Error).message).toMatch(
        "Please provide the required parameter:"
      );
    }
  });

  it("Should return a response with 400 statusCode and a error when it fails", async () => {
    // Before running, disable the license
    await updateLicenseKey(licenseKeyId, { disabled: true });

    const {
      statusCode,
      error: _error,
      data: _data,
    } = await deactivateLicense(LicenseKey, instanceId);

    expect(statusCode).toEqual(400);
    expect(_error).toBeDefined();
    expect(_data).toBeDefined();

    const { deactivated, error, license_key, meta } = _data!;
    expect(deactivated).toBeFalse();
    expect(error).toBeDefined();
    expect(license_key).toBeDefined();
    expect(meta).toBeDefined();

    // license_key
    const {
      id,
      status,
      key,
      activation_limit,
      activation_usage,
      created_at,
      expires_at,
      test_mode,
    } = license_key;
    const items = [
      id,
      status,
      key,
      activation_limit,
      activation_usage,
      created_at,
      expires_at,
      test_mode,
    ];
    for (const item of items) expect(item).toBeDefined();

    // meta
    const {
      store_id,
      order_id,
      order_item_id,
      variant_id,
      variant_name,
      product_id,
      product_name,
      customer_id,
      customer_name,
      customer_email,
    } = meta;
    const metaItems = [
      store_id,
      order_id,
      order_item_id,
      variant_id,
      variant_name,
      product_id,
      product_name,
      customer_id,
      customer_name,
      customer_email,
    ];
    for (const item of metaItems) expect(item).toBeDefined();

    // After running, enable the license
    await updateLicenseKey(licenseKeyId, { disabled: false });
  });

  it("Should return a response with 404 statusCode and a error when it fails", async () => {
    const {
      statusCode,
      error: _error,
      data: _data,
    } = await deactivateLicense(`${LicenseKey}B`, instanceId);

    expect(statusCode).toEqual(404);
    expect(_error).toBeDefined();
    expect(_data).toBeDefined();

    const { deactivated, error } = _data!;
    expect(deactivated).toBeFalse();
    expect(error).toBeDefined();
  });
});

describe("Deactivate a license key", () => {
  it("Should return a response", async () => {
    const {
      statusCode,
      error: _error,
      data: _data,
    } = await deactivateLicense(LicenseKey, instanceId);
    expect(statusCode).toEqual(200);
    expect(_error).toBeNull();
    expect(_data).toBeDefined();

    const { deactivated, error, license_key, meta } = _data!;
    expect(deactivated).toBeTrue();
    expect(error).toBeNull();
    expect(license_key).toBeDefined();
    expect(meta).toBeDefined();

    // license_key
    const {
      id,
      status,
      key,
      activation_limit,
      activation_usage,
      created_at,
      expires_at,
      test_mode,
    } = license_key;
    const items = [
      id,
      status,
      key,
      activation_limit,
      activation_usage,
      created_at,
      expires_at,
      test_mode,
    ];
    for (const item of items) expect(item).toBeDefined();

    // meta
    const {
      store_id,
      order_id,
      order_item_id,
      variant_id,
      variant_name,
      product_id,
      product_name,
      customer_id,
      customer_name,
      customer_email,
    } = meta;
    const metaItems = [
      store_id,
      order_id,
      order_item_id,
      variant_id,
      variant_name,
      product_id,
      product_name,
      customer_id,
      customer_name,
      customer_email,
    ];
    for (const item of metaItems) expect(item).toBeDefined();
  });
});
