import styled from 'styled-components';
import { Modal } from 'antd';
// import { colors } from "../../constants";

export const ModalContainer = styled(Modal)`
    top: 15px;
    left: 0px;
    height: ${(props) => props.height - 30}px !important;
    .ant-modal-body {
        max-height: ${(props) => props.height - 30}px !important;
        overflow-y: ${(props) => (props.scroll ? 'scroll' : 'hidden')};
        overflow-x: hidden;
        padding: 0px 30px 30px 30px !important;
        @media (max-width: 26.5625em) {
            padding: 0px !important;
            max-height: ${(props) => props.height - 25}px !important;
        }
    }
    @media (max-width: 26.5625em) {
        top: 2px;
        height: ${(props) => props.height - 25}px !important;
    }
`;

export const ContentBackgroundWrapper = styled.div`
    width: 100%;
    height: auto;
    padding-top: 20px;

    @media (max-width: 26.5625em) {
        padding-top: 0px;
    }
`;

export const EmojisBackgroundContainer = styled.div`
    position: absolute;
    top: 30px;
    left: 0px;
    width: 100%;
    z-index: 0;
`;

export const EmojisBackgroundWrapper = styled.div`
    position: absolute;
    top: -30px;
    left: -30px;
    width: 100%;
    height: 100%;
    @media (max-width: 26.5625em) {
        padding: 20px;
    }
`;
