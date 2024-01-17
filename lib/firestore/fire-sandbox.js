
module.exports = (Firestore) => {

    class FirestoreSandBox extends Firestore {
        constructor(debug) {
            super(debug)
        }

        setNewDocument(docName='item',data) {
            try {
                return super.setNewDocument(docName,data);
            } catch (err) {
                console.log('[setNewDocument] error', err)
            }
        }

        setNewDynamicDocument(col, data,cb) {
            try {
                return super.setNewDynamicDocument(col, data,cb)
            } catch (err) {
                console.log('[setNewDynamicDocument] error', err)
            }
        }
        streamListen() {
            try {
                super.streamListen();
            } catch (err) {
                console.log('[streamListen] error', err)
            }
            return this
        }

        streamListenDiffs() {
            try {
                super.streamListenDiffs()
            } catch (err) {
                console.log('[streamListenDiffs] error', err)
            }
            return this;
        }
        streamListenDocument() {
            try {
                super.streamListenDocument()
            } catch (err) {
                console.log('[streamListenDocument] error', err)
            }
            return this;
        }
    }
    return FirestoreSandBox
}
