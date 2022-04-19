declare global {
    namespace NodeJS {
        interface ProceyanrssEnv {
            DB_TYPE: string
            DB_HOST: string
            DB_PORT : string
            DB_NAME: string
            DB_USERNAM: string
            DB_PASSWORD: string
        }
    }
}
export {};
