export class CustomTreeDataProvider {
    constructor(initialItems) {
      this.items = initialItems;
      this.listeners = [];
    }
  
    onDidChangeTreeData = (listener) => {
      this.listeners.push(listener);
      return {
        dispose: () => {
          this.listeners = this.listeners.filter((l) => l !== listener);
        },
      };
    };
  
    getTreeItem = async (itemId) => {
      return this.items[itemId];
    };
  
    onRenameItem = async (item, name) => {
      this.items[item.index] = { ...item, data: name };
      this.triggerChange([item.index]);
    };
  
    onChangeItemChildren = async (itemId, newChildren) => {
      this.items[itemId].children = newChildren;
      this.triggerChange([itemId]);
    };
  
    triggerChange = (changedItemIds) => {
      this.listeners.forEach((listener) => listener(changedItemIds));
    };
  
    updateItems = (newItems) => {
      this.items = newItems;
      this.triggerChange(Object.keys(newItems));
    };
  }