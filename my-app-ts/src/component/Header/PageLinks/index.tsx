import "./style.css";
import { Link } from 'react-router-dom';


export const PageLinks = (): JSX.Element => {
  return (
    <div className={`container`}>
      <div className="links">
        <Link to="/">
          <div className={`text-wrapper`}>Home</div>
        </Link>
        <Link to="/blog">
          <div className={`text-wrapper`}>Blog</div>
        </Link>
        <Link to="/book">
          <div className={`text-wrapper`}>Book</div>
        </Link>
        <Link to="/video">
          <div className={`text-wrapper`}>Video</div>
        </Link>
      </div>
    </div>
  );
};
