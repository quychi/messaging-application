import styled from 'styled-components';
import { Input } from 'antd';

export const InputContainer = styled(Input)`
    height: 40px;
    border-radius: 20px;
    border: none !important;
    outline: none !important;
    box-shadow: none !important;

    .ant-input {
        padding-left: 10px !important;
        background-color: #fafafa !important;
        font-variant-numeric: lining-nums;
        -moz-font-feature-settings: 'lnum' 1;
        -moz-font-feature-settings: 'lnum=1';
        -ms-font-feature-settings: 'lnum' 1;
        -o-font-feature-settings: 'lnum' 1;
        -webkit-font-feature-settings: 'lnum' 1;
        font-feature-settings: 'lnum' 1;
    }
    font-variant-numeric: lining-nums;
    -moz-font-feature-settings: 'lnum' 1;
    -moz-font-feature-settings: 'lnum=1';
    -ms-font-feature-settings: 'lnum' 1;
    -o-font-feature-settings: 'lnum' 1;
    -webkit-font-feature-settings: 'lnum' 1;
    font-feature-settings: 'lnum' 1;
`;

export const InputAreaContainer = styled(Input.TextArea)`
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
    background-color: #fafafa !important;
    font-variant-numeric: lining-nums;
    -moz-font-feature-settings: 'lnum' 1;
    -moz-font-feature-settings: 'lnum=1';
    -ms-font-feature-settings: 'lnum' 1;
    -o-font-feature-settings: 'lnum' 1;
    -webkit-font-feature-settings: 'lnum' 1;
    font-feature-settings: 'lnum' 1;
`;
