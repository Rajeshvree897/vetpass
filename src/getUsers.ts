// Store connected Users
const users: { [key: string]: any } = {};

// Function to get users online in a room
function getUsers(arr: { [key: string]: any }[]): any[] {
  const onlineUsers: any[] = [];
  if (arr && arr.length) {
    arr.forEach((onlineUser: { [key: string]: any }) => {
      onlineUsers.push(Object.values(onlineUser)[0]);
    });
  }
  return onlineUsers;
}

export { getUsers, users };
