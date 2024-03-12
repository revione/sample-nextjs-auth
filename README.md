### Next.js 14 + Next-Auth

In this project, we will explore the implementation of authentication and authorization in a Next.js 14 application using Next-Auth. We will cover important aspects such as installing dependencies, using Prisma for data management, and paying attention to the auth.ts and middleware.ts files.

Take a look [onlie](https://sample-nextjs-auth.vercel.app)

## What is this project about?

This project is an educational guide that shows you how to integrate Next.js with Next-Auth to manage authentication and authorization in a web application. The implementation you will see here is one of the many ways you can achieve this goal.

## Installing Dependencies

First, make sure you have Node.js installed on your system. Then, you can install the dependencies by running one of the following commands in your terminal:

```bash
npm install
# or
pnpm install
```

## Environment Variables

Before running the application, make sure to create a .env.local file based on the provided .env.local.example. You must provide your own AUTH_SECRET value, which is required by Next-Auth for secure authentication.

Here's an example .env.local file:

```plaintext
# prisma locations database
DATABASE_URL="file:./db/dev.db"

# Auth secret required for next-auth
AUTH_SECRET=your_auth_secret_here
```

Replace your_auth_secret_here with your own secret key. This ensures secure authentication for your Next.js application.

## Using Prisma

Prisma is a powerful tool that helps us manage the database easily. You can initiate a migration by running:

```bash
npx prisma migrate dev --name init
```

Additionally, to visualize and manage the database, you can use Prisma Studio by running:

```bash
npx prisma studio
```

## auth.ts File

The auth.ts file contains specific configuration for authentication, which is then used in the Next.js middleware. This file defines the authentication logic, including handling authentication providers and credential validation.

## middleware.ts File

The middleware.ts file imports the authentication configuration defined in auth.ts and uses it as middleware to process authorization before the protected page is rendered.

## Actions

In the app/actions directory, you will find a series of files containing functions to perform various actions, such as authenticating users, registering new users, and resetting passwords. These actions are handled on the server and used from the client-side files.

## Pages

Finally, in the app/pages directory, you will find the different pages of the application, including the login form, registration form, password reset page, and the protected page that requires authentication to access.

We hope this guide is helpful and helps you better understand how to implement authentication and authorization in your Next.js projects. If you have any questions, feel free to consult the official documentation of Next.js and Next-Auth or leave a comment in the GitHub repository. Happy coding! 🚀
