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

}