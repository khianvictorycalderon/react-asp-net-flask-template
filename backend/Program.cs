using backend.DTOs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        var allowedOrigins = builder.Configuration
            .GetSection("Cors:AllowedOrigins")
            .Get<string[]>() ?? [];

        policy
            .WithOrigins(allowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddHttpClient("AI", client =>
{
    client.BaseAddress = new Uri(
        builder.Configuration["Services:AI:Url"]!
    );
});

var app = builder.Build();

app.UseCors("AllowFrontend");

app.MapGet("/", () =>
{
   return new
   {
       Message = "Yey, your ASP.NET backend is working!"
   };
});

app.MapGet("/ai-service", async (IHttpClientFactory factory) =>
{
    try
    {
        var client = factory.CreateClient("AI");
        var response = await client.GetAsync("/");
        response.EnsureSuccessStatusCode();
        return Results.Ok(
            await response.Content.ReadFromJsonAsync<AiResponse>()
        );
    }
    catch (HttpRequestException ex)
    {
        return Results.Problem(ex.Message);
    }
});

app.Run();