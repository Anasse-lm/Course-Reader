export default function Video({index, file})
{
    return (
        <div className="video-div">
            <div key={index} style={ {textAlign: 'center'} }>
                <h4 >{file}</h4>
                <video width="320" height="200" controls>
                  <source src={`http://localhost:5000/uploads/${file}`} type="video/mp4" />
                </video>
              </div>
        </div>
    )
}