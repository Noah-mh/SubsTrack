import React, {
    useContext,
    useState,
    useEffect,
    useMemo,
    ReactNode,
} from "react";
import {
    SafeAreaView,
    View,
    Text,
    Image,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    FlatList,
    ImageSourcePropType,
} from "react-native";

import Loading from "../Loading";

const imageMapping: { [key: string]: ImageSourcePropType } = {
};