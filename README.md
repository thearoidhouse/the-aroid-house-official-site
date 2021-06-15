# The Aroid House Official Site
Official site of TheAroidHouse. For [@marcusonaroids](https://www.instagram.com/marcusonaroids/). 

## Demo
INSERT DEMO GIF HERE

## Tech Stack
**Client:** NextJs, ChakraUI

**Server:** NextJs API routes, Vercel 

**Content Management:** CosmicJS

**Database:** MongoDB

## Run Locally
Clone the project
```bash
  git clone https://github.com/DanKarDev/the-aroid-house-official-site
```

Go to the project directory
```bash
  cd the-aroid-house-official-site
```

Install dependencies
```bash
  npm install
```

Start the server
```bash
  npm run dev
```

## Deployment
3 step process to deploying the site properly on vercel

1. Fork this repository into your own GitHub account.
2. Using vercel, deploy the repository. [Learn how to deploy on vercel](https://vercel.com/docs/introduction)
3. Put in the following enviornment variables. [Learn how to add env variables on vercel](https://vercel.com/docs/environment-variables)

```bash
# for logging into /admin to see all orders
  USERNAMES
  PASSWORDS
  ADMIN_EMAIL
  NEXTAUTH_URL 

# for storing orders
  MONGODB_URI
  MONGODB_DB

# for email invoice sending to customer
  SENDGRID_API_KEY
```

## Documentation

### Drawings

### Design Decision


## Authors
- [@YingSheng](https://yeowys.com)
- [@OkkarMin](https://okkarm.in)  