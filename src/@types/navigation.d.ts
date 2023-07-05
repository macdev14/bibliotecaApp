export declare global{
    namespace ReactNavigation{
        interface RootParamList{
            SignUp: undefined;
            SignIn: undefined;
            Books: undefined;
            Reservations: undefined;
            BookDetails: { [id: string]: string; };

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

