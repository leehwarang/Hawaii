import React, { useState, useEffect, ReactNode, ReactElement, createContext, useContext } from 'react'

interface RadioGroupProps {
    children : React.ReactNodeArray
    onChange ?: (updatedState : string) => void
}

interface State {
    value : string
    selected: boolean
}

interface RadioGroupContextType {
    states : State[]
    handleChange: (value : string) => void
}

const RadioGroupContext = createContext({} as RadioGroupContextType)

const RadioGroup = ({ children, onChange } : RadioGroupProps ) => {
    const [states, setStates ] = useState<State[]>([])

    function handleChange( value : string) {
        setStates(() => states.map(s => s.value === value ? { value : s.value, selected : true} : { value : s.value, selected : false}))        
        onChange?.(value)
    }

    useEffect(() => {
     const result = React.Children.map(children, (c => ({ value : (c as ReactElement).props.value, selected : (c as ReactElement).props.initOnMount || false})))
     setStates(result as State[])

    }, [])

    return <RadioGroupContext.Provider value={{ states, handleChange}}>{children}</RadioGroupContext.Provider>
}

export default RadioGroup

interface RadioProps {
    name: string
    value: string
    disabled ?: boolean
    initOnMount ?: boolean
}

export const Radio = ({ name, value, disabled } : RadioProps) => {
    const { states, handleChange } = useContext(RadioGroupContext)
    const self = states.find(state => state.value === value) as State

    return (
        <>
            <input type="radio" id={name} name={name} value={value} checked={self?.selected} onChange={(e) => handleChange(e.target.value)} disabled={disabled}></input>
            <label htmlFor={value}>{value}</label>
        </>
    )
}
