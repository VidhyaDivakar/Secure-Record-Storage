The flow of this lab



User logs in from browser/Postman
   ↓
Server checks email/password
   ↓
Server creates JWT
   ↓
Server sends JWT back to client
   ↓
Client stores token
   ↓
Client sends token in Authorization header
   ↓
Request reaches server
   ↓
authMiddleware runs on server
   ↓
Middleware verifies token
   ↓
req.user gets decoded payload
   ↓
Protected route executes
   ↓
Notes linked to req.user._id

http://localhost:3006/api/users/login

{
  "email": "nir123@gmail.com",
  "password": "12341234"
}


{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTE1MDVjMzM5YmI1YjZmMDljYzJjNmMiLCJ1c2VybmFtZSI6Im5pciIsImlhdCI6MTc3OTc2Mjg4MywiZXhwIjoxNzc5NzY2NDgzfQ.sg_qHV1uUBX3bxPVbEMQrNhu_9gL-rv8rq3tiFNITJA",
  "user": {
    "_id": "6a1505c339bb5b6f09cc2c6c",
    "username": "nir",
    "email": "nir123@gmail.com"
  }
}


http://localhost:3006/api/users/me

in Headers:

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTE1MDVjMzM5YmI1YjZmMDljYzJjNmMiLCJ1c2VybmFtZSI6Im5pciIsImlhdCI6MTc3OTc2Mjg4MywiZXhwIjoxNzc5NzY2NDgzfQ.sg_qHV1uUBX3bxPVbEMQrNhu_9gL-rv8rq3tiFNITJA


Status: **200 OK**

Size: **86 Bytes**

Time: **86 ms**

{
  "_id": "6a1505c339bb5b6f09cc2c6c",
  "username": "nir",
  "email": "nir123@gmail.com",
  "__v": 0
}


http://localhost:3006/api/users/me

in headers: Authorization: Beaerer and same token as above


{
  "_id": "6a1505c339bb5b6f09cc2c6c",
  "username": "nir",
  "email": "nir123@gmail.com",
  "__v": 0
}


{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTE1MWYxYTgxYjBhMmVjNGQ3NDBhMWIiLCJ1c2VybmFtZSI6IlBpbmt5IiwiaWF0IjoxNzc5NzY5MTM1LCJleHAiOjE3Nzk3NzI3MzV9.6wqoQ655zkt8buAZXhpBpInZB1s4kB0loJ3J7ZSzAOo",
  "user": {
    "_id": "6a151f1a81b0a2ec4d740a1b",
    "username": "Pinky",
    "email": "pinky123@gmail.com"


login http://localhost:3006/api/users/login

{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTE1MDVjMzM5YmI1YjZmMDljYzJjNmMiLCJ1c2VybmFtZSI6Im5pciIsImlhdCI6MTc3OTc5ODA4MiwiZXhwIjoxNzc5ODAxNjgyfQ.uvsMN3qn4vV-ooNp3SzplUoHljft2nc3ulwr2OOSwUI",
  "user": {
    "_id": "6a1505c339bb5b6f09cc2c6c",
    "username": "nir",
    "email": "nir123@gmail.com"
  }
}
