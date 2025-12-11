import { useState, useEffect } from "react";
import { useLoad, usePatchRequest } from "@/app/shared/hooks/requests";
import { clearStorage } from "@/app/shared/utils/session";
import { ME, USER } from "@/app/shared/utils/urls";
import { User, Mail, Phone, MapPin, LogOut, Pencil } from "lucide-react";
import { toast } from "sonner";

export const ProfileInfo = () => {
  const getUserInfo = useLoad({ url: ME });
  const [expanded, setExpanded] = useState(false);
  const userInfo = getUserInfo?.response ? getUserInfo?.response : [];
  const updateUserInfo = usePatchRequest({url: `${USER}${userInfo?.id}`})

  const [editMode, setEditMode] = useState(false);

  const [username, setUsername] = useState(userInfo?.username || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [phone, setPhone] = useState(userInfo?.phoneNumber || "");

  // Update inputs when userInfo loads
  useEffect(() => {
    setUsername(userInfo?.username || "");
    setEmail(userInfo?.email || "");
    setPhone(userInfo?.phoneNumber || "");
  }, [userInfo]);

  const handleSave = async () => {
    const {success, response} = await updateUserInfo.request({
      data: {
        email: email,
        username: username,
        phone_number: phone
      }
    })
    if(success) {
      toast.success("Malumotingiz yangilandi")
      setEditMode(false)
      getUserInfo.request()
    }
  };

    const limit = 30; 

  const isLong = userInfo?.address?.length > limit;
  const displayAddress = expanded
    ? userInfo?.address
    : isLong
    ? userInfo?.address.slice(0, limit) + "..."
    : userInfo?.address;

  return (
    <div className="flex flex-col gap-4">
      
      {/* Card */}
      <div className="bg-white shadow rounded-xl p-4 md:p-6 border relative">

        {/* Title + edit icon */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-[17px]">Personal Information</h2>

          <button
            onClick={() => setEditMode((prev) => !prev)}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <Pencil className="text-gray-600" size={18} />
          </button>
        </div>

        {/* Username */}
        <div className="flex items-start gap-4 mb-4">
          <User className="text-gray-500" size={20} />
          <div className="w-full">
            <p className="text-[14px] text-gray-600">Username</p>

            {editMode ? (
              <input
                className="w-full mt-1 px-3 py-2 border rounded-lg text-[15px]"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            ) : (
              <p className="text-[15px] font-medium">
                {userInfo?.username || "-------"}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4 mb-4">
          <Mail className="text-gray-500" size={20} />
          <div className="w-full">
            <p className="text-[14px] text-gray-600">Email</p>

            {editMode ? (
              <input
                className="w-full mt-1 px-3 py-2 border rounded-lg text-[15px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <p className="text-[15px] font-medium">
                {userInfo?.email || "---------"}
              </p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-4 mb-4">
          <Phone className="text-gray-500" size={20} />
          <div className="w-full">
            <p className="text-[14px] text-gray-600">Phone Number</p>

            {editMode ? (
              <input
                className="w-full mt-1 px-3 py-2 border rounded-lg text-[15px]"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            ) : (
              <p className="text-[15px] font-medium">
                {userInfo?.phoneNumber || "-- --- -- --"}
              </p>
            )}
          </div>
        </div>

        {/* Address */}
       <div className="flex items-start gap-4">
      <MapPin className="text-gray-500 flex-shrink-0" size={20} />

      <div className="flex flex-col">
        <p className="text-[14px] text-gray-600">Address</p>

        <p className="text-[12px] md:text-[14px] font-medium leading-[16px] max-w-[250px]">
          {displayAddress}
        </p>

        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-green-600 text-[12px] mt-1 underline"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>
    </div>

        {/* Save Button */}
        {editMode && (
          <button
            onClick={handleSave}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Save Changes
          </button>
        )}
      </div>

      {/* Logout */}
      <button
        onClick={clearStorage}
        className="flex gap-2 items-center px-6 py-3 w-fit bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
};