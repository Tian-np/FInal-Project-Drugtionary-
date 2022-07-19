const { initializeApp, cert } = require('firebase-admin/app');
const serviceAccount = require('./serviceAccountKey.json')
const { getStorage } = require('firebase-admin/storage')

initializeApp({storageBucket: "gs://pharma-friend.appspot.com", credential: cert(serviceAccount)})

const getBucket = () => {
    return getStorage().bucket()
}

module.exports = {getBucket}