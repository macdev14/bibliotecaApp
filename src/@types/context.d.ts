type Permissao = 'super_user' | 'normal_user' ;
interface User {
    username: string;
    permissions : Permissao
  }
  


  interface AuthContextData {
    signed: boolean;
    user: User | null;
    loading: boolean;
    signIn(name:string, password:string): void;
    signOut(): void;
    signUp(name:string, senha:string, permissao: Permissao): void;
  }

