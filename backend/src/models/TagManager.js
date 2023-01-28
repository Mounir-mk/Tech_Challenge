const AbstractManager = require("./AbstractManager");

class TagManager extends AbstractManager {
  constructor() {
    super({ table: "tag" });
  }

  insert({ name }) {
    return this.connection.query(
      `insert into ${this.table} (name) values (?)`,
      [name]
    );
  }

  update(tag) {
    return this.connection.query(
      `update ${this.table} set title = ? where id = ?`,
      [tag.title, tag.id]
    );
  }
}

module.exports = TagManager;
