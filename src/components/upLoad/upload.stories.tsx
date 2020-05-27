import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import UpLoad from './upload'

const checkFileSize = (file: File) => {
    if(Math.round(file.size / 1024) > 50) {
        alert('file too big')
        return false
    }
    return true
}

const filePromise = (file: File) => {
    const newFile = new File([file], 'new_name.docx', { type: file.type })
    return Promise.resolve(newFile)
}

export const SimpleUpLoad = () => {
    return (
        <UpLoad 
            action="https://jsonplaceholder.typicode.com/posts/"
            onProgress={action('progress')}
            onSuccess={action('success')}
            onError={action('error')}
            onChange={action('changed')}
            // beforeUpload={filePromise}
        />
    )
}

storiesOf('Upload components', module)
    .add('Upload', SimpleUpLoad)