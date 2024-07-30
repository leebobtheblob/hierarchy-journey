"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import type { Hierarchy } from '@prisma/client'
import {
  Tree,
  UncontrolledTreeEnvironment,
  TreeItem,
  TreeItemIndex,
  DraggingPosition,
  StaticTreeDataProvider,
} from "react-complex-tree";
import { Button } from "./button";
import { updateHierarchy } from "@/_actions/tree-action";

type SimpleTreeProps = {
  hierarchyData: Record<TreeItemIndex, TreeItem<any>>;
}

const BasicTree = ({ hierarchyData }: SimpleTreeProps) => {
  const [items, setItems] = useState(hierarchyData);

  const dataProvider = useMemo(() => new StaticTreeDataProvider(items, (item, data) => ({
    ...item, data,
  })), [items]);

  const onDrop = useCallback((itemsBeingMoved, target) => {
    if (target.targetType === "between-items" || target.targetType === "item") {
      setItems((prevItems) => {
        if (!prevItems) return prevItems;

        const itemIds = itemsBeingMoved.map((item) => item.index);
        const parentNode =
          target.targetType === "between-items"
            ? prevItems[target.parentItem]
            : prevItems[target.targetItem];

        // Remove the items from their previous parent
        Object.values(prevItems).forEach((item) => {
          if (item.children) {
            item.children = item.children.filter((child) => !itemIds.includes(child));
          }
        });

        // Add the items to the new parent
        const newChildren = [...(parentNode.children ?? [])];
        if (target.targetType === "between-items") {
          newChildren.splice(target.childIndex, 0, ...itemIds);
        } else {
          newChildren.push(...itemIds);
        }

        const newData = {
          ...prevItems,
          [parentNode.index]: {
            ...parentNode,
            children: newChildren,
          },
        };

        return newData;
      });
    }
  }, []);

  const handleSave = async () => {
    // Implement your save logic here
    console.log(items);
    await updateHierarchy(items);
  };

  return (
    <div className="grid grid-cols-3 gap-2 h-[100vh] p-4">
      <div className="col-span-2 border-2 border-grey">
        <div>
          <Button onClick={handleSave}>저장</Button>
          <UncontrolledTreeEnvironment
            dataProvider={dataProvider}
            getItemTitle={(item) => item.data}
            viewState={{}}
            canDragAndDrop={true}
            canDropOnFolder={true}
            canReorderItems={true}
            onDrop={onDrop}
          >
            <Tree treeId="tree-2" rootItem="root" treeLabel="TAMS 개발팀" />
          </UncontrolledTreeEnvironment>
        </div>
      </div>
      <div className="border-2 border-grey bg-gray-50">
        <h1 className="font-bold">{"JSON Data Structure:"}</h1>
        <pre>{JSON.stringify(items, null, 2)}</pre>
      </div>
    </div>
  );
};

export default BasicTree;
