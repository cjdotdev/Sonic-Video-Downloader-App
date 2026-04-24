import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import type {FastifyError, FastifyReply, FastifyRequest} from 'fastify'
import { AppError } from './utils/AppError'
import fetchingMetadataRoute from './modules/metadata/controller'

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
app.register(fetchingMetadataRoute,{prefix:"/video"})

//GESTION D'ERREURS 

app.setErrorHandler((error:FastifyError,request:FastifyRequest,reply:FastifyReply) =>
{
 if(error.validation)
 {
   return reply.code(400).send({message : 'Donnees invalides'})
 }

 if (error instanceof AppError)
 {
    const appError = error as AppError
    return reply
    .code(appError.statusCode)
    .send(appError.message)
 }

  request.log.error(error);

 return reply.code(500).send({message: 'ERREUR SERVEUR'})
}
)

app.listen({ port: 3000 });
// ROUTE
export default app