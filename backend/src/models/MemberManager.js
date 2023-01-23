const AbstractManager = require("./AbstractManager");

class MemberManager extends AbstractManager {
  constructor() {
    super({ table: "member" });
  }

  insert(member) {
    return this.connection.query(
      `insert into ${this.table} (title) values (?)`,
      [member.title]
    );
  }

  update(member) {
    return this.connection.query(
      `update ${this.table} set title = ? where id = ?`,
      [member.title, member.id]
    );
  }
}

module.exports = MemberManager;
