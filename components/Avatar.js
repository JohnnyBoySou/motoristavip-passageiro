import { Image, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { argonTheme } from '../constants';

export default function Avatar({ src = null, w = 48, h = 48, size=20, bg = "#f1f1f1", cl = argonTheme.COLORS.PRIMARY }) {
    
    if (src) {
        return <Image source={{ uri: src }} style={{ width: w, height: h, borderRadius: 100, backgroundColor: bg, }} />
    }
    return (<View style={{ width: w, height: h, backgroundColor: bg, justifyContent: 'center', alignItems: 'center', borderRadius: 100, }}>
        <AntDesign
            name="user"
            style={{ textAlign: 'center' }}
            size={size}
            color={cl}
        />
    </View>
    )
}