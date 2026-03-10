export const createServiceHerder = (authorizationType? : "Bearer" , authorizationToken? : string )=>{
    return {
        Authorization :`${authorizationType} ${authorizationToken}`
    }
}