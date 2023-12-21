import {
	StyleSheet,
	ImageBackground,
	SafeAreaView,
	StatusBar,
} from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import backgroundImage from "./assets/images/background.png";
import { useCallback, useEffect, useState } from "react";
import GameScreen from "./screens/GameScreen";
import Colors from "./utils/Colors";
import GameOverScreen from "./screens/GameOverScreen";
import regularOpenSans from "./assets/fonts/OpenSans-Regular.ttf";
import boldOpenSans from "./assets/fonts/OpenSans-Bold.ttf";

export default function App() {
	const [appIsReady, setAppIsReady] = useState(false);
	const [userNumber, setUserNumber] = useState(null);
	const [gameIsOver, setGameIsOver] = useState(true);
	const [guessRounds, setGuessRounds] = useState(0);

	useEffect(() => {
		async function prepare() {
			try {
				await Font.loadAsync({
					"open-sans": regularOpenSans,
					"open-sans-bold": boldOpenSans,
				});
				await new Promise((resolve) => setTimeout(resolve, 2000));
			} catch (e) {
				console.warn(e);
			} finally {
				setAppIsReady(true);
			}
		}
		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}

	const pickedNumberHandler = (pickedNumber) => {
		setUserNumber(pickedNumber);
		setGameIsOver(false);
	};

	const handleGameOver = (numberOfRounds) => {
		setGameIsOver(true);
		setGuessRounds(numberOfRounds);
	};

	const startNewGame = () => {
		setUserNumber(null);
		setGuessRounds(0);
	};

	let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

	if (userNumber) {
		screen = (
			<GameScreen userNumber={userNumber} handleGameOver={handleGameOver} />
		);
	}

	if (gameIsOver && userNumber) {
		screen = (
			<GameOverScreen
				userNumber={userNumber}
				roundsNumber={guessRounds}
				onStartNewGame={startNewGame}
			/>
		);
	}

	return (
		<>
			<StatusBar style="light" />
			<LinearGradient
				colors={[Colors.primary700, Colors.accent500]}
				style={styles.rootScreen}
				onLayout={onLayoutRootView}
			>
				<ImageBackground
					source={backgroundImage}
					resizeMode="cover"
					style={styles.rootScreen}
					imageStyle={styles.backgroundImage}
				>
					<SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
				</ImageBackground>
			</LinearGradient>
		</>
	);
}

const styles = StyleSheet.create({
	rootScreen: {
		flex: 1,
	},
	backgroundImage: {
		opacity: 0.17,
	},
});
