using backend_pt.ConexionBD;
using backend_pt.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace backend_pt.Controllers
{
    [ApiController]
    [Route("Paises")]
    public class PaisesController:ControllerBase
    {
        Conexionbd conn = new Conexionbd();

        [HttpGet]
        [Route("Obtener")]

        public async Task<ActionResult<List<PaisesModel>>> ObtenerPaises()
        {
            string query = "SELECT * FROM Paises";

            var lista = new List<PaisesModel>();

            using (var sql = new SqlConnection(conn.conexionSQL()))
            {
                using (var cmd = new SqlCommand(query, sql))
                {

                    await sql.OpenAsync();
                    using (var paises = await cmd.ExecuteReaderAsync())
                    {
                        while (await paises.ReadAsync())
                        {
                            var paisesres = new PaisesModel();
                            paisesres.codigo = (string)paises["codigo"];
                            paisesres.nombre = (string)paises["nombre"];
                            lista.Add(paisesres);
                        }
                    }

                }
            }

            return lista;

        }

    }
}
