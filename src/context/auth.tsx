import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Q } from '@nozbe/watermelondb';
import { database } from '../databases';
import UserModel from '../databases/models/userModel';
import { hashPassword, verifyPassword } from '../utils/crypto';
import { Alert } from 'react-native';

import isEmpty from '../utils/typeCheck';
const AuthContext = createContext({} as AuthContextData);
export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
      const userParsed: User = JSON.parse(storagedUser as string);
      if (userParsed) {
        isEmpty(userParsed) ? signOut(): setUser(userParsed);
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
        Alert.alert('Usuário não encontrado');
        return;
      }
      const user : UserModel = users[0];
      const { username, permissions, id } = user
    
      const valid = await verifyPassword(password, user.password)
      if (valid) {
       
        await AsyncStorage.setItem('@RNAuth:user', JSON.stringify({ username, permissions, id }));
        setUser({ username, permissions, id } as User);
      } else {
        Alert.alert('Credenciais inválidas!');
      }
    } catch (error) {
      console.log('Erro ao fazer login:', error);
    }

  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser({} as User);
    });
  }

  const signUp = async (usuario :string, senha :string, permissao : Permissao) => {

    const password = await hashPassword(senha)
    
    const userCollection = database.get<UserModel>('users');
    
    if(userCollection){
     
      let user = await userCollection.query(
        Q.where('username', usuario)
      ).fetch();
     
      if (user.length === 1 || user.length > 0) {
        Alert.alert('Usuario já existe!')
        return;
      }
    }
  
    return await database.write(async () => {
      await database.get<UserModel>('users')
        .create(data => {
          data.username = usuario;
          data.password = password;
          data.permissions = permissao;
        })

    });

   
    
  }

  return (
    <AuthContext.Provider
      value={{ signed: !isEmpty(user), user, loading, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
