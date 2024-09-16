/** mapping from users to Set<socketID>
 * @type Map<string, Set<string>>
 */
const userToSockets = new Map();

/**
 * Registry for socketConnections of each user
 */
export default {
    /** add a user socket pair to the set */
    add(id, socket) {
        let sockets = userToSockets.get(String(id))
        if(!sockets) {
            sockets = new Set([socket.id]);
            userToSockets.set(String(id), sockets);
        }
        sockets.add(socket.id);
    },
    remove(id, socket) {
        let sockets = userToSockets.get(String(id)) || new Set();
        sockets.delete(socket.id);
    },
    /** return all socket connections for given userId
     * @param {ObjectId} id
     * @returns {Set<string>}
     */
    get(id) {
        return userToSockets.get(String(id)) || new Set();
    },
    get activeUserCount(){
        return userToSockets.size;
    }
}