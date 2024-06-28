import InfoFormatter from "../../src/utils/InfoFormatter.js";

describe("Info formatter tests", () => {
    describe("Format opening times", () => {
        const validPoi = {
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
        it("should return N/A if poi entered does not have an opening hours object", () => {
            // Arrange
            const invalidPoi = {};
            // Act
            const actual = InfoFormatter.formatOpeningTimes(invalidPoi)
            // Assert
            expect(actual).to.equal("N/A")
        })

        it("should return array of length 7 if poi entered is valid", () => {
            // Arrange
            // Act
            const actual = InfoFormatter.formatOpeningTimes(validPoi)
            // Assert
            expect(actual.length).to.equal(7)
        })
    })

    describe("format location results tests", () => {

        const testPoi = {
        name: 'Test Location',
        address: { freeformAddress: '123 Test St' },
        phone: '123-456-7890',
        url: 'https://testlocation.com'
        };

        beforeEach(() => {
            vi.spyOn(InfoFormatter, "formatOpeningTimes").mockReturnValue([])
        })

        afterEach(() => {
            vi.restoreAllMocks()
        })


        it("should format location results correctly with stubbed formatOpeningTimes if object is valid", () => {
            // Arrange
            // Act
            const actual = InfoFormatter.formatLocationResults(testPoi)
            // Assert
            expect(actual).to.deep.equal({
                name: "Test Location",
                address: "123 Test St",
                phone: "123-456-7890",
                url: "https://testlocation.com",
                openingHours: []
            })
        })

        it("should return a name of N/A if no name is provided", () => {
            // Arrange
            const noNamePoi = { ...testPoi }
            delete noNamePoi.name
            // Act
            const actual = InfoFormatter.formatLocationResults(noNamePoi)
            // Assert
            expect(actual).to.deep.equal({
                name: "N/A",
                address: "123 Test St",
                phone: "123-456-7890",
                url: "https://testlocation.com",
                openingHours: []
            })
        })

        it("should return an address of N/A if no address is provided", () => {
            // Arrange
            const noAddressPoi = { ...testPoi }
            delete noAddressPoi.address
            // Act
            const actual = InfoFormatter.formatLocationResults(noAddressPoi)
            // Assert
            expect(actual).to.deep.equal({
                name: "Test Location",
                address: "N/A",
                phone: "123-456-7890",
                url: "https://testlocation.com",
                openingHours: []
            })
        })

        it("should return an phone of N/A if no phone is provided", () => {
            // Arrange
            const noPhonePoi = { ...testPoi }
            delete noPhonePoi.phone
            // Act
            const actual = InfoFormatter.formatLocationResults(noPhonePoi)
            // Assert
            expect(actual).to.deep.equal({
                name: "Test Location",
                address: "123 Test St",
                phone: "N/A",
                url: "https://testlocation.com",
                openingHours: []
            })
        })

        it("should return a url of N/A if no url is provided", () => {
            // Arrange
            const noUrlPoi = { ...testPoi }
            delete noUrlPoi.url
            // Act
            const actual = InfoFormatter.formatLocationResults(noUrlPoi)
            // Assert
            expect(actual).to.deep.equal({
                name: "Test Location",
                address: "123 Test St",
                phone: "123-456-7890",
                url: "N/A",
                openingHours: []
            })
        })
    })
})