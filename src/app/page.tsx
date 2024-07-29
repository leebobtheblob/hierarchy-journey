import Image from "next/image";
import SimpleTree from "./_components/simple-tree";
import TreeExample from "./_components/simple-tree-controlled";
import { getHierarchy } from "./_actions/tree-action";

export default async function Home () {

const hierarchy_data = await getHierarchy()
console.log("server page : ",hierarchy_data)
  return (
   <div className="p-20">
    
      <SimpleTree data={hierarchy_data}/>
      {/* <TreeExample/> */}
   </div>
  );
}
