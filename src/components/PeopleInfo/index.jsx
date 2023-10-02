/* eslint-disable react/prop-types */
import { formatDate } from "../../utils/utils";
import Biography from "./Biography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const PeopleInfo = ({ person }) => {
  function calculateAge(birthday) {
    const birthDate = new Date(birthday);
    const currentDate = new Date();

    const yearsDiff = currentDate.getFullYear() - birthDate.getFullYear();

    // Check if the current date has occurred this year yet
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      return yearsDiff - 1; // Subtract 1 if the birthday hasn't occurred yet this year
    }

    return yearsDiff;
  }

  function calculateAgeAtDeath(birthdate, deathdate) {
    const birthDate = new Date(birthdate);
    const deathDate = new Date(deathdate);

    const yearsDiff = deathDate.getFullYear() - birthDate.getFullYear();

    // Check if the death date occurred before the birthdate this year
    if (
      deathDate.getMonth() < birthDate.getMonth() ||
      (deathDate.getMonth() === birthDate.getMonth() &&
        deathDate.getDate() < birthDate.getDate())
    ) {
      return yearsDiff - 1; // Subtract 1 if the death date occurred before the birthdate this year
    }

    return yearsDiff;
  }

  return (
    <div className="mt-2">
      {/* <div className="">
        <Biography person={person} />
      </div> */}
      <div className="mt-5">
        <p className="text-base lg:text-lg font-semibold">Personal Info</p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-1">
          <div className="text-sm lg:text-base">
            <p className=" font-semibold">Known for</p>
            {person?.known_for_department ? (
              <h2 className="font-thin">{person?.known_for_department}</h2>
            ) : (
              "-"
            )}
          </div>
          <div className="text-sm lg:text-base">
            <p className="font-semibold">Gender</p>
            {person?.gender ? (
              <h2 className="font-thin">
                {(person?.gender === 0 && "Not set / not specified") ||
                  (person?.gender === 1 && "Female") ||
                  (person?.gender === 2 && "Male") ||
                  (person?.gender === 3 && "Non-binary")}
              </h2>
            ) : (
              "-"
            )}
          </div>
          {person?.deathday ? (
            <>
              <div className="">
                <p className="text-base font-semibold">Birthday</p>
                {person?.birthday ? (
                  <h2 className="text-base font-extralight">
                    {formatDate(person?.birthday, "full")}
                  </h2>
                ) : (
                  "-"
                )}
              </div>
              <div className="">
                <p className="text-base font-semibold">Deathday</p>
                <div className="flex gap-1 text-base font-extralight">
                  <h2 className="text-base font-extralight">
                    {formatDate(person?.deathday, "full")}
                  </h2>
                  <h2>
                    ({calculateAgeAtDeath(person?.birthday, person?.deathday)}{" "}
                    years old)
                  </h2>
                </div>
              </div>
            </>
          ) : (
            <div className="text-sm lg:text-base">
              <p className="font-semibold">Birthday</p>
              {person?.birthday ? (
                <div className="flex gap-1 text-sm lg:text-base font-extralight">
                  <h2>{formatDate(person?.birthday, "full")}</h2>
                  <h2>({calculateAge(person?.birthday)} years old)</h2>
                </div>
              ) : (
                "-"
              )}
            </div>
          )}
          <div className="text-sm lg:text-base">
            <p className="font-semibold">Place of Birth</p>
            {person?.place_of_birth ? (
              <h2 className="font-thin">{person?.place_of_birth}</h2>
            ) : (
              "-"
            )}
          </div>
          <div className="text-sm lg:text-base">
            {person?.external_ids.instagram_id ||
            person?.external_ids.twitter_id ||
            person?.external_ids.facebook_id ? (
              <>
                <p className="font-thin">Social Links</p>
                <div className="flex mb-3 gap-3 items-center mt-1">
                  {person?.external_ids.instagram_id ? (
                    <Link
                      to={`https://www.instagram.com/${person?.external_ids.instagram_id}`}
                      target="_blank"
                      title="Visit Instagram"
                    >
                      <FontAwesomeIcon icon={faInstagram} size="lg" />
                    </Link>
                  ) : (
                    ""
                  )}
                  {person?.external_ids.twitter_id ? (
                    <Link
                      to={`https://www.twitter.com/${person?.external_ids.twitter_id}`}
                      target="_blank"
                      title="Visit Twitter"
                    >
                      <FontAwesomeIcon icon={faTwitter} size="lg" />
                    </Link>
                  ) : (
                    ""
                  )}
                  {person?.external_ids.facebook_id ? (
                    <Link
                      to={`https://www.facebook.com/${person?.external_ids.facebook_id}`}
                      target="_blank"
                      title="Visit Facebook"
                    >
                      <FontAwesomeIcon icon={faFacebook} size="lg" />
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeopleInfo;
