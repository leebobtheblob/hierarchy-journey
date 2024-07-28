import React from 'react';
import {
  UncontrolledTreeEnvironment,
  Tree,
  TreeItem,
  TreeItemIndex,
  TreeEnvironmentConfiguration,
  TreeRenderProps,
  TreeViewState,
} from 'react-complex-tree'; // Adjust the import according to your file structure

const nodes = [
  {
    name: 'Home',
    nodes: [
      {
        name: 'Movies',
        nodes: [
          {
            name: 'Action',
            nodes: [
              {
                name: '2000s',
                nodes: [
                  { name: 'Gladiator.mp4' },
                  { name: 'The-Dark-Knight.mp4' },
                ],
              },
              { name: '2010s', nodes: [] },
            ],
          },
          {
            name: 'Comedy',
            nodes: [{ name: '2000s', nodes: [{ name: 'Superbad.mp4' }] }],
          },
          {
            name: 'Drama',
            nodes: [
              { name: '2000s', nodes: [{ name: 'American-Beauty.mp4' }] },
            ],
          },
        ],
      },
      {
        name: 'Music',
        nodes: [
          { name: 'Rock', nodes: [] },
          { name: 'Classical', nodes: [] },
        ],
      },
      { name: 'Pictures', nodes: [] },
      {
        name: 'Documents',
        nodes: [],
      },
      { name: 'passwords.txt' },
    ],
  },
];

// Utility function to flatten the tree structure
const flattenTree = (node, parentId = null, depth = 0) => {
  const id = node.name.replace(/\s+/g, '-').toLowerCase();
  let items = [
    {
      index: id,
      parentId,
      depth,
      data: node,
      children: node.nodes ? node.nodes.map(child => child.name.replace(/\s+/g, '-').toLowerCase()) : [],
      isFolder: !!node.nodes,
    },
  ];
  if (node.nodes) {
    node.nodes.forEach(child => {
      items = items.concat(flattenTree(child, id, depth + 1));
    });
  }
  return items;
};

const flattenedNodes = nodes.flatMap(node => flattenTree(node));
const items = Object.fromEntries(flattenedNodes.map(item => [item.index, item]));

const viewState = {
  treeId: 'myTree',
  rootItem: 'home',
};

const TreeExample = () => {
  return (
    <UncontrolledTreeEnvironment
      items={items}
      getItemTitle={item => item.data.name}
      viewState={{ myTree: viewState }}
    >
      <Tree
        treeId="myTree"
        rootItem="home"
        renderItemTitle={({ title }) => <span>{title}</span>}
      />
    </UncontrolledTreeEnvironment>
  );
};

export default TreeExample;
