import bcrypt from "bcrypt"

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 8)
}

const generateTestData = async () => {
    return {
        testUsers: [
            {
                "_id": "666ebf51cdf1cff8e67b6fc4",
                "email": "user1@example.com",
                "password": await hashPassword("password1!"),
                "role": "user",
                "__v": 0
            },

            {
                "_id": "666ec0cbcdf1cff8e67b6fc8",
                "email": "user2@example.com",
                "password": await hashPassword("password2!"),
                "role":"user",
                "__v": 0
            }
        ],
        newUser: {
            "email": "user3@example.com",
            "password": await hashPassword("password3!")
        },

        loginUser: {
            "email": "user1@example.com",
            "password": "password1!"
        }
    }
}

export default generateTestData