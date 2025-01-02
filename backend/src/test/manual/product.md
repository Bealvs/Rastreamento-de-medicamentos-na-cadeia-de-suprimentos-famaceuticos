1. **Test Case: Create a New Product**
   - **Objective:** Ensure a new product can be created successfully.
   - **Request:**
     - Method: POST
     - Endpoint: /api/v1/products
     - Body:
       ```json
       {
         "productCode": "P1234",
         "commercialName": "Paracetamol 500mg",
         "genericName": "Paracetamol",
         "characteristics": "Pain relief",
         "dangerLevel": "low",
         "batch": "B12345",
         "manufacturingDate": "2023-06-01",
         "expirationDate": "2025-06-01",
         "status": "produced",
         "manufacturerName": "ABC Pharma",
         "cnpj": "12.345.678/0001-90",
         "manufacturerEmail": "contact@abcpharma.com"
       }
       ```
   - **Expected Response:**
     - Status: 201 Created
     - Body: Product details with ID and other fields.

2. **Test Case: Get All Products**
   - **Objective:** Ensure the API can return all products.
   - **Request:**
     - Method: GET
     - Endpoint: /api/v1/products
   - **Expected Response:**
     - Status: 200 OK
     - Body: List of all products in the database.

3. **Test Case: Get Products by Manufacturer**
   - **Objective:** Ensure the API can return products by a specific manufacturer.
   - **Request:**
     - Method: GET
     - Endpoint: /api/v1/products/manufacturer/ABC%20Pharma
   - **Expected Response:**
     - Status: 200 OK
     - Body: List of products from "ABC Pharma".

4. **Test Case: Get Products by Status**
   - **Objective:** Ensure the API can return products based on their status.
   - **Request:**
     - Method: GET
     - Endpoint: /api/v1/products/status/produced
   - **Expected Response:**
     - Status: 200 OK
     - Body: List of products with status "produced".

5. **Test Case: Add Tracking to Product**
   - **Objective:** Ensure the API can add tracking information to a product.
   - **Request:**
     - Method: POST
     - Endpoint: /api/v1/products/:productId/tracking
     - Body:
       ```json
       {
         "location": "Warehouse A",
         "event": "Shipped",
         "timestamp": "2024-01-01T10:00:00Z"
       }
       ```
   - **Expected Response:**
     - Status: 201 Created
     - Body: Tracking information for the product.

6. **Test Case: Get Trackings by Product**
   - **Objective:** Ensure the API can return all tracking information for a specific product.
   - **Request:**
     - Method: GET
     - Endpoint: /api/v1/products/:productId/tracking
   - **Expected Response:**
     - Status: 200 OK
     - Body: List of tracking entries for the specified product.

7. **Test Case: Create Product with Invalid CNPJ**
   - **Objective:** Ensure that an error is thrown when trying to create a product with an invalid CNPJ format.
   - **Request:**
     - Method: POST
     - Endpoint: /api/v1/products
     - Body:
       ```json
       {
         "productCode": "P5678",
         "commercialName": "Ibuprofen 200mg",
         "genericName": "Ibuprofen",
         "characteristics": "Anti-inflammatory",
         "dangerLevel": "medium",
         "batch": "B67890",
         "manufacturingDate": "2023-07-01",
         "expirationDate": "2025-07-01",
         "status": "produced",
         "manufacturerName": "XYZ Pharma",
         "cnpj": "12345678000190",
         "manufacturerEmail": "contact@xyzpharma.com"
       }
       ```
   - **Expected Response:**
     - Status: 400 Bad Request
     - Body: Error message indicating invalid CNPJ format.

8. **Test Case: Create Product with Missing Fields**
   - **Objective:** Ensure that an error is thrown when creating a product with missing required fields.
   - **Request:**
     - Method: POST
     - Endpoint: /api/v1/products
     - Body:
       ```json
       {
         "productCode": "P9876",
         "commercialName": "Aspirin 500mg",
         "genericName": "Aspirin",
         "batch": "B98765",
         "manufacturingDate": "2023-08-01",
         "expirationDate": "2025-08-01"
       }
       ```
   - **Expected Response:**
     - Status: 400 Bad Request
     - Body: Error message indicating missing required fields (e.g., `status`, `manufacturerName`).

9. **Test Case: Product Not Found for Tracking**
   - **Objective:** Ensure that an error is thrown when adding tracking to a non-existent product.
   - **Request:**
     - Method: POST
     - Endpoint: /api/v1/products/nonexistentProductId/tracking
     - Body:
       ```json
       {
         "location": "Warehouse B",
         "event": "Delivered",
         "timestamp": "2024-01-02T14:00:00Z"
       }
       ```
   - **Expected Response:**
     - Status: 404 Not Found
     - Body: Error message indicating product not found.

10. **Test Case: Get Trackings for Non-existent Product**
    - **Objective:** Ensure that an error is thrown when retrieving tracking information for a non-existent product.
    - **Request:**
      - Method: GET
      - Endpoint: /api/v1/products/nonexistentProductId/tracking
    - **Expected Response:**
      - Status: 404 Not Found
      - Body: Error message indicating product not found.
