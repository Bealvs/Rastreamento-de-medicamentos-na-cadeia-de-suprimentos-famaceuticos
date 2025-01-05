# Test Cases for User Management API:

1. **User Registration (POST /register/user):**
   - **Input:**
      - URL: `http://localhost:3000/api/v1/users/register`
      - Body:
     ```json
     { 
       "name": "John Doe", 
       "cpf": "12345678901", 
       "cnpj": "12345678000195", 
       "email": "john@example.com", 
       "password": "123456", 
     }
     ```
   - **Expected Output:** 
     - Status: 201 Created
     - Message: "Usuário registrado"
     - User Data: `{ name: "John Doe", cpf: "12345678901", email: "john@example.com", role: "employee" }`

2. **User Registration with Missing Fields (POST /register/user):**
   - **Input:** 
      - URL: `http://localhost:3000/api/v1/users/register`
      - Body:
     ```json
     { 
       "name": "Jane Doe", 
       "email": "jane@example.com", 
       "password": "password123" 
     }
     ```
   - **Expected Output:** 
     - Status: 400 Bad Request
     - Error: "Erro ao registrar usuário"

3. **User Login (POST /login):**
   - **Input:** 
      - URL: `http://localhost:3000/api/v1/users/login`
      - Body:
     ```json
     { 
        "cpf": "12345678901", 
        "password": "123456"
     }
     ```
   - **Expected Output:** 
     - Status: 200 OK
     - Token: JWT token

4. **User Login with Invalid Credentials (POST /login):**
   - **Input:** 
      - URL: `http://localhost:3000/api/v1/users/login`
      - Body:
     ```json
     { 
       "cpf": "32323", 
       "password": "wrongpassword" 
     }
     ```
   - **Expected Output:** 
     - Status: 401 Unauthorized
     - Message: "Credenciais inválidas"

5. **Get User Profile (GET /profile) - Valid Token:**
   - **Input:** 
     - URL: `http://localhost:3000/api/v1/users/profile`
     - Authorization header: `Bearer <valid_token>`
   - **Expected Output:** 
     - Status: 200 OK
     - User Profile Data: `{ id, name, cpf, cnpj, email, role, createdAt, updatedAt }`

6. **Get User Profile with Invalid Token (GET /profile):**
   - **Input:** 
     - URL: `http://localhost:3000/api/v1/users/profile`
     - Authorization header: `Bearer <valid_token>`
   - **Expected Output:** 
     - Status: 401 Unauthorized
     - Message: "Token inválido"

7. **Update User Profile (PUT /profile):**
   - **Input:**
      - URL: `http://localhost:3000/api/v1/users/profile`
      - Authorization header: `Bearer <valid_token>` 
     ```json
     { "name": "John Updated", "email": "john_updated@example.com" }
     ```
   - **Expected Output:** 
     - Status: 200 OK
     - Message: "Perfil atualizado com sucesso"
     - Updated User Data

8. **Update User Profile with Missing Fields (PUT /profile):**
   - **Input:** 
      - URL: `http://localhost:3000/api/v1/users/profile`
      - Authorization header: `Bearer <valid_token>`
     ```json
     { "email": "john_updated@example.com" }
     ```
   - **Expected Output:** 
     - Status: 200 OK
     - Updated User Data

9. **Update User Profile with Invalid Token (PUT /profile):**
   - **Input:**
      - URL: `http://localhost:3000/api/v1/users/profile`
      - Authorization header: `Bearer <valid_token>` 
     ```json
     { "name": "Invalid User" }
     ```
     - Authorization header: `Bearer <invalid_token>`
   - **Expected Output:** 
     - Status: 401 Unauthorized
     - Message: "Token inválido"

10. **User Registration with Invalid CPF (POST /register):**
    - **Input:** 
      - URL: `http://localhost:3000/api/v1/users/register`
      - Authorization header: `Bearer <valid_token>`
      ```json
      { 
        "name": "User", 
        "cpf": "123", 
        "cnpj": "12345678000195", 
        "email": "user@example.com", 
        "password": "password123", 
        "role": "employee" 
      }
      ```
    - **Expected Output:** 
      - Status: 400 Bad Request
      - Error: "Erro ao registrar usuário"

11. **User Login with Missing Password (POST /login):**
    - **Input:** 
      - URL: `http://localhost:3000/api/v1/users/login`
       Authorization header: `Bearer <valid_token>`
      ```json
      { 
        "email": "john@example.com" 
      }
      ```
    - **Expected Output:** 
      - Status: 400 Bad Request
      - Error: "Senha é obrigatória"

12. **User Profile with Missing Authorization Header (GET /profile):**
    - **Input:** No Authorization header
      - URL: `http://localhost:3000/api/v1/users/profile`
    - **Expected Output:** 
      - Status: 401 Unauthorized
      - Message: "Token não fornecido"
