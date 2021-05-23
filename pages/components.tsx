import React from 'react'
import Radio from '../src/components/Radio'

export default function index() {
    return (
        <>
            <Radio.Group onChange={(updatedState: string) => {
                console.log(updatedState)
            }}>
                <Radio.Item name="friut" value="apple" />
                <Radio.Item name="friut" value="banana" disabled />
                <Radio.Item name="friut" value="orange" initOnMount/>
            </Radio.Group>
            
        </>
    )
}
