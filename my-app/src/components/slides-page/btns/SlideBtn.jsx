import ArrowBackRounded from '@mui/icons-material/ArrowBackIosRounded'
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardIosRounded'
export default function SlideBtn({direction, moveSlide})
{
    return (
        <button onClick={moveSlide}>
            {direction === 'next' ? <ArrowForwardRounded/> : <ArrowBackRounded/>}
        </button>
    )
}