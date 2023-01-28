const models = require("../models");

const browse = (req, res) => {
  models.member
    .findAllMembersAndTheirTags()
    .then(([rows]) => {
      // gather all the tags for each member in a single array of tags and remove all the duplicates
      const newRows = rows.reduce((acc, row) => {
        const member = acc.find((m) => m.id === row.id);
        if (member) {
          member.tags.push(row.tag_name);
        } else {
          acc.push({
            id: row.id,
            name: row.name,
            tags: [row.tag_name],
          });
        }
        return acc;
      }, []);
      res.send(newRows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.member
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        // gather all the tags for the member in a single array of tags
        const newRow = rows[0];
        newRow.tags = rows.map((row) => row.tag_name);
        res.send(newRow);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const member = req.body;

  // TODO validations (length, format...)

  member.id = parseInt(req.params.id, 10);

  models.member
    .update(member)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const member = req.body;

  // TODO validations (length, format...)

  models.member
    .insert(member)
    .then(([result]) => {
      res.location(`/members/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.member
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
