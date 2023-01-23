const AbstractManager = require("./AbstractManager");

class MemberManager extends AbstractManager {
  constructor() {
    super({ table: "member" });
  }

  insert(member) {
    return this.connection.query(
      `insert into ${this.table} (name) values (?)`,
      [member.name]
    );
  }

  update(member) {
    return this.connection.query(`update ${this.table} set ? where id = ?`, [
      member,
      member.id,
    ]);
  }
}

module.exports = MemberManager;
