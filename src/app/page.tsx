import SimpleTree from './_components/simple-tree';
import { getHierarchy } from './_actions/tree-action';
import { HierarchyData, isHierarchyData } from './_types/types';
import BasicTree from './_components/basic-tree';

export default async function Home() {
  const hierarchyData = await getHierarchy();

  let parsedHierarchyData: HierarchyData | null = null;

  if (hierarchyData && hierarchyData.jdata && isHierarchyData(hierarchyData.jdata)) {
    parsedHierarchyData = hierarchyData.jdata;
  }

  return (
    <div className="p-20">
      {parsedHierarchyData ? (
        <SimpleTree hierarchyData={parsedHierarchyData} />
        // <BasicTree hierarchyData={parsedHierarchyData} />

      ) : (
        <p>No Data</p>
      )}
    </div>
  );
}
