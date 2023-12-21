import { View, StyleSheet, Image, Text } from "react-native";
import Title from "../components/ui/Title";
import successImage from "../assets/images/success.png";
import Colors from "../utils/Colors";
import PrimaryButton from "../components/ui/PrimaryButton";

const GameOverScreen = ({ roundsNumber, userNumber, onStartNewGame }) => {
	return (
		<View style={styles.rootContainer}>
			<Title>GAME OVER!</Title>
			<View style={styles.imageContainer}>
				<Image source={successImage} style={styles.image} />
			</View>

			<Text style={styles.summeryText}>
				Your phone needed <Text style={styles.highlighted}>{roundsNumber}</Text>{" "}
				rounds to guess the number{" "}
				<Text style={styles.highlighted}>{userNumber}</Text>.
			</Text>

			<PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
		</View>
	);
};

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		padding: 24,
		alignItems: "center",
		justifyContent: "center",
	},
	imageContainer: {
		width: 300,
		height: 300,
		borderRadius: 150,
		borderWidth: 3,
		borderColor: Colors.primary800,
		overflow: "hidden",
		margin: 55,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	summeryText: {
		fontFamily: "open-sans",
		fontSize: 24,
		textAlign: "center",
		marginBottom: 24,
	},
	highlighted: {
		fontFamily: "open-sans-bold",
		color: Colors.primary500,
	},
});

export default GameOverScreen;
