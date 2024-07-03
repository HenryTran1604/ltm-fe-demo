import { db } from './FirebaseConfig';

export const addDocument = (collection, data) => {
    const query = db.collection(collection)

    query.add({
        ...data
    });
};

export const isExistedUser = async (collection, user) => {
    try {
        const querySnapshot = await db.collection(collection)
            .where('uid', '==', user.uid)
            .get();
        if (!querySnapshot.empty) {
            // console.log('not empty');
            // console.log(querySnapshot.docs[0].data())
            // return querySnapshot.docs[0].data();
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error checking user existence:', error);
        return null;
    }
}

export const getAllDocuments = async (collection) => {
    const querySnapshot = await db.collection(collection).get();
    return querySnapshot.docs.map(doc => doc.data());
}

export const getRealTimeAllDocument = (collection, callBack) => {
    return db.collection(collection).onSnapshot((snapshot) => {
        const realtimeDocuments = snapshot.docs.map((doc) => ({
            ...doc.data()
        }))
        callBack(realtimeDocuments)
    }, (error) => {
        console.error('Error getting real-time documents:', error)
    })
}