/* eslint-disable react/prop-types */
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Loading = ({ height }) => {
  return (
    <div className={`${height} flex justify-center relative`}>
      <FontAwesomeIcon
        icon={faSpinner}
        spinPulse
        size="xl"
        className="absolute top-2/4 text-[#F5F9FF]"
      />
    </div>
  );
};

export default Loading;
