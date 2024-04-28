import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function CreateSplits() {
    const [splitList, setSplitList] = useState([]);

    const addSplit = () => {
        setSplitList((prev) => [...prev, <Split />]);
    };

    const Split = () => {
        const [title, setTitle] = useState('');
        return (
            <View style={stl.splitContainer}>
                <TextInput
                    style={stl.splitEntry}
                    onChangeText={setTitle}
                    value={title}
                />
            </View>
        );
    };

    const NewSplit = () => {
        return (
            <Pressable style={stl.newSplit}>
                <Text style={stl.add}>+</Text>
            </Pressable>
        );
    };

    return (
        <View style={stl.container}>
            <Split />
            {splitList.map((item, index) => (
                <View key={index}>{item}</View>
            ))}
            <NewSplit />
        </View>
    );
}

const stl = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'grey',
    },
    splitContainer: {
        width: '80%',
        height: '10%',
        alignSelf: 'center',
        backgroundColor: 'brown',
        marginBottom: 10,
    },
    splitEntry: {
        width: '100%',
        height: '100%',
    },
    newSplit: {
        backgroundColor: 'darkgrey',
    },
    add: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
    },
});
