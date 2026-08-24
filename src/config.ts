const normalizeBaseUrl = (value: string | undefined, fallback: string): string => {
    const candidate = value || fallback;
    return candidate.endsWith('/') ? candidate : `${candidate}/`;
};

export const chartDataServiceURI: string = normalizeBaseUrl(
    process.env.REACT_APP_CHART_DATA_URI,
    "https://mongo-chart-fields-service.onrender.com/"
);
export const subscriptionApiUrl: string = process.env.REACT_APP_SUBSCRIPTION_API_URI || "http://localhost:8080/v1/api/subscriptions";