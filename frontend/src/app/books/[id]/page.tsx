import React from "react";

type Props = {
  params: {
    id: string;
  };
};


export default function Id({ params } : Props ) {
  const id = params.id;
  return <div>id : {id}</div>;
}
