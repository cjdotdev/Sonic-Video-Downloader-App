import type { FastifyInstance } from "fastify";
import {exec} from "child_process"
import { promisify } from "util";
import { AppError } from "../../utils/AppError";

const execPromise = promisify(exec) // Permet d'utiliser exec en methode async / await 

export const getUrlMetadata = async (fastify:FastifyInstance, url_link: string) =>
{
   
    try {

       const {stdout,stderr} = await execPromise(`yt-dlp --quiet --no-playlist \
       --match-filter "availability =? 'public'" \
       --print "[%(title)j,%(duration_string)j,%(thumbnail)j,%(extractor)j]" \
       --skip-download \
       ${url_link} `)//Defines the metadata fetch command : title , duration, thumnail, extractor and quality array
       
       if(!stdout || stdout.trim().length === 0 )
       {
         throw new AppError("Ooops , something went wrong with the video link. Check it and retry please.",400)
       }//Defined if an the output printed does not appear or does not exist , likely a yt-dlp error

       fastify.log.info(` Video metadata downloaded`)
       return JSON.parse(stdout)   
      

     
    } catch (error) {
        throw new AppError("Ooops , something went wrong during the process, retry please.",500)
    }
}


export const verifyUrlMetadata = async (fastify: FastifyInstance, url_link:string) =>
{   
    const  defaultExtractors = ["youtube","dailymotion","tiktok"]//Defines extractors used by the applications
    const userMetadata = await getUrlMetadata(fastify,url_link)
    if(defaultExtractors.includes(userMetadata[3]))//Defines if the extractor of the videos is the list of available platforms
       {
        fastify.log.info("Metadata sent to user !!!!")
        console.log (userMetadata)
        return userMetadata
       }
    else
       {
        throw new AppError("Sorry,this website is not supported yet.",400)
       }
}