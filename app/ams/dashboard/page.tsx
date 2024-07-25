import { FinanceOfficerDashboard } from "@/components/Dashboard/finance-officer-dashboard";
import { ManagerDashboard } from "@/components/Dashboard/manager-dashboard";
import { RecordOfficerDashboard } from "@/components/Dashboard/record-officer-dashboard";
import { getRole, getSession} from "@/lib/auth";

export default async function Dashboard(){
    const session = await getSession();
    const persona = session?.auth?.roles[0];
    if(persona === 'record_officer'){
        return <RecordOfficerDashboard/>
    } else if(persona === 'finance_officer'){
        return <FinanceOfficerDashboard/>
    } else if(persona === 'manager'){
        return <ManagerDashboard/>
    }
}