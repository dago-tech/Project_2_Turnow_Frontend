# Turnow Project - Frontend (React JS)

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain-wordmark.svg" alt="html" width="65" height="65"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain-wordmark.svg" alt="css" width="65" height="65"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="javascript" width="65" height="65"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" alt="react" width="65" height="65"/>


Esta es la sección de Frontend del proyecto **"Turnow"** (Backend repo: Project_1_Turnow_Backend). Esta es una aplicación web que gestiona turnos en diferentes tipos de establecimientos donde haya turnos de espera. A continuación una breve explicación del proyecto:

- La persona al llegar al sitio debe ingresar su número de documento de identificación, la categoría y prioridad con que espera ser atendido, inmediatamente obtiene su número de turno y debe esperar al llamado mostrado en la pantalla de notificación donde se muestra el módulo de atención (Service desk) al que debe ir.

- El administrador de la aplicación deberá crear previamente las opciones de prioridades y categorías que van a tener los clientes, así como la asignación de trabajadores (Users) a cada módulo de atención.

- Cada persona en su módulo de atención llamará al siguiente turno en la lista, ingresará en número de turno en la aplicación para verificación y por último, al finalizar la atención del cliente, marcará dicho turno como atendido.

- Todos los datos mencionados, mas los tiempos de espera y atención de cada turno se almacenan en una base de datos (PostgreSQL)

- En la carpeta ***"docs"*** de este repositorio se encuentra la información de diseño del proyecto.

---

### Resumen de avance del proyecto

El proyecto se encuentra en un 70% de avance.

1. **Funcionalidad:** 90%
   - La gran mayoría de características y funcionalidades principales se han implementado y probado. Pendiente mejorar seguridad de token de acceso.

2. **Pruebas:** Pendiente
   - Los conjuntos de pruebas y los casos aún están por desarrollarse y ejecutarse. Garantizar pruebas sólidas es una prioridad para las próximas etapas.

3. **Estilos CSS:** 20% (trabajo en progreso)
   - Posteriormente a las pruebas unitarias se trabajará en refinar y finalizar los estilos CSS para mejorar el atractivo visual general del proyecto.

4. **Despliegue:** Pendiente
   - Las tareas de implementación, incluida la configuración de servidores o plataformas de alojamiento, están pendientes. Esto es crucial para que el proyecto sea accesible para los usuarios. Se planea realizar en los servicios EC2 de AWS.

---

__Versiones usadas en desarrollo__

- Sistema operativo local: Windows 10
- Entorno de desarrollo: Visual Studio Code
- Versión de Node: 18.13.0
- Versión react: 18.2.0
- Versión vite: 5.0.8
- Versión de Git: 2.39.1.windows.1

---

### Guía de descarga a local


__1.__ Abre la terminal o línea de comandos en el computador donde deseas descargar el proyecto.

__2.__ Navega al directorio donde deseas almacenar el repositorio.

__3.__ Ejecuta el siguiente comando de Git para clonar el repositorio a la carpeta actual:

```sh
git clone https://github.com/dago-tech/Project_2_Turnow_Frontend.git
```
__4.__ Muévete a la rama main:
```sh
git checkout main
```
__5.__ Instala las dependencias del package.json
```sh
npm i
```
__6.__ Correr el servidor de desarrollo:
```sh
npm run dev
```

__7.__ Ya se puede visitar la aplicación haciendo uso de http://localhost:5173/home. 





## Manual de usuario

__1.__ **Página principal del proyecto**: Esta página muestra el menú principal del proyecto
   - **Header**: Muestra el estado de registro de usuario (User) actual y los links para hacer Login y Logout.
   - **Clients**: Sección para ingreso de ID, prioridad y categoría de cada cliente que espera obtener un turno para ser atendido. Para acceder a esta sección no se necesita estar autenticado en la aplicación.
   - **Notification Screen**: Página que muestra el listado de los turnos llamados por los módulos de atención (Service desk), esta sirve para que los clientes sepan a qué módulo acercarse para ser atendidos.Para acceder a esta sección no se necesita estar autenticado en la aplicación.
   - **Admin User**: Sección para que un usuario tipo "administrador" pueda configurar la aplicación según sus necesidades de negocio. Podrá crear, modificar y eliminar Usuarios (trabajadores del establecimiento), Categorías, Prioridades, Módulos de atencion asociados a cada usuario (Service desk), Clientes y Turnos. Para acceder a esta sección se necesita estar autenticado en la aplicación y ser usuario "Admin". 
   - **Desk User**: Sección para que un usuario tipo "Desk" pueda gestionar los turnos. Podrá llamar a un nuevo turno, verificar el número de turno y al terminar la atención lo marcará como "Atendido". Podrá modificar y eliminar la base de datos de los Turnos. Para acceder a esta sección se necesita estar autenticado en la aplicación y ser usuario "Admin" o "Desk".

![home_page](img/01_home_page.jpg)


__2.__ **Página de Login**: Esta página permite a un usuario (trabajador del establecimiento o administrador de la aplicación) autenticarse. Mostrará distintos mensajes de error en caso de existir. A continuación se muestra la página de Login y cómo se vería la página principal después de la autenticación:

![LOGIN](img/02_LOGIN.jpg)

- Home después de autenticación:

![home_after_login](img/03_home_after_login.jpg)


__3.__ **Página User Admin**: Aquí se cuenta con un menú izquierdo para administrar la base de datos como se mencionó previamente. En las imagenes se muestra el contenido de cada link del menú:

![admin_user](img/08_admin_user.jpg)

![admin_category](img/12_admin_category.jpg)

![admin_priority](img/13_admin_priority.jpg)

![admin_service_desk](img/14_admin_service_desk.jpg)

![admin_clients](img/15_admin_clients.jpg)

![admin_turns](img/16_admin_turns.jpg)


__4.__ **Creando un nuevo elemento**: Cada sección mostrada anteriormente tiene un botón de "Create" para llenar un formulario de forma intuitiva, lo que permite crear una nueva instancia de esta clase, aquí un ejemplo:

![admin_user_create](img/09_admin_user_create.jpg)


__5.__ **Editando un elemento**: Cada sección mostrada anteriormente tiene un botón de "Edit", este trae los datos de dicha instancia de la API Rest y permite que editemos los datos de la instancia según se necesite, aquí unos ejemplos:

![admin_user_edit](img/10_admin_user_edit.jpg)

![Alt text](img/17_admin_service_desk_edit.jpg)


__6.__ **Eliminando un elemento**: Cada sección mostrada anteriormente tiene un botón de "Delete", este permite borrar el registro que sea seleccionado por medio de un pop-up (React modal), aquí un ejemplo:

![admin_user_delete](img/11_admin_user_delete.jpg)


__7.__ Después de que el administrador de la aplicación haya creado los respectivos registros de Usuarios (trabajadores del establecimiento), Categorías, Prioridades y Módulos de atencion asociados a cada usuario (Service desk) la aplicación podrá empezar a funcionar y los clientes que lleguen al establecimiento podrán ingresar su información para obtener un turno y ser atendidos.

__8.__ En una pantalla táctil o computador dedicado a los clientes, se tendrá abierta la seccion de **Clients** y  el cliente que se encuentre llenando la información podrá diligenciarla en las siguientes tres páginas:

![client_ID](img/04_client_ID.jpg)

![client_priority](img/05_client_priority.jpg)

![client_category](img/06_client_category.jpg)


__9.__ Al finalizar el diligenciamiento de la información el cliente sabrá cuál es su turno. En este caso se supone que habrá un hardware que entregará el turno impreso a la persona. Los turnos son generados con una secuencia dada por el backend desde **A000** hasta **Z999**. Se muestra la siguiente página:

![assigned_turn](img/07_assigned_turn.jpg)


__10.__ Al mismo tiempo que hay clientes en espera, habrá personal de la compañia en los módulos de atención (Service desk), los cuales, después de haberse autenticado podrán entrar a la página de **User Desk** (Turn management) y verán lo siguiente:

![user_desk](img/18_user_desk.jpg)

- Como muestra la imagen esta página cuenta con un menú en la izquierda, que me permite ir a la página de edición de turnos en caso de ser necesario. También permite ir a la pantalla de notificación de llamado de turnos y hay un botón para reiniciar la secuencia de turnos en caso de ser necesario volver a empezar desde el **A000**, (Restart turn number).

- Además, en la parte superior hay un mensaje que se actualiza cada 10 segundos indicandome si hay o no turnos que puedan ser atendidos en ese Service desk, ya que **cada Service desk tiene unas categorías asociadas al momento de ser creado y atenderá al cliente asociado a esa categoría**.


__11.__ **Llamando a un nuevo turno**: El usuario en el Service Desk podrá oprimir el botón *Call the next turn* y si hay turnos que puedan ser atendidos por él, llamará a un nuevo turno y esto se representará en la pantalla de notificación, indicando el turno llamado y el módulo (Service desk) en el que será atendido. El turno será seleccionado segun categoría, prioridad y hora de llegada. Además, en la parte inferior nos muestra un mensaje indicando si el turno fue llamado exitosamente o hay algún error:


![user_desk_call](img/19_user_desk_call.jpg)
- Caso de error:

![user_desk_call_error](img/21_user_desk_call_error.jpg)


- Cuando un turno es llamado, automaticamente en el navegador web donde esté la pantalla de notificación se agregará este turno, esto se logra gracias al canal de comunicación de ***WebSocket*** creado en el backend el cual permite que las sesiones de navegadores se mantengan permanentemente comunicadas:

![Alt text](img/20_notification.jpg)


__12.__ **Verificando un turno**: Cuando el cliente llegue al Service Desk dará el turno a la persona en el módulo y esta lo ingresará y podrá oprimir el botón *Verify turn number*. La aplicación mostrará un mensaje indicando si el turno fue el llamado o no.

![user_desk_verify](img/22_user_desk_verify.jpg)

- Caso de error:

![user_desk_verify_error](img/23_user_desk_verify_error.jpg)


__13.__ **Finalizando la atención al cliente**: Cuando el cliente haya terminado de ser atendido el usuario en el Service Desk podrá oprimir el botón *Attention Finished*, lo cual mostrará un mensaje en la parte inferior y en la base de datos el turno será marcado como "Atendido".

![user_desk_served](img/24_user_desk_served.jpg)


__14.__ La aplicación está diseñada para que ***múltiples instancias*** de ella en equipos diferentes sean abiertas, así que cada vez que un usuario Service desk llame a un nuevo turno, se actualizará automaticamente la pantalla de noficación haciendo uso del ***canal abierto por el WebSocket*** (Notar que los dos navegadores de la parte superior pertenecen a dos sesiones de usuarios diferentes, modulos de atención Modulo 1 y Modulo 2):

![Alt text](img/25_many_users.jpg)


__15.__ De esta forma, hay un flujo de trabajo en la aplicación y después de ser atendido un turno, se podrá llamar nuevamente a otro.


---


## Futuras versiones

- La aplicación actualmente guarda los tiempos de creación, espera para ser atendido y tiempo de atención de cada turno, esto lo hace en la tabla de Turnos de la base de datos. Estos datos serán usados para que los usuarios administradores de la aplicación puedan ver estadisticas y gráficos que le permitan sacar conclusiones sobre usuarios o puntos de atención con mayor o menor eficiencia, entre otros.