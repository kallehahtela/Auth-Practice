import { StyleSheet, Text, View } from "react-native";

function WelcomeScreen() {
    return (
        <View>
            <Text>Welcome</Text>
            <Text>You authenticated successfully!</Text>
        </View>
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});