export default function Video({file})
{
    return (
        <div className="video-div">
            <h5 style={{fontSize: '18px'}}>{file}</h5>
            <video controls style={{width: '100%'}}>
                <source src={`http://localhost:5000/uploads/${file}`} type="video/mp4" />
            </video>
        </div>
    )
}