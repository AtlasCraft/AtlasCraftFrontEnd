import jsTPS_Transaction from '../common/jsTPS.js';
/**
 * MoveItem_Transaction
 *
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 */
export default class DeleteVertex_Transaction extends jsTPS_Transaction {
  constructor(initStore, indexPath, latlng, layer) {
    super();
    this.store = initStore;
    this.indexPath = indexPath;
    this.latlng = latlng;
    this.layer = layer;
  }

  doTransaction() {
    this.store.deleteVertex(this.indexPath, this.latlng, this.layer);
  }

  undoTransaction() {
    this.store.addVertex(this.indexPath, this.latlng, this.layer);
  }
  updateStore(store) {
    this.store = store;
  }
}
