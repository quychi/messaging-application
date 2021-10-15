import React, { useEffect, useState } from 'react';
import {
    firebaseShallowKeys,
    getMessagePage
} from '../../../helpers/firebasePagination';
import { db } from '../../../services/firebase';

import { Scroller } from './Scroller';

const wait = (time) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });

const loadMessage = async (roomName, callNumber) => {
    await wait(500);
    const { pageCount, keys } = await firebaseShallowKeys(roomName);
    if (callNumber > Math.ceil(pageCount))
        return { isMore: false, messages: [] };

    const loadedMessages = await getMessagePage(
        callNumber,
        roomName,
        keys,
        pageCount
    );
    return {
        isMore: true,
        messages: loadedMessages
    };
};

export const Container = ({ roomName }) => {
    const [numberOfLoads, setNumberOfLoads] = useState(0);
    const [isMoreData, setIsMoreData] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [listMessages, setListMessages] = useState([]);

    const loadMoreData = async () => {
        setIsLoading(true);
        const { messages: newMessages, isMore } = await loadMessage(
            roomName,
            numberOfLoads + 1
        );
        setListMessages((prev) => [...newMessages, ...prev]); //Spread Operator: gộp mảng (ở đầu mảng)
        setIsMoreData(isMore);
        setNumberOfLoads((prev) => ++prev);
        setIsLoading(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            await loadMoreData();
            await listenNewMessage(roomName);
        };
        fetchData();
    }, []);

    const listenNewMessage = async (roomName) => {
        let now = new Date().getTime();
        try {
            db.ref('chats')
                .child(roomName)
                .orderByChild('created')
                .startAt(now)
                .on('child_added', (snap) => {
                    setListMessages((prev) => [...prev, snap.val()]);
                });
        } catch (error) {
            console.log('============= read error', error.message);
        }
    };

    return (
        <Scroller
            listMessages={listMessages}
            hasMore={isMoreData}
            loadMoreData={loadMoreData}
            isLoading={isLoading}
        />
    );
};
