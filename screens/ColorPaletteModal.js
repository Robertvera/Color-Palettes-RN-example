import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Switch
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { COLORS } from '../data/ColorDataset';

const ColorPaletteModal = ({ navigation }) => {
    const [name, setName] = useState('');
    const [selectedColors, setSelectedColors] = useState([]);

    const handleSubmit = useCallback(() => {
        if (!name) {
            Alert.alert('Please enter a palette name');
        } else if (selectedColors.length < 3) {
            Alert.alert('Please enter at least 3 colors');
        } else {
            const newColorPalette = {
                paletteName: name,
                colors: selectedColors
            }
            navigation.navigate('Home', { newColorPalette })
        }
    }, [name, selectedColors]);

    const handleValueChange = useCallback((value, color) => {
        if (value === true) {
            setSelectedColors(colors => [...colors, color])
        } else {
            setSelectedColors(colors => colors.filter(
                selectedColor => color.colorName !== selectedColor.colorName
            ))
        }
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.name}>Name of the palette</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder='Palette Name'></TextInput>
            <FlatList
                data={COLORS}
                keyExtractor={item => item.colorName}
                renderItem={({ item }) => (
                    <View style={styles.color}>
                        <View style={[styles.colorBox, { backgroundColor: item.hexCode }]} />
                        <Text>{item.colorName}</Text>
                        <Switch
                            value={!!selectedColors.find(color => color.colorName == item.colorName)}
                            onValueChange={(selected) => { handleValueChange(selected, item) }}>
                        </Switch>
                    </View>
                )}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10
    },
    container: {
        padding: 10,
        backgroundColor: 'white',
        flex: 1
    },
    button: {
        height: 40,
        backgroundColor: 'teal',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'

    },
    name: {
        marginBottom: 10
    },
    color: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },
    colorBox: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 2,
        height: 40,
        width: 40,
        marginRight: 10,
    }
})

export default ColorPaletteModal;