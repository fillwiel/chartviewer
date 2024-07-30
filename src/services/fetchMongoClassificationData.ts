import {chartDataServiceURI} from "../config";

export interface MongoData {
    arrivalCities: string[];
    departureCities: string[];
    countries: string[];
}
export const fetchMongoData = async (): Promise<MongoData | void> => {
    try {
        const response = await fetch(chartDataServiceURI);
        if (!response.ok) {
            throw new Error('Error when fetching data from ' + chartDataServiceURI);
        }
        const arrivalCities = await fetch(chartDataServiceURI + 'fetchArrivalCities').then(response => response.json());
        const departureCities = await fetch(chartDataServiceURI + 'fetchDepartureCities').then(response => response.json());
        const countries = await fetch(chartDataServiceURI + 'fetchCountries').then(response => response.json());

        return {arrivalCities, departureCities, countries};
    } catch (error) {
        setTimeout(fetchMongoData, 5000); // Retry after 5 seconds
    }
};