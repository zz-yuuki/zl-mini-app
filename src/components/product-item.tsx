import { Product } from "@/types";
import { formatPrice } from "@/utils/format";
import TransitionLink from "./transition-link";
import { useState } from "react";
import CONFIG from "@/config";
import { userInfoKeyState, userInfoState } from "@/state";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button, DatePicker, Input } from "zmp-ui";
import axios from "axios";

export interface ProductItemProps {
  product: Product;
  /**
   * Whether to replace the current page when user clicks on this product item. Default behavior is to push a new page to the history stack.
   * This prop should be used when navigating to a new product detail from a current product detail page (related products, etc.)
   */
  replace?: boolean;
}

export default function ProductItem(props: ProductItemProps) {
  const navigate = useNavigate();
  const userInfo = useAtomValue(userInfoState);
  const setUserInfoKey = useSetAtom(userInfoKeyState);
  const refreshUserInfo = () => setUserInfoKey((key) => key + 1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date1, setDate1] = useState<Date | undefined>(new Date());
  const [date2, setDate2] = useState("");

  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // const data1 ={
    //   Name: name,
    //   Date: date1,
    //   Date2: date2,
    //   Phone: phone,
    //   Email: email,
    //   Address: address,
    // }
    axios
      .post("https://sheetdb.io/api/v1/qocyk8usx81gw", formData)
      .then((respose) => {
        console.log(respose);
      });

    toast.success("Đã đăng ký thành công!");
    navigate(-1);
  };
  const getTodayDate = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const [formData, setFormData] = useState({
    name: "",
    date: getTodayDate(), // Will be stored as a string
    phone: "",
    email: "",
    address: "",
  });
  const handleChange = (key, value) => {
    console.log(`Changed: ${key} =>`, value);
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  const formatDateLocal = (date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  

  // return (
  //   <form
  //     className="h-full flex flex-col justify-between"
  //     onSubmit={(e) => {
  //       e.preventDefault();
  //       const data = new FormData(e.currentTarget);
  //       const newUserInfo = { ...userInfo };
  //       data.forEach((value, key) => {
  //         newUserInfo[key] = value;
  //       });
  //       localStorage.setItem(
  //         CONFIG.STORAGE_KEYS.USER_INFO,
  //         JSON.stringify(newUserInfo)
  //       );
  //       refreshUserInfo();
  //       toast.success("Đã đăng ký thành công!");
  //       navigate(-1);
  //       //

  //     }}
  //   >
  //   </form>
  // );
  return (
    <form
      className="h-full flex flex-col justify-between"
      onSubmit={handleSubmit}
    >
      <div className="bg-section p-4 grid gap-4">
        <Input
          name="name"
          label="Họ tên*"
          placeholder="Nhập họ tên"
          required
          onChange={(e) => handleChange("name", e.target.value)}
          value={formData.name}
        />
        <DatePicker
          key={date1?.getDate()}
          label="Ngày khám*"
          helperText="Chọn ngày khám"
          mask
          maskClosable
          title="Chọn ngày"
          value={date1}
          onChange={(dateObj) => {
            const localDate = formatDateLocal(new Date(dateObj));
            handleChange("date", localDate);
          }}
        />
        <Input
          name="phone"
          label="Số điện thoại*"
          required
          placeholder="Nhập số điện thoại"
          pattern="[0-9]*"
          onChange={(e) => handleChange('phone',e.target.value)} value={formData.phone}
        />
        <Input
          name="email"
          label="Email"
          placeholder="Email"
          onChange={(e) => handleChange('email',e.target.value)} value={formData.email}
        />
        <Input
          name="address"
          label="Địa chỉ"
          placeholder="Nhập dịa chỉ"
          onChange={(e) => handleChange('address',e.target.value)} value={formData.address}
        />
      </div>
      <div className="p-6 pt-4 bg-section">
        <Button htmlType="submit" fullWidth>
          Đăng ký khám
        </Button>
      </div>
    </form>
  );
}
