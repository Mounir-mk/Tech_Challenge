const AbstractManager = require("./AbstractManager");

class MemberManager extends AbstractManager {
  constructor() {
    super({ table: "member" });
  }

  findAllMembersAndTheirTags() {
    return this.connection.query(
      `select m.id, m.name, t.name as tag_name from ${this.table} m left join member_tag mt on m.id = mt.member_id left join tag t on mt.tag_id = t.id`
    );
  }

  findMemberAndHisTags(id) {
    return this.connection.query(
      `select m.id, m.name, t.name as tag_name from ${this.table} m left join member_tag mt on m.id = mt.member_id left join tag t on mt.tag_id = t.id where m.id = ?`,
      [id]
    );
  }

  insert({ name, age }) {
    return this.connection.query(
      `insert into ${this.table} (name, age) values (?, ?)`,
      [name, age]
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
