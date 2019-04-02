import React, {StyleSheet} from 'react-native'
import Colors from '../constants/Colors'

export default StyleSheet.create({
    configLabel: {
        marginLeft: 10,
        marginTop: 40
    },

    configASAClubCodeInput: {
        width: 300,
        marginLeft: 30,
        marginTop: 5
    },

    configInputRow: {
        flex: 1,
        flexDirection: 'column',
    },

    myInputStyle: {
        marginLeft: 10
    },

    updateButton: {
        marginTop: 50,
        marginLeft: 140,
        width: 200
    },

    updateButtonText: {
        padding: 15
    },

    configUpdatedOverlay: {
        backgroundColor: '#DAF7A6',
        width: 300,
        height: 100
    },

    overlayText: {
        fontSize: 20,
        marginLeft: 45,
        marginTop: 28,
        color: '#154360'
    }

});