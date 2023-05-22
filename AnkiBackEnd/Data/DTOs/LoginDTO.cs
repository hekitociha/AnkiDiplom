namespace AnkiBackEnd.Data.DTOs
{
    public class LoginDTO
    {
        public bool IsAuthorized { get; set; }
        public string Token { get; set; }
        public string Error { get; set; }
    }
}
    