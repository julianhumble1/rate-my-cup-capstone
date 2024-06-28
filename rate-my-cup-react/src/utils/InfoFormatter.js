export default class InfoFormatter {

    static formatLocationResults = (poi) => {
        const name = poi.name ?? "N/A";
        const address = poi.address?.freeformAddress ?? "N/A";
        const phone = poi.phone ?? "N/A";
        const url = poi.url ?? "N/A";
        const openingHours = InfoFormatter.formatOpeningTimes(poi)
        console.log(openingHours)
        return {
            name: name,
            address : address,
            phone : phone,
            url : url,
            openingHours : openingHours
        }
    }

    static formatOpeningTimes = (poi) => {
        let openingHoursObject;
        try {
            openingHoursObject = poi.openingHours.timeRanges
        } catch {
            return "N/A"
        }
        const openingHoursResponse = []
        for (let i = 0; i < openingHoursObject.length; i++) {
            let dayOfWeek = InfoFormatter.getDayOfWeek(openingHoursObject[i].startTime.date);
            openingHoursResponse.push({
                [dayOfWeek]: `${openingHoursObject[i].startTime.hour}:${openingHoursObject[i].startTime.minute.toString().padStart(2, '0')} - ${openingHoursObject[i].endTime.hour}:${openingHoursObject[i].endTime.minute.toString().padStart(2, '0')}`
            });
        }
        return openingHoursResponse
    }

    static getDayOfWeek(dateString) {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const date = new Date(dateString);
        return days[date.getDay()];
}
}