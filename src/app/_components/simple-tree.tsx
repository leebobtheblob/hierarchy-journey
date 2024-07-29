"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Tree,
  UncontrolledTreeEnvironment,
  TreeItem,
  TreeItemIndex,
  DraggingPosition,
} from "react-complex-tree";
import { CustomTreeDataProvider } from "./custom-tree-data-provider";
import { Button } from "./button";



const SimpleTree = ( {data:any}) => {
  const initialItems = {
    root: {
      index: "root",
      canMove: true,
      isFolder: true,
      children: ["office1", "office2"],
      data: "Root item",
      canRename: true,
    },
    office1: {
      index: "office1",
      canMove: true,
      isFolder: true,
      children: ["member1", "member2", "member3"],
      data: "성남",
      canRename: true,
    },
    office2: {
      index: "office2",
      canMove: true,
      isFolder: true,
      children: ["member4"],
      data: "가산",
      canRename: true,
    },
    member1: {
      index: "member1",
      canMove: true,
      children: [],
      data: "강영진",
      canRename: true,
    },
    member2: {
      index: "member2",
      canMove: true,
      children: [],
      data: "이승현",
      canRename: true,
    },
    member3: {
      index: "member3",
      canMove: true,
      children: [],
      data: "임재범",
      canRename: true,
    },
    member4: {
      index: "member4",
      canMove: true,
      children: [],
      data: "가산 김씨",
      canRename: true,
    },
  };

  const [items, setItems] = useState(initialItems);
  const dataProviderRef = useRef(new CustomTreeDataProvider(initialItems));

  useEffect(() => {
    dataProviderRef.current.updateItems(items);
  }, [items]);

  const onDrop = (itemsBeingMoved, target) => {
    console.log("on drop");

    console.log(itemsBeingMoved);
    console.log(target);
    console.log(initialItems);

    if (target.targetType === "between-items" || target.targetType === "item") {
      setItems((prevItems) => {
        console.log(prevItems);

        if (!prevItems) return prevItems;

        const itemIds = itemsBeingMoved.map((item) => item.index);
        const parentNode =
          target.targetType === "between-items"
            ? prevItems[target.parentItem]
            : prevItems[target.targetItem];

        // Remove the items from their previous parent
        Object.values(prevItems).forEach((item) => {
          if (item.children) {
            item.children = item.children.filter(
              (child) => !itemIds.includes(child)
            );
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

        // Emit the change event
        dataProviderRef.current.triggerChange([parentNode.index]);

        console.log(newData);

        return newData;
      });
    }
  };

  const handleSave =()=>{
    
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="col-span-2 border-2 border-grey h-[50vh] p-4">
        <div>
        <Button onClick={handleSave} >저장</Button>
        <UncontrolledTreeEnvironment
          dataProvider={dataProviderRef.current}
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
      <div className="border-2 border-grey h-[50vh] p-4 bg-gray-50">
        <h1 className="font-bold">{"JSON Data Structure:"}</h1>
        <pre>{JSON.stringify(items, null, 2)}</pre>
      </div>
    </div>
  );
};

export default SimpleTree;
