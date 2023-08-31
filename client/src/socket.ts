import { io } from "socket.io-client";
import { API } from './apiService';

const socket = io(API);


export { socket };