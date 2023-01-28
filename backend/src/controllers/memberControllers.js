const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const browse = async (req, res) => {
  const members = await prisma.member.findMany({
    include: {
      member_tag: {
        include: {
          tag: true,
        },
      },
    },
  });
  for (const member of members) {
    member.tags = member.member_tag.map((memberTag) => memberTag.tag.name);
    delete member.member_tag;
  }
  res.json(members);
};

const read = async (req, res) => {
  const { id } = req.params;
  const member = await prisma.member.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      member_tag: {
        include: {
          tag: true,
        },
      },
    },
  });
  // member.tags = member.member_tag.map((memberTag) => memberTag.tag.name);
  // delete member.member_tag;
  res.json(member);
};

const add = async (req, res) => {
  const member = await prisma.member.create({
    data: {
      name: req.body.name,
      age: req.body.age,
      member_tag: {
        create: req.body.tags.map((tag) => ({
          tag_id: tag.tag_id,
        })),
      },
    },
  });
  res.json({ member });
};

const edit = async (req, res) => {
  const { id } = req.params;
  const member = await prisma.member.update({
    where: {
      id: Number(id),
    },
    data: {
      name: req.body.name,
      age: req.body.age,
    },
  });
  res.json({ member });
};

const destroy = async (req, res) => {
  const { id } = req.params;
  const member = await prisma.member.delete({
    where: {
      id: Number(id),
    },
  });
  res.json({ member });
};

module.exports = {
  browse,
  read,
  add,
  edit,
  destroy,
};
