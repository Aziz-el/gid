import Header from "@/widgets/Header/Header";
import "./globals.css";
import{ Inter} from "next/font/google";
import { ModalProvider } from "@/Hooks/MainStore";
export const metadata ={
  title:"GID",
  icons:{
    icon:"/Site_Icon.svg"
  }
}
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
         <ModalProvider>
        <div className="container" style={inter.style}>
          {<Header/>}
          {children}
        </div>
        </ModalProvider>
      </body>
    </html>
  );
}
