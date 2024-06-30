const generateTestData = () => {
    return {
        testReviews: [
            {
                "_id": "66807bd072342a12d348d8bf",
                "locationId": "Q-WhI_pokyksoCGaVEvxaQ",
                "drinkType": "Latte",
                "price": 2,
                "rating": 4,
                "comment": "",
                "userId": "6680779dde883bb1f2795dd7",
                "__v": 0
            },
            {
                "_id":  "66807cbe72342a12d348d8c1",
                "locationId": "nqvi2tr9SV6hE1ZshBVSQg",
                "drinkType": "Espresso",
                "price": 3,
                "rating": 3,
                "comment": "very nice",
                "userId": "6680779dde883bb1f2795dd7",
                "__v": 0
            }
        ],
        newReview: {
            "drinkType": "Mocha",
            "rating": 3,
            "price": 1,
            "locationId": "tk3fp2Vuqp3VW7RdhCBbow",
            "comment" : "not great"
        }
    }
}

export default generateTestData