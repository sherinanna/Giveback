"use strict";

const { NotFoundError, BadRequestError } = require("../expressError");
const db = require("../db.js");
const Job = require("./event.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testEventIds,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
  let newEvent = {
    title: "new event",
    description: "spring cleaning",
    category: "Strengthening Communities",
    organization: "New York Asian Women's Center",
    recurrence: "onetime",
    startDate: "June 12 2022",
    endDate: "June 13 2022",
    region: "MANHATTAN",
    zipCode: "11723",
    owner: "u1",
  };

  test("works", async function () {
    let event = await Event.create(newEvent);
    expect(event).toEqual({
      ...newEvent,
      id: expect.any(Number),
    });
  });
});

/************************************** findAll */

describe("findAll", function () {
  test("works: no filter", async function () {
    let events = await Event.findAll();
    expect(events).toEqual([
      {
        id: testEventIds[0],
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
      },
      {
        id: testEventIds[1],
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
      },
      {
        id: testEventIds[2],
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
      },
    ]);
  });

  test("works: by title & zipcode", async function () {
    let events = await Event.findAll({ zipCode: "11723", title: "event3" });
    expect(events).toEqual([
      {
        id: testEventIds[2],
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
      },
    ]);
  });
});

/************************************** get */

describe("get", function () {
  test("works", async function () {
    let event = await Event.get(testEventIds[0]);
    expect(event).toEqual({
      id: testEventIds[0],
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
    });
  });

  test("not found if no such event", async function () {
    try {
      await Event.get(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** update */

describe("update", function () {
  let updateData = {
    title: "New title",
  };
  test("works", async function () {
    let event = await Event.update(testEventIds[0], updateData);
    expect(event).toEqual({
      id: testEventIds[0],
      title: "New title",
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
    });
  });

  test("not found if no such event", async function () {
    try {
      await Event.update(0, {
        title: "test",
      });
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test("bad request with no data", async function () {
    try {
      await Event.update(testEventIds[0], {});
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await Event.remove(testEventIds[0]);
    const res = await db.query("SELECT id FROM events WHERE id=$1", [
      testEventIds[0],
    ]);
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such event", async function () {
    try {
      await Event.remove(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
