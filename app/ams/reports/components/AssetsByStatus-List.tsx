'use client'
import { LoadingSkeleton } from "@/components/Custom/loading-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react";


interface AssetStatus {
    status: string;
    count: number;
    color: string;
}

const getAssetsByStatus = async (): Promise<AssetStatus[]> => {
    // This is sample data. In a real application, you'd fetch this from your API
    return [
        { status: "Pre-Confiscated", count: 300, color: "bg-yellow-500" },
        { status: "Confiscated", count: 500, color: "bg-blue-500" },
        { status: "Valuation", count: 350, color: "bg-green-500" },
        { status: "Disposed", count: 100, color: "bg-red-500" },
    ];
};

export const ListOfAssetsByStatus = () => {
    const [statusData, setStatusData] = useState<AssetStatus[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchAssetsByStatus() {
        setIsLoading(true);
        try {
            const data = await getAssetsByStatus();
            setStatusData(data);
        } catch (error) {
            console.error('Error fetching assets by status:', error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchAssetsByStatus();
    }, []);

    return (
        <>
            {isLoading ? (
                <LoadingSkeleton />
            ) : statusData ? (
                <Card>
                    <CardHeader>
                        <CardTitle>Assets By Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {statusData.map((item) => (
                                <div key={item.status} className="flex items-center">
                                    <div className={`w-2 h-2 rounded-full ${item.color} mr-2`}></div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">
                                            {item.status}
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                        {item.count}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ) : <></>
            }
        </>
    )
}