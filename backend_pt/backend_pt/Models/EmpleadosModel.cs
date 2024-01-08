namespace backend_pt.Models
{
    public class EmpleadosModel
    {
        public string nombre { get; set; }
        public string apellido { get; set; }
        public string tipo_documento { get; set; }
        public string num_documento { get; set; }
        public string pais { get; set; }
        public int area { get; set; }
        public string subarea { get; set; }
        public DateTime contratacion { get; set; }
    }
}
