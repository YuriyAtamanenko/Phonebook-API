const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { DB_HOST } = process.env;

describe("login user", () => {
  beforeAll(async () => {
    await mongoose
      .connect(DB_HOST)
      .then(() => {
        console.log("Test BD Connected");
      })
      .catch((error) => {
        console.log("error", error);
      });
  });

  test("should login user", async () => {
    const { statusCode, body } = await request(app)
      .post("/users/login")
      .send({ email: "myemail@email.com", password: "1q2w3e" });

    expect(statusCode).toBe(200);
    expect(body.token).toBeTruthy();
    expect(body.user).toEqual(
      expect.objectContaining({
        email: expect.any(String),
        subscription: expect.any(String),
      })
    );
  });

  afterAll(async () => {
    await mongoose.disconnect(DB_HOST).then(() => {
      console.log("Test BD Disonnected");
    });
  });
});
