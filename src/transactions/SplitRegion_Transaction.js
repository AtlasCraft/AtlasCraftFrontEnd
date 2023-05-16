import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * MoveItem_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 */
export default class SplitRegion_Transaction extends jsTPS_Transaction {
    constructor(initStore, initOldRegion, initNewOldRegion, initNewRegion1, initNewRegion2, initType) {
        super();
        this.store = initStore;
        this.oldRegion= initOldRegion;
        this.newOldRegion = initNewOldRegion;
        this.newRegion1 = initNewRegion1;
        this.newRegion2 = initNewRegion2;
        this.type = initType;//1 = remove subregion (polygon), 2 = keep old subregion but modify it(multipoly)

    }

    doTransaction() {
        this.store.splitRegion(this.oldRegion, this.newOldRegion, this.newRegion1, this.newRegion2, "do", this.type);
    }
    
    undoTransaction() {
        this.store.splitRegion(this.oldRegion, this.newOldRegion, this.newRegion1, this.newRegion2, "undo", this.type);
    }

    updateStore(store) {
        this.store = store;
      }
}