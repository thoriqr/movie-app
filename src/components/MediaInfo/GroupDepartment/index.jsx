/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const GroupDepartment = ({ media }) => {
  const navigate = useNavigate();
  function groupByDepartment(departmentToFilter, additionalJob) {
    // Step 1: Filter crew members with the specific department.
    const specificDepartment = departmentToFilter;
    const peopleWithSpecificDepartment = media?.credits.crew?.filter(
      (person) => person.department === specificDepartment
    );

    // Step 2: Filter crew members with the additional job.
    const peopleWithAdditionalJob = media?.credits.crew?.filter(
      (person) => person.job === additionalJob
    );

    // Create an array to hold the final result.
    const uniquePeople = [];

    // Helper function to add a person to the uniquePeople array, ensuring uniqueness.
    const addPerson = (person) => {
      const existingPerson = uniquePeople.find(
        (uniquePerson) => uniquePerson.name === person.name
      );
      if (existingPerson) {
        // Append the jobs to the existing person
        existingPerson.jobs += `, ${person.jobs}`;
      } else {
        // Add a new unique person
        uniquePeople.push(person);
      }
    };

    // Process people with the additional job first.
    peopleWithAdditionalJob?.forEach((person) => {
      const jobs = person.job;
      addPerson({
        id: person.id,
        credit_id: person.credit_id,
        name: person.name,
        jobs: jobs,
      });
    });

    // Process people with the specified department.
    peopleWithSpecificDepartment?.forEach((person) => {
      const jobs = person.job;
      addPerson({
        id: person.id,
        credit_id: person.credit_id,
        name: person.name,
        jobs: jobs,
      });
    });

    return uniquePeople;
  }

  // people filter by department:Writing
  const writingDepartment = groupByDepartment("Writing", "Director");
  return (
    <>
      {writingDepartment.slice(0, 4).map((person) => (
        <div key={person.id}>
          <p
            onClick={() => navigate(`/person/${person.id}`)}
            className="text-sm lg:text-base font-semibold hover:text-gray-300 cursor-pointer"
          >
            {person.name}
          </p>
          <p className="text-xs lg:text-sm font-extralight">{person.jobs}</p>
        </div>
      ))}
      {media?.created_by
        ? media?.created_by.map((person) => (
            <div key={person.id}>
              <p className="text-sm lg:text-base font-semibold hover:text-gray-300 cursor-pointer">
                {person.name}
              </p>
              <p className="text-xs lg:text-sm font-extralight">Creator</p>
            </div>
          ))
        : ""}
    </>
  );
};

export default GroupDepartment;
