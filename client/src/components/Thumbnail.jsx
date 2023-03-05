import { XLg } from "react-bootstrap-icons"

export default function Thumbnail({ src, index, setImages }) {

    const handleClick = () => {
        setImages(prev => {
            return prev.filter((thumb, i) => i !== index)
        })
    }

    return (
        <div className="thumbnail mb-3">
            <img src={src} />
            <button type="button" onClick={handleClick}>
                <XLg size={20} />
            </button>
        </div>
    )
}