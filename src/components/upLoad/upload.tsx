import React, { FC, useRef, ChangeEvent, useState } from 'react'
import axios from 'axios'

import Buttton from '../Button/button'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadProps {
    action: string,
    beforeUpload?: (file: File) => boolean | Promise<File>,
    onProgress?: (precentage: number, file: File) => void,
    onSuccess?: (data: any, file: File) => void,
    onError?: (err: any, file: File) => void,
    onChange?: (file: File) => void
}

export interface uploadFile {
    uid: string,
    size: number,
    name: string,
    status?: UploadFileStatus,
    percent?: number,
    raw?: File,
    response?: any,
    error?: any
} 

export const UpLoad: FC<UploadProps> = props => {
    const {
        action,
        beforeUpload,
        onProgress,
        onError,
        onSuccess,
        onChange,
    } = props

    const fileInput = useRef<HTMLInputElement>(null)
    const [ fileList, setFileList ] = useState<uploadFile[]>([])
    const updateFileList = (upDateFile: uploadFile, updateObj: Partial<uploadFile>) => {
        setFileList(prevList => {
            return prevList.map(file => {
                if(file.uid === upDateFile.uid) {
                    return { ...file, ...updateObj }
                }else {
                    return file
                }
            })
        })
    }

    const handleClick = () => {
        if(fileInput.current) {
            fileInput.current.click()
        }
    }
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if(!files)
            return
        upLoadFiles(files)
        if(fileInput.current) {
            fileInput.current.value = ''
        }
    }

    const post = (file: File) => {
        let _file: uploadFile = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        }
        setFileList([_file, ...fileList])
        const formData = new FormData()
            formData.append(file.name, file)
            axios.post(action, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (e) => {
                    let percentage = Math.round((e.loaded * 100) / e.total) || 0
                    if(percentage < 100) {
                        updateFileList(_file, {percent: percentage, status: 'uploading'})
                        console.log(fileList)
                        if(onProgress) {
                            onProgress(percentage, file)
                        }
                    }
                }
            }).then(resp => {
                console.log(resp)
                if(onSuccess) {
                    onSuccess(resp.data, file)
                }
                if(onChange) {
                    onChange(file)
                }
            }).catch(err => {
                console.error(err)
                if(onError) {
                    onError(err, file)
                }
                if(onChange) {
                    onChange(file)
                }
            })
    }

    const upLoadFiles = (files: FileList) => {
        let postFiles = Array.from(files)
        console.log(postFiles)
        postFiles.forEach(file => {
            if(!beforeUpload) {
                post(file)
            }else {
                const result = beforeUpload(file)
                if(result && result instanceof Promise) {
                    result.then(processedFile => {
                        post(processedFile)
                    })
                }else if(result !== false) {
                    post(file)
                }
            }
        })
    }

    console.log(fileList)
    
    return (
        <div className="ararin-upload-component">
            <Buttton
                type="primary"
                onClick={handleClick}
            >
               <input 
                    className="ararin-file-input"
                    type="file"
                    style={{display: 'none'}}
                    onChange={handleFileChange}
                    ref={fileInput}
                />
                UpLoad File
            </Buttton>
        </div>
    )
}

export default UpLoad;