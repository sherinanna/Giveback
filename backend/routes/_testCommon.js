"use strict";

const db = require("../db.js");
const User = require("../models/user");
const Event = require("../models/event");

const { createToken } = require("../helpers/tokens");

const testEventIds = [];

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM events");

  await User.register({
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "user1@user.com",
    password: "password1",
    isAdmin: false,
  });
  await User.register({
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    email: "user2@user.com",
    password: "password2",
    isAdmin: false,
  });
  await User.register({
    username: "u3",
    firstName: "U3F",
    lastName: "U3L",
    email: "user3@user.com",
    password: "password3",
    isAdmin: false,
  });

  testEventIds[0] = (
    await Event.create({
      title: "my event1",
      description:
        "The NYAWC Volunteer Council proudly presents:  Spring Volunteer Information Forum.  - Hear first-hand from current volunteers about volunteer activities - Mingle and chat with like-minded people - Refreshments provided",
      category: "Strengthening Communities",
      organization: "New York Asian Women's Center",
      recurrence: "onetime",
      startDate: "June 4 2022",
      endDate: "June 5 2022",
      region: "MANHATTAN",
      zipCode: "11723",
      owner: "u1",
    })
  ).id;
  testEventIds[1] = (
    await Event.create({
      title: "my event2",
      description:
        "The NYAWC Volunteer Council proudly presents:  Spring Volunteer Information Forum.  - Hear first-hand from current volunteers about volunteer activities - Mingle and chat with like-minded people - Refreshments provided",
      category: "Strengthening Communities",
      organization: "New York Asian Women's Center",
      recurrence: "onetime",
      startDate: "June 4 2022",
      endDate: "June 5 2022",
      region: "MANHATTAN",
      zipCode: "11723",
      owner: "u1",
    })
  ).id;
  testEventIds[2] = (
    await Event.create({
      title: "my event3",
      description:
        "The NYAWC Volunteer Council proudly presents:  Spring Volunteer Information Forum.  - Hear first-hand from current volunteers about volunteer activities - Mingle and chat with like-minded people - Refreshments provided",
      category: "Strengthening Communities",
      organization: "New York Asian Women's Center",
      recurrence: "onetime",
      startDate: "June 4 2022",
      endDate: "June 5 2022",
      region: "MANHATTAN",
      zipCode: "11723",
      owner: "u1",
    })
  ).id;

  await User.applyToEvent("u1", testEventIds[0]);
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

const u1Token = createToken({ username: "u1", isAdmin: false });
const u2Token = createToken({ username: "u2", isAdmin: false });
const adminToken = createToken({ username: "admin", isAdmin: true });

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testEventIds,
  u1Token,
  u2Token,
  adminToken,
};
