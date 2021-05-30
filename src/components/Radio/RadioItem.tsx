import React, { useContext } from 'react'
import { useRadioGroupContext } from './RadioGroup'
import * as S from './RadioItem.style'

export interface RadioItemProps {
    name: string
    value: string
    disabled ?: boolean
    initOnMount ?: boolean
}


const RadioItem = ({ name, value, disabled } : RadioItemProps) => {
    const { states, handleChange } = useRadioGroupContext()
    const self = states.find(state => state.value === value)

    return (
        <S.Container>
            <S.Input type="radio" name={name} value={value} checked={self?.selected} onChange={(e) => handleChange(e.target.value)} disabled={disabled}></S.Input>
            <S.CheckMarkShadow disabled={disabled}>
                <S.CheckMark checked={self?.selected} disabled={disabled}/>
            </S.CheckMarkShadow>
            {value}
        </S.Container>
    )
}

export default RadioItem 
