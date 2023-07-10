import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
//   import * as auth from '../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Q } from '@nozbe/watermelondb';
import { database } from '../databases';
import UserModel from '../databases/models/userModel';
import { hashPassword, verifyPassword } from '../utils/crypto';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const AuthContext = createContext({} as AuthContextData);
export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation();
  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
      if (storagedUser) {

        setUser(JSON.parse(storagedUser));
        setLoading(false);
      } else {
        signOut();
        setLoading(false);
      }
    }
    loadStorageData();
  }, []);

  async function signIn(usuario: string, password: string) {
    try {
      const userCollection = database.get<UserModel>('users');
      const users = await userCollection.query(
        Q.where('username', usuario)
      ).fetch();

      if (users.length === 0 || users.length > 1) {
        console.log('User not found');
        return;
      }
      const user : UserModel = users[0];
      const { username, permissions, id } = user
      console.log('JSON OBJECT: ', user);
      const valid = await verifyPassword(password, user.password)
      if (valid) {
        console.log('Login bem-sucedido!');
        await AsyncStorage.setItem('@RNAuth:user', JSON.stringify({ username, permissions, id }));
        setUser({ username, permissions, id });
      } else {
        Alert.alert('Credenciais inválidas!');
      }
    } catch (error) {
      console.log('Erro ao fazer login:', error);
    }

  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  const signUp = async (usuario :string, senha :string, permissao : Permissao) => {

    const password = await hashPassword(senha)
    console.log("Password hashed");
    const userCollection = database.get<UserModel>('users');
    console.log("Got user: ", userCollection);
    if(userCollection){
     
      let user = await userCollection.query(
        Q.where('username', usuario)
      ).fetch();
      console.log("checking user: ", user);
      if (user.length === 1 || user.length > 0) {
        Alert.alert('Usuario já existe!')
        return;
      }
    }
    console.log("creating user");
    await database.write(async () => {
      await database.get<UserModel>('users')
        .create(data => {
          data.username = usuario;
          data.password = password;
          data.permissions = permissao;
        }).then(data => { Alert.alert("Usuário cadastrado com sucesso!");return navigation.navigate('SignIn'); }).catch(err => { Alert.alert("Erro: " + err)});

    });

   
    
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
