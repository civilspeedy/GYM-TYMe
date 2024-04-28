import { useEffect, useState } from 'react';
import {
    LayoutAnimation,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export default function CreateSplits() {
    const [splitList, setSplitList] = useState([]);

    const addSplit = () => {
        setSplitList((prev) => [...prev, 1]);
    };

    const Split = () => {
        const [title, setTitle] = useState('');

        useEffect(() => {
            //need check if title is empty and they check if this split has already been done
        }, [title]);
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
            <Pressable
                style={stl.newSplit}
                onPress={() => addSplit()}>
                <Text style={stl.add}>+</Text>
            </Pressable>
        );
    };
    LayoutAnimation.easeInEaseOut();
    return (
        <View style={stl.container}>
            <ScrollView style={stl.scroll}>
                <Split />
                {splitList.map((item, index) => (
                    <Split key={index} />
                ))}
                <NewSplit />
            </ScrollView>
        </View>
    );
}

const stl = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'pink',
    },
    scroll: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
    },
    splitContainer: {
        width: '70%',
        height: 30,
        backgroundColor: 'grey',
        borderRadius: 50,
        marginBottom: 10,
        alignSelf: 'center',
    },
    splitEntry: {
        width: '90%',
        height: '100%',
        alignSelf: 'center',
    },
    newSplit: {
        backgroundColor: 'darkgrey',
        borderRadius: 50,
        padding: 10,
        width: '30%',
        alignSelf: 'center',
    },
    add: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
    },
});
