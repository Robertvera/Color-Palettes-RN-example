import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PalettePreview from '../components/PalettePreview';

const Home = ({ navigation, route }) => {
    // const newColorPalette = route.params?.newColorPalette;
    const newColorPalette = route.params ? route.params.newColorPalette : undefined;
    const [palettes, setPalettes] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchPalettes = useCallback(async () => {
        const result = await fetch('https://color-palette-api.kadikraman.now.sh/palettes');
        const palettes = await result.json();
        if (result.ok) {
            setPalettes(palettes);
        }
    }, [])

    useEffect(() => {
        fetchPalettes();
    }, [])

    const handleRefresh = useCallback(async () => {
        setIsRefreshing(true);
        await fetchPalettes();
        setIsRefreshing(false);
    })

    useEffect(() => {
        if (newColorPalette) {
            setPalettes(palettes => [newColorPalette, ...palettes]);
        }
    }, [newColorPalette])

    return (
        <FlatList
            style={styles.list}
            data={palettes}
            keyExtractor={item => item.paletteName}
            renderItem={({ item }) => (
                <PalettePreview
                    onPress={() => navigation.push('ColorPalette', item)}
                    palette={item}
                />
            )}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            ListHeaderComponent={<TouchableOpacity onPress={() => { navigation.navigate('ColorPaletteModal') }}>
                <Text style={styles.buttonText}>
                    Add a color scheme
                </Text>
            </TouchableOpacity>}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        padding: 10,
        backgroundColor: 'white'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'teal',
        marginBottom: 10
    }
})



export default Home;