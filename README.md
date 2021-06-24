# UTN Fra - Laboratorio IV - TP Clinica Online

### Consigna:

Debemos realizar un sistema según las necesidades y deseos del cliente, para eso tenemos una breve
descripción de lo que el cliente nos comenta acerca de su negocio.
“La clínica OnLine, especialista en salud, cuenta actualmente con consultorios (6 en la actualidad),
dos laboratorios (físicos en la clínica), y una sala de espera general. Está abierta al público de lunes a
viernes en el horario de 8:00 a 19:00, y los sábados en el horario de 8:00 a 14:00.
Trabajan en ella profesionales de diversas especialidades, que ocupan los consultorios acordes a su
disponibilidad, y reciben en ellos pacientes con turno para consulta o tratamiento. Dichos turnos son pedidos por la web seleccionando el profesional o la especialidad. La duración mínima de un turno es
30 minutos.” pero los profesionales pueden cambiar la duración según su especialidad. Estos
profesionales pueden tener más de una especialidad. También contamos con un sector dentro de la clínica que se encarga de la organización y administración de la misma.

![consigna](https://github.com/gmaxn/mguelpa-lab-iv-2021/blob/mguelpa-lab-iv-tp-clinica-online/src/assets/consigna-tp-clinica-2021.pdf)

## Instalación y despliegue

Despliegue Angular.

```bash
npm i
ng serve -o
```

Despliegue Angular.

```bash
npm i
node serve.js
```

## Rutas y características

Dillinger is currently extended with the following plugins.
Instructions on how to use them in your own application are linked below.

| MODULO| PAGE| ROLE | ROUTE |
| ------ | ------- | ------------- | ----- |
| App | [Beinvenida](#home) | -| https://mguelpa-lab-iv-tp-clinica.herokuapp.com/home |
| App | [Registro](#registro) | -| https://mguelpa-lab-iv-tp-clinica.herokuapp.com/enrollment |
| App | [Ingreso](#ingreso) | admin| https://mguelpa-lab-iv-tp-clinica.herokuapp.com/signin |
| App | [Ingreso](#ingreso) | paceinte| https://mguelpa-lab-iv-tp-clinica.herokuapp.com/signin |
| App | [Ingreso](#ingreso) | administrador| https://mguelpa-lab-iv-tp-clinica.herokuapp.com/signin |