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
}
