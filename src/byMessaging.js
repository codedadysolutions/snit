import firebase from 'react-native-firebase';
// Optional flow type
// import firebase ,{ RemoteMessage } from 'react-native-firebase';

export default async (message) => {
    // handle your message
        // firebase.notifications().onNotification(notification => {
        //     const badgeCount = firebase.notifications().getBadge();
        //     console.warn("BADGE ",badgeCount)
        //     notification.android.setChannelId('snit').setSound('default')
        //     firebase.notifications().displayNotification(notification)
        //     firebase.notifications().setBadge(2);
        // });
        const localNotification = new firebase.notifications.Notification()
        .setNotificationId(message.messageId)
        .setTitle(message.data.author_name)
        .setSubtitle('snit')
        .setBody(message.data.body)
        .setData(message.data)
        .android.setChannelId('snit')
        .android.setAutoCancel(true)
        .android.setPriority(firebase.notifications.Android.Priority.High);
    
      firebase.notifications().displayNotification(localNotification);

    return Promise.resolve();
}