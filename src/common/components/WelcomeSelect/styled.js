import styled from 'styled-components';
import { Select } from 'antd';

export const SelectContainer = styled(Select)`
    height: 40px !important;
    width: 100% !important;

    .ant-select-selector {
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
        background-color: #fafafa !important;
        height: 40px !important;
        border-radius: 20px !important;
        align-items: center;
    }

    font-variant-numeric: lining-nums;
    -moz-font-feature-settings: 'lnum' 1;
    -moz-font-feature-settings: 'lnum=1';
    -ms-font-feature-settings: 'lnum' 1;
    -o-font-feature-settings: 'lnum' 1;
    -webkit-font-feature-settings: 'lnum' 1;
    font-feature-settings: 'lnum' 1;
`;
