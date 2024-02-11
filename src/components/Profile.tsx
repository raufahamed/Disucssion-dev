"use client";

import { useSession } from "next-auth/react";

import React from 'react'

function Profile() {
  
  const session = useSession();

  if(session.data?.user){
    return <div>From::{JSON.stringify(session.data.user)}</div>
  }
  return <div>From Client:user is Not SignedIn</div>
  
    
}

export default Profile