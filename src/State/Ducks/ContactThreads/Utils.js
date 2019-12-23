import {ContactGroups,cloneRealmObj} from '../../Model'

export const linkMessagesToContactThread = (userId, mobile, realm) => {
    console.log("IN LINKING MESSAGES",linkMessagesToContactThread);
    let contactThreadFromDBAfterUpdate = realm.objectForPrimaryKey('ContactThreads', userId);
    if (contactThreadFromDBAfterUpdate) {
        contactThreadFromDBAfterUpdate = cloneRealmObj(contactThreadFromDBAfterUpdate);
       
        let subscribeGroups = ContactGroups.byQuery("contacts.mobile='" + mobile + "'");
        console.log("groups", subscribeGroups);
        for (var i = 0; i < subscribeGroups.length; i++) {
            let cGroup = subscribeGroups[i];
            console.log("chat channelin link",subscribeGroups.chatMessages);
            contactThreadFromDBAfterUpdate.chatChannel.chatMessages = [...contactThreadFromDBAfterUpdate.chatChannel.chatMessages, ...cGroup.chatChannel.chatMessages];
            contactThreadFromDBAfterUpdate.chatChannel.latestMessage = contactThreadFromDBAfterUpdate.chatChannel.chatMessages[contactThreadFromDBAfterUpdate.chatChannel.chatMessages.length - 1];
            for(var i =0 ;i < cGroup.chatChannel.offers.length; i++){
                let dChannels = cGroup.chatChannel.offers[i].dealChannels;
                console.log("DC",dChannels);
                for(var j = 0 ; j < dChannels.length; j++){
                    let dChannel = dChannels[j];
                    if(dChannel.toUser._id === userId){
                        contactThreadFromDBAfterUpdate.offerChannels.push(dChannel);
                        break;
                    }
                }
                
            }
        }

        realm.create('ContactThreads', contactThreadFromDBAfterUpdate, true);

    }


}