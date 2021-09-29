import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Col
    // Checkbox,
} from 'antd';

// import SuspenseLoading from 'common/components/SuspenseLoading';

import Register1 from './components/register1';

const ModalComponent = lazy(() => import('../../common/components/Modal'));

const UserInfo = ({ onCancel, height }) => {
    const ModalMembership = () => {
        return (
            <ModalComponent
                width={960}
                scroll={false}
                visible={true}
                footer={null}
                // onCancel={() => {
                // setIsShowModalThanks(false);
                //   onCancel();
                // }}
                centered
            >
                <Col xs={24} align="center" justify="center">
                    <Col
                        style={{
                            marginTop: 50,
                            display: 'flex',
                            alignItems: 'end',
                            justifyContent: 'center'
                        }}
                    >
                        <span
                            style={{
                                paddingLeft: '5px',
                                fontFamily: 'Raleway',
                                fontStyle: 'normal',
                                fontWeight: '500',
                                fontSize: '20px',
                                lineHeight: '153.9%'
                            }}
                        >
                            Users Info
                        </span>
                    </Col>
                    <Col xs={16} align="center" justify="space-between">
                        <Register1 />
                    </Col>
                </Col>
            </ModalComponent>
        );
    };

    return (
        <div>
            <Suspense fallback={<div>Loading... </div>}>
                <ModalMembership />
            </Suspense>
        </div>
    );
};

export default UserInfo;
