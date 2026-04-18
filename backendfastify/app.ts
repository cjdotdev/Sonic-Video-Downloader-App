import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import type {FastifyError, FastifyReply, FastifyRequest} from 'fastify'

export const app = Fastify ({logger:true})


//PLUGINS ESSENTIELLES DE L'APPLICATION MIS DES LE DEPART A L'INSTALLATION
app.register(import('./plugins/env'))
app.register(cors,{
    origin: process.env.FRONTEND_URL?? 'http://localhost:3000'
})

app.register(jwt,
    {
        secret:process.env.JWT_SECRET!
    }
)

// PLUGINS PLUS PERSONNELLES AJOUTES LORS DU TRAVAIL AU FUR ET A MESURE ET UTILISES SUR L'APP EN ENTIER


//GESTION D'ERREURS 

app.setErrorHandler((error:FastifyError,request:FastifyRequest,reply:FastifyReply) =>
{
 if(error.validation)
 {
   return reply.code(400).send({message : 'Donnees invalides'})
 }
 if (error.statusCode)
 {
    return reply.code(error.statusCode).send({message: error.message})
 }
 return reply.code(500).send({message: 'ERREUR SERVEUR'})
}
)

// ROUTE
export default app