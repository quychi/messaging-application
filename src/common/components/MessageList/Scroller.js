import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import getWindowDimensions from '../../../helpers/useWindowDimensions';
import { useIsScrollable } from './useIsScrollable';
import moment from 'moment';
import Message from '../Message';
import { auth } from '../../../services/firebase';

export const Scroller = ({
    listMessages,
    loadMoreData,
    isLoading,
    hasMore
}) => {
    const [isScrollable, ref, node] = useIsScrollable([listMessages]);

    console.log('Scroller', listMessages);

    useEffect(() => {
        if (!node || isLoading) return;

        if (!isScrollable && hasMore) {
            loadMoreData();
        }
    }, [isLoading, isScrollable, hasMore, node]);

    const renderMessages = (
        previousMessages,
        currentMessages,
        nextMessages,
        index
    ) => {
        const MY_USER_ID = auth?.currentUser?.uid; //userData.uid;
        let isMine = currentMessages.sentBy === MY_USER_ID;
        let currentMoment = moment(currentMessages.timestamp);
        let prevBySameAuthor = false;
        let nextBySameAuthor = false;
        let startsSequence = true;
        let endsSequence = true;
        let showTimestamp = true;

        if (previousMessages) {
            let previousMoment = moment(previousMessages.timestamp);
            let previousDuration = moment.duration(
                currentMoment.diff(previousMoment)
            );
            prevBySameAuthor =
                previousMessages.sentBy === currentMessages.sentBy;

            if (prevBySameAuthor && previousDuration.as('hours') < 1) {
                startsSequence = false;
            }

            if (previousDuration.as('hours') < 1) {
                showTimestamp = false;
            }
        }

        if (nextMessages) {
            let nextMoment = moment(nextMessages.timestamp);
            let nextDuration = moment.duration(nextMoment.diff(currentMoment));
            nextBySameAuthor = nextMessages.sentBy === currentMessages.sentBy;

            if (nextBySameAuthor && nextDuration.as('hours') < 1) {
                endsSequence = false;
            }
        }

        return (
            <Message
                key={index}
                isMine={isMine}
                startsSequence={startsSequence}
                endsSequence={endsSequence}
                showTimestamp={showTimestamp}
                data={currentMessages}
            />
        );
    };

    const { height: windowHeight } = getWindowDimensions();
    const heightOfHeaderAndSendDiv = 269;

    // console.log(
    //     '========================',
    //
    // );

    return (
        <div>
            {/* Scrollable - {`${isScrollable}`} */}
            <div
                id="scrollableDiv"
                style={{
                    height: 400,
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    border: 'solid 1px black'
                }}
                ref={ref}
            >
                <InfiniteScroll
                    dataLength={listMessages?.length}
                    next={loadMoreData}
                    style={{
                        display: 'flex',
                        flexDirection: 'column-reverse'
                    }} //To put endMessage and loader to the top.
                    inverse={true}
                    hasMore={hasMore}
                    loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
                    scrollableTarget="scrollableDiv"
                >
                    <div>
                        {listMessages?.map((item, index) => {
                            return renderMessages(
                                listMessages[index - 1],
                                item,
                                listMessages[index + 1],
                                index
                            );
                        })}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    );
};
