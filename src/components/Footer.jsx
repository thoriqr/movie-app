import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className=" p-4 bg-[#030712] text-base-content font-Inter ">
      <div className="flex justify-center">
        <p>
          Made with ❤️ by{" "}
          <Link title="GitHub" target="_blank" to="https://github.com/thoriqr">
            <span>thoriqr </span>
            <FontAwesomeIcon size="lg" icon={faGithub} />.
          </Link>
        </p>
        <p>
          API {" "}
          <Link title="The Movie Database (TMDB)" target="_blank" to="https://www.themoviedb.org/">
            <span className="underline underline-offset-2">themoviedb.org</span>
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
