namespace backend_pt.ConexionBD
{
    public class Conexionbd
    {
        private string connectionString = string.Empty;
        public Conexionbd()
        {
            var constructor = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").Build();
            connectionString = constructor.GetSection("ConnectionStrings:ConexionDB").Value;
        }
        public string conexionSQL()
        {
            return connectionString;
        }
    }
}
