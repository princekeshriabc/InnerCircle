import socket from "socket.io-client";

let socketInstance = null;

export const initializeSocket = (projectId) => {
  // console.log("vite api url", import.meta.env.VITE_API_URL_P);
  socketInstance = socket(import.meta.env.VITE_API_URL_P, {
    auth: {
      token: localStorage.getItem("token"),
    },
    query: {
      projectId,
    },
  });

  return socketInstance;
};

export const receiveMessage = (eventName, cb) => {
  socketInstance.on(eventName, cb);
};

export const sendMessage = (eventName, data) => {
  socketInstance.emit(eventName, data);
};

export const getSocket = () => socketInstance;