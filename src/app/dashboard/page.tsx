import { auth } from "@/auth/auth";
import { WidgetItem } from "@/components";
import { redirect } from "next/navigation";

export default async function DashboardPage() {

  const sesion = await auth();

  if (!sesion) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="grid gap-6 grid-cols-1 ">


       <WidgetItem title="Usuario conectado S-side">
        <div className="flex flex-col">
          <span>{sesion.user?.name}</span>
          <span>{sesion.user?.image}</span>
          <span>{sesion.user?.email}</span>

          <div>
            { JSON.stringify(sesion) }
          </div>
        </div>
        
      </WidgetItem>   
    </div>
  );
}