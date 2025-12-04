import { useLoad } from "@/app/shared/hooks/requests"
import { clearStorage } from "@/app/shared/utils/session";
import { ME } from "@/app/shared/utils/urls"
import { User, Mail, Phone, MapPin, LogOut} from "lucide-react";


export const ProfileInfo = () => {
    const getUserInfo = useLoad({url: ME})
    const userInfo = getUserInfo?.response ? getUserInfo?.response : []
    
    return (
        <>
        <div className="flex flex-col gap-4">

          {/* Card */}
          <div className="bg-white shadow rounded-xl p-6 border">
            <h2 className="font-semibold text-[17px] mb-4">Personal Information</h2>

            {/* Username */}
            <div className="flex items-start gap-4 mb-4">
              <User className="text-gray-500" size={20} />
              <div>
                <p className="text-[14px] text-gray-600">Username</p>
                <p className="text-[15px] font-medium">{userInfo?.username ? userInfo?.username : "-------"}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 mb-4">
              <Mail className="text-gray-500" size={20} />
              <div>
                <p className="text-[14px] text-gray-600">Email</p>
                <p className="text-[15px] font-medium">{userInfo?.email ? userInfo?.email : '---------'}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4 mb-4">
              <Phone className="text-gray-500" size={20} />
              <div>
                <p className="text-[14px] text-gray-600">Phone Number</p>
                <p className="text-[15px] font-medium">{userInfo?.phoneNumber ? userInfo?.phoneNumber : '-- --- -- --'}</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <MapPin className="text-gray-500" size={20} />
              <div>
                <p className="text-[14px] text-gray-600">Address</p>
                <p className="text-[15px] font-medium">
                  {userInfo.address ? userInfo.address : '-----------'}
                </p>
              </div>
            </div>
          </div>

          {/* Logout */}
          <button onClick={clearStorage} className="flex gap-2 items-center px-6 py-3 w-fit bg-red-600 text-white rounded-lg hover:bg-red-700">
            <LogOut size={18} />
            Logout
          </button>

        </div>
        </>
    )
}