import styled from 'styled-components';
import { Button } from 'antd';

export const ButtonContainer = styled(Button)`
    color: ${(props) => props.color || '#0055A9'};
    background: #ffffff;
    box-shadow: ${(props) =>
        props.shadow === 'none'
            ? 'none'
            : '3px 3px 10px rgba(0, 85, 169, 0.25)'};
    border-radius: 20px;
    border: none;
    text-transform: uppercase;
    width: auto;
    font-size: 12px;
    padding: 8px 20px !important;
    height: auto;
    font-weight: bold;
    min-width: 120px;
    font-family: Raleway;

    &:focus {
        color: ${(props) =>
            props.hovercolor || props.color || '#0055A9'} !important;
    }

    &:hover {
        color: ${(props) =>
            props.hovercolor || props.color || '#0055A9'} !important;
    }
`;
