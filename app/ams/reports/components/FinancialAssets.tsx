'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react";
import { DollarSign } from 'lucide-react';
import { LoadingSkeleton } from "@/components/Custom/loading-skeleton";
import { formatPula } from "@/utils/formatPula";

interface FinancialAssetReport {
    total_value: number;
    cash: number;
    stocks: number;
    bonds: number;
    other: number;
    asset_count: number;
}

const getFinancialAssetReport = async (): Promise<FinancialAssetReport> => {
    // This is sample data. In a real application, you'd fetch this from your API
    return {
        total_value: 15000000,
        cash: 5000000,
        stocks: 6000000,
        bonds: 3000000,
        other: 1000000,
        asset_count: 75
    };
};

export const FinancialAssets = () => {
    const [response, setResponse] = useState<FinancialAssetReport | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchFinancialAssetReport() {
        setIsLoading(true);
        try {
            const report = await getFinancialAssetReport();
            setResponse(report);
        } catch (error) {
            console.error('Error fetching financial asset report:', error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchFinancialAssetReport();
    }, []);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };

    return (
        <>
            {isLoading ? (
                <LoadingSkeleton />
            ) : response ? (
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Financial Assets
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatPula(response.total_value)}</div>
                        <p className="text-xs text-muted-foreground">
                            {response.asset_count} total assets
                        </p>
                        <div className="mt-4 space-y-2">
                            <div className="text-sm">
                                <span className="font-medium">Cash:</span> {formatPula(response.cash)}
                            </div>
                            <div className="text-sm">
                                <span className="font-medium">Stocks:</span> {formatPula(response.stocks)}
                            </div>
                            <div className="text-sm">
                                <span className="font-medium">Bonds:</span> {formatPula(response.bonds)}
                            </div>
                            <div className="text-sm">
                                <span className="font-medium">Other:</span> {formatPula(response.other)}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ) : <></>
            }
        </>
    )
}