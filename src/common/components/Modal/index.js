import React, { useRef, useEffect } from 'react';
import { Container } from '../../theme/styled';
import { ModalContainer, ContentBackgroundWrapper } from './styled';

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
            // height={props?.height ? props.height : height}
            scroll={scroll}
        >
            <Container ref={scrollRef}>
                <ContentBackgroundWrapper>{children}</ContentBackgroundWrapper>
            </Container>
        </ModalContainer>
    );
};

ModalComponent.defaultProps = {
    scroll: true
};

export default ModalComponent;
