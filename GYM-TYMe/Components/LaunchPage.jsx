import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CreateSplits from './Inputs/CreateSplits';
import SelectDays from './Inputs/Select Days';

export default function LaunchPage() {
    const [state, setState] = useState(1);

    return (
        <View style={stl.container}>
            <View style={stl.topSection}>
                <Text style={stl.topText}>Create Your Routine:</Text>
            </View>
            <View style={stl.middleSection}>
                {state === 1 ? (
                    <View style={stl.splitsView}>
                        <Text style={stl.inputStyle}>Splits:</Text>
                        <CreateSplits setState={setState} />
                    </View>
                ) : state === 2 ? (
                    <View>
                        <SelectDays />
                    </View>
                ) : (
                    <View></View>
                )}
            </View>
            <View style={stl.bottomSection}></View>
        </View>
    );
}

const stl = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'green',
    },
    topSection: {
        flex: 0.2,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: 'yellow',
    },
    topText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 35,
    },
    middleSection: {
        flex: 0.5,
        width: '100%',
        height: '100%',
        backgroundColor: 'red',
        justifyContent: 'center',
    },
    bottomSection: {
        flex: 0.3,
        width: '100%',
        height: '100%',
        backgroundColor: 'blue',
    },
    splitsView: {
        flex: 1,
        width: '100%',
        height: '100%',
        padding: 20,
        backgroundColor: 'orange',
    },
    inputStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
