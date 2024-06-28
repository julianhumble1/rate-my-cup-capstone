import InfoFormatter from "../../src/utils/InfoFormatter.js";

describe("Info formatter tests", () => {
    describe("Format opening times", () => {
        it("should return N/A if poi entered does not have an opening hours object", () => {
            // Arrange
            const poi = {};
            // Act
            const actual = InfoFormatter.formatOpeningTimes(poi)
            // Assert
            expect(actual).to.equal("N/A")
        })

        it("should return array of length 7 if poi entered is valid", () => {
            // Arrange
            const poi = {
                "openingHours": {
                    timeRanges: [
                        {"startTime": {"date": "2024-06-28", "hour": 8, "minute": 30}, "endTime": {"date": "2024-06-28", "hour": 17, "minute": 30}},
                        {"startTime": {"date": "2024-06-29", "hour": 8, "minute": 30}, "endTime": {"date": "2024-06-29", "hour": 17, "minute": 30}},
                        {"startTime": {"date": "2024-06-30", "hour": 10, "minute": 0}, "endTime": {"date": "2024-06-30", "hour": 16, "minute": 0}},
                        {"startTime": {"date": "2024-07-01", "hour": 8, "minute": 30}, "endTime": {"date": "2024-07-01", "hour": 17, "minute": 30}},
                        {"startTime": {"date": "2024-07-02", "hour": 8, "minute": 30}, "endTime": {"date": "2024-07-02", "hour": 17, "minute": 30}},
                        {"startTime": {"date": "2024-07-03", "hour": 8, "minute": 30}, "endTime": {"date": "2024-07-03", "hour": 17, "minute": 30}},
                        {"startTime": {"date": "2024-07-04", "hour": 8, "minute": 30}, "endTime": {"date": "2024-07-04", "hour": 17, "minute": 30}}
                    ]
                }
            };
            // Act
            const actual = InfoFormatter.formatOpeningTimes(poi)
            // Assert
            expect(actual.length).to.equal(7)
        })
    })
})