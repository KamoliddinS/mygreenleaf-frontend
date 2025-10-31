import { DashboardCard } from "./components/DashboardCard";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-6">Overview of GreenLeaf operations</p>

      {/* Example Stat Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <DashboardCard percentage="+12%" title="Today`s Orders" text="47" />
        <DashboardCard percentage="+18%" title="Today's Revenue" text="8450.0K UZS"  />
        <DashboardCard percentage="+5%" title="Average Basket" text="180K UZS" />
        <DashboardCard percentage="Live" title="Active Deliveries" text="12" />
      </div>
      <div className="w-full flex items-center gap-[20px]">
        <div className="border rounded-[10px] flex flex-col items-start gap-[20px] p-[20px]">
          <div className="flex items-ceter gap-[10px]">
            <div className="w-[24px] h-[24px]">

            </div>
            <span className="text-[15px] font-[500]">Payment Methods</span>
          </div>
          <div className="w-full flex flex-col items-center gap-[10px]">
            
          </div>
        </div>
      </div>
    </div>
  );
}