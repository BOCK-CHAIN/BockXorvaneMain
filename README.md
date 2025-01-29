
npx prisma migrate dev --schema=prisma/main/schema.prisma
npx prisma migrate dev --schema=prisma/plura/schema.prisma

npm run prisma:generate
<!-- npm run prisma:migrate -->