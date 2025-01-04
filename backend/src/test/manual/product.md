# API Testes - Product

## 1. **Create Product (POST /products):**
   - **Input:**
      - URL: `http://localhost:3000/api/v1/products`
      - Body:
     ```json
     {
        "productCode": "P12345",
        "commercialName": "Produto A",
        "genericName": "Produto Genérico A",
        "characteristics": "Produto de uso geral",
        "dangerLevel": "medium",
        "batch": "B1234",
        "manufacturingDate": "2024-01-01",
        "expirationDate": "2026-01-01",
        "status": "produced",
        "manufacturerName": "Fabricante X",
        "cnpj": "12.345.678/0001-95",
        "tradeName": "Produto Comercial A",
        "trackingCode": "TRK123456789",
        "destinationPoint": "Destino A",
        "location": "Armazém A",
        "event": "Produto em transporte"
     }
     ```
   - **Expected Output:** 
     - Status: 201 Created
     - Message: "Produto criado com sucesso"
     - Product Data: 
     ```json
     {
       "id": "some-uuid",
       "productCode": "P12345",
       "commercialName": "Produto A",
       "genericName": "Produto Genérico A",
       "characteristics": "Produto de uso geral",
       "dangerLevel": "medium",
       "batch": "B1234",
       "manufacturingDate": "2024-01-01",
       "expirationDate": "2025-01-01",
       "status": "produced",
       "manufacturerName": "Fabricante X",
       "cnpj": "12.345.678/0001-95",
       "tradeName": "Produto Comercial A",
       "trackingCode": "TRK123456789",
       "destinationPoint": "Destino A"
     },
     "tracking": {
       "id": "some-tracking-uuid",
       "location": "Armazém A",
       "event": "Produto em transporte",
       "timestamp": "2024-01-02T10:00:00Z",
       "productId": "some-uuid"
     }
     ```

## 2. **Get All Products (GET /products):**
   - **Input:**
      - URL: `http://localhost:3000/api/v1/products`
   - **Expected Output:** 
     - Status: 200 OK
     - Products: 
     ```json
     [
      {
        "id": "5748d742-7954-4fd4-ad17-3adae3211e6e",
        "productCode": "P12345",
        "commercialName": "Produto A",
        "genericName": "Produto Genérico A",
        "characteristics": "Produto de uso geral",
        "dangerLevel": "medium",
        "batch": "B1234",
        "manufacturingDate": "2024-01-01T00:00:00.000Z",
        "expirationDate": "2026-01-01T00:00:00.000Z",
        "status": "produced",
        "manufacturerName": "Fabricante X",
        "cnpj": "12.345.678/0001-95",
        "tradeName": "Produto Comercial A",
        "trackingCode": "TRK123456789",
        "createdAt": "2025-01-04T18:26:38.848Z",
        "updatedAt": "2025-01-04T18:26:38.848Z"
      }
    ]
     ```

## 3. **Get Product by CNPJ (GET /products/cnpj):**
   - **Input:**
      - URL: `http://localhost:3000/api/v1/products/cnpj`
      - Body:
     ```json
      {
        "cnpj":"12.345.678/0001-95"
      }
     ```
   - **Expected Output:** 
     - Status: 200 OK
     - Product Data: 
     ```json
     [
      {
        "id": "5748d742-7954-4fd4-ad17-3adae3211e6e",
        "productCode": "P12345",
        "commercialName": "Produto A",
        "genericName": "Produto Genérico A",
        "characteristics": "Produto de uso geral",
        "dangerLevel": "medium",
        "batch": "B1234",
        "manufacturingDate": "2024-01-01T00:00:00.000Z",
        "expirationDate": "2026-01-01T00:00:00.000Z",
        "status": "produced",
        "manufacturerName": "Fabricante X",
        "cnpj": "12.345.678/0001-95",
        "tradeName": "Produto Comercial A",
        "trackingCode": "TRK123456789",
        "createdAt": "2025-01-04T18:26:38.848Z",
        "updatedAt": "2025-01-04T18:26:38.848Z"
      }
    ]
     ```

## 4. **Get Tracking by TrackingCode (GET /products/tracking/:trackingCode):**
   - **Input:**
      - URL: `http://localhost:3000/api/v1/products/tracking/TRK123456789`
   - **Expected Output:** 
     - Status: 200 OK
     - Products: 
     ```json
     [
      {
        "id": 1,
        "location": "Armazém A",
        "event": "Produto em transporte",
        "timestamp": "2025-01-04T18:26:38.917Z",
        "trackingCode": "TRK123456789",
        "destinationPoint": "Destino A",
        "createdAt": "2025-01-04T18:26:38.918Z",
        "updatedAt": "2025-01-04T18:26:38.918Z"
      },
      {
        "id": 2,
        "location": "Armazém B",
        "event": "Produto em transporte",
        "timestamp": "2025-01-04T18:26:55.722Z",
        "trackingCode": "TRK123456789",
        "destinationPoint": "Destino A",
        "createdAt": "2025-01-04T18:26:55.722Z",
        "updatedAt": "2025-01-04T18:26:55.722Z"
      }
    ]
     ```

## 6. **Add Tracking to Products (POST /products/tracking/:trackingCode):**
   - **Input:**
      - URL: `http://localhost:3000/api/v1/products/tracking/TRK123456789`
      - Body:
     ```json
     {
        "location": "Armazém B",
        "event": "Produto em transporte",
        "trackingCode": "TRK123456789",
        "destinationPoint": "Destino A"
     }
     ```
   - **Expected Output:** 
     - Status: 201 Created
     - Tracking Data: 
     ```json
     {
        "id": 2,
        "location": "Armazém B",
        "event": "Produto em transporte",
        "timestamp": "2025-01-04T18:26:55.722Z",
        "destinationPoint": "Destino A",
        "trackingCode": "TRK123456789",
        "updatedAt": "2025-01-04T18:26:55.722Z",
        "createdAt": "2025-01-04T18:26:55.722Z"
     }
     ```

## 7. **Get destinationPoint By Tracking (GET /products/:productId/tracking):**
   - **Input:**
      - URL: `http://localhost:3000/api/v1/products/tracking/TRK123456789/destination`
   - **Expected Output:** 
     - Status: 200 OK
     - Trackings: 
     ```json
     [
       {
         "id": "some-tracking-uuid",
         "location": "Armazém A",
         "event": "Produto em transporte",
         "timestamp": "2024-01-02T10:00:00Z",
         "productId": "some-uuid"
       },
       {
         "id": "some-other-tracking-uuid",
         "location": "Armazém B",
         "event": "Produto em estoque",
         "timestamp": "2024-01-02T11:00:00Z",
         "productId": "some-uuid"
       }
     ]
     ```
