using AnkiBackEnd.Data.DTOs;
using AnkiBackEnd.Data.LoginModels;
using AnkiBackEnd.Services;
using AnkiDiplom.Data;
using AnkiDiplom.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace AnkiDiplom.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDBContent _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private TokenService _tokenService;

        public UsersController(AppDBContent context, UserManager<User> userManager, SignInManager<User> signInManager, TokenService tokenService, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet("/getint"), Authorize]
        public async Task<int> GetInt()
        {
            return 1;
        }

        [HttpPost("/signup")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterModel registerModel)
        {
            var user = new User { UserName = registerModel.Email, Email = registerModel.Email};
            var result = await _userManager.CreateAsync(user, registerModel.Password);
            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: false);
                return Ok();
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }
        [HttpPost("/signin")]
        public async Task<ActionResult<LoginDTO>> Login(LoginModel loginModel)
        {
            var result = await _signInManager.PasswordSignInAsync(loginModel.Email, loginModel.Password, isPersistent: false, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                var user = await _userManager.FindByEmailAsync(loginModel.Email);

                var token = _tokenService.CreateToken(user);

                return new LoginDTO 
                { 
                    IsAuthorized = true,
                    Error = "",
                    Token = token
                };

            }
            else
            {
                return new LoginDTO
                {
                    IsAuthorized = false,
                    Error = "Неверные логин/пароль",
                    Token = ""
                };
            }
        }

        [HttpGet("/signout")]
        public async void LogOut()
        {
            await _signInManager.SignOutAsync();
        }

        [HttpGet("/profile")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<User>> Profile()
        {
            try
            {
                var currentUserId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
                var currentUser = await _context.Users.Include(u => u.Cards)
                    .FirstOrDefaultAsync(o => o.Id == currentUserId);

                return currentUser;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id.ToString() != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return (_context.Users?.Any(e => e.Id == id.ToString())).GetValueOrDefault();
        }
    }
}
