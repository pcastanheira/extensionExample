//badge value mockup
var checkNotifications = function(){

	var val = 6,
		stringDefault = '99+';

	if ( val > 1 ) {

		if ( val > 99 ) {

			chrome.browserAction.setBadgeText({ text : stringDefault });

		}else{

			chrome.browserAction.setBadgeText({ text : val.toString() });

		}

	}

}

checkNotifications();