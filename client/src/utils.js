export function createNewRoom (roomName, creator) {
  return {
    name: roomName,
    creator,
  };
}