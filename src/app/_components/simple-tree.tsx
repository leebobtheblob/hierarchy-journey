'use client';
import React from 'react'
import { StaticTreeDataProvider, Tree, UncontrolledTreeEnvironment } from 'react-complex-tree';

const SimpleTree = () => {
    const items = {
        root: {
          index: 'root',
          canMove: true,
          isFolder: true,
          children: ['office1', 'office2'],
          data: 'Root item',
          canRename: true,
        },
        office1: {
          index: 'office1',
          canMove: true,
          isFolder: true,
          children: [],
          data: '성남',
          canRename: true,
        },
        office2: {
          index: 'office2',
          canMove: true,
          isFolder: true,
          children: ['member1'],
          data: '가산',
          canRename: true,
        },
        member1: {
            index: 'member1',
            canMove: true,
            children: [],
            data: '강영진',
            canRename: true,
          },
        //   member2: {
        //     index: 'member2',
        //     canMove: true,
        //     isFolder: false,
        //     children: [],
        //     data: '이승현',
        //     canRename: true,
        //   },
        // member3: {
        //     index: 'member3',
        //     canMove: true,
        //     isFolder: false,
        //     children: [],
        //     data: '임재범',
        //     canRename: true,
        //   },
      };

      const dataProvider = new StaticTreeDataProvider(items, (item, newName) => ({ ...item, data: newName }));
      console.log(dataProvider)
      
      return (
        <div className='grid grid-cols-3 gap-2'>
            <div className='col-span-2 border-2 border-grey h-[50vh] p-4'>
            <UncontrolledTreeEnvironment
          dataProvider={dataProvider}
          getItemTitle={item => item.data}
          viewState={{}}
          canDragAndDrop={true}
          canDropOnFolder={true}
          canReorderItems={true}
        >
          <Tree treeId="tree-2" rootItem="root" treeLabel="TAMS 개발팀" />
        </UncontrolledTreeEnvironment>
            </div>
            <div className='border-2 border-grey h-[50vh] p-4 bg-gray-50'>
            <h1 className='font-bold'>{"JSON Data Structure:"}</h1>
            <main >
            
            </main>
        </div>
   
        </div>
      );
}



export default SimpleTree