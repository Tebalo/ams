
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/Custom/page-title";
import { AllAssets } from "./components/AllAssets";
import { ListOfAssetsByStatus } from "./components/AssetsByStatus-List";
import { MonthlyAssetConfiscations } from "./components/MonthlyAssetConfiscations-SimpleBarGraph";
import { VehicleAssets } from "./components/VehicleAssets";
import { RealEstateAssets } from "./components/RealEstateAssets";
import { FinancialAssets } from "./components/FinancialAssets";

export default async function  AssetManagerDashboard(){
    return(
        <>
        <div className="overflow-auto h-screen rounded-lg">
            <div className="mb-5">
                <div className="flex items-center justify-between space-y-2 mr-10">
                    <PageTitle Title="Asset Management Dashboard"/>
                    <div className="flex items-center space-x-2">
                        {/* <CalendarDateRangePicker /> */}
                        <Button>Generate Report</Button>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <div className="rounded-lg">
                    <div className="flex-1 space-y-4 p-8 pt-6">
                        <Tabs defaultValue="overview" className="space-y-4">
                            <TabsList>
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="analytics">
                                    Analytics
                                </TabsTrigger>
                                <TabsTrigger value="reports">
                                    Reports
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="overview" className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    <AllAssets/>
                                    <RealEstateAssets/>
                                    <VehicleAssets/>
                                    <FinancialAssets/>
                                </div>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                                    <Card className="col-span-4">
                                    <CardHeader>
                                        <CardTitle>Monthly Asset Confiscations</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pl-2">
                                        <MonthlyAssetConfiscations />
                                    </CardContent>
                                    </Card>
                                    <Card className="col-span-3">
                                    <CardHeader>
                                        <CardTitle>Assets By Status</CardTitle>
                                        <CardDescription>
                                            Overview of asset status distribution
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ListOfAssetsByStatus />
                                    </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}