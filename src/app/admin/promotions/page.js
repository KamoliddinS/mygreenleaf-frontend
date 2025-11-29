import { AlertCircle } from "lucide-react";
import { PromotionsCard } from "./components/card";
import Table from "../components/Table";
import { TableItems } from "./components/TableItems";

const columns = [
  "Code",
  "Discount",
  "Usage",
  "Expiry Date",
  "Status",
  "Actions"
]

export default function PromotionsPage() {

  const promotions = [
    {
      code: "EXPIRED50",
      discount: "50%",
      usage: 45,
      usageFull: 100,
      expireData: "1/1/2025",
      status: false,
    },
    {
      code: "EXPIRED40",
      discount: "40%",
      usage: 55,
      usageFull: 100,
      expireData: "1/1/2025",
      status: true,
    }
  ]
  return (
    <div className="w-full flex flex-col gap-[20px]">
        <div>
      <h1 className="text-2xl font-semibold">Promotion Management</h1>
      <p className="text-gray-500">View and manage promo codes (codes are pre-issued by GreenLeaf)</p>
        </div>
        <div className="w-full flex flex-col items-start gap-[10px] border border-green-700/30 bg-green-100/20 rounded-[10px] p-[15px]">
          <div className="flex items-center gap-[10px]">
            <AlertCircle size={15} className="text-green-700" />
            <span className="text-[14px]">Premium Promo Codes</span>
          </div>
          <span className="text-gray-500 text-[14px] ml-5">All promo codes are pre-issued by GreenLeaf headquarters. This interface allows you to view usage, enable/disable codes, and monitor their performance. Code generation is managed externally.</span>
        </div>
        <div className="w-full grid grid-cols-4 gap-[20px]">
          <PromotionsCard title="Total Codes" value={3} />
          <PromotionsCard title="Active Codes" value={2} />
          <PromotionsCard title="Inactive Codes" value={1} />
          <PromotionsCard title="Total Usage" value={80} />
        </div>
        <div className="w-full flex flex-col items-start gap-[20px] pt-[15px] border rounded-[17px] border-gray-200">
          <span className="ml-5">Promo Codes</span>
          <div className="w-full">
            <Table columns={columns} RowComponent={TableItems} data={promotions} />
          </div>
        </div>
        <div className="w-full flex flex-col items-start gap-[20px] border rounded-[17px] p-[15px] border-gray-200">
          <span className="text-[16px]">Top Performing Codes</span>
          <div className="w-full flex flex-col items-center gap-[20px]">
            {promotions?.map((item) => (
              <div key={item.code} className="w-full flex flex-col gap-2">
  {/* Top row: Code + Discount + Usage */}
  <div className="flex items-center justify-between w-full">
    <div className="flex items-center gap-3">
      <span className="text-[15px] font-semibold tracking-wide">{item.code}</span>
      <span className="text-[13px] font-medium border border-green-900/20 text-green-900 px-2 py-[2px] rounded-full">
        {item.discount} OFF
      </span>
    </div>

    <div className="flex items-center gap-1">
      <span className="text-[15px] font-semibold">{item.usage}</span>
      <span className="text-gray-500 text-[13px]">uses</span>
    </div>
  </div>

  {/* Progress bar */}
  <div className="w-full h-3 bg-green-900/20 rounded-full overflow-hidden">
    <div
      className="h-3 bg-green-700 rounded-full transition-all duration-300"
      style={{
        width: `${(item.usage / item.usageFull) * 100}%`,
      }}
    />
  </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}