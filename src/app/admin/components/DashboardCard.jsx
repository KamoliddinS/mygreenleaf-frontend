
export const DashboardCard = ({icon:IconComponent, title, text, percentage}) => {
    return (
        <>
         <div className="w-full flex flex-col items-center gap-[20px] h-auto p-[20px] rounded-[10px] border border-gray-200">
            <div className="w-full flex items-center justify-between">
                <div className="w-[34px] h-[34px] border rounded-[6px]">

                </div>
                <div className="py-[4px] px-[10px] bg-[#8b7355] text-white text-[12px] font-[500] rounded-[15px] border">
                    {percentage}
                </div>
            </div>
            <div className="w-full flex flex-col items-start">
                <span className="text-gray-500 text-[15px]">{title}</span>
                <span className="text-[30px] font-[400]">{text}</span>
            </div>
         </div>
        </>
    )
}