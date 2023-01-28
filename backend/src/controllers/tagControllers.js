const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const browse = async (req, res) => {
  const tags = await prisma.tag.findMany();
  res.json(tags);
};

module.exports = {
  browse,
};
