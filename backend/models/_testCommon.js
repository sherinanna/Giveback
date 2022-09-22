const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

const testEventIds = [];

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");

  await db.query(
    `
        INSERT INTO users(username,
                          password,
                          first_name,
                          last_name,
                          email)
        VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com'),
               ('u2', $2, 'U2F', 'U2L', 'u2@email.com')
        RETURNING username`,
    [
      await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
      await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
    ]
  );

  //   const resultsEvents = await db.query(`
  //     INSERT INTO events ( title,description,category,organization,recurrence,start_date,end_date,region,zip_code,owner)
  //     VALUES ("my event1",
  //         "The NYAWC Volunteer Council proudly presents:  Spring Volunteer Information Forum.  - Hear first-hand from current volunteers about volunteer activities - Mingle and chat with like-minded people - Refreshments provided",
  //       "Strengthening Communities",
  //       "New York Asian Women's Center",
  //        "onetime",
  //        "June 4 2022",
  //       "June 5 2022",
  //        "MANHATTAN",
  //       "11723",
  //      "u1",),
  //            ("my event2",
  //         "The NYAWC Volunteer Council proudly presents:  Spring Volunteer Information Forum.  - Hear first-hand from current volunteers about volunteer activities - Mingle and chat with like-minded people - Refreshments provided",
  //       "Strengthening Communities",
  //       "New York Asian Women's Center",
  //        "onetime",
  //        "June 4 2022",
  //       "June 5 2022",
  //        "MANHATTAN",
  //       "11723",
  //      "u1",),
  //            ("my event3",
  //         "The NYAWC Volunteer Council proudly presents:  Spring Volunteer Information Forum.  - Hear first-hand from current volunteers about volunteer activities - Mingle and chat with like-minded people - Refreshments provided",
  //       "Strengthening Communities",
  //       "New York Asian Women's Center",
  //        "onetime",
  //        "June 4 2022",
  //       "June 5 2022",
  //        "MANHATTAN",
  //       "11723",
  //      "u1",),

  //     RETURNING id`);
  //   testEventIds.splice(0, 0, ...resultsEvents.rows.map((r) => r.id));

  //   await db.query(
  //     `
  //         INSERT INTO applications(username, event_id)
  //         VALUES ('u1', $1)`,
  //     [testEventIds[0]]
  //   );
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testEventIds,
};
