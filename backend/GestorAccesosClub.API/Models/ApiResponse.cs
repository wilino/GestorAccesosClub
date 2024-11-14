namespace GestorAccesosClub.API.Models
{
    public class ApiResponse
    {
        public object Data { get; set; }           
        public bool HasErrors { get; set; }
        public List<string> Errors { get; set; }
        public string Message { get; set; }

        public ApiResponse(object data, string message = "")
        {
            Data = data;
            HasErrors = false;
            Errors = new List<string>();
            Message = message;
        }

        public ApiResponse(List<string> errors, string message = "Se produjeron errores en la operación")
        {
            Data = null;
            HasErrors = true;
            Errors = errors ?? new List<string>();
            Message = message;
        }
    }
}

