const MedicationTracking = artifacts.require("MedicationTracking");

contract("MedicationTracking", (accounts) => {
  let contract;

  const owner = accounts[0];
  const user1 = accounts[1];
  const user2 = accounts[2];

  const manufacturerName = "Pharma Co";
  const tradeName = "PharmaTrade";
  const cnpj = "12345678000195";

  const productId = "12345";
  const productCode = "ABC123";
  const commercialName = "Aspirin";
  const genericName = "Acetylsalicylic acid";
  const characteristics = "Pain reliever";
  const batch = "BATCH123";
  const manufacturingDate = 1630934400; // Unix timestamp
  const expirationDate = 1682544000; // Unix timestamp
  const trackingCode = "TRACK123";
  const destinationPoint = "Point A";

  beforeEach(async () => {
    contract = await MedicationTracking.new();
  });

  it("should deploy the contract and set the owner", async () => {
    const contractOwner = await contract.owner();
    assert.equal(contractOwner, owner, "The owner should be set correctly");
  });

  it("should authorize a user", async () => {
    await contract.authorizeUser(user1, { from: owner });
    const isAuthorized = await contract.authorizedUsers(user1);
    assert.isTrue(isAuthorized, "User1 should be authorized by the owner");
  });

  it("should not authorize a user by non-owner", async () => {
    try {
      await contract.authorizeUser(user2, { from: user1 });
      assert.fail("Non-owner should not be able to authorize users");
    } catch (err) {
      assert.include(
        err.message,
        "Apenas o dono do contrato pode autorizar novos usuarios."
      );
    }
  });

  it("should create a manufacturer", async () => {
    await contract.createManufacturer(manufacturerName, tradeName, cnpj, {
      from: owner,
    });
    const manufacturer = await contract.manufacturerById(cnpj);
    assert.equal(
      manufacturer.manufacturerName,
      manufacturerName,
      "Manufacturer name should match"
    );
    assert.equal(
      manufacturer.tradeName,
      tradeName,
      "Manufacturer trade name should match"
    );
    assert.equal(manufacturer.cnpj, cnpj, "Manufacturer CNPJ should match");
  });

  it("should not allow creating a manufacturer with an existing CNPJ", async () => {
    await contract.createManufacturer(manufacturerName, tradeName, cnpj, {
      from: owner,
    });
    try {
      await contract.createManufacturer("New Pharma", "NewTrade", cnpj, {
        from: owner,
      });
      assert.fail(
        "Should not allow creating a manufacturer with an existing CNPJ"
      );
    } catch (err) {
      assert.include(err.message, "Fabricante com este CNPJ ja existe.");
    }
  });

  it("should create a product", async () => {
    await contract.createManufacturer(manufacturerName, tradeName, cnpj, {
      from: owner,
    });
    await contract.createProduct(
      productId,
      productCode,
      commercialName,
      genericName,
      characteristics,
      batch,
      manufacturingDate,
      expirationDate,
      trackingCode,
      cnpj,
      { from: owner }
    );

    const product = await contract.productsById(productId);
    assert.equal(product.id, productId, "Product ID should match");
    assert.equal(product.productCode, productCode, "Product code should match");
    assert.equal(
      product.commercialName,
      commercialName,
      "Commercial name should match"
    );
  });

  it("should not create a product with an existing ID", async () => {
    await contract.createManufacturer(manufacturerName, tradeName, cnpj, {
      from: owner,
    });
    await contract.createProduct(
      productId,
      productCode,
      commercialName,
      genericName,
      characteristics,
      batch,
      manufacturingDate,
      expirationDate,
      trackingCode,
      cnpj,
      { from: owner }
    );
    try {
      await contract.createProduct(
        productId,
        "NEW123",
        commercialName,
        genericName,
        characteristics,
        batch,
        manufacturingDate,
        expirationDate,
        trackingCode,
        cnpj,
        { from: owner }
      );
      assert.fail("Should not allow creating a product with an existing ID");
    } catch (err) {
      assert.include(err.message, "Produto com este ID ja existe.");
    }
  });

  it("should add tracking information", async () => {
    await contract.createManufacturer(manufacturerName, tradeName, cnpj, {
      from: owner,
    });
    await contract.createProduct(
      productId,
      productCode,
      commercialName,
      genericName,
      characteristics,
      batch,
      manufacturingDate,
      expirationDate,
      trackingCode,
      cnpj,
      { from: owner }
    );

    await contract.addTracking(
      productId,
      "Location A",
      "In Transit",
      1630934400,
      trackingCode,
      destinationPoint,
      { from: owner }
    );

    const trackings = await contract.getTrackingsByCode(trackingCode);
    assert.equal(trackings.length, 1, "There should be one tracking entry");
    assert.equal(
      trackings[0].location,
      "Location A",
      "Tracking location should match"
    );
    assert.equal(
      trackings[0].status,
      "In Transit",
      "Tracking status should match"
    );
    assert.equal(
      trackings[0].destinationPoint,
      destinationPoint,
      "Tracking destination should match"
    );
  });

  it("should return all products", async () => {
    await contract.createManufacturer(manufacturerName, tradeName, cnpj, {
      from: owner,
    });
    await contract.createProduct(
      productId,
      productCode,
      commercialName,
      genericName,
      characteristics,
      batch,
      manufacturingDate,
      expirationDate,
      trackingCode,
      cnpj,
      { from: owner }
    );

    const products = await contract.getAllProducts();
    assert.equal(products.length, 1, "There should be one product");
    assert.equal(products[0].id, productId, "Product ID should match");
  });

  it("should return products by CNPJ", async () => {
    await contract.createManufacturer(manufacturerName, tradeName, cnpj, {
      from: owner,
    });
    await contract.createProduct(
      productId,
      productCode,
      commercialName,
      genericName,
      characteristics,
      batch,
      manufacturingDate,
      expirationDate,
      trackingCode,
      cnpj,
      { from: owner }
    );

    const products = await contract.getProductsByCnpj(cnpj);
    assert.equal(
      products.length,
      1,
      "There should be one product associated with this CNPJ"
    );
    assert.equal(products[0].id, productId, "Product ID should match");
  });

  it("should return destination point by tracking code", async () => {
    await contract.createManufacturer(manufacturerName, tradeName, cnpj, {
      from: owner,
    });
    await contract.createProduct(
      productId,
      productCode,
      commercialName,
      genericName,
      characteristics,
      batch,
      manufacturingDate,
      expirationDate,
      trackingCode,
      cnpj,
      { from: owner }
    );

    await contract.addTracking(
      productId,
      "Location A",
      "In Transit",
      1630934400,
      trackingCode,
      destinationPoint,
      { from: owner }
    );

    const destination = await contract.getDestinationPointByTrackingCode(
      trackingCode
    );
    assert.equal(
      destination,
      destinationPoint,
      "Destination point should match"
    );
  });

  it("should throw an error when getting destination point with no tracking", async () => {
    try {
      await contract.getDestinationPointByTrackingCode("NON_EXISTENT_TRACKING");
      assert.fail("Should throw an error when no tracking exists for the code");
    } catch (err) {
      assert.include(
        err.message,
        "Nenhum rastreamento encontrado para este codigo."
      );
    }
  });
});
