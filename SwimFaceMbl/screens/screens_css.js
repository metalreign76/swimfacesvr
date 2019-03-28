import React, {StyleSheet} from 'react-native'
import Colors from '../constants/Colors'

export default StyleSheet.create({
    configLabel: {
        marginLeft: 10,
        marginTop: 10
    },

    configASAClubCodeInput: {
        borderColor: Colors.tintColor,
        borderWidth: 1,
        width: 100,
        height: 25,
        marginLeft: 10,
        marginTop: 5
    },

    configInputRow: {
        flex: 1,
        flexDirection: 'row'
    }
});