import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { impactAsync } from 'expo-haptics';
import { sJson } from '../../logic/storage';

export default function SelectDays() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const Day = ({ dayName }) => {
        const [colour, setColour] = useState('black');
        const [txtClr, setTxtClr] = useState('white');
        const [borderColour, setBorderColour] = useState('white')
        const [state, setState] = useState(false);

        useEffect(() => {
            impactAsync();
            if (state) {
                setColour('#4969B6');
                setTxtClr('black');
            } else {
                setColour('black');
                setTxtClr('white');
            }
        }, [state]);

        return (
            <Pressable
                style={[stl.dayBtn, { borderColor: borderColour, backgroundColor: colour }]}
                onPress={() => setState(!state)}>
                <Text style={([stl.btnTxt], { color: txtClr })}>{dayName}</Text>
            </Pressable>
        );
    };

    return (
        <View style={stl.container}>
            {days.map((dayName, index) => (
                <Day
                    dayName={dayName}
                    key={index}
                />
            ))}
        </View>
    );
}

const stl = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    dayBtn: {
        padding: sJson.padding,
        width: 75,
        height: 75,
        borderRadius: 50,
        borderWidth: sJson.borderSize,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
    },
    btnTxt: {
        flex: 1,
    }
});
