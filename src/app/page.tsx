import Home_Home from "@/widgets/Home_Home/UI/Home_Home";
import Home_Tours from "@/widgets/Home_Tours/Home_Tours";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <div className="Home relative h-[700px]">
       <Home_Home/>
    </div>
    <Home_Tours/>
    </>
  );
}
