import { expect } from "chai";
import sinon from "sinon";

import UserController from "../../src/controllers/User.controller.js";
import UserValidator from "../../src/middleware/UserValidator.js";

describe("User Controller tests", () => {

    let userController;
    let userServices;

    let req, res, next;
    let userValidatorStub;

    res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
    }

    afterEach(() => {
        sinon.restore();
    })

    describe("addNewUser request tests", () => {

        let newUser; 

        beforeEach(() => {
            userServices = {
                addNewUser: sinon.stub()
            }
            userController = new UserController(userServices)

            req = {
                body:
                {
                    "email": "user@example.com",
                    "password": "password1!"
                }
            }
            
            next = sinon.spy();
            userValidatorStub = sinon.stub(UserValidator, "handleValidationErrors").callsFake((req, res, next) => next)

            newUser = {
                "email": "user@example.com",
                "password": "password1!",
                "favouriteLocations": [],
                "_id": "666eecdb4463cfb7134ef2ac",
                "__v": 0
            }
        })

        afterEach(() => {
            sinon.restore();
        })

        it("should respond with new user in body if request is successful", async () => {
            // Arrange
            userServices.addNewUser.resolves(newUser);
            // Act
            await userController.addNewUser(req, res)
            // Assert
            expect(res.json.calledWith(newUser)).to.be.true;
        })
    })
})