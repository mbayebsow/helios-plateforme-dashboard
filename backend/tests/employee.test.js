const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server.js");

require("dotenv").config();

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET /employees", () => {
  it("should return all employees", async () => {
    const res = await request(app).get("/employees");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
