-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 27-03-2024 a las 21:37:44
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inambd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ambientes`
--

CREATE TABLE `ambientes` (
  `id_ambiente` int NOT NULL,
  `nombre_ambiente` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `estado_ambiente` enum('libre','ocupado','inaccesible') COLLATE utf8mb4_general_ci NOT NULL,
  `fk_area` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ambientes`
--

INSERT INTO `ambientes` (`id_ambiente`, `nombre_ambiente`, `estado_ambiente`, `fk_area`) VALUES
(1, 'Y12', 'libre', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `areas`
--

CREATE TABLE `areas` (
  `id_area` int NOT NULL,
  `nombre_area` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `estado` enum('ocupado','libre','inaccesible','') COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `areas`
--

INSERT INTO `areas` (`id_area`, `nombre_area`, `estado`) VALUES
(1, 'Tics', 'libre');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `elementos`
--

CREATE TABLE `elementos` (
  `id_elementos` int NOT NULL,
  `codigo_sena` int NOT NULL,
  `estado` enum('dañado','reparacion','funcional','') COLLATE utf8mb4_general_ci NOT NULL,
  `nombre_elemento` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `tipo_elemento` enum('tecnologia','mobiliario','material didactico','suministros') COLLATE utf8mb4_general_ci NOT NULL,
  `nota_cambio` text COLLATE utf8mb4_general_ci,
  `cambios` enum('si') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `fk_ambiente` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `elementos`
--

INSERT INTO `elementos` (`id_elementos`, `codigo_sena`, `estado`, `nombre_elemento`, `tipo_elemento`, `nota_cambio`, `cambios`, `fk_ambiente`) VALUES
(1, 12312321, 'dañado', 'PC_HP', 'tecnologia', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `novedad`
--

CREATE TABLE `novedad` (
  `id_novedad` int NOT NULL,
  `tipo_novedad` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `descripcion_novedad` text COLLATE utf8mb4_general_ci NOT NULL,
  `responsable_registro` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `fecha_novedad` date NOT NULL,
  `fk_id_prestamo` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `novedad`
--

INSERT INTO `novedad` (`id_novedad`, `tipo_novedad`, `descripcion_novedad`, `responsable_registro`, `fecha_novedad`, `fk_id_prestamo`) VALUES
(3, 'Daño PC Registro 1 actualizado', 'La pantalla no enciende (prueba) ', 'carlos cela', '2024-02-01', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamo`
--

CREATE TABLE `prestamo` (
  `id_prestamo` int NOT NULL,
  `nombre_ambiente` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `fecha_prestamo` date NOT NULL,
  `fecha_entrega` date NOT NULL,
  `nombre_celador` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `observaciones` text COLLATE utf8mb4_general_ci,
  `fk_usuario` int NOT NULL,
  `fk_ambiente` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `prestamo`
--

INSERT INTO `prestamo` (`id_prestamo`, `nombre_ambiente`, `fecha_prestamo`, `fecha_entrega`, `nombre_celador`, `observaciones`, `fk_usuario`, `fk_ambiente`) VALUES
(1, 'Y12', '2024-03-05', '2024-03-04', 'carlos', 'ninguna', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `identificacion` int NOT NULL,
  `telefono` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `correo` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `contraseña` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `tipo_usuario` enum('celador','administrador','instructor') COLLATE utf8mb4_general_ci NOT NULL,
  `estado_usuario` enum('activo','inactivo') COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `identificacion`, `telefono`, `correo`, `contraseña`, `tipo_usuario`, `estado_usuario`) VALUES
(1, 'julian', 1117486332, '321412312123', 'julian@gmail.com', '123', 'celador', 'activo'),
(2, 'David Ricardo', 1231231231, '3333333333', 'drpg@gmail.com', '123', 'celador', 'activo'),
(4, 'David Ricardo 4', 1231231, '3333333333', 'drpg1@gmail.com', '123', 'celador', 'activo'),
(6, 'David Ricardo 5', 1231231999, '3333333333', 'drpg1008@gmail.com', '12345678', 'celador', 'activo'),
(7, 'David Ricardo 6', 1004083441, '3333333333', 'drpg1004@gmail.com', '12345678', 'celador', 'activo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ambientes`
--
ALTER TABLE `ambientes`
  ADD PRIMARY KEY (`id_ambiente`),
  ADD KEY `fk_area` (`fk_area`);

--
-- Indices de la tabla `areas`
--
ALTER TABLE `areas`
  ADD PRIMARY KEY (`id_area`);

--
-- Indices de la tabla `elementos`
--
ALTER TABLE `elementos`
  ADD PRIMARY KEY (`id_elementos`),
  ADD KEY `fk_ambiente` (`fk_ambiente`);

--
-- Indices de la tabla `novedad`
--
ALTER TABLE `novedad`
  ADD PRIMARY KEY (`id_novedad`),
  ADD KEY `fk_id_prestamo` (`fk_id_prestamo`);

--
-- Indices de la tabla `prestamo`
--
ALTER TABLE `prestamo`
  ADD PRIMARY KEY (`id_prestamo`),
  ADD KEY `prestamo_ibfk_1` (`fk_usuario`),
  ADD KEY `fk_ambiente` (`fk_ambiente`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD UNIQUE KEY `identificacion` (`identificacion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ambientes`
--
ALTER TABLE `ambientes`
  MODIFY `id_ambiente` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `areas`
--
ALTER TABLE `areas`
  MODIFY `id_area` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `elementos`
--
ALTER TABLE `elementos`
  MODIFY `id_elementos` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `novedad`
--
ALTER TABLE `novedad`
  MODIFY `id_novedad` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `prestamo`
--
ALTER TABLE `prestamo`
  MODIFY `id_prestamo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ambientes`
--
ALTER TABLE `ambientes`
  ADD CONSTRAINT `ambientes_ibfk_2` FOREIGN KEY (`fk_area`) REFERENCES `areas` (`id_area`);

--
-- Filtros para la tabla `elementos`
--
ALTER TABLE `elementos`
  ADD CONSTRAINT `elementos_ibfk_1` FOREIGN KEY (`fk_ambiente`) REFERENCES `ambientes` (`id_ambiente`);

--
-- Filtros para la tabla `novedad`
--
ALTER TABLE `novedad`
  ADD CONSTRAINT `novedad_ibfk_1` FOREIGN KEY (`fk_id_prestamo`) REFERENCES `prestamo` (`id_prestamo`);

--
-- Filtros para la tabla `prestamo`
--
ALTER TABLE `prestamo`
  ADD CONSTRAINT `prestamo_ibfk_1` FOREIGN KEY (`fk_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `prestamo_ibfk_2` FOREIGN KEY (`fk_ambiente`) REFERENCES `ambientes` (`id_ambiente`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
