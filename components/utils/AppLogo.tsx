import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { downloadLogoUsingURL } from '../../utils/supabaseOperation';

export default function AppLogo() {
    const [logoURI, setLogoURI] = useState<string | null>(null);

    useEffect(() => {
        const fetchAndSetLogo = async () => {
            const uri = await downloadLogoUsingURL();
            setLogoURI(uri);
        };

        fetchAndSetLogo();
    }, []);

    if (!logoURI) return null;
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
            }}>
            <Image
                style={styles.appLogo}
                source={{ uri: logoURI }}></Image>
            <Text style={styles.appName}>SubsTrack</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    appName: {
        fontWeight: 'bold',
        fontSize: 23,
        marginLeft: 10,
    },
    appLogo: {
        width: 23,
        height: 30,
        marginTop: 3,
    },
});
