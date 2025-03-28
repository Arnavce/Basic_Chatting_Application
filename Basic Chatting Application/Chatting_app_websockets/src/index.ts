import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    socket: WebSocket;
    room: string;
}

let allSockets:User[] = []; 

wss.on("connection", (socket) => {

  console.log("User connected to the server");

  socket.on("message", (message) => {

    const parsedMessage = JSON.parse(message as unknown as string);
     // converting the string to JSON object 
    
    if(parsedMessage.type === "join") {
        allSockets.push({socket: socket,
                           room: parsedMessage.payload.roomId
                        });
    }  

    if(parsedMessage.type === "chat") {
    console.log("user wants to chat");
    let currentUserRoom = null;
    for(let i = 0 ; i<allSockets.length; i++) {
        if(allSockets[i].socket === socket) {
            currentUserRoom = allSockets[i].room;
        }
    }
        
    for(let i=0; i<allSockets.length; i++) {
        if(allSockets[i].room == currentUserRoom) {
            allSockets[i].socket.send(parsedMessage.payload.message);   
        }
  
    
    }
    
};

   socket.on("disconnect", () => {
   
   });
});
});

console.log("Server started on port 8080");
