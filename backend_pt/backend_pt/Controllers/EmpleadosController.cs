
using backend_pt.ConexionBD;
using backend_pt.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Security.Cryptography.X509Certificates;

namespace backend_pt.Controllers
{

    [ApiController]
    [Route("Empleados")]
    public class EmpleadosController : ControllerBase
    {
        Conexionbd conn = new Conexionbd();


        [HttpGet]
        [Route("Obtener")]
        public async Task <ActionResult<List<EmpleadosModel>>> ObtenerEmpleados()
        {
            string query = "SELECT * FROM Trabajadores";
            
            var lista = new List<EmpleadosModel>();

            using (var sql = new SqlConnection(conn.conexionSQL()))
            {
                using (var cmd = new SqlCommand(query, sql))
                {
                  
                    await sql.OpenAsync();
                    using (var empleado = await cmd.ExecuteReaderAsync())
                    { 
                        while(await empleado.ReadAsync()) 
                        {
                            var empleadosres = new EmpleadosModel();
                            empleadosres.nombre = (string)empleado["nombre"];
                            empleadosres.apellido = (string)empleado["apellido"];
                            empleadosres.tipo_documento = (string)empleado["tipo_documento"];
                            empleadosres.num_documento = (string)empleado["num_documento"];
                            empleadosres.contratacion = (DateTime)empleado["fecha_contratacion"];
                            empleadosres.pais = (string)empleado["pais"];
                            empleadosres.area = (int)empleado["area"];
                            empleadosres.subarea = (string)empleado["subarea"];
                            lista.Add(empleadosres);    
                        }
                    }

                }
            }

            return lista;
        }
        //metodo para guardar 
        [HttpPost]
        [Route("Agregar")]
        public  dynamic Guardar_empleado(EmpleadosModel nuevo_empleado)
        {
            string query = "INSERT INTO Trabajadores (nombre, apellido, tipo_documento, num_documento, pais, area, subarea, fecha_contratacion) " +
               "VALUES (@nombre, @apellido, @tipo_documento, @num_documento, @pais, @area, @subarea, @fecha_contratacion)";

            using (var sql = new SqlConnection(conn.conexionSQL()))
            {
                using (var cmd = new SqlCommand(query, sql))
                {

                    cmd.Parameters.AddWithValue("@nombre", nuevo_empleado.nombre);
                    cmd.Parameters.AddWithValue("@apellido", nuevo_empleado.apellido);
                    cmd.Parameters.AddWithValue("@tipo_documento", nuevo_empleado.tipo_documento);
                    cmd.Parameters.AddWithValue("@num_documento", nuevo_empleado.num_documento);
                    cmd.Parameters.AddWithValue("@pais", nuevo_empleado.pais);
                    cmd.Parameters.AddWithValue("@area", nuevo_empleado.area);
                    cmd.Parameters.AddWithValue("@subarea", nuevo_empleado.subarea);
                    cmd.Parameters.AddWithValue("@fecha_contratacion", nuevo_empleado.contratacion);

                    sql.Open();
                    cmd.ExecuteNonQuery(); 

                }

            }

                return new
            {
                success = true,
                message = "registrado"
            };

        }

        [HttpPatch]
        [Route("Editar")]
        public dynamic Editar_empleado(EmpleadosModel empleado_edit)
        {
            //en el front recibimos todo el objeto pero los campos de tipo de docu y num docu no son editables para evitar erroes de repeticiones

            string query = "UPDATE Trabajadores SET nombre=@nombre, apellido=@apellido,pais=@pais, area=@area, subarea=@subarea, fecha_contratacion=@fecha_contratacion WHERE num_documento=@num_documento";

            using (var sql = new SqlConnection(conn.conexionSQL()))
            {
                using (var cmd = new SqlCommand(query, sql))
                {

                    cmd.Parameters.AddWithValue("@nombre", empleado_edit.nombre);
                    cmd.Parameters.AddWithValue("@apellido", empleado_edit.apellido);
                    cmd.Parameters.AddWithValue("@num_documento", empleado_edit.num_documento);
                    cmd.Parameters.AddWithValue("@pais", empleado_edit.pais);
                    cmd.Parameters.AddWithValue("@area", empleado_edit.area);
                    cmd.Parameters.AddWithValue("@subarea", empleado_edit.subarea);
                    cmd.Parameters.AddWithValue("@fecha_contratacion", empleado_edit.contratacion);

                    sql.Open();
                    cmd.ExecuteNonQuery();

                }

            }


            return new
            {
                success = true,
                message = "Editado"
            };

        }

        [HttpDelete]
        [Route("Eliminar")]
        public dynamic Eliminar_empleado(string dui_eliminar)
        {
            string query = "DELETE FROM Trabajadores WHERE num_documento=@dui_a_eliminar";

            using (var sql = new SqlConnection(conn.conexionSQL()))
            {
                using (var cmd = new SqlCommand(query, sql))
                {

                    cmd.Parameters.AddWithValue("@dui_a_eliminar",dui_eliminar);

                    sql.Open();
                    cmd.ExecuteNonQuery();

                }
            }


                    return new
            {
                success = true,
                message = "Eliminado"
            };
        }



    }
}
