const request = require("supertest");
const ApiUrl = "https://localhost:3000/api/v1";

/* describe("GET /providers/{provider_id}", () => {
  it("should return 200 and check user name is 'Sofia Trindade'", () => {
    return request(ApiUrl)
      .get("/providers/fbead6a7-1830-423b-8de2-1b82c04353f9")
      .expect(200)
      .then(response => {
        expect(response.body.name).toEqual("Medical");
      });
  });

  it("should return 404 with 'The user was not found'", () => {
    return request(ApiUrl)
      .get("/providers/fbead6a7-1830-423b-8de2-1b82c04353f9")
      .expect(404)
      .then(response => {
        expect(response.body).toEqual("The user was not found");
      });
  }); 
}); */

describe("POST /providers", () => {
  it("should return 200 and check user with name 'TestAPI' exist", () => {
    return request(ApiUrl)
      .post("/providers")
      .send({ name:"Medical", cnpj:"00000000000000" })
      .expect(200)
      .then(() => {
        return request(ApiUrl)
        .get("/providers")
        .query({ name:"Medical" })
        .expect(200)
      });
  });

  /* it("should return 400 because user name already exists", () => {
    return request(ApiUrl)
      .post("/providers")
      .send({ name:"Medical", cnpj:"00000000000000" })
      .expect(400)
      .then(response => {
        expect(response.body).toEqual("The user name already exists");
      });
  });  */
});