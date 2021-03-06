package com.wellbeignatwork.backend.service.ChatService;

import com.google.firebase.messaging.FirebaseMessagingException;
import com.sun.istack.NotNull;
import com.wellbeignatwork.backend.entity.Chat.ChatRoom;
import com.wellbeignatwork.backend.entity.Chat.Message;
import com.wellbeignatwork.backend.entity.User.User;
import org.springframework.messaging.MessagingException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

public interface IChatService {

    public ChatRoom createChatRoom(ChatRoom chatRoom);
    public void deleteChatRoom(ChatRoom chatRoom);
    public ChatRoom updateChatRoom(ChatRoom chatRoom);
    public ChatRoom findRoomById(Long roomId);
    public List<ChatRoom> getAllRooms();
    public List<ChatRoom> getPublicRooms();
    public List<ChatRoom> getMostActiveChatRooms();
    public void calculateResponseRatePerRoom();
    public void addUserToChatRoom(@NotNull Long chatRoomId, @NotNull Long userId);
    public void removeUserFromChatRoom(Long chatRoomId, Long userId);
    public void oneToOneChat(Message message, Long senderId, Long recieverId,String roomUniqueKey) throws FirebaseMessagingException;
    public void roomBasedChat(Message message, Long roomId, Long senderId) throws MessagingException, FirebaseMessagingException;
    public void publicChat(Message message,Long senderId) throws FirebaseMessagingException;
    public void inviteUserToChatRoom(Long userId,Long roomId,Long senderID);
    public void acceptInvitation(Long userID,Long roomId,Long invitationSenderID);
    public void bannUserFromChatRoom(Long userId,Long roomId);
    public void autoBannUsersFromChatRooms(int BadWordsFound, User user, ChatRoom room);
    public void unbannUserFromChatRoom(Long userId,Long roomId);
    public Set<User> findUsersByChatroom(Long roomId);
    public void uploadImage(MultipartFile file ,Long roomId);
    public boolean checkUserBannedFromRoom(Long userID,Long roomID);


}