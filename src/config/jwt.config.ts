import { JwtModuleAsyncOptions } from '@nestjs/jwt'

export const jwtConfig: JwtModuleAsyncOptions = {
    useFactory: () => ({
        secret : process.env.JWT_KEY,
        signOptions : { expiresIn : '1d' } 
    })
}