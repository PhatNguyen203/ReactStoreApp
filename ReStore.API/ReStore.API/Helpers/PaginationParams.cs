namespace ReStore.API.Helpers
{
    public class PaginationParams
    {
        private const int MAXSIZE = 50;
        public int PageNumber { get; set; } = 1;
        private int _size = 6;
        public int Size
        {
            get { return _size; }
            set { _size = value > MAXSIZE ? MAXSIZE : value; }
        }
    }
}
