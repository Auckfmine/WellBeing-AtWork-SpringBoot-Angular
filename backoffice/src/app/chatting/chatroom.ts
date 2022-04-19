export interface Chatroom {
  id: number;
  roomName: string;
  //this key helps creating unique rooms for one to one chatting
  uniqueKey?: string;
  MaxBadWords?: number;
  capacity?: any;
  averageResponseTime?: string;
  users?: any[];
  messages?: any[];
  isVisible?: boolean;
  status?: string;
  cap?: string;
}
