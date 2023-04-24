import jsTPS_Transaction from '../common/jsTPS.js';
/**
 * MoveItem_Transaction
 *
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 */
export default class DeleteRegion_Transaction extends jsTPS_Transaction {
  constructor(initStore, layer) {
    super();
    this.store = initStore;
    this.layer = layer;
  }

  doTransaction() {
    this.store.deleteRegion(this.layer);
  }

  undoTransaction() {
    this.store.createRegion(this.layer);
  }
}
