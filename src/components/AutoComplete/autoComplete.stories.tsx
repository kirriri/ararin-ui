import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AutoComplete, DataSourceType } from './AutoComplete'

interface dataProps {
    text: string,
    value: string,
}

const SimpleComplete = () => {
    const data1 = ['asdwa', 'wadwad', 'fdgtiox', 'asdawiodowa', 'asnoenr', 'asodwioa']
    const data = [
        {
            text: 'ararin',
            value: 'adwadas',
        },
        {
            text: 'brarin',
            value: 'adwadas',
        },
        {
            text: 'crarin',
            value: 'adwadas',
        },
        {
            text: 'drarin',
            value: 'adwadas',
        },
        {
            text: 'erarin',
            value: 'adwadas',
        },
        {
            text: 'frarin',
            value: 'adwadas',
        },
        {
            text: 'grarin',
            value: 'adwadas',
        },
        {
            text: 'hrarin',
            value: 'adwadas',
        },
        {
            text: '0',
            value: 'adwadas',
        },
    ]

    // const handleFetch = (query: string) => {
    //     return data1.filter(name => name.includes(query)).map(item => {return {value: item}})
    // }
    
    // const handleFetch = (query: string) => {
    //     return data.filter(item => item.text.includes(query))
    // }

    const handleFetch = (query: string) => {
        return fetch(`https://api.github.com/search/users?q=${query}`)
            .then(res => res.json())
            .then(({items}) => {
                console.log(items)
                return items.slice(0, 10).map(((item: any) => ({value: item.login})))
            })
    }
    const renderOption = (item: DataSourceType) => {
        const sitem = item as DataSourceType<dataProps>
        return (
            <>
                {/* <h2>
                    Name: {sitem.text},
                </h2> */}
                <h3>
                    Val: {sitem.value}
                </h3>
            </>
        )
    }
    return (
        <AutoComplete 
            onSelect={action('selected')}
            fetchSuggestions={handleFetch} 
            renderOptions={renderOption}
        />
    )
}

storiesOf('AutoComplete Component', module)
    .add('AutoComplete simple', SimpleComplete)