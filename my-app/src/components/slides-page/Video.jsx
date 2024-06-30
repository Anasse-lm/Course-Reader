export default function Video({file})
{
    return (
        <div style={ {textAlign: 'center'} } className="video-div">
            <h5 style={{fontSize: '18px'}}>{file}</h5>
            <video width="320" height="200" controls>
                <source src={`http://localhost:5000/uploads/${file}`} type="video/mp4" />
            </video>
        </div>
    )
}