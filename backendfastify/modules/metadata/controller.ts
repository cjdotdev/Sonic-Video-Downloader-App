import type { FastifyPluginAsync ,FastifyInstance,FastifyRequest,FastifyReply} from "fastify";
import { verifyUrlMetadata } from "./service";
import {receiveLinkBodySchema,sendLinkBodySchema} from "./schema";
import fastifyPlugin from "fastify-plugin";


interface BodyRoute
{
    url_link  : string
}//Defines the type of REQUEST that will be taken by the handler , if not TS would sent Request type any error


const fetchingMetadataRoute : FastifyPluginAsync = async (fastify: FastifyInstance) =>//Declare the route with its type async
{
 fastify.route({//Define the route composed of method,schema and handler function
  method: 'POST',
  url: '/extract-metadata',
  schema: {
   body: receiveLinkBodySchema,
   response:
    {
      200: 
      {
        sendLinkBodySchema
      }
    }
  },
handler: async function (request:FastifyRequest<{Body:BodyRoute}>, reply:FastifyReply) {
   const {url_link} = request.body as BodyRoute

   const result = verifyUrlMetadata(fastify,url_link)
   return reply.status(200).send(result)
  }
}) 
}
export default fetchingMetadataRoute

