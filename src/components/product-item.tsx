import { Product } from "@/types";
import { formatPrice } from "@/utils/format";
import TransitionLink from "./transition-link";
import { useState } from "react";
import CONFIG from "@/config";
import { userInfoKeyState, userInfoState } from "@/state";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "zmp-ui";
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
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const data1 ={
      Name: name,
      Phone: phone,
      Email: email,
      Address: address,
      Date: new Date().toString(),
    }
    axios.post('https://sheetdb.io/api/v1/qocyk8usx81gw', data1).then((respose) =>{console.log(respose)})
   
    toast.success("Đã đăng ký thành công!");
  }

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
  //     <div className="bg-section p-4 grid gap-4">
  //       <Input name="name" label="Họ tên" defaultValue={userInfo?.name} />
  //       <Input
  //         name="phone"
  //         label="Số điện thoại"
  //         required
  //         defaultValue={userInfo?.phone}
  //       />
  //       <Input
  //         name="email"
  //         label="Email"
  //         placeholder="Email"
  //         defaultValue={userInfo?.email}
  //       />
  //       <Input
  //         name="address"
  //         label="Địa chỉ"
  //         placeholder="Nhập dịa chỉ"
  //         defaultValue={userInfo?.address}
  //       />
  //     </div>
  //     <div className="p-6 pt-4 bg-section">
  //       <Button htmlType="submit" fullWidth>
  //         Đăng ký khám
  //       </Button>
  //     </div>
  //   </form>
  // );
  return (
    <form
      className="h-full flex flex-col justify-between"
      onSubmit={handleSubmit}
        
      
    >
      <div className="bg-section p-4 grid gap-4">
        <Input name="name" label="Họ tên*" placeholder="Nhập họ tên" required onChange={(e) => setName(e.target.value)} value={name}/>
        <Input
          name="phone"
          label="Số điện thoại*"
          required
          onChange={(e) => setPhone(e.target.value)} value={phone}
        />
        <Input
          name="email"
          label="Email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} value={email}
        />
        <Input
          name="address"
          label="Địa chỉ"
          placeholder="Nhập dịa chỉ"
          onChange={(e) => setAddress(e.target.value)} value={address}
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
