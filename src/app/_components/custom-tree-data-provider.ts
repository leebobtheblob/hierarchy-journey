import { TreeDataProvider, TreeItem, TreeItemIndex, Disposable } from "react-complex-tree";

export class CustomDataProviderImplementation implements TreeDataProvider {
  private data: Record<TreeItemIndex, TreeItem>;

  private treeChangeListeners: ((changedItemIds: TreeItemIndex[]) => void)[] = [];

  constructor(initialData: Record<TreeItemIndex, TreeItem>) {
    this.data = { ...initialData };
  }

  public async getTreeItem(itemId: TreeItemIndex) {
    return this.data[itemId];
  }

  public async onChangeItemChildren(itemId: TreeItemIndex, newChildren: TreeItemIndex[]) {
    this.data[itemId].children = newChildren;
    this.treeChangeListeners.forEach(listener => listener([itemId]));
  }

  public onDidChangeTreeData(listener: (changedItemIds: TreeItemIndex[]) => void): Disposable {
    this.treeChangeListeners.push(listener);
    return {
      dispose: () =>
        this.treeChangeListeners.splice(this.treeChangeListeners.indexOf(listener), 1),
    };
  }

  public async onRenameItem(item: TreeItem<any>, name: string): Promise<void> {
    this.data[item.index].data = name;
  }

  // custom handler for directly manipulating the tree data
  public injectItem(name: string, selected_item='root') {
    const rand = `${Math.random()}`;
    this.data[rand] = { data: name, index: rand } as TreeItem;
    this.data['Gasan'].children?.push(rand)
  
    // this.data.root.children?.push(rand);
    this.treeChangeListeners.forEach(listener => listener([selected_item]));
  }

  // method to update items in the provider
  public updateItems(newItems: Record<TreeItemIndex, TreeItem>) {
    this.data = { ...newItems };
    this.treeChangeListeners.forEach(listener => listener(Object.keys(newItems) as TreeItemIndex[]));
  }
}
