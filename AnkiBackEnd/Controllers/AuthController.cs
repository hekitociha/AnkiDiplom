using AnkiDiplom.Data.Models;
using AnkiBackEnd.Services;
using AnkiDiplom.Data;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;
using AnkiBackEnd.Data.DTOs;

namespace AnkiBackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDBContent _context;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly IIdentityServerInteractionService _interactionService;

        public AuthController(AppDBContent context, SignInManager<User> signInManager, UserManager<User> userManager, IIdentityServerInteractionService interactionService)
        {
            _context = context;
            _signInManager = signInManager;
            _userManager = userManager;
            _interactionService = interactionService;
        }

        [HttpPost("/signin")]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            var user = await _context.Users.FindAsync(1);
            if (user is null) 
            { 
                return BadRequest("Пользователь с таким логином не существует"); 
            }
            if (user.Password == loginDTO.Password)
            {
                // Создаем утверждения для пользователя
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, loginDTO.Login),
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
