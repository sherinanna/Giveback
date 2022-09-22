"use strict";

/** Routes for jobs. */

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const {
  ensureAdmin,
  ensureLoggedIn,
  ensureAdminOrOwner,
} = require("../middleware/auth");
const Event = require("../models/event");
const eventNewSchema = require("../schemas/eventNew.json");
const eventUpdateSchema = require("../schemas/eventUpdate.json");
const eventSearchSchema = require("../schemas/eventSearch.json");

const router = express.Router({ mergeParams: true });

/** POST / { event } => { event }
 *
 * event should be { title,description,category,organization,recurrence,start_date,end_date,region,zip_code,owner }
 *
 * Returns { id, title,description,category,organization,recurrence,start_date,end_date,region,zip_code,owner }
 *
 * Authorization required: logged in
 */

router.post("/", ensureLoggedIn, async function (req, res, next) {
  try {
    // const validator = jsonschema.validate(req.body, eventNewSchema);
    // if (!validator.valid) {
    //   const errs = validator.errors.map((e) => e.stack);
    //   throw new BadRequestError(errs);
    // }

    const event = await Event.create(req.body);
    return res.status(201).json({ event });
  } catch (err) {
    return next(err);
  }
});

/** GET / =>
 *   { events: [ { id, title,description,category,organization,recurrence,start_date,end_date,region,zip_code,owner}, ...] }
 *
 * Can provide search filter in query:
 * - zipcode
 * - title (will find case-insensitive, partial matches)

 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
  const q = req.query;

  try {
    const validator = jsonschema.validate(q, eventSearchSchema);

    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const events = await Event.findAll(q);
    return res.json({ events });
  } catch (err) {
    return next(err);
  }
});

/** GET /[eventId] => { event }
 *
 * Returns { id, title,description,category,organization,recurrence,start_date,end_date,region,zip_code,owner}
 *
 * Authorization required: none
 */

router.get("/:id", async function (req, res, next) {
  try {
    const event = await Event.get(req.params.id);
    return res.json({ event });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[eventId]  { fld1, fld2, ... } => { event }
 *
 * Data can include: { title,description,category,organization,recurrence,start_date,end_date,region,zip_code}
 *
 * Returns { id, title,description,category,organization,recurrence,start_date,end_date,region,zip_code,owner }
 *
 * Authorization required: admin or owner of event
 */

router.patch("/:id", ensureAdminOrOwner, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, eventUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const event = await Event.update(req.params.id, req.body);
    return res.json({ event });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[handle]  =>  { deleted: id }
 *
 * Authorization required: admin or event owner
 */

router.delete("/:id", ensureAdminOrOwner, async function (req, res, next) {
  try {
    await Event.remove(req.params.id);
    return res.json({ deleted: +req.params.id });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
