export const InventoryCard = ({title, value}) => {
    return (
        <>
         <div className="p-[20px] border rounded-[10px] border-gray-200 flex items-center justify-start gap-[10px]">
            <div className="w-[40px] rounded-[10px] h-[40px] border"></div>
            <div className="flex flex-col items-start">
                <span className="text-[16px] text-gray-500 font-[400]">{title}</span>
                <span className="text-[25px] font-[500]">{value}</span>
            </div>
         </div>
        </>
    )
}