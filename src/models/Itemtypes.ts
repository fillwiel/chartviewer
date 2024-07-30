export interface Subscription {
    id: string;
    userId: string;
    deviceToken: string;
    arrivalCity: string;
    departureCity: string;
    priceThreshold: number | null;
}