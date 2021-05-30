import styled, { css } from 'styled-components'

export const Container = styled.label`
    position: relative;
    padding-left: 30px;
    display: block;
    margin-bottom: 20px;
`

export const Input = styled.input`
    position: absolute;
    width: 0; 
    height: 0;
    opacity: 0;
`

export const CheckMarkShadow = styled.span<{ disabled : boolean }>`
    position: absolute;
    top: -6px;
    left: -6px;

    width: 30px; 
    height: 30px;
    border-radius: 50%;
    background-color: #fff;
    cursor: pointer;
            
    &:hover{
        background-color: #eee;
    }

    &::after{
        content: "";
        position: absolute;
        width: 100%; 
        height: 100%; 
        top: 0; 
        left: 0;
        pointer-events: none;
        background-image: radial-gradient(circle, rgb(0, 211, 122) 8%, transparent 8.01%);
        background-repeat: no-repeat; 
        background-position: 50%; 
        transform: scale(10, 10);
        opacity: 0;
        transition: transform .5s, opacity 1s;
    }

    &:active::after {
        transition: 0s; 
        transform: scale(0, 0); 
        opacity: 0.3;
    }

    ${({ disabled }) => disabled && css`
        cursor: default;
        pointer-events: none;
        color: #cfd8dc;
    `}
`


export const CheckMark = styled.span<{ checked : boolean, disabled : boolean }>`
    position: absolute;
    top: 7px;
    left: 7px;

    width: 15px; 
    height: 15px;
    border-radius: 50%;

    border: ${({ checked }) => checked ? css`
        1px solid rgb(0, 211, 122);
    `: css`
        1px solid rgba(0, 0, 0, 0.54);
    `};

    &::after {
        content : "";
        width: 70%; 
        height: 70%; 
        border-radius: 50%;
        background-color: rgb(0, 211, 122);

        position: absolute;
        left: 2px; 
        top: 2px; 
        opacity: ${({ checked }) => checked ? css`
            1;
        `: css`
            0;
        `};
    }

    ${({ disabled }) => disabled && css`
        cursor: default;
        pointer-events: none;
        color: #cfd8dc;
    `}
`

