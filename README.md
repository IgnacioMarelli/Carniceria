Proyecto de ecommerce de una carnicería con React.
==================================================

Autor: Ignacio Marelli
----------------------

El proyecto se forma a partir de App.js, que esta compuesta de los
siguientes componentes:

Navbar: que no es mas que el menú dividido en categorías, que utiliza el
\"useState\" para guardar el estado de las categorías para poder así
filtrar con un map, y al momento de precionar redirección la página a la
categoría correspondiente a través de un link. También utiliza \"cart\"
de CartContext que es una propiedad utilizable en cualquier componente
ya que como todos los componentes se encuentra envuelto. La utilidad que
tiene, es que mientras no se seleccione ningun producto, a la derecha se
vera un \"¡Bienvenido!\", una vez seleccionado un producto aparecera un
carrito con la cantidad de kilos de carne seleccionados. Esto lo logro a
traves de un condicional ubicado en el return.

Item: Son los productos, que incluyen el boton de agregar al carrito.
Este boton es parte de otro componente \"ItemCount\" el cual usa un
estado (useState) para guardar el numero de contador que se utiliza al
escuchar el evento click sobre los botones de suma y resta. Estos
botones están limitados al stock como máximo y a 0 como mínimo a partir
de condicionales. ItemCount contiene un 3er botón que es el que se
utiliza para agregar el numero seleccionado por el usuario en el
carrito. Paso previo a agregar al carrito hay un condicional a partir
del que sino, seleccionó una cantidad de kilos mayor a 0 no aparecerá el
botón, en su defecto aparecerá \"seleccione la cantidad\". Una vez
seleccionada, se agregará al carrito y a traves de la funcion onAdd.
Esta función se define en el Item como \"handdleOnAdd\" que crea la
constante productObj el cual contendrá el id, imagen, nombre y precio
del producto, y luego la agrega al carrito a traves de addItem. addItem,
es una función que esta definida en \"cartContext\", y que utilizando
otra que tiene la misma ubicación, \"isInCart\" revisa si se encuentra
en el carro, si se encuentra, suma las cantidades y resetea el carrito
(a traves de la constante \"newCart\" que luego se setea al cart) y en
caso negativo, lo agrega simplemente. La verificación que hace la
función de isInCart, es utilizada también para formar un condicional. En
caso de que se encuentre en el carrito el producto (isInCart\>0)
cambiará el \"agregar al carrito\" por 2 botones: 1) es el que
direccióna a traves de Link al componente \"Cart\" y, 2) remueve el
producto del carrito a través de la función cuyo origen también está en
cartContext, que se llama \"removeItem\". removeItem lo que hace es
ubicar con filter() todos los productos que no sean el seleccionado y
conforma únicamente el carrito con esos productos, sacando del mismo al
seleccionado.

Itemlist: importa Item y a traves del parametro \"products\" y la
funcion map, devuelve los items pudiendo hacerlo a traves de una key y
del spread operator que diluye el contenido de los products.

ItemListContainer:tiene una prop que es utilizada en \"App.js\" la cual
define el contenido del h1 que devuelve. Utiliza 2 estados, products que
a traves de la función proveniente de firestore.js crea una promesa en
la que se define collectionRef utilizando el parametro category y a su
vez se utiliza de condicional. De ser true gracias a query que filtra
donde se encuentran los productos a buscar y a where que ayuda a filtrar
a los objetos cuyo category sea la misma category de la página. En caso
de ser falsa la declaración se seleccionaran todos los elementos de
\"collection\" que sean de la colección \'products\'. Collection, lo que
hace es establecer donde se buscarran pero se traen a traves de
\"getDocs\" la cual utiliza la colección que corresponda, y la respuesta
se utilizara con un maps para definir cada producto con una funcion
externa \"adaptadorDeProductoDeFirestore()\". Esta función se define por
fuera para facilitar cualquier cambio que sea requerido y para calzar el
error se utiliza catch, así obtengo una respuesta aún cuando no se
cumpliera la promesa. getProducts, forma parte la importación de
\"useAsync\" a partir del que personalizo un hook para evitar extender
innecesariamente el codigo. En este hook personalizado, paso 5
parametros:

funcion de loading, para que al reutilizarla pueda usar el state del
archivo en el que la ejecute

la funcion que efectivamente utilice, en este caso getProducts

la funcion en caso de que se resuelva positivamente la anterior, que en
este caso es setProducts para definir así el estado y utilizarlo para
armar la lista de items

la función que correrá en el caso en que no se pueda resolver la función
por algun error (console.log en este caso)

y por último la dependencia que indicara a que tendrá que esperar que
cargue el useEffect para ejecutar sus funciones (en este caso
\[category\])

Al iniciar el proceso de use effect proveniende de useAsync se seteará
como true el loading. De esta manera aparecerá en la pantalla un h1 que
dirá \"Cargando\...\"

itemDetail:Son los productos con más datos (detalles) que item, Al ser
una función que requiere más datos, estos datos extra son pasados por
parámetro. Fuera de ello su funcionamiento no dista mucho del componente
Item.

ItemDetailContainer: este componete encuentra mucha similitud con
ItemListContainer, lo que los diferencia es que el primero, al
reutilizar useAsync, importa una función distinta \" getDetail \". No se
utiliza la otra función debido que al ser el producto individualizado el
que queremos mostrar , importamos la función \"getDoc\" no \"getDocs\".
De esta forma damos una orden de traer un objeto individual que tengamos
en el firestore.

Cart:es la página que va a estar conformada por todos los productos que
se encuentren en el state de cartContext \"cart\". Si no hay productos
en el carrito, aparecerá h1 que avise que no los hay, de lo contrario se
hará una lista de los productos que haya usando un map, con un subtotal
(establecido por la multiplicación entre la cantidad del producto y su
precio individual). Cada producto de listado, tendrá a su derecha un
botón que utilizara removeItem para removerlo en caso de apretarlo.
Abajo de todo el listado, el comprador tendrá 2 opciónes. Vaciar el
carrito a traves de la función importada desde cartContext \"clearCart\"
o finalizar compra, que al hacer click redirige por un link al
componente Form.

form: En esta página se chequean los datos del usuario (nombre, mail y
numero de telefono). Para ello fue necesario llamar funciones del cart,
y crear estados como el \"loading\", \"datos\" que contendrá los datos
que inserte el usuario, \"botonDeshabilitado\" que funcionara para
validar o no el formulario (cuando no se completen todos los datos se
deshabilitara el boton y se cambiara por un h2 \"Por favor complete los
datos\"). En primer lugar, para evitar que se reinicie la página y se
pierdan los datos, creé la función \"handleSubmit\" donde a traves de un
e.prevent.default evito el funcionamiento que tiene por defaul el
submit. En segundo lugar aparece otro escuchador de eventos, onBlur, que
es utilizado con otra función \"handleOnBlur\", para reconocer si se
esta confirmando correctamente el mail, y en caso de que no salga una
alert avisando al usuario. Otro manejador de eventos que utilizo es el
handleOnChange, que se aplica al onChange para oir los cambios y
utilizarlos para conformar el estado \"datos\" con los datos del cliente
a partir de un \"setDatos\". Dentro de la misma función, utilizo un
\"if, else\" para definir si habilito o no el boton de finalizar compra
dependiendo de si completo todos los datos necesarios o no. Por último,
cuando el usuario haga click en finalizar compra (onClick) utilizo una
función denominada \"crearOrden\". Lo que hace esta funcion en primer
lugar, es setear true a loading, para que cuando cargue el pedido a
firebase aparezca un \"generando pedido\". Luego conformo el pedido con
una constante \"objPedido\", que se integra con los datos del \"buyer\"
insertados en el form, los items que tenia el carrito (encontrados en el
estado cart, de cartContext), el precio total conseguido a traves de un
forEach del estado \"cart\" sumando al total cada precio de los
productos multiplicado por su respectiva cantidad (funcion llamada
también de cartContext) y date que es la fecha de compra extraída por la
funcion \"Date()\". Luego defino 4 constantes más:

ids=son todos los ids de los productos del cart

batch= que contiene la funcion de actualizar (writeBatch()) con el
parametro de la base de datos \"firestoreDb\"

collectionRef= que encuadra la colleción sobre la que se actuara

sinStock= que contiene un array vacío el que luego utilizaremos para
avisar que no queda suficiente stock

Continua la función con \"getDocs\" utilizando el filtro query que
selecciona a collectionRef y where que establece que se actuara sobre
los ids(la constante mencionada antes) que esten dentro (para definir
esto utilizo \'in\', funcion propia de firebase) de los id de los
documentos del firebase. Una vez traído los productos que identifique
con getDocs, utilizo los documentos de la respuesta (response.docs) y
utilizo un forEach, para que con cada documento forme una constante
\"dataDoc\" que contendrá los datos del documento (categoria, nombre,
etc.), otra constante que contendra la cantidad del producto
seleccionado a traves de la función find() aplicada a cart y señalando
la cantidad con un \".quantity\", y luego utilizar un condicional que
defina que si el stock del documento extraído por getDocs es mayor o
igual a la cantidad de productos seleccionados por el cliente, con
batch.update se actualizara el stock de los productos, restandole la
cantidad elegida, y en caso contrario de que el stock sea menor, se
incorpore a la constante sin Stock el producto que no tiene el
suficiente stock. Terminada la verificación, con un nuevo then,
nuevamente pongo filtros con condiciones: si la constante \"sinStock\"
esta vacía creo una nueva constante (pedidoCollectionRef) que se define
como la colección \"perdidos\" dentro de \"firestoreDb\", utilizando la
funcion collection() Una vez, que verifiquemos que sí hay stock, utilizo
la funcion addDoc para que se cree un nuevo docuemnto en
\"pedidoCollectionRef\" que contenga la constante que nombre al
principio \"objPedido\". En caso de que alguno de los productos carezca
de stock pongo un reject ademas de un promise . reject Si esta todo
correcto entonces con batch.commit actualizo el stock y pongo un mensaje
al cliente con alert el \"ID\" de la orden. Para calzar los errores,
utilizo el catch, e identifico lso errores con un console.log y por
ultimo, con un finally seteo \"false\" el loading para que se de por
finalizado el estado de carga. Una vez finalizado todo este recorrido
finalizo la funcion con un clearCart, para evitar que si desea una nueva
compra, el cart continue en el estado anterior.

Todos los productos, como bien lo señalé, vienen de la base de datos de mi proyecto de firebase, lo cual presentar las credenciales como aparecen en github es inseguro. Para otorgarle seguridad, encripto el codigo con un archivo .env, que importo en el archivo index.js. 

Gif que ilustra como comprar:
![image](https://raw.githubusercontent.com/IgnacioMarelli/Carniceria/master/public/Media/video.gif)
