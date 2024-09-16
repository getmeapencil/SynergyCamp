import { createContext, useContext } from 'react';

export const SocketContext = createContext("");

export default function useSocketContext() {
    return useContext(SocketContext);
}