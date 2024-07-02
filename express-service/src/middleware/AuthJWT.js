import jwt from "jsonwebtoken"

export default class AuthJWT {

    static verifyToken = (req, res, next) => {
        let token = req.headers["x-access-token"]

        if (!token) {
            return res.status(403).send("No token provided")
        }

        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                console.log("failed to decode token")
                return res.status(401).send("Unauthorized")
            }
            
            req.userId = decoded.id;
            next();
        })
    }

    static verifyAuth = (req, res, next) => {
        const tokenId = req.userId;
        const reviewUserId = req.reviewUserId;
        if (tokenId === reviewUserId) {
            next();
        } else {
            const role = User.find({ id: tokenId }).role
            if (role === "admin") {
                next();
            } else {
                return res.status(403).json("Unauthorized")
            }
        }
    }
}