import { Suspense } from "react";
import { SmallLoadingSkeleton } from "@/components/Custom/loading-skeleton";
import { PageTitle } from "@/components/Custom/page-title";
import { ServiceListWrapper } from "@/components/Custom/service-list-wrapper";
import { SearchIcon } from "lucide-react";

export const ManagerDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <PageTitle Title="Teacher Registration and Licensing" />
      </div>

      <div className="mb-12">
        <div className="bg-white shadow-md rounded-lg p-6">
          <label htmlFor="search" className="block mb-2 text-sm font-medium text-gray-700">
            Search e-Services
          </label>
          <div className="relative">
            <input
              type="text"
              id="search"
              placeholder="Search all available e-Services by name, category, description..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center space-x-3">
          <svg
            className="flex-shrink-0 w-6 h-6 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-gray-800">Service Categories</h2>
        </div>
      </div>

      <Suspense fallback={<LoadingServiceCategories />}>
        <ServiceListWrapper />
      </Suspense>
    </div>
  );
};

const LoadingServiceCategories = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <SmallLoadingSkeleton key={index} />
      ))}
    </div>
  );
};