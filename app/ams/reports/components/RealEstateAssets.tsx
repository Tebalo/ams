'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react";
import { Home } from 'lucide-react';
import { LoadingSkeleton } from "@/components/Custom/loading-skeleton";
import { formatPula } from "@/utils/formatPula";

interface RealEstateAssetReport {
    total_properties: number;
    residential: number;
    commercial: number;
    industrial: number;
    land: number;
    total_value: number;
    total_area: number; // in square meters
}

const getRealEstateAssetReport = async (): Promise<RealEstateAssetReport> => {
    // This is sample data. In a real application, you'd fetch this from your API
    return {
        total_properties: 57,
        residential: 30,
        commercial: 15,
        industrial: 7,
        land: 5,
        total_value: 85000000, // in your local currency
        total_area: 500000 // in square meters
    };
};

export const RealEstateAssets = () => {
    const [response, setResponse] = useState<RealEstateAssetReport | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchRealEstateAssetReport() {
        setIsLoading(true);
        try {
            const report = await getRealEstateAssetReport();
            setResponse(report);
        } catch (error) {
            console.error('Error fetching real estate asset report:', error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchRealEstateAssetReport();
    }, []);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };

    const formatArea = (value: number) => {
        return `${value.toLocaleString()} m²`;
    };

    return (
        <>
            {isLoading ? (
                <LoadingSkeleton />
            ) : response ? (
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Real Estate Assets
                        </CardTitle>
                        <Home className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{response.total_properties}</div>
                        <p className="text-xs text-muted-foreground">
                            Total value: {formatPula(response.total_value)}
                        </p>
                        <div className="mt-4 space-y-2">
                            <div className="text-sm">
                                <span className="font-medium">Residential:</span> {response.residential}
                            </div>
                            <div className="text-sm">
                                <span className="font-medium">Commercial:</span> {response.commercial}
                            </div>
                            <div className="text-sm">
                                <span className="font-medium">Industrial:</span> {response.industrial}
                            </div>
                            <div className="text-sm">
                                <span className="font-medium">Land:</span> {response.land}
                            </div>
                            <div className="text-sm">
                                <span className="font-medium">Total Area:</span> {formatArea(response.total_area)}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ) : <></>
            }
        </>
    )
}