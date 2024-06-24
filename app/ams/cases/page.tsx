import { RecordOfficerCases } from "@/components/Cases/record-officer-cases";
import { FinanceOfficerDashboard } from "@/components/Dashboard/finance-officer-dashboard";
import { ManagerDashboard } from "@/components/Dashboard/manager-dashboard";
import { getRole} from "@/lib/auth";

export default async function Cases(){
    const persona = await getRole();
    if(persona === 'record_officer'){
        return <RecordOfficerCases/>
    } else if(persona === 'finance_officer'){
        return <FinanceOfficerDashboard/>
    } else if(persona === 'manager'){
        return <ManagerDashboard/>
    }
}