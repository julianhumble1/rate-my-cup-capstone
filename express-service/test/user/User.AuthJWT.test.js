import AuthJWT from "../../src/middleware/AuthJWT.js";

import { expect } from "chai";
import sinon from "sinon"
import jwt from "jsonwebtoken"


describe("AuthJWT tests", () => {
    let mockRequest;
    let mockResponse;
    let nextFunction;

    beforeEach(() => {
        mockRequest = {
            body: {
                email: "user@example.com",
                id: "123"
            },
        };
        mockResponse = {
            send: sinon.spy(),
            status: sinon.stub().returnsThis(),
        };
        nextFunction = sinon.spy();
    });
    
    afterEach(() => {
        sinon.restore();
    });

    describe("verifyToken tests", () => {
    
    
        it("should respond status code 403 if no token is provided", () => {
            // Arrange
            mockRequest.headers = {}
            // Act
            AuthJWT.verifyToken(mockRequest, mockResponse, nextFunction)
            // Assert
            expect(mockResponse.status.calledWith(403)).to.be.true;
        })
    
        it("should respond status code 401 if token provided is invalid", () => {
            // Arrange
            mockRequest.headers = { "x-access-token": "invalid token" }
            sinon.stub(jwt, "verify").callsFake((token, secret, callback) => {
                callback(new Error("Invalid token"), null)
            })
            // Act
            AuthJWT.verifyToken(mockRequest, mockResponse, nextFunction)
            // Assert
            expect(mockResponse.status.calledWith(401)).to.be.true;
        })
    
        it("should add decoded id to request header if token is valid", () => {
            // Arrange
            mockRequest.headers = { "x-access-token": "validToken" }
            const decodedToken = {
                "id": "123"
            }
            sinon.stub(jwt, "verify").callsFake((token, secret, callback) => {
                callback(null, decodedToken)
            })
            // Act
            AuthJWT.verifyToken(mockRequest, mockResponse, nextFunction)
            // Assert
            console.log(mockRequest)
            expect(mockRequest.userId).to.equal(decodedToken.id);
        })
    
        it("should call next function if token is valid", () => {
            // Arrange
            mockRequest.headers = { "x-access-token": "validToken" }
            const decodedToken = {
                "id": "123"
            }
            sinon.stub(jwt, "verify").callsFake((token, secret, callback) => {
                callback(null, decodedToken)
            })
            // Act
            AuthJWT.verifyToken(mockRequest, mockResponse, nextFunction)
            // Assert
            expect(nextFunction.called).to.be.true;
        })
    })
})