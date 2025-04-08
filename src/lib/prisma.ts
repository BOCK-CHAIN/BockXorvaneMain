import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const globalForPrisma = global as unknown as { prisma: typeof prisma }

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma

// import { PrismaClient as MainPrismaClient } from "@/../prisma/generated/main";
// import { PrismaClient as webBuild } from "@/../prisma/generated/webbuild";
// import { PrismaClient as autoWork } from "@/../prisma/generated/autowork";
// import { PrismaClient as workMan } from "@/../prisma/generated/workman";

// const prisma = new MainPrismaClient();
// const webbuild = new webBuild();
// const autowork = new autoWork();
// const workman = new workMan();

// const globalForPrisma = global as unknown as {
//   prisma?: typeof prisma;
//   webbuild?: typeof webbuild;
//   autowork?: typeof autowork;
//   workman?: typeof workman;
// };

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
//   globalForPrisma.webbuild = webbuild;
//   globalForPrisma.autowork = autowork;
//   globalForPrisma.workman = workman;
// }

// export { webbuild, autowork, workman };
// export default prisma;
