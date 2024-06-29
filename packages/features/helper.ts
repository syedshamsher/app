import { Country } from "./src/types";

// Function to find the object with maximum keys
const findMaxKeysElement = (data: Country[]): Country | undefined => {
    let maxKeysElement: Country | undefined;
    let maxKeysCount = -1;

    for (const obj of data) {
        const keysCount = Object.keys(obj).length;
        if (keysCount > maxKeysCount) {
            maxKeysCount = keysCount;
            maxKeysElement = obj;
        }
    }

    return maxKeysElement;
};

export { findMaxKeysElement }