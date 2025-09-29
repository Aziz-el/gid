import { useModals } from '@/Hooks/MainStore';
import Button from '@/shared/UI/Button';
import Close_button from '@/shared/UI/Close_button'
import React, { useState } from 'react'
import ConfirmModal from '@/features/Exiet/Exiet';
import { useAuthStore } from '@/Hooks/AuthStore';
import Edit_Company from './Pages/Edit_Company';
import Add_Tour from './Pages/Add_Tour/Add_Tour';
import My_Tours from './Pages/My_Tours';
import Applications from './Pages/Applications';
import Settings from './Pages/Settings_Company';
import Favorites_Company from './Pages/Favorites';

export default function Profile_Company() {
    const logout = useAuthStore(state => state.logout)
    let {close, modals} = useModals();
    let [delState,setDel] = useState(false);
    let activeModal = modals.find((m) => (m.key == "profile_company" ? m.isActive : false));
    let [activePage ,setPage] = useState(0)

    const handleLogout = () => {
    logout()
    setDel(false) 
    close("profile_company")
  }
  return (
     <div className={`containerForNotScrolling bg-gray-500/50 w-full h-[700px] absolute top-0 left-0 z-6 ${activeModal? '' : 'hidden'}`}>
      <div className={`login w-[1200px] h-[600px] bg-white absolute top-[50px] left-[10%] rounded-[70px] flex  z-7 items-center justify-between px-[50px] gap-16`}>
        <Close_button setState={close} modalKey={"profile_company"}/>
        <div className="navbar flex flex-col gap-2">
            <Button title='Edit Profile' type={activePage === 0 ? 'primary' : 'third'} Effectclass='w-[180px] h-[45px] text-[15px]  rounded-[40px]' onClick={() => setPage(0)}/>
            <Button title='Add Tour' type={activePage === 1 ? 'primary' : 'third'} Effectclass='w-[180px] h-[45px] text-[15px]  rounded-[40px]' onClick={() => setPage(1)}/>
            <Button title='My Tours' type={activePage === 2 ? 'primary' : 'third'} Effectclass='w-[180px] h-[45px] text-[15px]  rounded-[40px]' onClick={() => setPage(2)}/>
            <Button title='Applications' type={activePage === 3 ? 'primary' : 'third'} Effectclass='w-[180px] h-[45px] text-[15px]  rounded-[40px]' onClick={() => setPage(3)}/>
            <Button title='Favorites' type={activePage === 4 ? 'primary' : 'third'} Effectclass='w-[180px] h-[45px] text-[15px]  rounded-[40px]' onClick={() => setPage(4)}/>
            <Button title='Settings' type={activePage === 5 ? 'primary' : 'third'} Effectclass='w-[180px] h-[45px] text-[15px]  rounded-[40px]' onClick={() => setPage(5)}/>
            <Button title='Logout' type={activePage === 5  ? 'sixth' : 'sixth'} Effectclass='w-[180px] h-[45px] text-[15px]  rounded-[40px]' onClick={() => setDel(true)}/>
        </div>
          <Edit_Company activePage={activePage}/>
          <Add_Tour activePage={activePage}/>
          <My_Tours activePage={activePage}/>
          <Applications activePage={activePage}/>
          <Favorites_Company activePage={activePage}/>
          <Settings activePage={activePage} />
          <ConfirmModal
                     isOpen={delState} 
                     title="Вы точно хотите выйти с аккаунта"
                     description="Надеемся вы запомнили свой пароль. Мы будем скучать по вам."
                     actionText="Выйти"
                     onClose={() => setDel(false)}
                     onConfirm={handleLogout}
            />
           
    </div>
   </div>
  )
}
