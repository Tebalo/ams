import { getCaseById } from "@/lib/api"
import { notFound } from "next/navigation"
import { 
  Info, MapPin, User, FileText, Calendar, 
  Truck, FileCheck, BarChart2, Users, Clock
} from 'lucide-react'
import React, { ReactNode } from 'react';
import ActionButtons from "../components/ActionsButtons";
// import { InfoItem } from "../components/InfoItem";
// import { InfoCard } from "../components/InfoCard";

import dynamic from 'next/dynamic'

const InfoCard = dynamic(() => import('../components/InfoCard'), { ssr: false })
const InfoItem = dynamic(() => import('../components/InfoItem'), { ssr: false })

export const dynamicParams = true

interface ActionButtonsProps {
    onUpdate: () => void;
    onDelete: () => void;
  }

interface InfoCardProps {
    title: string;
    icon: ReactNode;
    children: ReactNode;
  }


// const InfoCard: React.FC<InfoCardProps> = ({ title, icon, children }) => (
// <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//     <div className="flex items-center mb-4">
//     {icon}
//     <h2 className="text-xl font-semibold ml-2">{title}</h2>
//     </div>
//     <div className="grid grid-cols-2 gap-4">
//     {children}
//     </div>
// </div>
// );

// interface InfoItemProps {
//     label: string;
//     value: string | number | null | undefined;
// }

// const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
//     <div>
//         <p className="text-sm text-gray-600">{label}</p>
//         <p className="font-medium">{value || 'N/A'}</p>
//     </div>
// );

export default async function CaseDetailsPage({ params }: { params: { id: string } }) {
    const caseCode = params.id
    const caseDetails = await getCaseById(caseCode)

    if (!caseDetails) {
        notFound()
    }
    const handleUpdate = () => {
        // Implement update logic here
        console.log("Update case", caseCode)
      }
    
      const handleDelete = () => {
        // Implement delete logic here
        console.log("Delete case", caseCode)
      }
    return (
        <div className="container mx-auto px-4 py-2">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold mb-6">Case Details: {caseDetails.name}</h1>
                <ActionButtons caseCode={caseCode} />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
            <InfoCard title="Basic Information" icon={<Info className="w-6 h-6 text-blue-500" />}>
                <InfoItem label="Code" value={caseDetails.code} />
                <InfoItem label="Status" value={caseDetails.status} />
                <InfoItem label="Type" value={caseDetails.type} />
                <InfoItem label="Value" value={caseDetails.value} />
                <InfoItem label="Condition" value={caseDetails.condition} />
            </InfoCard>

            <InfoCard title="Location and Ownership" icon={<MapPin className="w-6 h-6 text-green-500" />}>
                <InfoItem label="Location" value={caseDetails.location} />
                <InfoItem label="Owner" value={caseDetails.owner} />
            </InfoCard>

            <InfoCard title="Description" icon={<FileText className="w-6 h-6 text-yellow-500" />}>
                <div className="col-span-2">
                <p>{caseDetails.description}</p>
                </div>
            </InfoCard>

            <InfoCard title="Confiscation Details" icon={<Calendar className="w-6 h-6 text-red-500" />}>
                <InfoItem label="Confiscation Date" value={caseDetails.confiscation_date} />
                <InfoItem label="Case Number" value={caseDetails.case_number} />
                <InfoItem label="Confiscation Reason" value={caseDetails.confiscation_reason} />
                <InfoItem label="Planned Confiscation Date" value={caseDetails.planned_confiscation_date} />
                <InfoItem label="Decision" value={caseDetails.decision} />
                <InfoItem label="Decision Reason" value={caseDetails.decision_reason} />
            </InfoCard>

            <InfoCard title="Disposal Information" icon={<Truck className="w-6 h-6 text-purple-500" />}>
                <InfoItem label="Disposal Date" value={caseDetails.disposal_date} />
                <InfoItem label="Disposal Amount" value={caseDetails.disposal_amount} />
                <InfoItem label="Disposal Method" value={caseDetails.disposal_method} />
                <InfoItem label="Disposal Reason" value={caseDetails.disposal_reason} />
                <InfoItem label="Recipient" value={caseDetails.recipient} />
            </InfoCard>

            <InfoCard title="Valuation and Costs" icon={<BarChart2 className="w-6 h-6 text-indigo-500" />}>
                <InfoItem label="Valuation Date" value={caseDetails.valuation_date} />
                <InfoItem label="Initial Assets Costs" value={caseDetails.initial_assets_costs} />
                <InfoItem label="Operations Costs" value={caseDetails.operations_costs} />
                <InfoItem label="Maintenance/Repair Costs" value={caseDetails.maintenance_repair_costs} />
                <InfoItem label="Replacement/Renewal Costs" value={caseDetails.replacement_renewal_costs} />
                <InfoItem label="Disposal Costs" value={caseDetails.disposal_costs} />
                <InfoItem label="Threshold Amount" value={caseDetails.threshhold_amount} />
                <InfoItem label="Valuation Amount" value={caseDetails.valuation_amount} />
                <InfoItem label="Valuation Report" value={caseDetails.valuation_report} />
            </InfoCard>

            <InfoCard title="Trust Information" icon={<Users className="w-6 h-6 text-pink-500" />}>
                <InfoItem label="Trustee Name" value={caseDetails.trustee_name} />
                <InfoItem label="Trustee ID" value={caseDetails.trustee_id} />
                <InfoItem label="Beneficiary Name" value={caseDetails.beneficiary_name} />
                <InfoItem label="Beneficiary Phone" value={caseDetails.beneficiary_phone} />
                <InfoItem label="Beneficiary Amount" value={caseDetails.beneficiary_amount} />
                <InfoItem label="Trust Description" value={caseDetails.trust_description} />
            </InfoCard>

            <InfoCard title="Metadata" icon={<Clock className="w-6 h-6 text-gray-500" />}>
                <InfoItem label="Created At" value={new Date(caseDetails.created_at).toLocaleString()} />
                <InfoItem label="Updated At" value={new Date(caseDetails.updated_at).toLocaleString()} />
            </InfoCard>
            </div>
        </div>
    )
}