// This script loops through the sorted keys list, does a little paginating, requests each page of data individually and spits them out at the end.
// <<get the number of children of a node without loading all the node data => use axios to make an HTTP request for the shallow keys list>>
// See: https://howtofirebase.com/firebase-data-structures-pagination-96c16ffdb5ca

//Firebase: startAt(...), endAt(...) with value IN field of orderBy...(...)
// + limitToFirst with .startAt. limitToLast with .endBefore.
// + query.off(); <duplicate data when read/wirte>

import { db, urlChats } from '../services/firebase';
const axios = require('axios');

const pageLength = 10;
let promise;
let query;

export const firebaseShallowKeys = async (roomName) => {
    const namesRef = `${urlChats}${roomName}`;
    try {
        return await axios
            .get(namesRef.toString() + '.json?shallow=true')
            .then(function (res) {
                //res is the shallow keys list of data.
                const keys = Object.keys(res.data).sort(); // Notice the .sort()! (sort messages by time after get message - the order not like in db after get data).
                const pageCount = keys.length / pageLength;
                return {
                    pageCount: pageCount,
                    keys: keys
                };
            });
    } catch (error) {
        //should use react-toastify
        return error;
    }
};

export const getMessagePage = async (callNumber, roomName, keys, pageCount) => {
    let indexOfPage;
    if (pageCount % Math.floor(pageCount) === 0) {
        indexOfPage = Math.floor(pageCount - 1 - (callNumber - 1));
    } else {
        indexOfPage = Math.floor(pageCount - (callNumber - 1)); //get the page from newest to oldest (need lastest message)
    }
    let key = keys[indexOfPage * pageLength];
    query = db //Firebse query return a promise
        .ref()
        .child('chats') //chats contain message list
        .child(roomName)
        .orderByKey()
        .limitToFirst(pageLength)
        .startAt(key);
    promise = query.once('value');

    return promise.then(
        function (snaps) {
            var page = [];
            snaps.forEach(function (snap) {
                page.push(snap.val());
            });
            query.off();
            return page;
        },
        function (error) {
            //should use react-toastify
            query.off();
            return error;
        }
    );
};
