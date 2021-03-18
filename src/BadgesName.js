import React from "react";

function BadgesName({ user, color }) {
  // const Badges = "";

  // color = color ?? "brown"
  if (color === null) color = "brown";
  return (
    <>
      {/*  <Badges> */}
      <span>
        <img src="./broadcaster.png" alt="broadcaster" />{" "}
      </span>
      {/*  </Badges > */}

      {/*  <Name> */}
      <span style={{ color: color }}>{user}: </span>
      {/*  </Name > */}
    </>
  );
}

export default BadgesName;
