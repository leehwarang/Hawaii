import React, { useState, useEffect, ReactNode, ReactElement, createContext, useContext, PropsWithChildren } from 'react'

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

// TODO: states의 형태는 올바른가? value와 selected 를 가지는 객체가 아닌 selected 상태의 value만 가지고 있으면 어떨까? (find library)
const RadioGroup = ({ children, onChange } : RadioGroupProps ) => {
    const [states, setStates ] = useState<State[]>([])

    function handleChange( value : string) {
        setStates(() => states.map(s => s.value === value ? { value : s.value, selected : true} : { value : s.value, selected : false}))        
        onChange?.(value)
    }

    useEffect(() => {
     const result = React.Children.map(children, (c => {
        const item = c as ReactElement<PropsWithChildren<RadioItemProps>>
        return { value : item.props.value, selected : item.props.initOnMount || false }
     }))

     setStates(result)
    }, [])

    return <RadioGroupContext.Provider value={{ states, handleChange}}>{children}</RadioGroupContext.Provider>
}

export default RadioGroup

interface RadioItemProps {
    name: string
    value: string
    disabled ?: boolean
    initOnMount ?: boolean
}

export const Radio = ({ name, value, disabled } : RadioItemProps) => {
    const { states, handleChange } = useContext(RadioGroupContext)
    const self = states.find(state => state.value === value) as State

    return (
        <>
            <input type="radio" id={name} name={name} value={value} checked={self?.selected} onChange={(e) => handleChange(e.target.value)} disabled={disabled}></input>
            <label htmlFor={value}>{value}</label>
        </>
    )
}
