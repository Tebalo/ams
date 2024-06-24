import { FinanceOfficerDashboard } from "@/components/Dashboard/finance-officer-dashboard";
import { ManagerDashboard } from "@/components/Dashboard/manager-dashboard";
import { RecordOfficerDashboard } from "@/components/Dashboard/record-officer-dashboard";
import { getRole} from "@/lib/auth";

export default async function Dashboard(){
    const persona = await getRole();
    console.log(persona)
    if(persona === 'record_officer'){
        return <RecordOfficerDashboard/>
    } else if(persona === 'finance_officer'){
        return <FinanceOfficerDashboard/>
    } else if(persona === 'manager'){
        return <ManagerDashboard/>
    }
}