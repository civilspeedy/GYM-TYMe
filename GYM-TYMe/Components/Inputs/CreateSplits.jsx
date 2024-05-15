import { impactAsync } from 'expo-haptics';
import { useEffect, useState } from 'react';
import {
    Alert,
    LayoutAnimation,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { sJson } from '../../logic/storage';

export default function CreateSplits() {
    const [splitList, setSplitList] = useState([]);
    const [showRemove, setShowRemove] = useState(false);

    const addSplit = () => {
        impactAsync();
        setSplitList((prev) => [...prev, 1]);
    };

    const removeSplit = () => {
        impactAsync();
        setSplitList(splitList.slice(0, -1));
    };

    useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        if (splitList.length > 0) {
            setShowRemove(true);
        } else {
            setShowRemove(false);
        }
    }, [splitList]);

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
                style={stl.btn}
                onPress={() => {
                    addSplit();
                }}>
                <Text style={stl.buttonText}>+</Text>
            </Pressable>
        );
    };

    const RemoveSplit = () => {
        return (
            <Pressable
                style={stl.btn}
                onPress={() => {
                    removeSplit();
                }}>
                <Text style={stl.buttonText}>-</Text>
            </Pressable>
        );
    };
    return (
        <View style={stl.container}>
            <ScrollView style={stl.scroll}>
                <Split />
                {splitList.map((item, index) => (
                    <Split key={index} />
                ))}
                <View style={stl.buttons}>
                    {showRemove === true ? <RemoveSplit /> : <View></View>}
                    <NewSplit />
                </View>
            </ScrollView>
        </View>
    );
}

const stl = StyleSheet.create({
    container: {
        flex: 1,
    },
    scroll: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
    },
    splitContainer: {
        width: '70%',
        height: 40,
        backgroundColor: sJson.primary,
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
        alignSelf: 'center',
    },
    splitEntry: {
        width: '90%',
        height: '100%',
        alignSelf: 'center',
    },
    btn: {
        backgroundColor: sJson.secondary,
        borderRadius: 10,
        padding: sJson.padding,
        flex: 1,
        maxWidth: 72,
        alignSelf: 'center',
        margin: 2,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
    },
});
