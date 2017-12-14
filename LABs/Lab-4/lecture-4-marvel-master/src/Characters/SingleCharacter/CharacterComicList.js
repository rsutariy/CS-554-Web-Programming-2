import React from "react";

export default function({ comics }) {
  console.log(comics);
  return <h3>{comics.length}</h3>;
}
