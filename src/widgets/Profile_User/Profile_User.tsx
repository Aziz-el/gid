import { useModals } from '@/Hooks/MainStore';
import Button from '@/shared/UI/Button';
import Close_button from '@/shared/UI/Close_button'
import React, { useState } from 'react'
import Edit from './Pages/Edit';
import Favorites from './Pages/Favorites';
import MyComments from './Pages/MyComments';
import Settings from './Pages/Settings';
import ConfirmModal from '@/features/Exiet/Exiet';
import { useAuthStore } from '@/Hooks/AuthStore';
import { useReviewsStore } from '@/Hooks/ReviewsTour';
import My_Applications from './Pages/My_Applications';

export default function Profile_User() {
    const logout = useAuthStore(state => state.logout)
    let {close, modals} = useModals();
    let [delState,setDel] = useState(false);
    let activeModal = modals.find((m) => (m.key == "profile_user" ? m.isActive : false));
    let [activePage ,setPage] = useState(0)
    let {reviews} = useReviewsStore()
    reviews
    const handleLogout = () => {
    logout()
    setDel(false) 
    close("profile_user")
  }
  return (
     <div className={`containerForNotScrolling bg-gray-500/50 w-full h-[700px] absolute top-0 left-0 z-6 ${activeModal? '' : 'hidden'}`}>
      <div className={`login w-[1200px] h-[600px] bg-white absolute top-[50px] left-[10%] rounded-[70px] flex  z-7 items-center justify-between px-[50px] gap-16`}>
        <Close_button setState={close} modalKey={"profile_user"}/>
        <div className="navbar flex flex-col gap-2">
            <Button title='Edit Profile' type={activePage === 0 ? 'primary' : 'third'} Effectclass='w-[180px] h-[45px] text-[15px]  rounded-[40px]' onClick={() => setPage(0)}/>
            <Button title='Favorites' type={activePage === 1 ? 'primary' : 'third'} Effectclass='w-[180px] h-[45px] text-[15px]  rounded-[40px]' onClick={() => setPage(1)}/>
            <Button title='My comments' type={activePage === 2 ? 'primary' : 'third'} Effectclass='w-[180px] h-[45px] text-[15px]  rounded-[40px]' onClick={() => setPage(2)}/>
            <Button title='Settings' type={activePage === 3 ? 'primary' : 'third'} Effectclass='w-[180px] h-[45px] text-[15px]  rounded-[40px]' onClick={() => setPage(3)}/>
            <Button title='My applications' type={activePage === 4 ? 'primary' : 'third'} Effectclass='w-[180px] h-[45px] text-[15px]  rounded-[40px]' onClick={() => setPage(4)}/>
            <Button title='Logout' type={activePage === 4 ? 'sixth' : 'sixth'} Effectclass='w-[180px] h-[45px] text-[15px]  rounded-[40px]' onClick={() => setDel(true)}/>
        </div>
          <Edit activePage={activePage}/>
          <Favorites activePage={activePage}/>
          <MyComments activePage={activePage}/>
          <Settings activePage={activePage} />
          <My_Applications activePage={activePage} />
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
