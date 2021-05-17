const dbConn = require("../helpers/db.helper");
const table = "myTable";

exports.getRestoCountByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    const query = dbConn.query(
      `
    SELECT COUNT(name) as totalData FROM
    ${table} WHERE name LIKE "%${cond.search}%"
    ORDER BY ${cond.sort} ${cond.order}
    `,
      (err, res) => {
        if (err) reject(err);
        resolve(res);
      }
    );
    console.log(query.sql);
  });
};

exports.getRestoByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `SELECT * FROM ${table} m
			WHERE m.name LIKE "%${cond.search}%"
			ORDER BY ${cond.sort} ${cond.order} 
			LIMIT ${cond.dataLimit} OFFSET ${cond.offset}`,
      (err, res) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
};

exports.getRestoByName = async (name) => {
  return new Promise((resolve, reject) => {
    dbConn.query(`SELECT * FROM ${table} WHERE name=${name}`, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};
