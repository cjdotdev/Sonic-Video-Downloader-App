//src/modules/metadata.schema.ts

// Defining a schema for receiving a url from the user 
export const receiveLinkBodySchema = 
{
    
       type : 'object',
    properties : {
    url_link : {type : "string"},
    },
    required : ['url_link'],
    additionalProperties : false
    
};
 export const sendLinkBodySchema = 
{
  
     type : "object",
    properties: {
        title : {type : "string"},
        duration : {type : "number"},
        thumbnail : {type : "string"},
        extractor : {type : "string"}
    }
};


