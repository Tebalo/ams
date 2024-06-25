'use client'
import { LoadingSkeleton } from "@/components/Custom/loading-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react";
interface AssetReport {
    total_assets: number;
    pre_confiscated: number;
    confiscated: number;
    valuation: number;
    disposed: number;
}

const getAssetReport = async (): Promise<AssetReport> => {
    // This is sample data. In a real application, you'd fetch this from your API
    return {
        total_assets: 1250,
        pre_confiscated: 300,
        confiscated: 500,
        valuation: 350,
        disposed: 100
    };
};

export const AllAssets = () => {
    const [response, setResponse] = useState<AssetReport | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchAssetReport() {
        setIsLoading(true);
        try {
            const report = await getAssetReport();
            setResponse(report);
        } catch (error) {
            console.error('Error fetching asset report:', error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchAssetReport();
    }, []);

    return (
        <>
            {isLoading ? (
                <LoadingSkeleton />
            ) : response ? (
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Assets
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M20 7h-9m9 7h-9m9-7v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11.586a1 1 0 0 1 .707.293l3.414 3.414a1 1 0 0 1 .293.707V7Z" />
                            <path d="M8 5v14" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{response.total_assets}</div>
                        <p className="text-xs text-muted-foreground">
                            {response.pre_confiscated} pre-confiscated, {response.confiscated} confiscated
                        </p>
                    </CardContent>
                </Card>
            ) : <></>
            }
        </>
    )
}