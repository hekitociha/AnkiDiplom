using AnkiBackEnd.Data.Models;
using AnkiDiplom.Data;
using AnkiDiplom.Data.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;

namespace AnkiBackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDBContent _context;

        public AuthController(AppDBContent context)
        {
            _context = context;
        }

        [HttpGet("/signin")]
        public async Task<IActionResult> Login(string login, string userPassword)
        {
            if (_context.Users.Where(u=> u.Login == login).Count()!=0 && userPassword == "password")
            {
                // Создаем утверждения для пользователя
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, login),
                    new Claim(ClaimTypes.Role, "User")
                };
                var claimsIdentity = new ClaimsIdentity(
                    claims, CookieAuthenticationDefaults.AuthenticationScheme);

                // Создаем токен аутентификации
                var authProperties = new AuthenticationProperties
                {
                    IsPersistent = true,
                    ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(30)
                };
                await HttpContext.SignInAsync(
                    CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(claimsIdentity),
                    authProperties);

                return Ok();
            }
            else
            {
                ModelState.AddModelError("", "Invalid login attempt.");
                return BadRequest("Неверные логин/пароль");
            }
        }

        [HttpPost("/signup")]
        public async Task<IActionResult> Register(string login, string password)
        {
            // Проверяем введенные данные на корректность
            if (!string.IsNullOrEmpty(login) && !string.IsNullOrEmpty(password))
            {
                // Создаем утверждения для пользователя
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, login),
                    new Claim(ClaimTypes.Role, "User")
                };
                var claimsIdentity = new ClaimsIdentity(
                    claims, CookieAuthenticationDefaults.AuthenticationScheme);

                // Создаем токен аутентификации
                var authProperties = new AuthenticationProperties
                {
                    IsPersistent = true,
                    ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(30)
                };
                await HttpContext.SignInAsync(
                    CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(claimsIdentity),
                    authProperties);

                return Ok();
            }
            else
            {
                ModelState.AddModelError("", "Invalid registration attempt.");
                return BadRequest();
            }
        }

        [HttpGet("/logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok();
        }

    }
}
