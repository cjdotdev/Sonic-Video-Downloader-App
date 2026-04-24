//Used for handling global errors across app routes

export class AppError extends Error 
{
  constructor(message : string, public statusCode :  number )
  {
    super(message)
    this.name = 'AppError'
  }
}