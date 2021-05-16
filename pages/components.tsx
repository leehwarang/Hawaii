import React from 'react'
import RadioGroup, { Radio } from '../src/components/Radio'

export default function index() {
    return (
        <>
            <RadioGroup onChange={(updatedState: string) => {
                console.log(updatedState)
            }}>
                <Radio name="friut" value="apple" />
                <Radio name="friut" value="banana" disabled />
                <Radio name="friut" value="orange" initOnMount/>
            </RadioGroup>
            
        </>
    )
}
