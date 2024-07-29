type TreeItemIndex = string | number;

interface TreeItem<T = any> {
  index: TreeItemIndex;
  children?: Array<TreeItemIndex>;
  isFolder?: boolean;
  canMove?: boolean;
  canRename?: boolean;
  data: T;
}

type HierarchyData = Record<TreeItemIndex, TreeItem<any>>;

// function isHierarchyData(value: any): value is HierarchyData {
//   if (typeof value !== 'object' || value === null) return false;

//   return Object.values(value).every(
//     item =>
//       item &&
//       typeof item === 'object' &&
//       'index' in item &&
//       'data' in item
//   );
// }

import SimpleTree from './_components/simple-tree';
import { getHierarchy } from './_actions/tree-action';

export default async function Home() {
  const hierarchyData = await getHierarchy();

  let parsedHierarchyData: HierarchyData | null = null;

  if (hierarchyData) {
    parsedHierarchyData = hierarchyData.data;
  }

  return (
    <div className="p-20">
      {parsedHierarchyData ? (
        <SimpleTree hierarchyData={parsedHierarchyData} />
      ) : (
        <p>No Data</p>
      )}
    </div>
  );
}
