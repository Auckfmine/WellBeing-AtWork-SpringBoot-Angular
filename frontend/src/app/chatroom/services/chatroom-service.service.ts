import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '@stomp/stompjs';
import { catchError, retry, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root',
})
export class ChatroomServiceService {
  URL: string =
    'http://localhost:8081/Wellbeignatwork/chatroom/all-public-rooms';
  constructor(private http: HttpClient) {}

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: errorMessage,
      });
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: errorMessage,
      });
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  getAllRooms() {
    return this.http
      .get<Room[]>(this.URL)
      .pipe(retry(1), catchError(this.handleError));
  }
  saveDiscussion(messages: Message[]) {
    return this.http
      .post('http://localhost:8089/Wellbeignatwork/chatroom/save-discussion/', {
        messages: messages,
      })
      .pipe(catchError(this.handleError));
  }

  getUsersByRoom(roomId: number) {
    return this.http.get<any[]>(
      'http://localhost:8081/Wellbeignatwork/getUsersByRoom/' + roomId
    );
  }
  getAllUsers() {
    return this.http.get<any>(
      'http://localhost:8081/Wellbeignatwork/api/get-all-users'
    );
  }
  inviteUserToRoom(userId: number, roomId: number) {
    return this.http.get(
      'http://localhost:8081/Wellbeignatwork/chatroom/inviteUserToRoom/' +
        roomId +
        '/' +
        userId
    );
  }
}
