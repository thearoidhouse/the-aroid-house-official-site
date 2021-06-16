# The Aroid House Official Site
<p>
  <img src='https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black'>

  <img src='https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white'>

  <img src='https://img.shields.io/badge/Chakra--UI-319795?style=for-the-badge&logo=chakra-ui&logoColor=white'>

  <img src='https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next-dot-js&logoColor=white'>

  <img src='https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white'>

  <img src='https://img.shields.io/badge/CosmicJS-29ABE1?style=for-the-badge'>
</p>

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

### Diagrams
#### Context Diagram
![Context Diagram](documentation/assets/ContextDiagram.jpg)

#### Container + Component Diagram
![Container Component Diagram](documentation/assets/ContianerComponentDiagram.jpg)

#### Code Diagram
![Code Diagram](documentation/assets/CodeDiagram.jpg)

### Design Decisions

Major driving factor of our decision is cost. We need to keep cost as close to zero as possible. For to that cost driving factor, we have decided to go with

#### UI Library
We considered two. ChakraUI and TailwindCSS.

TailwindCSS definitely gives better customizability over ChakraUI but the initial learning curve is steep for us. Our team is well versed with ChakraUI but no experience with TailwindCSS. For that reason, we decided to go with CharaUI for this project. We will try out TaildwindCSS for next project.

#### Web Framework
NextJS. Our team is well versed in NextJS and we have little to zero developer friction/initial learning curve time is reduced. Time to delivery reduced.

Also NextJS is built upon React framework. We could make use of multitute of community desigend components.

#### Hosting
Vercel hobby plan has generous limits. 100GB of bandwith per month. If the site grows too big then will have to migrate over to the team plan. [See vercel plans pricing here.](https://vercel.com/pricing)

#### Content Management
We considered two. Strapi and CosmicJS. 

Strapi gives user and developers more flexibility and customizability. One big con is that it has to be self hosted.

CosmicJS gives user easier to use dashboard (compared to Strapi) to manage content. We decided to go with CosmicJS as it has generous limits. 10,000 API requests per month. It is also a managed service. [See CosmicJS pricing here.](https://www.cosmicjs.com/pricing)

#### Datastore/Database
We initially wanted to use firebase firestore. We found it hard to integrate with NextJS/Vercel serverless functions and thus went with MongoDB free tier M0 shared cluster.

We lose the ability to have realtime update of data which is not required in our current system. [See MongoDB pricing here.](https://www.mongodb.com/pricing)

## Authors
- [@YingSheng](https://yeowys.com)
- [@OkkarMin](https://okkarm.in)  