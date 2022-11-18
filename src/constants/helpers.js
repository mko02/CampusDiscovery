import {
    coordinates
} from "./coordinates";

export function searchLocation(string) {
    const cleaned = string.toLowerCase().replace(/[^a-z0-9 ]/g, "");
    const terms = cleaned.split(" ");
    const sorted = coordinates.sort((a, b) => (a.name > b.name) ? 1 : -1);
    const matched = sorted.filter((location) => {
        let valid = true;
        if (cleaned.replace(/[^a-z0-9 ]/g, "") == location.name) {
            return [];
        }
        for (const term of terms) {
            if (!(location.name.toLowerCase()).includes(term)) {
                valid = false
            }
        }
        if (valid) {
            return location;
        }
    }).sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    return matched;
}