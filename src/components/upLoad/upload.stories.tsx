import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import UpLoad from './upload'
import { UploadFile } from './upload'

const defaultFileList: UploadFile[] = [
    { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
    { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
    { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
]

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
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onProgress={action('progress')}
            onSuccess={action('success')}
            onError={action('error')}
            onChange={action('changed')}
            defaultFileList={defaultFileList}
            data={{'key': 'value'}}
            header={{'X-Powered-By': 'ararin'}}
            accept=".png"
            multiple
            // beforeUpload={filePromise}
        />
    )
}

storiesOf('Upload components', module)
    .add('Upload', SimpleUpLoad)