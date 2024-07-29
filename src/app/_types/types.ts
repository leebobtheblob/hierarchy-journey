import { TreeItemIndex , TreeItem } from "react-complex-tree"

// type TreeItemIndex = string | number;

// interface TreeItem<T = any> {
//   index: TreeItemIndex;
//   children?: Array<TreeItemIndex>;
//   isFolder?: boolean;
//   canMove?: boolean;
//   canRename?: boolean;
//   data: T;
// }

export type HierarchyData = Record<TreeItemIndex, TreeItem<any>>;

export function isHierarchyData(value: any): value is HierarchyData {
    if (typeof value !== 'object' || value === null) return false;
  
    return Object.values(value).every(
      item =>
        item &&
        typeof item === 'object' &&
        'index' in item &&
        'data' in item
    );
  }