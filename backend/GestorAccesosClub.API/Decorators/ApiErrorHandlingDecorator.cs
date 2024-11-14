using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace GestorAccesosClub.API.Decorators
{
    public class ApiErrorHandlingDecorator : Attribute, IAsyncActionFilter
    {
        private readonly ILogger<ApiErrorHandlingDecorator> _logger;

        public ApiErrorHandlingDecorator(ILogger<ApiErrorHandlingDecorator> logger)
        {
            _logger = logger;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            try
            {
            
                var resultContext = await next();

             
                if (resultContext.Exception != null && !resultContext.ExceptionHandled)
                {

                    _logger.LogError(resultContext.Exception, "Se produjo un error en el controlador.");
                    context.Result = new ObjectResult(new
                    {
                        Message = "Ocurrió un error en el servidor. Por favor, inténtelo nuevamente más tarde.",
                        Error = resultContext.Exception.Message
                    })
                    {
                        StatusCode = 500
                    };
                    resultContext.ExceptionHandled = true;
                }
            }
            catch (Exception ex)
            {
   
                _logger.LogError(ex, "Error no controlado en la acción de API.");


                context.Result = new ObjectResult(new
                {
                    Message = "Ocurrió un error inesperado. Por favor, contacte al soporte.",
                    Error = ex.Message
                })
                {
                    StatusCode = 500
                };
            }
        }
    }
}

