var carrito =[];

if(localStorage.getItem('carrito') != null)
   var carrito = JSON.parse(localStorage.getItem('carrito'));

var productos = [
    {
        id: 1,
        nombre:'Pastelito',
        descripcion: 'Incompleto',
        categoria:'Carcasa Celular',
        precio: 20.5, 
        foto: 'img/cream-phone.png',
        descuento: 10,
        cantidad:0,
        favorito:true,
        carrito:false,
    },
    {
        id: 2,
        nombre:'Abeja',
        descripcion: 'Incompleto',
        categoria:'Cojín',
        precio: 40.5, 
        foto: 'img/insect-throw.png',
        descuento: 0,
        cantidad:0,
        favorito:true,
        carrito:false,
    },
    {
        id: 3,
        nombre:'Avión',
        descripcion: 'Incompleto',
        categoria:'Cachucha',
        precio: 80.5, 
        foto: 'img/paper-cap.png',
        descuento: 0,
        cantidad:0,
        favorito:false,
        carrito:false,
    },
    {
        id: 4,
        nombre:'Atardecer',
        descripcion: 'Incompleto',
        categoria:'Libreta',
        precio: 65.5, 
        foto: 'img/utlility_notebook.png',
        descuento: 30,
        cantidad:0,
        favorito:true,
        carrito:false,
    },
    {
        id: 5,
        nombre:'Pastelito',
        descripcion: 'Incompleto',
        categoria:'Carcasa Celular',
        precio: 12.5, 
        foto: 'img/cream-phone.png',
        descuento: 10,
        cantidad:0,
        favorito:false,
        carrito:false,
    },
    {
        id: 6,
        nombre:'Pastelito',
        descripcion: 'Incompleto',
        categoria:'Carcasa Celular',
        precio: 198.5, 
        foto: 'img/cream-phone.png',
        descuento: 10,
        cantidad:0,
        favorito:false,
        carrito:false,
    },
    {
        id: 7,
        nombre:'Pastelito',
        descripcion: 'Incompleto',
        categoria:'Carcasa Celular',
        precio: 94.5, 
        foto: 'img/cream-phone.png',
        descuento: 10,
        cantidad:0,
        favorito:false,
        carrito:false,
    },
  ];


const app = new Vue({
    el: '#Tienda',

    data: {
        categorias:[
            'Carcasa Celular', 'Cojín', 'Cachucha','Libreta'
        ],
        carrito: carrito,
        productos: productos,
    },

    methods: {
        agregarAlCarrito(producto){
            // Busca el producto en el carrito
            const productoEnCarrito = this.carrito.find((p) => p.id === producto.id);

            if (productoEnCarrito) {
            // El producto ya está en el carrito, aumenta su cantidad
                productoEnCarrito.cantidad += 1;
            } else {
            // El producto no está en el carrito, agrégalo
            producto.cantidad = 1;
            producto.carrito = true;
            this.carrito.push(producto);
            }

            localStorage.setItem('carrito', JSON.stringify(this.carrito));
        },
    },    
    computed:{
        productoCarrito(){
            const productosEnCarrito = this.carrito.filter(carrito => carrito.carrito);
            return productosEnCarrito.length;
        }
    },
   
 });

const app2 = new Vue({
    el: '#menuPrincipal',
    data: {
        productos: productos,
        carrito: carrito,
    },
    computed: {
        productoCarrito(){
            const productosEnCarrito = this.carrito.filter(carrito => carrito.carrito);
            return productosEnCarrito.length;
        }
    },
 });

const app3 = new Vue({
    el: '#cart',
    data: {
        carrito: carrito,
        productos: productos,
    },
    methods: {
        cambiarCantidad(carritoItem, accion){
            if (accion === 'sumar') {
                carritoItem.cantidad++;
            } else if (accion === 'restar' && carritoItem.cantidad > 1) {
                carritoItem.cantidad--;
            }
            localStorage.setItem('carrito', JSON.stringify(this.carrito));
        },
        pagarProductos() {
            this.carrito = this.carrito.filter(item => !item.carrito);
            localStorage.setItem('carrito', JSON.stringify(this.carrito));
            location.reload();
          },
    },
    computed: {
        productoCarrito(){
            const productosEnCarrito = this.carrito.filter(carrito => carrito.carrito);
            return productosEnCarrito.length;
        },
        subtotal() {
            let subtotal = 0;
            for (let i = 0; i < this.carrito.length; i++) {
              subtotal += this.carrito[i].precio * this.carrito[i].cantidad;
            }
            return subtotal;
        },
        totalCantidad() {
            let total = 0;
            for (let i = 0; i < this.carrito.length; i++) {
              total += this.carrito[i].cantidad;
            }
            return total;
        },
        iva() {
            return this.subtotal * 0.16;
          },
        total() {
            return this.subtotal + this.iva;
        },
    },
 });