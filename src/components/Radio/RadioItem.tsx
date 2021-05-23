import React, { useContext } from 'react'
import { useRadioGroupContext } from './RadioGroup'

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
        <>
            <input type="radio" id={name} name={name} value={value} checked={self?.selected} onChange={(e) => handleChange(e.target.value)} disabled={disabled}></input>
            <label htmlFor={value}>{value}</label>
        </>
    )
}

export default RadioItem 
