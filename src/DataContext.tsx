import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchMongoData, MongoData } from './services/fetchMongoClassificationData';

interface DataContextProps {
    data: MongoData | null;
    isLoading: boolean;
}

const initialDataContext: DataContextProps = {
    data: null,
    isLoading: true,
};

const DataContext = createContext<DataContextProps>(initialDataContext);

export const useDataContext = () => useContext(DataContext);

export const DataProvider: React.FC<{ children: React.ReactNode }>  = ({ children }) => {
    const [data, setData] = useState<MongoData | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await fetchMongoData();
                if (fetchedData) {
                    setData(fetchedData);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setTimeout(fetchData, 5000); // Retry after 5 seconds on error
            }
        };
        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ data, isLoading }}>
            {children}
        </DataContext.Provider>
    );
};
