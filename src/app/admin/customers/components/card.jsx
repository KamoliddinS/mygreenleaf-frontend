export const CustomersCard = ({title, value}) => {
    return (
        <>
         <div className="w-full border border-gray-200 rounded-[10px] p-[20px] flex items-center gap-[10px]">
            <div className="w-[40px] h-[40px] border">

            </div>
            <div className="flex flex-col items-start">
                <span className="text-[14px] text-gray-400">{title}</span>
                <span className="text-[30px] font-[500]">{value}</span>
            </div>
         </div>
        </>
    )
}