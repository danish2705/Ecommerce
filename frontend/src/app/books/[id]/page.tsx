"use client"
import { useParams } from "next/navigation";
import React from "react";



export default function Id() {
  const params = useParams()
  const id = params.id
  return <div>id : {id}</div>;
}
