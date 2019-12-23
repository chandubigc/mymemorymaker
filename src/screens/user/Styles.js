import EStyleSheet from 'react-native-extended-stylesheet';

export const styles = EStyleSheet.create({
	container: {
		flex: 1,
		padding: '20rem',
	},
	formContainer: {
		margin: '20rem',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	logoContainer: {
		justifyContent: 'flex-end',
		alignItems: 'center',
		flexGrow: 0.5,
	},
	images: {
		resizeMode: 'contain',
		width: '250rem',
		height: '150rem',
	},
	logo: {
		color: '#8ED384',
		fontSize: '50rem',
		fontWeight: 'bold',
		fontFamily: 'FiraSans-Regular',
	},
	image: {},
	content: {
		alignItems: 'center',
		justifyContent: 'center',
		flexGrow: 1,
	},
	inputContainer: {
		marginVertical: 10,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20,
		flexDirection: 'row',
		borderRadius: 5,
	},
	buttonContainer: {
		alignItems: 'center',
		justifyContent: 'flex-end',
		flexGrow: 1,
		width: '92%',
	},
	button: {
		borderRadius: '4rem',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	buttonText: {
		color: '#fff',
		fontSize: '18rem',
		padding: '10rem',
		fontFamily: 'FiraSans-Regular',
	},
	otpInputContainer: {
		flexGrow: 1,
		height: 50,
		width: 50,
		marginHorizontal: 10,
		backgroundColor: '#eee',
		alignItems: 'center',
		justifyContent: 'flex-end',
		borderRadius: 5,
	},
});




