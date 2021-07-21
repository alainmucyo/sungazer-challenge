## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### GET /docs for documentation

## Endpoints
``` markdown
$ POST /api/users/register 
     {
       name:'',
       username:'',
       password:''
     }
     
POST /api/users/login
    {
       username:'',
       password:''
     }
     
GET /api/users/check
  Checking current logged in user
  
POST /api/transactions
  {
     amount:0,
     description:'',
     type: 'withdraw' | 'deposit' 
  }     
  
GET /api/transactions
  Fetching all user's transactions  
```