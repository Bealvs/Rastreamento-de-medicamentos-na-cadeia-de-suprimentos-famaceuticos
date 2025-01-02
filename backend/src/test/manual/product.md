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
       "expirationDate": "2025-01-01",
       "status": "produced",
       "manufacturerName": "Fabricante X",
       "cnpj": "12.345.678/0001-95",
       "tradeName": "Produto Comercial A",
       "trackingCode": "TRK123456789",
       "destinationPoint": "Destino A"
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
         "id": "some-uuid",
         "productCode": "P12345",
         "commercialName": "Produto A",
         "genericName": "Produto Genérico A",
         "status": "produced",
         "manufacturerName": "Fabricante X"
       }
     ]
     ```

## 3. **Get Product by Tracking Code (GET /products/:trackingCode):**
   - **Input:**
      - URL: `http://localhost:3000/api/v1/products/TRK123456789`
   - **Expected Output:** 
     - Status: 200 OK
     - Product Data: 
     ```json
     {
       "id": "some-uuid",
       "productCode": "P12345",
       "commercialName": "Produto A",
       "genericName": "Produto Genérico A",
       "status": "produced",
       "manufacturerName": "Fabricante X",
       "trackingCode": "TRK123456789"
     }
     ```

## 4. **Get Products by Manufacturer (GET /products/manufacturer/:manufacturerName):**
   - **Input:**
      - URL: `http://localhost:3000/api/v1/products/manufacturer/Fabricante X`
   - **Expected Output:** 
     - Status: 200 OK
     - Products: 
     ```json
     [
       {
         "id": "some-uuid",
         "productCode": "P12345",
         "commercialName": "Produto A",
         "genericName": "Produto Genérico A",
         "manufacturerName": "Fabricante X"
       }
     ]
     ```

## 5. **Get Products by Status (GET /products/status/:status):**
   - **Input:**
      - URL: `http://localhost:3000/api/v1/products/status/produced`
   - **Expected Output:** 
     - Status: 200 OK
     - Products: 
     ```json
     [
       {
         "id": "some-uuid",
         "productCode": "P12345",
         "commercialName": "Produto A",
         "genericName": "Produto Genérico A",
         "status": "produced",
         "manufacturerName": "Fabricante X"
       }
     ]
     ```

## 6. **Add Tracking to Product (POST /products/:productId/tracking):**
   - **Input:**
      - URL: `http://localhost:3000/api/v1/products/some-uuid/tracking`
      - Body:
     ```json
     {
       "location": "Armazém A",
       "event": "Produto em transporte",
       "timestamp": "2024-01-02T10:00:00Z"
     }
     ```
   - **Expected Output:** 
     - Status: 201 Created
     - Tracking Data: 
     ```json
     {
       "id": "some-tracking-uuid",
       "location": "Armazém A",
       "event": "Produto em transporte",
       "timestamp": "2024-01-02T10:00:00Z",
       "productId": "some-uuid"
     }
     ```

## 7. **Get All Trackings by Product (GET /products/:productId/tracking):**
   - **Input:**
      - URL: `http://localhost:3000/api/v1/products/some-uuid/tracking`
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
       }
     ]
     ```
