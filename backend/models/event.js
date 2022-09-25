"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for companies. */

class Event {
  /** Create an event , update db, return new event data.
   *
   * data should be { title,description,category,organization,recurrence,start_date,end_date,region,zip_code,owner}
   *
   * Returns { id,  id, title,description,category,organization,recurrence,start_date,end_date,region,zip_code,owner}
   **/

  static async create(data) {
    const result = await db.query(
      `INSERT INTO events ( title,description,category,organization,recurrence,start_date,end_date,region,zip_code,owner)
           VALUES ($1, $2, $3, $4,$5, $6, $7, $8,$9,$10)
           RETURNING id, title,description,category,organization,recurrence,start_date AS "startDate", end_date as "endDate",region,zip_code AS "zipCode",owner`,
      [
        data.title,
        data.description,
        data.category,
        data.organization,
        data.recurrence,
        data.startDate,
        data.endDate,
        data.region,
        data.zipCode,
        data.owner,
      ]
    );
    let event = result.rows[0];

    return event;
  }

  /** Find all events (optional searchFilters).
   *
   * searchFilters (all optional):
   * - zip code
   * - title (will find case-insensitive, partial matches)
   * 
   * Returns [{ id, title,description,category,organization,recurrence,start_date,end_date,region,zip_code,owner},...]
 
   * */

  static async findAll({ zipCode, title } = {}) {
    let query = `SELECT id, title,description,category,organization,recurrence,start_date AS "startDate",end_date AS "endDate",region,zip_code AS "zipCode",owner
                 FROM events`;
    let whereExpressions = [];
    let queryValues = [];

    // For each possible search term, add to whereExpressions and
    // queryValues so we can generate the right SQL

    if (zipCode !== undefined) {
      queryValues.push(zipCode);
      whereExpressions.push(`zip_code = $${queryValues.length}`);
    }

    if (title !== undefined) {
      queryValues.push(`%${title}%`);
      whereExpressions.push(`title ILIKE $${queryValues.length}`);
    }

    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" AND ");
    }

    // Finalize query and return results

    query += " ORDER BY title";
    // console.log(query, queryValues);
    const eventsRes = await db.query(query, queryValues);
    return eventsRes.rows;
  }

  /** Given a event id, return the details.
   
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const eventRes = await db.query(
      `SELECT id, title,description,category,organization,recurrence,start_date AS "startDate",end_date AS "endDate",region,zip_code AS "zipCode",owner
           FROM events
           WHERE id = $1`,
      [id]
    );

    const event = eventRes.rows[0];

    if (!event) throw new NotFoundError(`No event: ${id}`);

    return event;
  }

  /** Update event data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include: { title,description,category,organization,recurrence,start_date,end_date,region,zip_code}
 
   *
   * Returns { id, title,description,category,organization,recurrence,start_date,end_date,region,zip_code,owner }
 *
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {});
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE events 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id, title,description,category,organization,recurrence,start_date AS "startDate", end_date as "endDate",region,zip_code AS "zipCode",owner`;
    const result = await db.query(querySql, [...values, id]);
    const event = result.rows[0];

    if (!event) throw new NotFoundError(`No event: ${id}`);

    return event;
  }

  /** Delete given event from database; returns undefined.
   *
   **/

  static async remove(id) {
    const result = await db.query(
      `DELETE
           FROM events
           WHERE id = $1
           RETURNING id`,
      [id]
    );
    const event = result.rows[0];

    if (!event) throw new NotFoundError(`No event: ${id}`);
  }
}

module.exports = Event;
