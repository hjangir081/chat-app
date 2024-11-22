import { View, Text } from 'react-native';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

interface CustomMenuProps{
    text?:string;
    value?:any;
    action?:(value: any)=>void;
    icon?:React.ReactNode;
}

const MenuItems:React.FC<CustomMenuProps> = ({text, action, value, icon}) => {
    return(
        <MenuOption onSelect={()=>action?.(value)}>
            <View className='px-4 py-1 flex-row justify-between items-center'>
                <Text style={{fontSize:hp(1.7)}} className='font-semibold text-neutral-600'>{text}</Text>
                <Text>{icon}</Text>
            </View>
        </MenuOption>
    )
}

export default MenuItems