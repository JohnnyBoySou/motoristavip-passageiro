import React from 'react';
import { TouchableOpacity, Text, } from 'react-native';
import { argonTheme } from '../../constants';
import { MaterialIcons } from '@expo/vector-icons';

export default function Error({ size = 16, variant = 'secundary', text, }) {
    const types = {
        primary: {
            color: argonTheme.COLORS.PRIMARY,
            bg: '#fff',
            border: '#fff',
        },
        secundary: {
            color: argonTheme.COLORS.ERROR,
            bg: argonTheme.COLORS.ERROR+30,
            border: 'transparent',
        },
        outline: {
            bg: 'transparent',
            color: argonTheme.COLORS.PRIMARY,
            border: argonTheme.COLORS.PRIMARY,
        },
        white: {
            bg: 'transparent',
            color: '#fff',
            border: '#fff',
        },
        ghost: {
            bg: '#ffffff30',
            border: 'transparent',
            color: '#ffffff',
        },
        ghost2: {
            bg: argonTheme.COLORS.PRIMARY + 30,
            border: 'transparent',
            color: argonTheme.COLORS.PRIMARY,
        },
    }

    const selectType = types[variant]

    return (
        <TouchableOpacity  style={{ backgroundColor: selectType.bg, borderColor: selectType.border, flexDirection: 'row', borderWidth: 2, borderRadius: 8, padding: 12,  alignItems: 'center', }}>
            <MaterialIcons name="error-outline" size={24} color={argonTheme.COLORS.ERROR} />
            <Text style={{ color: selectType.color, alignSelf: 'center', textAlign: 'center', marginLeft: 12, fontFamily: 'Inter_500Medium', fontWeight: 900, fontSize: size, lineHeight: size + 2, }}>{text}</Text>
        </TouchableOpacity>
    )
}