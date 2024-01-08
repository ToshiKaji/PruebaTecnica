using backend_pt.ConexionBD;
using backend_pt.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace backend_pt.Controllers
{
    [ApiController]
    [Route("Areas")]
    public class AreasController : ControllerBase
    {
        Conexionbd conn = new Conexionbd();

        [HttpGet]
        [Route("Obtener")]

        public async Task<ActionResult<List<AreasModel>>> ObtenerAreas()
        {
            string query = "SELECT * FROM Areas";

            var lista = new List<AreasModel>();

            using (var sql = new SqlConnection(conn.conexionSQL()))
            {
                using (var cmd = new SqlCommand(query, sql))
                {

                    await sql.OpenAsync();
                    using (var areas = await cmd.ExecuteReaderAsync())
                    {
                        while (await areas.ReadAsync())
                        {
                            var areasres = new AreasModel();
                            areasres.id_area = (int)areas["id_area"];
                            areasres.nombre_area = (string)areas["nombre_area"];
                            lista.Add(areasres);
                        }
                    }

                }
            }

            return lista;

        }

    }
}
