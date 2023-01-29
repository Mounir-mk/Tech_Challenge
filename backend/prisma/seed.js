const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const { members, tags, memberTags } = require("./data");

async function main() {
  await prisma.member.createMany({
    data: members,
  });

  await prisma.tag.createMany({
    data: tags,
  });

  await prisma.member_tag.createMany({
    data: memberTags,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
