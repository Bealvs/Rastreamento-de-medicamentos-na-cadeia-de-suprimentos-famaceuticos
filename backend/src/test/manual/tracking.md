# Test Cases for Tracking API:

1. **Create Tracking (POST /tracking/:productId):**
   - **Input:** 
     - URL: `http://localhost:3000/api/v1/tracking/{productId}`
     - Body:
       ```json
       {
         "location": "New York",
         "event": "Shipped",
         "timestamp": "2025-01-02T12:00:00Z"
       }
       ```
   - **Expected Output:** 
     - Status: 201 Created
     - Response: Tracking entry with the productId, location, event, and timestamp.
   
2. **Create Tracking with Missing Fields (POST /tracking/:productId):**
   - **Input:** 
     - URL: `http://localhost:3000/api/v1/tracking/{productId}`
     - Body:
       ```json
       {
         "location": "New York",
         "event": "Shipped"
       }
       ```
   - **Expected Output:** 
     - Status: 400 Bad Request
     - Response: Error: "Timestamp is required"

3. **Get All Trackings (GET /tracking):**
   - **Input:** 
     - URL: `http://localhost:3000/api/v1/tracking`
   - **Expected Output:** 
     - Status: 200 OK
     - Response: List of all tracking entries with location, event, timestamp, and productId.

4. **Get Tracking by ID (GET /tracking/:trackingId):**
   - **Input:** 
     - URL: `http://localhost:3000/api/v1/tracking/{trackingId}`
   - **Expected Output:** 
     - Status: 200 OK
     - Response: Tracking entry with the specified ID.

5. **Get Tracking by Invalid ID (GET /tracking/:trackingId):**
   - **Input:** 
     - URL: `http://localhost:3000/api/v1/tracking/invalidId`
   - **Expected Output:** 
     - Status: 404 Not Found
     - Response: Error: "Tracking not found"

6. **Create Tracking with Invalid Product ID (POST /tracking/:productId):**
   - **Input:** 
     - URL: `http://localhost:3000/api/v1/tracking/invalidProductId`
     - Body:
       ```json
       {
         "location": "Los Angeles",
         "event": "Delivered",
         "timestamp": "2025-01-02T14:00:00Z"
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
         "timestamp": "2025-01-02T16:00:00Z"
       }
       ```
   - **Expected Output:** 
     - Status: 401 Unauthorized
     - Response: Error: "Authorization required"
