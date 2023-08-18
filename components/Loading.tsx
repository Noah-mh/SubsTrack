import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

const Loading = () => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size="large" />
            <Text style={{ marginTop: 10 }}>Loading...</Text>
        </View>
    );
};

export default Loading;
