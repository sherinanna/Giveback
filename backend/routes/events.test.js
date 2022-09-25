"use strict";

const request = require("supertest");

const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testEventIds,
  u1Token,
  u2Token,
  adminToken,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /jobs */

describe("POST /events", function () {
  test("ok for admin", async function () {
    const resp = await request(app)
      .post(`/events`)
      .send({
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
      .set("authorization", `Bearer ${adminToken}`);

    let event = resp.body.event;
    event.startDate = new Date(event.startDate)
      .toLocaleDateString("en-us", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      .replace(",", "");

    event.endDate = new Date(event.endDate)
      .toLocaleDateString("en-us", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      .replace(",", "");
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      event: {
        id: expect.any(Number),
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
    });
  });

  test("unauth for users", async function () {
    const resp = await request(app).post(`/events`).send({
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
    // .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  // test("bad request with missing data", async function () {
  //   const resp = await request(app)
  //     .post(`/events`)
  //     .send({
  //       title: "sample event",
  //     })
  //     .set("authorization", `Bearer ${adminToken}`);
  //   expect(resp.statusCode).toEqual(400);
  // });
});

/************************************** GET /events */

describe("GET /events", function () {
  test("ok for anon", async function () {
    const resp = await request(app).get(`/events`);

    let events = resp.body.events;
    events.forEach((event) => {
      event.startDate = new Date(event.startDate)
        .toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        .replace(",", "");

      event.endDate = new Date(event.endDate)
        .toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        .replace(",", "");
    });
    expect(resp.body).toEqual({
      events: [
        {
          id: expect.any(Number),
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
          id: expect.any(Number),
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
          id: expect.any(Number),
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
      ],
    });
  });

  test("works: filtering", async function () {
    const resp = await request(app).get(`/events`).query({ title: "event2" });
    let events = resp.body.events;
    events.forEach((event) => {
      event.startDate = new Date(event.startDate)
        .toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        .replace(",", "");

      event.endDate = new Date(event.endDate)
        .toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        .replace(",", "");
    });
    expect(resp.body).toEqual({
      events: [
        {
          id: expect.any(Number),
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
      ],
    });
  });

  // test("bad request on invalid filter key", async function () {
  //   const resp = await request(app).get(`/events`).query({ nope: "nope" });
  //   expect(resp.statusCode).toEqual(400);
  // });
});

/************************************** GET /events/:id */

describe("GET /events/:id", function () {
  test("works for anon", async function () {
    const resp = await request(app).get(`/events/${testEventIds[0]}`);
    let event = resp.body.event;
    event.startDate = new Date(event.startDate)
      .toLocaleDateString("en-us", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      .replace(",", "");

    event.endDate = new Date(event.endDate)
      .toLocaleDateString("en-us", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      .replace(",", "");
    expect(resp.body).toEqual({
      event: {
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
    });
  });

  test("not found for no such event", async function () {
    const resp = await request(app).get(`/events/0`);
    expect(resp.statusCode).toEqual(404);
  });
});

/************************************** PATCH /events/:id */

describe("PATCH /events/:id", function () {
  test("works for admin", async function () {
    const resp = await request(app)
      .patch(`/events/${testEventIds[0]}`)
      .send({
        title: "new title",
      })
      .set("authorization", `Bearer ${adminToken}`);

    let event = resp.body.event;
    event.startDate = new Date(event.startDate)
      .toLocaleDateString("en-us", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      .replace(",", "");

    event.endDate = new Date(event.endDate)
      .toLocaleDateString("en-us", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      .replace(",", "");
    expect(resp.body).toEqual({
      event: {
        id: expect.any(Number),
        title: "new title",
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
    });
  });

  test("unauth for others", async function () {
    const resp = await request(app)
      .patch(`/events/${testEventIds[0]}`)
      .send({
        title: "J-New",
      })
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });
});

/************************************** DELETE /jobs/:id */

describe("DELETE /events/:id", function () {
  test("works for admin", async function () {
    const resp = await request(app)
      .delete(`/events/${testEventIds[0]}`)
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({ deleted: testEventIds[0] });
  });

  test("unauth for anon", async function () {
    const resp = await request(app).delete(`/events/${testEventIds[0]}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found for no such event", async function () {
    const resp = await request(app)
      .delete(`/events/0`)
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(404);
  });
});
