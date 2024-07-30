"use client";
import React, { useState, useEffect, useMemo } from "react";
import type { Hierarchy } from '@prisma/client'
import {
  Tree,
  UncontrolledTreeEnvironment,
  TreeItem,
  TreeItemIndex,
  DraggingPosition,
} from "react-complex-tree";
import { CustomDataProviderImplementation } from "./custom-tree-data-provider";
import { Button } from "./button";
import { updateHierarchy } from "@/_actions/tree-action";


type SimpleTreeProps ={
  hierarchyData: Record<TreeItemIndex, TreeItem<any>>;
}

const SimpleTree = ({ hierarchyData }:SimpleTreeProps) => {
  const [selectedItem, setSelectedItem] = useState<TreeItemIndex[] | null>()
  const [items, setItems] = useState(hierarchyData);
console.log(hierarchyData)
  const dataProvider = useMemo(() => new CustomDataProviderImplementation(hierarchyData), 
  [hierarchyData]);

  useEffect(() => {
    dataProvider.updateItems(items);
  }, [items, dataProvider]);


  const onDrop = (itemsBeingMoved:TreeItem<any>[], target:DraggingPosition) => {
    if (target.targetType === "between-items" || target.targetType === "item") {
      setItems((prevItems) => {
        if (!prevItems) return prevItems;

        const itemIds = itemsBeingMoved.map((item) => item.index);
        const parentNode =
          target.targetType === "between-items"
            ? prevItems[target.parentItem]
            : prevItems[target.targetItem];

        // Remove the items from their previous parent - 이전 부모로 부터 제거
        Object.values(prevItems).forEach((item) => {
          if (item.children) {
            item.children = item.children.filter((child) => !itemIds.includes(child));
          }
        });

        // Add the items to the new parent - 새로운 부모한테 추가
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

        // Emit the change event
        dataProvider.updateItems(newData);

        return newData;
      });
    }
  };

  const handleSave = async() => {
    // Implement your save logic here
    console.log(items)
    await updateHierarchy(items)
  };

  const handleInject = async() => {
    // Implement your save logic here
    // console.log(items)
    // await updateHierarchy(items)

    // const selectedItemType = 
    // if(selectedItem)
    dataProvider.injectItem(window.prompt('Item name') || 'New item', selectedItem[0])
  };


  const handleSelect =(items: TreeItemIndex, treeId: string)=>{
    // console.log(items)
    // console.log(treeId)//
    setSelectedItem(items)
  }
  

  return (
    <div className="grid grid-cols-3 gap-2 h-[100vh] p-4">
      <div className="col-span-2 border-2 border-grey">
        <div>
          <Button onClick={handleSave}>저장</Button>
          <Button onClick={handleInject}>추가</Button>
          <UncontrolledTreeEnvironment
            dataProvider={dataProvider}
            getItemTitle={(item) => { console.log(item); return item.data}}
            viewState={{}}
            canDragAndDrop={true}
            canDropOnFolder={true}
            canReorderItems={true}
            onDrop={onDrop}
            onSelectItems={handleSelect}
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

export default SimpleTree;
