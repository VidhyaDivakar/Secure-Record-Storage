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
