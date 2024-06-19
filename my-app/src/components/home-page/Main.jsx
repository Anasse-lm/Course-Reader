import { Link } from "react-router-dom";

export default function Main() {
  return (
    <main className="main container">
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Enter path here..." />
        <button className="btn btn-outline-secondary" type="button">
          <img src="" alt="Join file" className="join-file-image" />
        </button>
      </div>
      <button className="btn btn-primary">
        <Link to="/slider" className="text-white text-decoration-none">**** Go ****</Link>
      </button>
    </main>
  );
}
