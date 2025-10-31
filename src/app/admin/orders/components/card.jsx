export const OrderCard = ({value, title}) => {
    return (
        <>
         <div className="p-[16px] border flex flex-col items-center justify-center rounded-[10px] border-gray-300">
            <span className="font-[600] text-[20px]">{value}</span>
            <span className="text-[12px] font-[400] text-gray-500">{title}</span>
         </div>
        </>
    )
}