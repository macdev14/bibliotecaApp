export declare global{
    namespace ReactNavigation{
        interface RootParamList{
            SignUp: undefined;
            SignIn: undefined;
        }
    }
}

type StackParamList = {
    SignUp:undefined;
    SignIn:undefined;
}


type StackProps = NativeStackScreenProps<StackParamList, 'SignIn'>

type Props = {
    routes: StackProps
}
