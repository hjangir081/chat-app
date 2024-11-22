export const blurhash ='|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

interface RoomID{
    user1: string;
    user2: string;
}

export const getRoomId= (user1: string, user2: string): string => {
    const sortId = [ user1, user2 ].sort();
    const roomId = sortId.join("-");
    return roomId;
}