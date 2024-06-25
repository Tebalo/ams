"use client"

import { LoadingSkeleton } from "@/components/Custom/loading-skeleton";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

interface DataPoint {
    name: string;
    value: number;
}

const getMonthlyAssetConfiscations = async (): Promise<DataPoint[]> => {
    // This is sample data. In a real application, you'd fetch this from your API
    return [
      { "name": "Jan", "value": 3 },
      { "name": "Feb", "value": 5 },
      { "name": "Mar", "value": 2 },
      { "name": "Apr", "value": 7 },
      { "name": "May", "value": 4 },
      { "name": "Jun", "value": 6 },
      { "name": "Jul", "value": 8 },
      { "name": "Aug", "value": 5 },
      { "name": "Sep", "value": 3 },
      { "name": "Oct", "value": 4 },
      { "name": "Nov", "value": 2 },
      { "name": "Dec", "value": 1 }
    ];
};

export const MonthlyAssetConfiscations = () => {
    const [response, setResponse] = useState<DataPoint[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    
    async function getMonthlyStatistics() {
      setIsLoading(true);
      try {
        const response: DataPoint[] = await getMonthlyAssetConfiscations();
        setResponse(response);
      } catch (error) {
        console.error('Error fetching asset confiscation data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    useEffect(() => {
        getMonthlyStatistics();
    }, []);

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    return (
        <ResponsiveContainer width="100%" height={350}>
            {response ? (
                <BarChart data={response}>
                    <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip />
                    <Bar
                        dataKey="value"
                        fill="currentColor"
                        radius={[4, 4, 0, 0]}
                        className="fill-primary"
                    />
                </BarChart>
            ) : (
                <LoadingSkeleton />
            )}
        </ResponsiveContainer>
    )
}