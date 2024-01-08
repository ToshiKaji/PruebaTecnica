using backend_pt.ConexionBD;
using backend_pt.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace backend_pt.Controllers
{
    [ApiController]
    [Route("Subareas")]
    public class SubareasController : ControllerBase
    {
        Conexionbd conn = new Conexionbd();

        [HttpGet]
        [Route("Obtener")]
        public async Task<ActionResult<List<SubareaModel>>> ObtenerSubareas()
        {
            string query = "SELECT * FROM Subareas";

            var lista = new List<SubareaModel>();

            using (var sql = new SqlConnection(conn.conexionSQL()))
            {
                using (var cmd = new SqlCommand(query, sql))
                {

                    await sql.OpenAsync();
                    using (var subarea = await cmd.ExecuteReaderAsync())
                    {
                        while (await subarea.ReadAsync())
                        {
                            var subareasres = new SubareaModel();
                            subareasres.id_subarea = (string)subarea["id_subarea"];
                            subareasres.nombre_subarea = (string)subarea["nombre_subarea"];
                            subareasres.areapadre = (int)subarea["areapadre"];
                            lista.Add(subareasres);
                        }
                    }

                }
            }

            return lista;

        }





    }
}
