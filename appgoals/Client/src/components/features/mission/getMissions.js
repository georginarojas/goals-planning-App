import React from "react";

import GoButton from "../../utils/goBtn";
import DeleteMission from "./deleteMission";

const GetMissions = (props) => {
  const missionList = props.missions.map((mission, i) => {
    return (
      <li key={i + 1}>
        <div id="card">
          <p>{mission.title}</p>
          <GoButton url={`/mission/${mission._id}`} />
          <DeleteMission
            goalId={props.goalId}
            missionId={mission._id}
            updateData={props.updateData}
          />
        </div>
      </li>
    );
  });
  return (
    <div>
      <h3>Missions: </h3>
      <ul>{missionList}</ul>
    </div>
  );
};

export default GetMissions;
