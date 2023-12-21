import { View, StyleSheet, Alert, Text, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Title from "../components/ui/Title";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import { generateRandomBetween } from "../utils/generateRandomBetween";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, handleGameOver }) => {
	const initialGuess = generateRandomBetween(1, 100, userNumber);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [guessRounds, setGuessRounds] = useState([]);

	useEffect(() => {
		if (currentGuess === userNumber) {
			handleGameOver(guessRounds.length);
		}
	}, [currentGuess, userNumber, handleGameOver]);

	useEffect(() => {
		minBoundary = 1;
		maxBoundary = 100;
	}, []);

	const nextGuessHandler = (direction) => {
		if (
			(direction === "lower" && currentGuess < userNumber) ||
			(direction === "greater" && currentGuess > userNumber)
		) {
			Alert.alert("Don't lie!", "You know that this is wrong...", [
				{ text: "Sorry!", style: "cancel" },
			]);
			return;
		}

		if (direction === "lower") {
			maxBoundary = currentGuess;
		} else {
			minBoundary = currentGuess + 1;
		}

		const newRandNumber = generateRandomBetween(
			minBoundary,
			maxBoundary,
			currentGuess
		);
		setCurrentGuess(newRandNumber);
		setGuessRounds((prevGuessRounds) => [newRandNumber, ...prevGuessRounds]);
	};

	const guessRoundsListLength = guessRounds.length;

	return (
		<View style={styles.screen}>
			<Title>Opponent's guess</Title>
			<NumberContainer>{currentGuess}</NumberContainer>

			<Card>
				<InstructionText style={styles.instructionText}>
					Higher or lower?
				</InstructionText>
				<View style={styles.buttonsContainer}>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={() => nextGuessHandler("lower")}>
							<Ionicons name="md-arrow-down-circle" size={24} color="white" />
						</PrimaryButton>
					</View>

					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={() => nextGuessHandler("greater")}>
							<Ionicons name="md-arrow-up-circle" size={24} color="white" />
						</PrimaryButton>
					</View>
				</View>
			</Card>

			<View style={styles.listContainer}>
				<FlatList
					data={guessRounds}
					renderItem={(itemData) => (
						<GuessLogItem
							guess={itemData.item}
							roundNumber={guessRoundsListLength - itemData.index}
						/>
					)}
					keyExtractor={(item) => item}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 24,
	},
	instructionText: {
		marginBottom: 12,
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "center",
	},
	buttonContainer: {
		flex: 1,
	},
	listContainer: {
		flex: 1,
		padding: 16,
	},
});

export default GameScreen;
