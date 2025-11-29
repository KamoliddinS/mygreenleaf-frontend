export const PromotionsCard = ({title, value}) => {
    return (
        <>
         <div className="p-[15px] w-full border rounded-[10px] border-gray-200 flex flex-col items-start gap-[15px]">
            <div className="flex items-center w-full justify-between">
                <span className="text-[14px] text-gray-600">{title}</span>
                <div className="w-[20px] h-[20px] border"></div>
            </div>
            <span className="text-[30px] font-[400]">{value}</span>
         </div>
        </>
    )
}