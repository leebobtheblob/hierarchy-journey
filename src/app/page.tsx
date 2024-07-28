import Image from "next/image";
import SimpleTree from "./_components/simple-tree";
import TreeExample from "./_components/simple-tree-controlled";

export default function Home() {
  return (
   <div className="p-20">
    
      <SimpleTree/>
      {/* <TreeExample/> */}
   </div>
  );
}
