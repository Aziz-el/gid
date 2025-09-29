
import get_Stocks, { Stock } from '../Model/Stock_Model'
import  { Tour } from '@/entities/tours/Model/Tour_Model'
import Button from '@/shared/UI/Button'
import axios from 'axios'

export default function Complicated_Slider({stock,tour}:{stock:Stock,tour:Tour}) {
  const [year, month, day] = tour.date.start_date.split("-");
  const formatted = `${month}/${day}/${year.slice(2)}`;
  return (
   <>
   <div className="swip w-[1250px] h-[500px]">
        <h1 className='text-[23px] absolute top-[40px] left-[60px]'>GID</h1>
        <div className="body w-full h-full flex items-center justify-between gap-20">
            <div className="tourCard relative h-[300px] w-[700px] text-black">
                <img src={tour.img} alt="" className='w-[700px] h-[300px] object-cover rounded-4xl absolute z-3 top-[0] left-[50px]' />
                <div className="foot absolute z-4 bg-white rounded-2xl max-w-[108px] flex items-center justify-center px-2 py-1 top-[10px] left-[60px] ">{formatted}</div>
                <div className='flex gap-1 absolute right-0 top-[10px]'>
                    {tour.tags.map((el, i) => (
                       <Button key={i} type="fourd" Effectclass="relative z-4 " title={el} />
        ))}
                </div>
            </div>
            <div className="stockCard mt-10">
               <div className=" text-gray-50 px-[0px] py-[50px] flex flex-col gap-1 mb-13">  
                  <p className='text-[35px] font-bold leading-[110%] max-w-[460px]'>{stock.title}</p>
                  <p className='text-gray-300 text-[15px] max-w-[420px]'>{stock.desc}</p>
                  <Button title={`buy`} type='third' Effectclass='max-w-[80px] mt-4'/>
                </div>
            </div>
        </div>
        <p className='absolute bottom-[40px] left-[60px]'>Book your tour right now!</p>
      </div>
    </>
  )
}
