import React, { FC, useRef, ChangeEvent } from 'react'
import axios from 'axios'

import Buttton from '../Button/button'

export interface UpLoadProps {
    action: string,
    onProgress?: (precentage: number, file: File) => void,
    onSuccess?: (data: any, file: File) => void,
    onError?: (err: any, file: File) => void
}

export const UpLoad: FC<UpLoadProps> = props => {
    const {
        action,
        onProgress,
        onError,
        onSuccess
    } = props
    const fileInput = useRef<HTMLInputElement>(null)

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

    const upLoadFiles = (files: FileList) => {
        let postFiles = Array.from(files)
        postFiles.forEach(file => {
            const formData = new FormData()
            formData.append(file.name, file)
            axios.post(action, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (e) => {
                    let percentage = Math.round((e.loaded * 100) / e.total) || 0
                    if(percentage < 100) {
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
            }).catch(err => {
                console.error(err)
                if(onError) {
                    onError(err, file)
                }
            })
        })
    }

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

export default UpLoad