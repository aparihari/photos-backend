# Photos Backend

## How to start the development backend server

- Create an .env file at the root level  containing following properties
  ```md
  APP_NAME = backend
  PORT = 3000

  # Database
  MONGODB_URI = 'add your mongodb uri here'

  # Encryption
  ENCRYPTION_KEY = 'qUhyqrPdPVrAqAdUEAxkGPwFgaKwQrKM'

  # Auth
  AUTH_KEY = 'eHUzHcbPqPkjuMnGYBuDQzCnbwgitFWT'
  REFRESH_KEY = 'TRKukyxkAipHbVHZhBRvUVbKRAzPbWJH'

  # logging
  DEVELOPMENT_LOG_LEVEL = 'silly'
  PRODUCTION_LOG_LEVEL = 'error'
  ```
- Run `npm install`
- Run `npm run start:dev`
