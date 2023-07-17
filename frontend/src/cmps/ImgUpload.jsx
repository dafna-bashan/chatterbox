import React, { useEffect, useState } from 'react'
import { cloudinaryService } from '../services/cloudinaryService'

export function ImgUpload({ defaultImgUrl, alt, onUploadImg }) {

    const [img, setImg] = useState({
        imgUrl: defaultImgUrl,
        height: '40px',
        width: '100%',
        isUploading: false
    })

    useEffect(() => {
        if (img.imgUrl !== defaultImgUrl) {
            onUploadImg(img.imgUrl)
        }
    }, [img.imgUrl])


    const uploadImg = async (ev) => {
        setImg({ ...img, isUploading: true })
        const { secure_url, height, width } = await cloudinaryService.uploadImg(ev)
        setImg({ isUploading: false, imgUrl: secure_url, height, width })
    }

    const uploadMsg = () => {
        const { imgUrl, isUploading } = img
        if (imgUrl) return 'CHANGE PHOTO'
        return isUploading ? 'UPLOADING...' : 'ADD PHOTO'
    }

    return (
        <div className="img-con flex align-center">
            <img src={img.imgUrl} alt={alt} />
            <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" style={{ display: "none" }} />
            <label htmlFor="imgUpload" className="img-label">{uploadMsg()}</label>
        </div>
    )
}
