'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react";
import { CarIcon } from 'lucide-react';
import { LoadingSkeleton } from "@/components/Custom/loading-skeleton";

interface VehicleAssetReport {
    total_vehicles: number;
    cars: number;
    trucks: number;
    motorcycles: number;
    total_value: number;
}

const getVehicleAssetReport = async (): Promise<VehicleAssetReport> => {
    // This is sample data. In a real application, you'd fetch this from your API
    return {
        total_vehicles: 150,
        cars: 80,
        trucks: 50,
        motorcycles: 20,
        total_value: 7500000 // in your local currency
    };
};

export const VehicleAssets = () => {
    const [response, setResponse] = useState<VehicleAssetReport | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchVehicleAssetReport() {
        setIsLoading(true);
        try {
            const report = await getVehicleAssetReport();
            setResponse(report);
        } catch (error) {
            console.error('Error fetching vehicle asset report:', error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchVehicleAssetReport();
    }, []);

    return (
        <>
            {isLoading ? (
                <LoadingSkeleton />
            ) : response ? (
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Vehicle Assets
                        </CardTitle>
                        <CarIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{response.total_vehicles}</div>
                        <p className="text-xs text-muted-foreground">
                            {response.cars} cars, {response.trucks} trucks, {response.motorcycles} motorcycles
                        </p>
                        <div className="mt-4 text-sm font-semibold">
                            Total Value: P{response.total_value.toLocaleString()}
                        </div>
                    </CardContent>
                </Card>
            ) : <></>
            }
        </>
    )
}