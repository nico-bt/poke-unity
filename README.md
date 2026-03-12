## CookUnity challenge

Live: 🔗 https://poke-unity.vercel.app/

Techs used:
- Nextjs
- DB: Prisma ORM + Supabase
- Supabse storage: Bucket for uploading images
- Typescript
- Tailwind
- React hook form: client-side validation for add poke form
- zod: server-side validation

I followed the "Next way" of using server actions and getting direct access to db via Server Components.  
I did not create a separate api to access the data.  

<br>

[Original Challenge](Challenge.md)

<br>


## Public routes
You can browse and select a card:
- /
- pokemon/[id]
- /login

## Protected routes
  As an admin you can also add and delete cards
  - /admin

<br>  

## Notes for local setup 
I used Supabase instead of a local Docker database. 
This cloud instance can act as a shared live development/staging environment.  
  
After cloning the repo, you’ll need to create a `.env` file with your database access keys.    
If we were using a shared staging environment, this `.env` file could be provided privately via ClickUp, Slack, or another secure channel.  
Or send me a messagge if you want to run locally.
  
### Example `.env` file

> ⚠️ Replace the values below with the project credentials.

```env
SESSION_SECRET="thisIsJWTforSigninTheTokenForAdminPasswordsInDatabase"

DATABASE_URL="postgresql://yourURL"
DIRECT_URL="for migrations"

NEXT_PUBLIC_SUPABASE_URL="url"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY="forUploadingImages"

```
