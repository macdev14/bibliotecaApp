type Permissao = 'super_user' | 'normal_user' ;
interface User {
    username: string;
    permissions : Permissao;
    id : string;
  }
  


  interface AuthContextData {
    signed: boolean;
    user: User;
    loading: boolean;
    signIn(name:string, password:string): void;
    signOut(): void;
    signUp(name:string, senha:string, permissao: Permissao): Promise<void>;
  }

