import React, { useState, useEffect, ReactNode, ReactElement, createContext, useContext, PropsWithChildren } from 'react'
import RadioItem, { RadioItemProps } from './RadioItem'

interface RadioGroupProps {
    children : React.ReactNodeArray
    onChange ?: (updatedState : string) => void
}

interface RadioGroupState {
    value : string
    selected: boolean
}

export interface RadioGroupContextType {
    states : RadioGroupState[]
    handleChange: (value : string) => void
}

export const RadioGroupContext = createContext({} as RadioGroupContextType)

export const useRadioGroupContext = () => useContext(RadioGroupContext)

// TODO: states의 형태는 올바른가? value와 selected 를 가지는 객체가 아닌 selected 상태의 value만 가지고 있으면 어떨까? (find library)
const RadioGroup = ({ children, onChange } : RadioGroupProps ) => {
    const [states, setStates ] = useState<RadioGroupState[]>([])

    function handleChange( value : string) {
        setStates(() => states.map(s => s.value === value ? { value : s.value, selected : true} : { value : s.value, selected : false}))        
        onChange?.(value)
    }

    useEffect(() => {
     const result = React.Children.map(children, (c => {
        const item = c as ReactElement<PropsWithChildren<RadioItemProps>>
        return { value : item.props.value, selected: item.props.initOnMount || false}
        
     }))

     setStates(result)
    }, [])

    return <RadioGroupContext.Provider value={{ states, handleChange}}>{children}</RadioGroupContext.Provider>
}

export default RadioGroup