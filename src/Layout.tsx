import { ReactNode } from "react";
import Titlebar from "./components/Titlebar";

export default function Layout({ children }: { children: ReactNode }) {
   return (
      <div className="flex flex-col h-screen w-screen bg-background">
         <Titlebar />
         <div className="grow p-1 overflow-hidden">{children}</div>
      </div>
   );
}
