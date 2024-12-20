import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { argonTheme } from '../../constants';

export default function Button({ size = 18, variant = 'primary', onPress, text, loading = false }) {
    const types = {
        primary: {
            color: argonTheme.COLORS.PRIMARY,
            bg: '#fff',
            border: '#fff',
        },
        secundary: {
            color: '#fff',
            bg: argonTheme.COLORS.PRIMARY,
            border: argonTheme.COLORS.PRIMARY,
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
        red: {
            bg: argonTheme.COLORS.ERROR+30,
            border: argonTheme.COLORS.ERROR,
            color: argonTheme.COLORS.ERROR,
        }
    }

    const selectType = types[variant]

    return (
        <TouchableOpacity disabled={loading} onPress={onPress} style={{ backgroundColor: selectType.bg, borderColor: selectType.border, borderWidth: 2, borderRadius: 8, padding: 16, justifyContent: 'center', alignItems: 'center', }}>
            {loading ? <ActivityIndicator color={selectType.color} size={18} /> : <Text style={{ color: selectType.color, alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter_600SemiBold', fontWeight: 900, fontSize: size, lineHeight: size + 2, }}>{text}</Text>}
        </TouchableOpacity>
    )
}