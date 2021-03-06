import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Chatroom } from "./chatroom";

@Injectable({
  providedIn: "root",
})
export class ChatroomService {
  constructor(private http: HttpClient) {}
  private URI: string = "http://localhost:8081/Wellbeignatwork/chatroom";
  getAllRooms() {
    return this.http.get<Chatroom[]>(this.URI + "/all-rooms");
  }
  getUsersByRoom(roomId: number) {
    return this.http.get<any[]>(this.URI + "/getUsersByRoom/" + roomId);
  }

  createRoom(room: Chatroom) {
    return this.http.post(this.URI + "/add-room", room);
  }

  deleteRoom(room: Chatroom) {
    return this.http.delete(this.URI + "/delete-room", { body: room });
  }
  updateRoom(room: Chatroom) {
    return this.http.put(this.URI + "/update-room", room);
  }

  findRoomById(id: number) {
    return this.http.get<Chatroom>(this.URI + "/" + id);
  }

  bannUserFromRoom(userId: number, roomId: number) {
    return this.http.get(this.URI + `/bannUserFromRoom/${userId}/${roomId}`);
  }
  getAllMessages() {
    return this.http.get<number>(this.URI + "/getAllMessages");
  }
  uploadImage(roomId: number, form: FormData) {
    return this.http.post(this.URI + `/uploadImage/${roomId}`, form);
  }
  getAllUsers() {
    return this.http.get<any>(
      "http://localhost:8081/Wellbeignatwork/api/get-all-users"
    );
  }

  bannUserFromChatRoom(userId: number, roomId: number) {
    /**
     * TODO: implement userBann
     */
    return this.http.get(
      "http://localhost:8081/Wellbeignatwork/chatroom/bannUserFromRoom/" +
        userId +
        "/" +
        roomId
    );
  }

  unbannUserFromChatRoom(userID: number, roomID: number) {
    return this.http.get(
      "http://localhost:8081/Wellbeignatwork/chatroom/unbannUserFromRoom/" +
        userID +
        "/" +
        roomID
    );
    /**
     * TODO: implement user unbann
     */
  }

  addUserToChatRoom(chatroomId: number, userId: number) {
    return this.http.get(
      this.URI + "/addUserToRoom/" + chatroomId + "/" + userId
    );
  }

  checkUserBannedFromRoom(roomId: number, senderId: number) {
    return this.http.get(
      "http://localhost:8081/Wellbeignatwork/chatroom/checkUserBannedFromRoom/" +
        roomId +
        "/" +
        senderId
    );
  }
}
