import jsTPS_Transaction from '../common/jsTPS.js';
/**
 * MoveItem_Transaction
 *
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 */
export default class MergeRegion_Transaction extends jsTPS_Transaction {
  constructor(initStore, oldRegions, newRegion) {
    super();
    this.store = initStore;
    this.oldRegions = oldRegions;
    this.newRegion = newRegion;
  }

  doTransaction() {
    this.store.mergeRegion(this.oldRegions, this.newRegion);
  }

  undoTransaction() {
    this.store.restoreRegion(this.oldRegions, this.newRegion);
  }
}
