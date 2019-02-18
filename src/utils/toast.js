import Toast from '@remobile/react-native-toast';

export default function toast(content, position = 'center') {
  	if (position === 'center') {
  		if (typeof content === 'object') {
  			content = JSON.stringify(content);
  		}
		Toast.showShortCenter(content);
  	} else {
	    Toast.showShortBottom(content);
  	}
}
