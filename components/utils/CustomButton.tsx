import React, { FC } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CustomButtonProps } from './types'; // Adjust the path to your types.ts

const CustomButton: FC<CustomButtonProps> = ({
    backgroundColor,
    marginBottom,
    onPress,
    color,
    text,
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    backgroundColor,
                    marginBottom,
                },
            ]}
            onPress={onPress}>
            <Text style={[styles.buttonText, { color }]}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        padding: 10,
        borderWidth: 2,
        alignItems: 'center',
        width: 280,
    },
    buttonText: {
        fontWeight: 'bold',
    },
});


export default CustomButton;
