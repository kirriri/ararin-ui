import React, { FC, useRef, ChangeEvent, useState } from 'react'
import axios from 'axios'
import Buttton from '../Button/button'
import UploadList from './uploadList/unloadList'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadProps {
    action: string,
    defaultFileList?: UploadFile[],
    beforeUpload?: (file: File) => boolean | Promise<File>,
    onProgress?: (precentage: number, file: UploadFile) => void,
    onSuccess?: (data: any, file: UploadFile) => void,
    onError?: (err: any, file: UploadFile) => void,
    onChange?: (file: File) => void,
    onRemove?: (file: UploadFile) => void,
    header?: {[key: string]: any},
    name?: string,
    data?: {[key: string]: any},
    withCredentials?: boolean,
    accept?: string,
    multiple?: boolean
}

export interface UploadFile {
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
        defaultFileList,
        onProgress,
        onError,
        onSuccess,
        onChange,
        onRemove,
        header,
        name,
        data,
        withCredentials,
        accept,
        multiple
    } = props

    const fileInput = useRef<HTMLInputElement>(null)
    const [ fileList, setFileList ] = useState<UploadFile[]>(defaultFileList || [])
    const updateFileList = (upDateFile: UploadFile, updateObj: Partial<UploadFile>) => {
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
        let _file: UploadFile = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        }
        // setFileList([_file, ...fileList])
        setFileList(prevList => {
            return [_file, ...prevList]
        })
        const formData = new FormData()
            formData.append(file.name || 'file', file)
            if(data) {
                Object.keys(data).forEach(key => {
                    formData.append(key, data[key])
                })
            }
            axios.post(action, formData, {
                headers: {
                    ...header,
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials,
                onUploadProgress: (e) => {
                    let percentage = Math.round((e.loaded * 100) / e.total) || 0
                    if(percentage < 100) {
                        updateFileList(_file, {percent: percentage, status: 'uploading'})
                        if(onProgress) {
                            onProgress(percentage, _file)
                        }
                    }
                }
            }).then(resp => {
                console.log(resp)
                updateFileList(_file, {status: 'success', response: resp.data})
                if(onSuccess) {
                    onSuccess(resp.data, _file)
                }
                if(onChange) {
                    onChange(file)
                }
            }).catch(err => {
                console.error(err)
                updateFileList(_file, {status: 'error', error: err})
                if(onError) {
                    onError(err, _file)
                }
                if(onChange) {
                    onChange(file)
                }
            })
    }

    const handleRemove = (file: UploadFile) => {
        setFileList(prevList => {
            return prevList.filter(item => item.uid !== file.uid)
        })
        if(onRemove) {
            onRemove(file)
        }
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
                上传文件
               <input 
                    className="ararin-file-input"
                    type="file"
                    style={{display: 'none'}}
                    onChange={handleFileChange}
                    ref={fileInput}
                    accept={accept}
                    multiple={multiple}
                />
            </Buttton>
            <UploadList 
                fileList={fileList}
                onRemove={handleRemove}
            />
        </div>
    )
}

UpLoad.defaultProps = {
    name: 'file'
}

export default UpLoad;