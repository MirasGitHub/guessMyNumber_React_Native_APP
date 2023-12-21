import { View, StyleSheet, Text } from "react-native";
import Colors from "../../utils/Colors";

const NumberContainer = ({ children }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.numberText}>{children}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 4,
		borderColor: Colors.accent500,
		padding: 24,
		margin: 24,
		borderRadius: 8,
		alignContent: "center",
		justifyContent: "center",
	},
	numberText: {
		color: Colors.accent500,
		fontSize: 36,
		fontWeight: "bold",
		textAlign: "center",
		fontFamily: "open-sans-bold",
	},
});

export default NumberContainer;
