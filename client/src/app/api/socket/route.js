import { initSocket } from "@/components/socketServer";

export function GET(req, res) {
  const io = initSocket(req.socket.server);

  if (!res.socket.server.io) {
    console.log("Setting up socket");
    res.socket.server.io = io;
  } else {
    console.log("Already set up");
  }

  res.end();
}

// import { NextResponse } from "next/server";
// export function GET(req, res) {
//   return NextResponse.json({ mesage: "Helo" }, { status: 201 });
// }
