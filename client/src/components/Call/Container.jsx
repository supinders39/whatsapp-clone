import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import Image from "next/image";
import React, { useState } from "react";
import { MdOutlineCallEnd } from "react-icons/md";

function Container({ data }) {
  const [{ socket, userInfo }, dispatch] = useStateProvider();

  const [callAccepted, setCallAccepted] = useState(false);

  const endCall = () => {
    const id = data.id;
    if (data.callType === "voice") {
      socket.current.emit("reject-voice-call", {
        from: id
      })
    } else {
      socket.current.emit("reject-video-call", {
        from: id
      })
    }
    
    dispatch({ type: reducerCases.END_CALL })
  }
  return <div className="border-conversation-border border-l w-full bg-conversation-panel-background flex flex-col h-[100vh] overflow-hidden items-center justify-center text-white">
    <div className="flex flex-col gap-3 items-center ">
      <span className=" text-5xl">{data.name}</span>
      <span className=" text-lg">{
        callAccepted && data.callType !== "video" ? "On going call" : "Calling..."
      }</span>
    </div>
    {(!callAccepted || data.callType === "voice") && <div className="my-24">
      <Image src={data.profilePicture} alt="avatar" className="rounded-full" width={300} height={300} />
    </div>}
    <div className="h-16 w-16 bg-red-600 flex items-center justify-center rounded-full">
      <MdOutlineCallEnd onClick={endCall} className="text-3xl cursor-pointer " />
    </div>
  </div>;
}

export default Container;
