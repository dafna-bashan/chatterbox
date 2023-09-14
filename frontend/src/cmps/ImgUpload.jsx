import React, { useEffect, useState } from 'react'
import { cloudinaryService } from '../services/cloudinaryService'

export function ImgUpload({ defaultImgUrl, imgUrl, alt, onUploadImg, customStyle }) {

    const [img, setImg] = useState({
        imgUrl: imgUrl || '',
        height: '40px',
        width: '100%',
        isUploading: false
    })

    useEffect(() => {
        if (img.imgUrl !== defaultImgUrl) {
            onUploadImg(img.imgUrl)
        }
        // eslint-disable-next-line
    }, [img.imgUrl])


    const uploadImg = async (ev) => {
        setImg({ ...img, isUploading: true })
        const { secure_url, height, width } = await cloudinaryService.uploadImg(ev)
        setImg({ isUploading: false, imgUrl: secure_url, height, width })
    }

    const uploadMsg = () => {
        const { imgUrl, isUploading } = img
        if (imgUrl) return 'CHANGE'
        return isUploading ? 'UPLOADING...' : 'ADD PHOTO'
    }

    return (
        <div className={`img-con flex align-center justify-center ${customStyle}`}>
            <img className="upload" src={img?.imgUrl ? img.imgUrl : defaultImgUrl} alt={alt} />
            <input type="file" onChange={uploadImg} accept="image/*" id="imgUpload" style={{ display: "none" }} />
            <label htmlFor="imgUpload" className="img-label click">{uploadMsg()}</label>
            {img?.imgUrl && <React.Fragment>
                <pre className="img-label"> | </pre>
                <pre className="img-label click" onClick={() => setImg({ ...img, imgUrl: '' })}>REMOVE</pre>
            </React.Fragment>}
        </div>
    )
}
