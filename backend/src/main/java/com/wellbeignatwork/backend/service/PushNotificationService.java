package com.wellbeignatwork.backend.service;


import com.google.firebase.messaging.*;
import com.wellbeignatwork.backend.entity.User;
import com.wellbeignatwork.backend.exceptions.chatExceptions.ResourceNotFoundException;
import com.wellbeignatwork.backend.payload.PushNotificationRequest;
import com.wellbeignatwork.backend.repository.MessageRepository;
import com.wellbeignatwork.backend.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Slf4j
@Service
public class PushNotificationService implements INotificationService{

    private final Logger logger = LoggerFactory.getLogger(PushNotificationService.class);

    private final FCMService fcmService;
    private final UserRepository userRepository;
    private final MessageRepository messageRepository;

    @Autowired
    public PushNotificationService(FCMService fcmService, UserRepository userRepository,MessageRepository messageRepository) {
        this.fcmService = fcmService;
        this.userRepository = userRepository;
        this.messageRepository=messageRepository;
    }


    @Transactional
    public void saveFirebaseToken(Long userId, String token) {
        User user= userRepository.findById(userId).orElseThrow(()->new ResourceNotFoundException("user with id : "+userId+ " not found"));
        user.setFireBaseToken(token);
    }

    @Override
    public void sendPushNotificationToToken(PushNotificationRequest request) {
        try {
            fcmService.sendMessageToToken(request);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
    }
    @Override
    public void sendToTopic(PushNotificationRequest request) {
        try {
            fcmService.sendMessageToTopic(request);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
    }
    @Override
    public void subScribeUsersToTopic(List<String> tokens, String topic) throws FirebaseMessagingException {

        // Subscribe the devices corresponding to the registration tokens to the topic.
        TopicManagementResponse response = FirebaseMessaging.getInstance().subscribeToTopic(
                tokens, topic);
        // See the TopicManagementResponse reference documentation
        // for the contents of response.
        log.info(response.getSuccessCount() + " tokens were subscribed successfully");
        // The topic name can be optionally prefixed with "/topics/".


    }

    @Override
    public void sendPushNotificationToALlUsers(String message,String title) throws FirebaseMessagingException {
        List<String> tokens = new ArrayList<>();
        userRepository.findAll().forEach(user -> {
            if (user.getFireBaseToken() != null) {
                tokens.add(user.getFireBaseToken());
            }
        });

        subScribeUsersToTopic(tokens, "all-users");
        sendToTopic(new PushNotificationRequest(title, message, "all-users"));
    }
    @Override
    @Scheduled(cron = "0 0 10 * * *")
    public void chatReminderForInavtiveUsers() throws FirebaseMessagingException {
        List<String>tokens=new ArrayList<>();
        userRepository.findUsersByMessagesIsNull().forEach(user -> {
            if(user.getFireBaseToken()!=null){
                tokens.add(user.getFireBaseToken());
            }
        });

        subScribeUsersToTopic(tokens,"activityReminder");
        sendToTopic(new PushNotificationRequest("chat-notifier"
                ,"remember that you can communicate with your teammates in realtime using our chat section",
                "activityReminder"));
    }

}
