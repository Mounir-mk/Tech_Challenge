/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class MemberTagManager extends AbstractManager {
  constructor() {
    super({ table: "memberTag" });
  }

  insert({ member_id, tag_id }) {
    return this.connection.query(
      `insert into ${this.table} (member_id, tag_id) values (?, ?)`,
      [member_id, tag_id]
    );
  }

  update(memberTag) {
    return this.connection.query(
      `update ${this.table} set title = ? where id = ?`,
      [memberTag.title, memberTag.id]
    );
  }
}

module.exports = MemberTagManager;
