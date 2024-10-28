import 'next-auth'
import { DefaultSession } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';
import { Declaration } from 'postcss';

//changes into default types
declare module 'next-auth' {
    interface User {
        _id?: string;
        isVerified?:boolean;
        isAcceptingMessages?:boolean;
        username?:string
    }
    interface Session {
        user : {
            _id?: string;
            isVerified?:boolean;
            isAcceptingMessages?:boolean;
            username?:string
        } & DefaultSession['user']
    }
}

//this is just different way to get type
declare module 'next-auth/jwt'{
    interface JWT {
        _id?: string;
        isVerified?:boolean;
        isAcceptingMessages?:boolean;
        username?:string
    }
}