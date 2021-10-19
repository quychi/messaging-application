import { Col, Row } from 'antd';
import React, { useRef, useEffect } from 'react';
import { Container } from '../../theme/styled';
import {
    ModalContainer,
    ContentBackgroundWrapper,
    EmojisBackgroundContainer,
    EmojisBackgroundWrapper
} from './styled';

import { ReactComponent as Emoji1ImgSvg } from '../../images/cowboyHatFace.svg';
import { ReactComponent as Emoji2ImgSvg } from '../../images/grinningSquintingFace.svg';
import { ReactComponent as Emoji3ImgSvg } from '../../images/rollingOnTheFloorLaughing.svg';
import { ReactComponent as Emoji4ImgSvg } from '../../images/beamingFaceWithSmilingEyes.svg';

const ModalComponent = ({ children, scroll, visible, ...props }) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef?.current) {
            scrollRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // eslint-disable-next-line
    }, [visible]);

    return (
        <ModalContainer
            {...props}
            visible={visible}
            width={500}
            scroll={scroll}
        >
            <Container ref={scrollRef}>
                <EmojisBackgroundContainer>
                    <EmojisBackgroundWrapper>
                        <Col xs={24}>
                            <Row>
                                <Col xs={12} style={{ height: 100 }}>
                                    <Emoji2ImgSvg
                                        style={{ marginTop: 20 }}
                                        width="50px"
                                        height="50px"
                                    />
                                </Col>
                                <Col
                                    xs={12}
                                    style={{ height: 100 }}
                                    align="end"
                                >
                                    <Emoji4ImgSvg width="90px" height="90px" />
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24}>
                            <Row>
                                <Col xs={12} style={{ height: 300 }}>
                                    <Emoji3ImgSvg
                                        width="300px"
                                        height="300px"
                                    />
                                </Col>
                                <Col
                                    xs={12}
                                    style={{ height: 100 }}
                                    align="end"
                                >
                                    <Emoji1ImgSvg
                                        style={{ marginRight: -100 }}
                                        width="90px"
                                        height="90px"
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </EmojisBackgroundWrapper>
                </EmojisBackgroundContainer>
                <ContentBackgroundWrapper>{children}</ContentBackgroundWrapper>
            </Container>
        </ModalContainer>
    );
};

ModalComponent.defaultProps = {
    scroll: true
};

export default ModalComponent;
