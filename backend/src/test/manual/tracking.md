# Test Cases for Tracking API:

1. **Create Tracking (POST /tracking/:productId):**
   - **Input:** 
     - URL: `http://localhost:3000/api/v1/tracking/{productId}`
     - Body:
       ```json
       {
         "location": "New York",
         "event": "Shipped",
       }
       ```
   - **Expected Output:** 
     - Status: 201 Created
     - Response: Tracking entry with the productId, location, event, and timestamp.

2. **Get All Trackings (GET /tracking):**
   - **Input:** 
     - URL: `http://localhost:3000/api/v1/tracking`
   - **Expected Output:** 
     - Status: 200 OK
     - Response: List of all tracking entries with location, event, timestamp, and productId.

3. **Get Tracking by ID (GET /tracking/:trackingId):**
   - **Input:** 
     - URL: `http://localhost:3000/api/v1/tracking/{trackingId}`
   - **Expected Output:** 
     - Status: 200 OK
     - Response: Tracking entry with the specified ID.

4. **Get Tracking by Invalid ID (GET /tracking/:trackingId):**
   - **Input:** 
     - URL: `http://localhost:3000/api/v1/tracking/invalidId`
   - **Expected Output:** 
     - Status: 404 Not Found
     - Response: Error: "Tracking not found"

5. **Create Tracking with Invalid Product ID (POST /tracking/:productId):**
   - **Input:** 
     - URL: `http://localhost:3000/api/v1/tracking/invalidProductId`
     - Body:
       ```json
       {
         "location": "Los Angeles",
         "event": "Delivered",
       }
       ```
   - **Expected Output:** 
     - Status: 400 Bad Request
     - Response: Error: "Product not found"

7. **Create Tracking Without Authorization (POST /tracking/:productId):**
   - **Input:** 
     - URL: `http://localhost:3000/api/v1/tracking/{productId}`
     - Body:
       ```json
       {
         "location": "San Francisco",
         "event": "In Transit",
       }
       ```
   - **Expected Output:** 
     - Status: 401 Unauthorized
     - Response: Error: "Authorization required"
