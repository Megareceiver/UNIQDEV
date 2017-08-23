-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 23 Agu 2017 pada 14.51
-- Versi Server: 5.6.20
-- PHP Version: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `dplega_2`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_000_lembaga`
--

CREATE TABLE IF NOT EXISTS `dplega_000_lembaga` (
  `noRegistrasi` char(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `alamat` varchar(100) DEFAULT NULL,
  `noRt` varchar(3) DEFAULT NULL,
  `noRw` varchar(3) DEFAULT NULL,
  `kodeKelurahan` char(2) DEFAULT NULL,
  `kodeKecamatan` char(2) DEFAULT NULL,
  `kodeWilayah` char(2) DEFAULT NULL,
  `kodeProvinsi` char(2) DEFAULT NULL,
  `koordinatGPS` varchar(255) DEFAULT NULL,
  `noTelp` varchar(16) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `mediaSosial` varchar(100) DEFAULT NULL,
  `kodeBentukLembaga` int(11) NOT NULL,
  `kodeBidangGerak` int(11) DEFAULT NULL,
  `jumlahPengurus` int(11) DEFAULT NULL,
  `noNpwp` varchar(25) DEFAULT NULL,
  `visiLembaga` text,
  `misiLembaga` text,
  `organisasiAfiliasi` varchar(100) DEFAULT NULL,
  `catatanLain` text,
  `statusAktif` char(1) NOT NULL DEFAULT '1' COMMENT '0 (dihapus), 1 (aktif), 2(perubahan)',
  `urlGambarLogo` varchar(40) DEFAULT NULL,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_000_lembaga_temp`
--

CREATE TABLE IF NOT EXISTS `dplega_000_lembaga_temp` (
  `noRegistrasi` char(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `alamat` varchar(100) DEFAULT NULL,
  `noRt` varchar(3) DEFAULT NULL,
  `noRw` varchar(3) DEFAULT NULL,
  `kodeKelurahan` char(2) DEFAULT NULL,
  `kodeKecamatan` char(2) DEFAULT NULL,
  `kodeWilayah` char(2) DEFAULT NULL,
  `kodeProvinsi` char(2) DEFAULT NULL,
  `koordinatGPS` varchar(255) DEFAULT NULL,
  `noTelp` varchar(16) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `mediaSosial` varchar(100) DEFAULT NULL,
  `kodeBentukLembaga` int(11) NOT NULL,
  `kodeBidangGerak` int(11) DEFAULT NULL,
  `jumlahPengurus` int(11) DEFAULT NULL,
  `noNpwp` varchar(25) DEFAULT NULL,
  `visiLembaga` text,
  `misiLembaga` text,
  `organisasiAfiliasi` varchar(100) DEFAULT NULL,
  `catatanLain` text,
  `statusAktif` char(1) NOT NULL DEFAULT '1' COMMENT '0 (dihapus), 1 (aktif)',
  `urlGambarLogo` varchar(40) DEFAULT NULL,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `dplega_000_lembaga_temp`
--

INSERT INTO `dplega_000_lembaga_temp` (`noRegistrasi`, `nama`, `alamat`, `noRt`, `noRw`, `kodeKelurahan`, `kodeKecamatan`, `kodeWilayah`, `kodeProvinsi`, `koordinatGPS`, `noTelp`, `email`, `mediaSosial`, `kodeBentukLembaga`, `kodeBidangGerak`, `jumlahPengurus`, `noNpwp`, `visiLembaga`, `misiLembaga`, `organisasiAfiliasi`, `catatanLain`, `statusAktif`, `urlGambarLogo`, `createdBy`, `createdDate`, `changedBy`, `changedDate`) VALUES
('00001', '', '', '', '', '', '', '', '', '', '', '', '', 1, 1, 1, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 17:21:09', NULL, NULL),
('00030200001', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 1, 1, 1, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 17:27:26', NULL, NULL),
('00030200002', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 1, 1, 1, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 17:27:31', NULL, NULL),
('00030200003', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 1, 1, 1, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 17:34:07', NULL, NULL),
('00030200004', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 1, 1, 1, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 17:40:35', NULL, NULL),
('00030200005', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 1, 1, 1, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 17:44:30', NULL, NULL),
('00030200006', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 1, 1, 1, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 17:49:48', NULL, NULL),
('00030200007', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 1, 1, 1, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 18:00:12', NULL, NULL),
('00030200008', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 1, 1, 1, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 18:01:26', NULL, NULL),
('00030200009', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 1, 1, 1, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 18:02:28', NULL, NULL),
('00030200010', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 1, 1, 1, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 18:09:04', NULL, NULL),
('00030200011', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 1, 1, 1, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 18:09:54', NULL, NULL),
('00030200012', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 1, 1, 1, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 18:11:27', NULL, NULL),
('00030200013', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 1, 1, 1, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 18:17:44', NULL, NULL),
('00030200014', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 1, 1, 1, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 18:33:47', NULL, NULL),
('00030200015', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 1, 1, 1, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 18:35:57', NULL, NULL),
('00030200016', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 1, 1, 1, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 18:39:34', NULL, NULL),
('00030200017', 'c', '', '', '', '03', '02', '03', '00', '', '', '', '', 1, 1, 1, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 18:41:09', NULL, NULL),
('00030200018', 'asd', '', '', '', '03', '02', '03', '00', '', '', '', '', 1, 1, 1, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 18:43:22', NULL, NULL),
('00030200019', 'asda', '', '', '', '03', '02', '03', '00', '', '', '', '', 1, 1, 1, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 18:47:04', NULL, NULL),
('00030200020', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 1, 1, 1, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 18:47:29', NULL, NULL),
('00030200021', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 1, 1, 1, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 18:50:11', NULL, NULL),
('00030200022', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 1, 1, 1, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 18:52:07', NULL, NULL),
('00030200023', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 1, 1, 1, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 18:56:13', NULL, NULL),
('00030200024', 'nama lembaga', 'alamatnya', 'rt', 'rw', '03', '02', '03', '00', '', 'telp', 'email', 'medsos', 1, 1, 1, 'npwp', 'visi', 'misi', 'afiliasi', 'catatan', '1', NULL, 'TESTSESSION', '2017-08-15 19:35:49', NULL, NULL),
('00030200025', 'nama lembaga', 'alamatnya', 'rt', 'rw', '03', '02', '03', '00', '', 'telp', 'email', 'medsos', 3, 4, 4, 'npwp', 'visi', 'misi', 'afiliasi', 'catatan', '1', NULL, 'TESTSESSION', '2017-08-15 19:40:31', NULL, NULL),
('00030200026', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 20:23:56', NULL, NULL),
('00030200027', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 20:24:23', NULL, NULL),
('00030200028', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 20:25:58', NULL, NULL),
('00030200029', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 20:51:10', NULL, NULL),
('00030200030', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 20:53:29', NULL, NULL),
('00030200031', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 21:35:31', NULL, NULL),
('00030200032', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 21:36:52', NULL, NULL),
('00030200033', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 21:37:28', NULL, NULL),
('00030200034', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 21:38:46', NULL, NULL),
('00030200035', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 21:39:06', NULL, NULL),
('00030200036', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 21:40:44', NULL, NULL),
('00030200037', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 21:41:17', NULL, NULL),
('00030200038', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 21:46:49', NULL, NULL),
('00030200039', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 21:47:35', NULL, NULL),
('00030200040', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 21:48:08', NULL, NULL),
('00030200041', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 21:49:00', NULL, NULL),
('00030200042', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 21:49:56', NULL, NULL),
('00030200043', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 21:54:31', NULL, NULL),
('00030200044', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 21:54:53', NULL, NULL),
('00030200045', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 21:55:41', NULL, NULL),
('00030200046', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 21:56:24', NULL, NULL),
('00030200047', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 21:57:15', NULL, NULL),
('00030200048', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 21:57:42', NULL, NULL),
('00030200049', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 21:57:50', NULL, NULL),
('00030200050', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 22:04:14', NULL, NULL),
('00030200051', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 22:04:21', NULL, NULL),
('00030200052', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 22:06:20', NULL, NULL),
('00030200053', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 22:06:52', NULL, NULL),
('00030200054', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 22:07:03', NULL, NULL),
('00030200055', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 22:07:46', NULL, NULL),
('00030200056', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 22:07:55', NULL, NULL),
('00030200057', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 22:13:00', NULL, NULL),
('00030200058', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 22:53:18', NULL, NULL),
('00030200059', 'lembaga baru yang baru di update', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 23:34:07', 'TESTSESSION', NULL),
('00030200060', 'lembaga baru lagi lagi update', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 23:37:40', 'TESTSESSION', NULL),
('00030200061', 'masih lembaga baru diupdate lagi dan lagi', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 23:39:53', 'TESTSESSION', NULL),
('00030200062', 'a', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 23:50:58', NULL, NULL),
('00030200063', 'asd', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 00:01:48', NULL, NULL),
('00030200064', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 00:05:03', 'TESTSESSION', NULL),
('00030200065', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 00:06:51', NULL, NULL),
('00030200066', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 00:08:00', NULL, NULL),
('00030200067', 'c', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 00:08:23', NULL, NULL),
('00030200068', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 00:25:13', NULL, NULL),
('00030200069', 'cibangkong mandiri', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 00:25:56', 'TESTSESSION', NULL),
('00030200070', 'new again', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 00:28:48', 'TESTSESSION', NULL),
('00030200071', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 07:33:06', NULL, NULL),
('00030200072', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 07:33:46', 'TESTSESSION', NULL),
('00030200073', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 07:50:56', NULL, NULL),
('00030200074', 'c', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 08:08:40', NULL, NULL),
('00030200075', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 08:11:36', NULL, NULL),
('00030200076', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 09:12:43', NULL, NULL),
('00030200077', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 10:08:54', NULL, NULL),
('00030200078', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 10:09:59', NULL, NULL),
('00030200079', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 10:11:42', NULL, NULL),
('00030200080', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 10:13:27', NULL, NULL),
('00030200081', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 10:14:20', NULL, NULL),
('00030200082', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 10:15:10', NULL, NULL),
('00030200083', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 10:56:41', NULL, NULL),
('00030200084', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 10:59:26', NULL, NULL),
('00030200085', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 11:00:16', NULL, NULL),
('00030200086', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 11:00:51', NULL, NULL),
('00030200087', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 11:13:21', NULL, NULL),
('00030200088', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 11:14:09', NULL, NULL),
('00030200089', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 11:14:56', NULL, NULL),
('00030200090', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 11:17:16', NULL, NULL),
('00030200091', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 11:19:26', NULL, NULL),
('00030200092', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 11:20:12', NULL, NULL),
('00030200093', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 17:32:29', NULL, NULL),
('00030200094', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 21:36:03', NULL, NULL),
('00030200095', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 21:37:30', NULL, NULL),
('00030200096', 'nama lembaga', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-21 21:12:01', NULL, NULL),
('00030200097', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-21 21:16:37', NULL, NULL),
('00030200098', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-22 14:31:25', NULL, NULL),
('00030200099', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-22 14:32:20', NULL, NULL),
('00030200100', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-22 14:33:26', NULL, NULL),
('00030200101', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-22 14:34:06', NULL, NULL),
('00030200102', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-22 14:36:50', NULL, NULL),
('00030200103', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-22 14:38:29', NULL, NULL),
('00030200104', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-22 14:48:55', NULL, NULL),
('00030200105', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-22 14:51:51', NULL, NULL),
('00030200106', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-22 16:35:49', NULL, NULL),
('00030200107', '', '', '', '', '03', '02', '03', '00', '', '', '', '', 0, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-22 17:40:59', NULL, NULL),
('00030200108', 'Megantara Narapadya', 'Jl. Laswi', '003', '014', '03', '02', '03', '00', '', '+6285794867714', 'mereceiver7logia@gmail.com', '', 3, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-22 22:38:58', NULL, NULL),
('12121300001', '', '', '', '', '12', '13', '12', '12', '', '', '', '', 1, 1, 1, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 17:34:29', NULL, NULL),
('12121300002', '', '', '', '', '12', '13', '12', '12', '', '', '', '', 1, 1, 1, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 17:59:19', NULL, NULL),
('12121300003', '', '', '', '', '12', '13', '12', '12', '', '', '', '', 1, 1, 1, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-15 18:54:18', NULL, NULL),
('12121300004', '', '', '', '', '12', '13', '12', '12', '', '', '', '', 0, 4, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-16 08:30:56', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_001_sejarah`
--

CREATE TABLE IF NOT EXISTS `dplega_001_sejarah` (
`idData` int(11) NOT NULL,
  `noRegistrasi` char(11) NOT NULL,
  `deskripsi` text,
  `tanggalDidirikan` date DEFAULT NULL,
  `kepemilikan` varchar(10) DEFAULT NULL COMMENT 'PRIBADI/KELUARGA/LEMBAGA',
  `statusTanah` varchar(20) DEFAULT NULL COMMENT 'SEWA/HAK MILIK/HAK GUNA BANGUN/HAK GUNA PAKAI/WAKAF',
  `statusSertifikasi` varchar(5) DEFAULT NULL COMMENT 'SUDAH/BELUM',
  `luasTanah` int(11) DEFAULT NULL,
  `satuanLuasTanah` varchar(20) DEFAULT NULL COMMENT 'METER PERSEGI/HEKTAR',
  `luasBangunan` int(11) DEFAULT NULL,
  `satuanLuasBangunan` varchar(20) DEFAULT NULL COMMENT 'METER PERSEGI/HEKTAR',
  `kondisiBangunan` varchar(5) DEFAULT NULL COMMENT 'RUSAK/BAIK',
  `JumlahBangunan` int(11) DEFAULT NULL,
  `statusSarana` varchar(10) DEFAULT NULL COMMENT 'ADA/TIDAK ADA',
  `statusStrukturKepengurusan` varchar(10) DEFAULT NULL COMMENT 'ADA/TIDAK ADA',
  `urlGambarStrukturKepengurusan` varchar(40) DEFAULT NULL,
  `bahasaPengantar` varchar(20) DEFAULT NULL,
  `statusSensus` varchar(5) DEFAULT NULL COMMENT 'SUDAH/BELUM',
  `statusBantuanPemerintah` varchar(5) DEFAULT NULL COMMENT 'SUDAH/BELUM',
  `kondisiGeografis` varchar(15) DEFAULT NULL COMMENT 'PANTAI/DATARAN RENDAH/DATARAN TINGGI',
  `potensiWilayah` varchar(25) DEFAULT NULL,
  `jenisWilayah` varchar(25) DEFAULT NULL,
  `catatanLain` text,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_001_sejarah_temp`
--

CREATE TABLE IF NOT EXISTS `dplega_001_sejarah_temp` (
`idData` int(11) NOT NULL,
  `noRegistrasi` char(11) NOT NULL,
  `deskripsi` text,
  `tanggalDidirikan` date DEFAULT NULL,
  `kepemilikan` varchar(10) DEFAULT NULL COMMENT 'PRIBADI/KELUARGA/LEMBAGA',
  `statusTanah` varchar(20) DEFAULT NULL COMMENT 'SEWA/HAK MILIK/HAK GUNA BANGUN/HAK GUNA PAKAI/WAKAF',
  `statusSertifikasi` varchar(5) DEFAULT NULL COMMENT 'SUDAH/BELUM',
  `luasTanah` int(11) DEFAULT NULL,
  `satuanLuasTanah` varchar(20) DEFAULT NULL COMMENT 'METER PERSEGI/HEKTAR',
  `luasBangunan` int(11) DEFAULT NULL,
  `satuanLuasBangunan` varchar(20) DEFAULT NULL COMMENT 'METER PERSEGI/HEKTAR',
  `kondisiBangunan` varchar(5) DEFAULT NULL COMMENT 'RUSAK/BAIK',
  `JumlahBangunan` int(11) DEFAULT NULL,
  `statusSarana` varchar(10) DEFAULT NULL COMMENT 'ADA/TIDAK ADA',
  `statusStrukturKepengurusan` varchar(10) DEFAULT NULL COMMENT 'ADA/TIDAK ADA',
  `urlGambarStrukturKepengurusan` varchar(40) DEFAULT NULL,
  `bahasaPengantar` varchar(20) DEFAULT NULL,
  `statusSensus` varchar(5) DEFAULT NULL COMMENT 'SUDAH/BELUM',
  `statusBantuanPemerintah` varchar(5) DEFAULT NULL COMMENT 'SUDAH/BELUM',
  `kondisiGeografis` varchar(15) DEFAULT NULL COMMENT 'PANTAI/DATARAN RENDAH/DATARAN TINGGI',
  `potensiWilayah` varchar(25) DEFAULT NULL,
  `jenisWilayah` varchar(25) DEFAULT NULL,
  `catatanLain` text,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=34 ;

--
-- Dumping data untuk tabel `dplega_001_sejarah_temp`
--

INSERT INTO `dplega_001_sejarah_temp` (`idData`, `noRegistrasi`, `deskripsi`, `tanggalDidirikan`, `kepemilikan`, `statusTanah`, `statusSertifikasi`, `luasTanah`, `satuanLuasTanah`, `luasBangunan`, `satuanLuasBangunan`, `kondisiBangunan`, `JumlahBangunan`, `statusSarana`, `statusStrukturKepengurusan`, `urlGambarStrukturKepengurusan`, `bahasaPengantar`, `statusSensus`, `statusBantuanPemerintah`, `kondisiGeografis`, `potensiWilayah`, `jenisWilayah`, `catatanLain`, `createdBy`, `createdDate`, `changedBy`, `changedDate`) VALUES
(4, '12121300001', 'sejarah singkat', '0000-00-00', '', '', '', 0, '', 0, '', '', 0, '', 'ada', 'url', '', '', '', '', '', '', '', 'TESTSESSION', '2017-08-15 17:37:30', NULL, NULL),
(5, '00030200004', 'ini hanya sejarah singkat saja', '0000-00-00', '', '', '', 0, '', 0, '', '', 0, '', 'ada', 'url', '', '', '', '', '', '', '', 'TESTSESSION', '2017-08-15 17:40:38', 'TESTSESSION', NULL),
(6, '00030200005', '', '0000-00-00', '', '', '', 0, '', 0, '', '', 0, '', 'ada', 'url', '', '', '', '', '', '', '', 'TESTSESSION', '2017-08-15 17:44:34', 'TESTSESSION', NULL),
(7, '00030200006', 'aaaaa', '0000-00-00', '', '', '', 0, '', 0, '', '', 0, '', 'ada', 'url', '', '', '', '', '', '', '', 'TESTSESSION', '2017-08-15 17:49:52', 'TESTSESSION', NULL),
(8, '12121300002', 'uuuuiuiiu', '0000-00-00', '', '', '', 0, '', 0, '', '', 0, '', 'ada', 'url', '', '', '', '', '', '', '', 'TESTSESSION', '2017-08-15 17:59:26', NULL, NULL),
(9, '00030200007', 'dsaasd', '0000-00-00', '', '', '', 0, '', 0, '', '', 0, '', 'ada', 'url', '', '', '', '', '', '', '', 'TESTSESSION', '2017-08-15 18:00:16', NULL, NULL),
(10, '00030200008', '', '0000-00-00', '', '', '', 0, '', 0, '', '', 0, '', 'ada', 'url', '', '', '', '', '', '', '', 'TESTSESSION', '2017-08-15 18:01:30', NULL, NULL),
(11, '00030200009', 'sadasda', '0000-00-00', '', '', '', 0, '', 0, '', '', 0, '', 'ada', 'url', '', '', '', '', '', '', '', 'TESTSESSION', '2017-08-15 18:02:37', 'TESTSESSION', NULL),
(12, '00030200011', '', '0000-00-00', '', '', '', 0, '', 0, '', '', 0, '', 'ada', 'url', '', '', '', '', '', '', '', 'TESTSESSION', '2017-08-15 18:09:57', NULL, NULL),
(13, '00030200012', 'ini sejarah singkat', '0000-00-00', '', '', '', 0, '', 0, '', '', 0, '', 'ada', 'url', '', '', '', '', '', '', '', 'TESTSESSION', '2017-08-15 18:12:14', NULL, NULL),
(14, '00030200013', '', '0000-00-00', '', '', '', 0, '', 0, '', '', 0, '', 'ada', 'url', '', '', '', '', '', '', '', 'TESTSESSION', '2017-08-15 18:17:48', NULL, NULL),
(15, '00030200014', 'sad', '0000-00-00', '', '', '', 0, '', 0, '', '', 0, '', 'ada', 'url', '', '', '', '', '', '', '', 'TESTSESSION', '2017-08-15 18:33:52', NULL, NULL),
(16, '00030200015', 'cass', '0000-00-00', '', '', '', 0, '', 0, '', '', 0, '', 'ada', 'url', '', '', '', '', '', '', '', 'TESTSESSION', '2017-08-15 18:36:04', NULL, NULL),
(17, '00030200017', '', '0000-00-00', '', '', '', 0, '', 0, '', '', 0, '', 'ada', 'url', '', '', '', '', '', '', '', 'TESTSESSION', '2017-08-15 18:41:18', NULL, NULL),
(18, '00030200018', '', '0000-00-00', '', '', '', 0, '', 0, '', '', 0, '', 'ada', 'url', '', '', '', '', '', '', '', 'TESTSESSION', '2017-08-15 18:43:27', NULL, NULL),
(19, '00030200020', '', '2017-08-08', '', '', '', 0, '', 0, '', '', 0, '', 'ada', 'url', '', '', '', '', '', '', '', 'TESTSESSION', '2017-08-15 18:47:42', NULL, NULL),
(20, '00030200021', '', '2017-05-17', '', '', '', 0, '', 0, '', '', 0, '', 'ada', 'url', '', '', '', '', '', '', '', 'TESTSESSION', '2017-08-15 18:50:21', NULL, NULL),
(21, '00030200022', 'sfasasd', '2017-08-03', '', '', '', 0, '', 0, '', '', 0, '', 'ada', 'url', '', '', '', '', '', '', '', 'TESTSESSION', '2017-08-15 18:52:14', 'TESTSESSION', NULL),
(22, '00030200026', 'singkat', '2017-08-16', '', '', '', 0, '', 0, '', '', 0, '', 'ada', 'url', '', '', '', '', '', '', '', 'TESTSESSION', '2017-08-15 20:24:10', NULL, NULL),
(23, '00030200027', '', '0000-00-00', '', '', '', 0, '', 0, '', '', 0, '', 'ada', 'url', '', '', '', '', '', '', '', 'TESTSESSION', '2017-08-15 20:24:26', NULL, NULL),
(24, '00030200028', '', '0000-00-00', '', '', '', 0, '', 0, '', '', 0, '', 'ada', 'url', '', '', '', '', '', '', '', 'TESTSESSION', '2017-08-15 20:26:22', NULL, NULL),
(25, '00030200067', '', '0000-00-00', '', '', '', 0, '', 0, '', '', 0, '', 'ada', 'url', '', '', '', '', '', '', '', 'TESTSESSION', '2017-08-16 00:15:23', 'TESTSESSION', NULL),
(26, '00030200073', '', '0000-00-00', '', '', '', 0, '', 0, '', '', 0, '', 'ada', 'url', '', '', '', '', '', '', '', 'TESTSESSION', '2017-08-16 07:50:59', 'TESTSESSION', NULL),
(27, '', '', '0000-00-00', '', '', '', 0, '', 0, '', '', 0, '', 'ada', 'url', '', '', '', '', '', '', '', 'TESTSESSION', '2017-08-16 08:05:29', NULL, NULL),
(28, '', '', '0000-00-00', '', '', '', 0, '', 0, '', '', 0, '', 'ada', 'url', '', '', '', '', '', '', '', 'TESTSESSION', '2017-08-16 08:06:01', NULL, NULL),
(29, '00030200074', '', '0000-00-00', '', '', '', 0, '', 0, '', '', 0, '', 'ada', 'img/logo/00030200074_logo.jpg', '', '', '', '', '', '', '', 'TESTSESSION', '2017-08-16 08:08:48', NULL, NULL),
(30, '00030200074', '', '0000-00-00', '', '', '', 0, '', 0, '', '', 0, '', 'ada', 'img/logo/00030200074_logo.jpg', '', '', '', '', '', '', '', 'TESTSESSION', '2017-08-16 08:09:53', NULL, NULL),
(31, '00030200075', 'sejarah singkat', '0000-00-00', '', '', '', 0, '', 0, '', '', 0, '', 'ada', 'img/logo/00030200075_logo.jpg', '', '', '', '', '', '', '', 'TESTSESSION', '2017-08-16 08:11:45', 'TESTSESSION', NULL),
(32, '12121300004', 'masih sejarah singkat di update lagi', '2017-08-02', 'Keluarga', 'Keluarga', 'Sudah', 1, 'Hektar', 1, 'Meter Persegi', 'Baik', 4, 'Ada', 'ada', 'img/logo/12121300004_logo.jpg', 'qalbu', 'Sudah', 'Belum', 'Daratan tinggi', 'baik', 'jenis wilayah', 'ini catatan', 'TESTSESSION', '2017-08-16 08:32:07', 'TESTSESSION', NULL),
(33, '00030200076', '', '0000-00-00', '', '', '', 0, '', 0, '', '', 0, '', 'ada', 'url', '', '', '', '', '', '', 'catattan lain', 'TESTSESSION', '2017-08-16 09:12:53', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_002_kepengurusan`
--

CREATE TABLE IF NOT EXISTS `dplega_002_kepengurusan` (
`idData` int(11) NOT NULL,
  `noRegistrasi` char(11) NOT NULL,
  `penanggungJawab` varchar(100) DEFAULT NULL,
  `jabatan` varchar(20) DEFAULT NULL,
  `alamat` varchar(100) DEFAULT NULL,
  `noRt` varchar(3) DEFAULT NULL,
  `noRw` varchar(3) DEFAULT NULL,
  `kodeKelurahan` char(2) DEFAULT NULL,
  `kodeKecamatan` char(2) DEFAULT NULL,
  `kodeWilayah` char(2) DEFAULT NULL,
  `kodeProvinsi` char(2) DEFAULT NULL,
  `noTelp` varchar(16) DEFAULT NULL,
  `kewarganegaraan` char(3) DEFAULT NULL COMMENT 'WNI/WNA',
  `tempatLahir` varchar(100) DEFAULT NULL,
  `tanggalLahir` date DEFAULT NULL,
  `jenisKelamin` char(1) DEFAULT NULL COMMENT 'L/P',
  `agama` varchar(10) DEFAULT NULL COMMENT 'ISLAM/KRISTEN/HINDU/BUDHA/LAINNYA',
  `jabatanLain` varchar(20) DEFAULT NULL,
  `pendidikan` varchar(50) DEFAULT NULL,
  `kompetensi` varchar(150) DEFAULT NULL,
  `catatan` text,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_002_kepengurusan_temp`
--

CREATE TABLE IF NOT EXISTS `dplega_002_kepengurusan_temp` (
`idData` int(11) NOT NULL,
  `noRegistrasi` char(11) NOT NULL,
  `penanggungJawab` varchar(100) DEFAULT NULL,
  `jabatan` varchar(20) DEFAULT NULL,
  `alamat` varchar(100) DEFAULT NULL,
  `noRt` varchar(3) DEFAULT NULL,
  `noRw` varchar(3) DEFAULT NULL,
  `kodeKelurahan` char(2) DEFAULT NULL,
  `kodeKecamatan` char(2) DEFAULT NULL,
  `kodeWilayah` char(2) DEFAULT NULL,
  `kodeProvinsi` char(2) DEFAULT NULL,
  `noTelp` varchar(16) DEFAULT NULL,
  `kewarganegaraan` char(3) DEFAULT NULL COMMENT 'WNI/WNA',
  `tempatLahir` varchar(100) DEFAULT NULL,
  `tanggalLahir` date DEFAULT NULL,
  `jenisKelamin` char(1) DEFAULT NULL COMMENT 'L/P',
  `agama` varchar(10) DEFAULT NULL COMMENT 'ISLAM/KRISTEN/HINDU/BUDHA/LAINNYA',
  `jabatanLain` varchar(20) DEFAULT NULL,
  `pendidikan` varchar(50) DEFAULT NULL,
  `kompetensi` varchar(150) DEFAULT NULL,
  `catatan` text,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data untuk tabel `dplega_002_kepengurusan_temp`
--

INSERT INTO `dplega_002_kepengurusan_temp` (`idData`, `noRegistrasi`, `penanggungJawab`, `jabatan`, `alamat`, `noRt`, `noRw`, `kodeKelurahan`, `kodeKecamatan`, `kodeWilayah`, `kodeProvinsi`, `noTelp`, `kewarganegaraan`, `tempatLahir`, `tanggalLahir`, `jenisKelamin`, `agama`, `jabatanLain`, `pendidikan`, `kompetensi`, `catatan`, `createdBy`, `createdDate`, `changedBy`, `changedDate`) VALUES
(1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'TESTSESSION', '2017-08-16 17:32:33', NULL, NULL),
(2, '00030200095', 'saha nya saha sok', '', '', '', '', '', '', '', '', '', '', '', '0000-00-00', '', '', '', '', '', '', 'TESTSESSION', '2017-08-16 21:37:36', 'TESTSESSION', NULL),
(3, '00030200097', 'penanggung jawab', '', 'alamat', 'rt', 'rw', '03', '02', '03', '00', '0859999999999', '', 'bandung', '2017-08-21', '', '', 'jabatan lain', '', 'kompetensi', 'catatan', 'TESTSESSION', '2017-08-21 21:17:46', NULL, NULL),
(4, '01', '', '', '', '', '', '', '', '', '', '', 'WNI', '', '0000-00-00', '', '', '', '', '', '', 'TESTSESSION', '2017-08-21 21:43:13', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_003_usaha`
--

CREATE TABLE IF NOT EXISTS `dplega_003_usaha` (
`idData` int(11) NOT NULL,
  `noRegistrasi` char(11) NOT NULL,
  `namaUsaha` varchar(100) DEFAULT NULL,
  `jenisUsaha` int(100) DEFAULT NULL,
  `detailUsaha` text,
  `jumlahPekerja` int(11) DEFAULT NULL,
  `catatan` text,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_003_usaha_temp`
--

CREATE TABLE IF NOT EXISTS `dplega_003_usaha_temp` (
`idData` int(11) NOT NULL,
  `noRegistrasi` char(11) NOT NULL,
  `namaUsaha` varchar(100) DEFAULT NULL,
  `jenisUsaha` int(100) DEFAULT NULL,
  `detailUsaha` text,
  `jumlahPekerja` int(11) DEFAULT NULL,
  `catatan` text,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_005_koleksi`
--

CREATE TABLE IF NOT EXISTS `dplega_005_koleksi` (
`idData` int(11) NOT NULL,
  `noRegistrasi` char(11) NOT NULL,
  `jenisKoleksi` varchar(15) NOT NULL COMMENT 'BUKU/KITAB',
  `judulKoleksi` varchar(100) DEFAULT NULL,
  `deskripsi` text,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_005_koleksi_temp`
--

CREATE TABLE IF NOT EXISTS `dplega_005_koleksi_temp` (
`idData` int(11) NOT NULL,
  `noRegistrasi` char(11) NOT NULL,
  `jenisKoleksi` varchar(15) NOT NULL COMMENT 'BUKU/KITAB',
  `judulKoleksi` varchar(100) DEFAULT NULL,
  `deskripsi` text,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data untuk tabel `dplega_005_koleksi_temp`
--

INSERT INTO `dplega_005_koleksi_temp` (`idData`, `noRegistrasi`, `jenisKoleksi`, `judulKoleksi`, `deskripsi`, `createdBy`, `createdDate`, `changedBy`, `changedDate`) VALUES
(1, '', '', NULL, NULL, 'TESTSESSION', '2017-08-22 14:23:30', NULL, NULL),
(2, '', '', NULL, NULL, 'TESTSESSION', '2017-08-22 14:25:10', NULL, NULL),
(3, '', '', NULL, NULL, 'TESTSESSION', '2017-08-22 14:26:37', NULL, NULL),
(4, '00030200101', 'Buku', 'judul', '', 'TESTSESSION', '2017-08-22 14:34:23', NULL, NULL),
(5, '', '', NULL, NULL, 'TESTSESSION', '2017-08-22 14:36:57', NULL, NULL),
(6, '00030200103', 'Kitab', 'judul', 'keterangan', 'TESTSESSION', '2017-08-22 14:38:42', NULL, NULL),
(7, '00030200104', '', '', '', 'TESTSESSION', '2017-08-22 14:48:59', NULL, NULL),
(8, '00030200105', '', '', '', 'TESTSESSION', '2017-08-22 14:51:56', NULL, NULL),
(9, '00030200106', '', '', '', 'TESTSESSION', '2017-08-22 16:35:56', NULL, NULL),
(10, '00030200106', '', '', '', 'TESTSESSION', '2017-08-22 16:36:09', NULL, NULL),
(11, '00030200107', '', '', '', 'TESTSESSION', '2017-08-22 17:41:06', NULL, NULL),
(12, '00030200107', '', '', '', 'TESTSESSION', '2017-08-22 17:41:10', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_006_prestasi`
--

CREATE TABLE IF NOT EXISTS `dplega_006_prestasi` (
`idData` int(11) NOT NULL,
  `noRegistrasi` char(11) NOT NULL,
  `deskripsi` text NOT NULL,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_006_prestasi_temp`
--

CREATE TABLE IF NOT EXISTS `dplega_006_prestasi_temp` (
`idData` int(11) NOT NULL,
  `noRegistrasi` char(11) NOT NULL,
  `deskripsi` text NOT NULL,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_007_visualisasiusaha`
--

CREATE TABLE IF NOT EXISTS `dplega_007_visualisasiusaha` (
`idData` int(11) NOT NULL,
  `noRegistrasi` char(11) NOT NULL,
  `urlGambar` varchar(40) NOT NULL,
  `deskripsi` text NOT NULL,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_007_visualisasiusaha_temp`
--

CREATE TABLE IF NOT EXISTS `dplega_007_visualisasiusaha_temp` (
`idData` int(11) NOT NULL,
  `noRegistrasi` char(11) NOT NULL,
  `urlGambar` varchar(40) NOT NULL,
  `deskripsi` text NOT NULL,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_008_visualisasisarana`
--

CREATE TABLE IF NOT EXISTS `dplega_008_visualisasisarana` (
`idData` int(11) NOT NULL,
  `noRegistrasi` char(11) NOT NULL,
  `urlGambar` varchar(40) NOT NULL,
  `deskripsi` text NOT NULL,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_008_visualisasisarana_temp`
--

CREATE TABLE IF NOT EXISTS `dplega_008_visualisasisarana_temp` (
`idData` int(11) NOT NULL,
  `noRegistrasi` char(11) NOT NULL,
  `urlGambar` varchar(40) NOT NULL,
  `deskripsi` text NOT NULL,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Dumping data untuk tabel `dplega_008_visualisasisarana_temp`
--

INSERT INTO `dplega_008_visualisasisarana_temp` (`idData`, `noRegistrasi`, `urlGambar`, `deskripsi`, `createdBy`, `createdDate`, `changedBy`, `changedDate`) VALUES
(1, '00030200083', '', '', 'TESTSESSION', '2017-08-16 10:56:50', NULL, NULL),
(2, '00030200083', '', '', 'TESTSESSION', '2017-08-16 10:58:05', NULL, NULL),
(3, '00030200086', '', '', 'TESTSESSION', '2017-08-16 11:00:54', NULL, NULL),
(4, '00030200086', '', 'keterangan1', 'TESTSESSION', '2017-08-16 11:01:06', NULL, NULL),
(5, '00030200086', '', 'keterangan2', 'TESTSESSION', '2017-08-16 11:01:15', NULL, NULL),
(6, '00030200088', '', 'keterangan1', 'TESTSESSION', '2017-08-16 11:14:34', NULL, NULL),
(7, '00030200089', '', '', 'TESTSESSION', '2017-08-16 11:15:05', NULL, NULL),
(8, '00030200090', 'img/saranaPrasarana/00030200090_saranaPr', 'masih keterangan 1', 'TESTSESSION', '2017-08-16 11:17:27', NULL, NULL),
(9, '00030200090', '', 'dan ketearngan 2', 'TESTSESSION', '2017-08-16 11:18:13', NULL, NULL),
(10, '00030200091', 'img/saranaPrasarana/00030200091_saranaPr', '', 'TESTSESSION', '2017-08-16 11:19:33', NULL, NULL),
(11, '00030200091', 'img/saranaPrasarana/00030200091_saranaPr', '', 'TESTSESSION', '2017-08-16 11:19:38', NULL, NULL),
(12, '00030200092', '', '', 'TESTSESSION', '2017-08-16 11:20:16', NULL, NULL),
(13, '00030200092', 'img/saranaPrasarana/00030200092_saranaPr', '', 'TESTSESSION', '2017-08-16 11:20:22', NULL, NULL),
(14, '00030200092', 'img/saranaPrasarana/00030200092_saranaPr', '', 'TESTSESSION', '2017-08-16 11:20:24', NULL, NULL),
(15, '00030200092', 'img/saranaPrasarana/00030200092_saranaPr', '', 'TESTSESSION', '2017-08-16 11:20:55', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_009_legalitas`
--

CREATE TABLE IF NOT EXISTS `dplega_009_legalitas` (
`idData` int(11) NOT NULL,
  `noRegistrasi` char(11) NOT NULL,
  `kodePersyaratan` char(5) NOT NULL,
  `noLegalitas` varchar(20) NOT NULL,
  `tanggalLegalitas` date NOT NULL,
  `urlFile` varchar(40) NOT NULL,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_009_legalitas_temp`
--

CREATE TABLE IF NOT EXISTS `dplega_009_legalitas_temp` (
`idData` int(11) NOT NULL,
  `noRegistrasi` char(11) NOT NULL,
  `kodePersyaratan` char(5) NOT NULL,
  `noLegalitas` varchar(20) NOT NULL,
  `tanggalLegalitas` date NOT NULL,
  `urlFile` varchar(40) NOT NULL,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_010_riwayatbantuan`
--

CREATE TABLE IF NOT EXISTS `dplega_010_riwayatbantuan` (
`idData` int(11) NOT NULL,
  `noRegistrasi` char(11) NOT NULL,
  `tahun` char(4) NOT NULL,
  `dibantuOleh` varchar(100) NOT NULL,
  `Deskripsi` text NOT NULL,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_010_riwayatbantuan_temp`
--

CREATE TABLE IF NOT EXISTS `dplega_010_riwayatbantuan_temp` (
`idData` int(11) NOT NULL,
  `noRegistrasi` char(11) NOT NULL,
  `tahun` char(4) NOT NULL,
  `dibantuOleh` varchar(100) NOT NULL,
  `Deskripsi` text NOT NULL,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_011_hirarkilembaga`
--

CREATE TABLE IF NOT EXISTS `dplega_011_hirarkilembaga` (
`idData` int(11) NOT NULL,
  `noRegistrasi` char(11) NOT NULL,
  `hirarki` char(1) NOT NULL COMMENT '0: parent; 1: child',
  `noRegistrasiTarget` char(11) NOT NULL,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_011_hirarkilembaga_temp`
--

CREATE TABLE IF NOT EXISTS `dplega_011_hirarkilembaga_temp` (
`idData` int(11) NOT NULL,
  `noRegistrasi` char(11) NOT NULL,
  `hirarki` char(1) NOT NULL COMMENT '0: parent; 1: child',
  `noRegistrasiTarget` char(11) NOT NULL,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_100_provinsi`
--

CREATE TABLE IF NOT EXISTS `dplega_100_provinsi` (
  `kodeProvinsi` char(2) NOT NULL,
  `namaProvinsi` varchar(100) NOT NULL,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `dplega_100_provinsi`
--

INSERT INTO `dplega_100_provinsi` (`kodeProvinsi`, `namaProvinsi`, `createdBy`, `createdDate`, `changedBy`, `changedDate`) VALUES
('00', 'Jawa Barat', 'TESTSESSION', '2017-06-11 01:56:20', NULL, NULL),
('02', 'Jawa Tengah', 'TESTSESSION', '2017-06-11 03:18:35', NULL, NULL),
('04', 'Jawa Timur', 'TESTSESSION', '2017-06-11 03:26:35', NULL, NULL),
('11', 'test', 'TESTSESSION', '2017-06-11 07:33:09', NULL, NULL),
('12', 'test 1', 'TESTSESSION', '2017-06-11 08:02:47', NULL, NULL),
('33', 'asdasd', 'TESTSESSION', '2017-08-08 14:27:06', NULL, NULL),
('66', 'zczxc', 'TESTSESSION', '2017-08-08 14:27:25', NULL, NULL),
('88', 'zxczxczxcxcxc', 'TESTSESSION', '2017-08-11 15:09:42', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_101_wilayah`
--

CREATE TABLE IF NOT EXISTS `dplega_101_wilayah` (
  `kodeWilayah` char(2) NOT NULL,
  `kodeProvinsi` char(2) NOT NULL,
  `namaWilayah` varchar(100) NOT NULL,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `dplega_101_wilayah`
--

INSERT INTO `dplega_101_wilayah` (`kodeWilayah`, `kodeProvinsi`, `namaWilayah`, `createdBy`, `createdDate`, `changedBy`, `changedDate`) VALUES
('02', '02', 'test 2', 'TESTSESSION', '0000-00-00 00:00:00', NULL, NULL),
('03', '00', 'Kota Bandung', 'TESTSESSION', '0000-00-00 00:00:00', NULL, NULL),
('12', '12', 'test 1', 'TESTSESSION', '0000-00-00 00:00:00', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_102_kecamatan`
--

CREATE TABLE IF NOT EXISTS `dplega_102_kecamatan` (
  `kodeKecamatan` char(2) NOT NULL,
  `kodeWilayah` char(2) NOT NULL,
  `namaKecamatan` varchar(100) NOT NULL,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `dplega_102_kecamatan`
--

INSERT INTO `dplega_102_kecamatan` (`kodeKecamatan`, `kodeWilayah`, `namaKecamatan`, `createdBy`, `createdDate`, `changedBy`, `changedDate`) VALUES
('02', '03', 'Batununggal', 'TESTSESSION', '2017-08-14 01:02:18', NULL, NULL),
('12', '02', 'test wilayahsss', 'TESTSESSION', '2017-06-11 04:01:13', NULL, NULL),
('13', '12', 'test 1', 'TESTSESSION', '2017-06-11 08:03:24', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_103_kelurahan`
--

CREATE TABLE IF NOT EXISTS `dplega_103_kelurahan` (
  `kodeKelurahan` char(2) NOT NULL,
  `kodeKecamatan` char(2) NOT NULL,
  `namaKelurahan` varchar(100) NOT NULL,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `dplega_103_kelurahan`
--

INSERT INTO `dplega_103_kelurahan` (`kodeKelurahan`, `kodeKecamatan`, `namaKelurahan`, `createdBy`, `createdDate`, `changedBy`, `changedDate`) VALUES
('03', '02', 'Cibangkong', 'TESTSESSION', '2017-08-14 01:02:36', NULL, NULL),
('12', '13', 'test 1', 'TESTSESSION', '2017-06-11 08:03:33', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_200_bentuklembaga`
--

CREATE TABLE IF NOT EXISTS `dplega_200_bentuklembaga` (
`kodeBentukLembaga` int(11) NOT NULL,
  `namaBentukLembaga` varchar(100) NOT NULL,
  `deskripsi` text NOT NULL,
  `urlGambar` varchar(40) DEFAULT NULL,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data untuk tabel `dplega_200_bentuklembaga`
--

INSERT INTO `dplega_200_bentuklembaga` (`kodeBentukLembaga`, `namaBentukLembaga`, `deskripsi`, `urlGambar`, `createdBy`, `createdDate`, `changedBy`, `changedDate`) VALUES
(2, 'test wilayah', 'asdasdsad', NULL, 'TESTSESSION', '2017-06-12 00:18:14', NULL, NULL),
(3, 'test', 'afgdfgdfg', NULL, 'TESTSESSION', '2017-06-12 00:18:43', NULL, NULL),
(5, 'test session ssss', 'gaagagag', NULL, 'TESTSESSION', '2017-06-12 00:20:58', NULL, NULL),
(7, 'dfgfdg', '', NULL, 'TESTSESSION', '2017-06-12 00:26:38', NULL, NULL),
(8, 'wawawaw', 'sjdfhsjhdkfjsdf\r\nsdfsdf\r\nsdfsdf', NULL, 'TESTSESSION', '2017-06-12 00:37:44', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_201_persyaratan`
--

CREATE TABLE IF NOT EXISTS `dplega_201_persyaratan` (
`kodePersyaratan` int(11) NOT NULL,
  `kodeBentukLembaga` int(11) NOT NULL,
  `namaPersyaratan` varchar(100) NOT NULL,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changerdDate` datetime DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data untuk tabel `dplega_201_persyaratan`
--

INSERT INTO `dplega_201_persyaratan` (`kodePersyaratan`, `kodeBentukLembaga`, `namaPersyaratan`, `createdBy`, `createdDate`, `changedBy`, `changerdDate`) VALUES
(3, 3, 'asdasdasdasd', 'TESTSESSION', '2017-06-12 00:30:15', NULL, NULL),
(4, 2, 'ini legalitas', 'TESTSESSION', '2017-08-16 12:04:20', NULL, NULL),
(5, 2, 'ini juga legalitas', 'TESTSESSION', '2017-08-16 12:04:39', NULL, NULL),
(6, 8, 'c', 'TESTSESSION', '2017-08-20 10:48:09', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_210_bidanggerak`
--

CREATE TABLE IF NOT EXISTS `dplega_210_bidanggerak` (
`kodeBidangGerak` int(11) NOT NULL,
  `namaBidangGerak` varchar(100) NOT NULL,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data untuk tabel `dplega_210_bidanggerak`
--

INSERT INTO `dplega_210_bidanggerak` (`kodeBidangGerak`, `namaBidangGerak`, `createdBy`, `createdDate`, `changedBy`, `changedDate`) VALUES
(4, 'Perdagangan', 'TESTSESSION', '2017-06-12 00:37:17', NULL, NULL),
(5, 'werwer', 'TESTSESSION', '2017-08-07 11:24:16', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_220_grupverifikasi`
--

CREATE TABLE IF NOT EXISTS `dplega_220_grupverifikasi` (
`kodeGrupVerifikasi` int(11) NOT NULL,
  `namaGrupVerifikasi` varchar(100) NOT NULL,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data untuk tabel `dplega_220_grupverifikasi`
--

INSERT INTO `dplega_220_grupverifikasi` (`kodeGrupVerifikasi`, `namaGrupVerifikasi`, `createdBy`, `createdDate`, `changedBy`, `changedDate`) VALUES
(1, 'test 5', 'TESTSESSION', '2017-06-11 06:04:42', NULL, NULL),
(3, 'test 6', 'TESTSESSION', '2017-06-11 06:20:19', NULL, NULL),
(5, 'test 2', 'TESTSESSION', '2017-06-11 06:24:44', NULL, NULL),
(6, 'test 1', 'TESTSESSION', '2017-06-11 06:25:17', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_221_verifikasi`
--

CREATE TABLE IF NOT EXISTS `dplega_221_verifikasi` (
`kodeVerifikasi` int(11) NOT NULL,
  `namaVerifikasi` varchar(100) NOT NULL,
  `kodeGrupVerifikasi` int(11) NOT NULL,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data untuk tabel `dplega_221_verifikasi`
--

INSERT INTO `dplega_221_verifikasi` (`kodeVerifikasi`, `namaVerifikasi`, `kodeGrupVerifikasi`, `createdBy`, `createdDate`, `changedBy`, `changedDate`) VALUES
(1, 'test 1', 6, 'TESTSESSION', '2017-06-11 07:36:11', NULL, NULL),
(2, 'test 2', 5, 'TESTSESSION', '2017-06-11 07:40:45', NULL, NULL),
(3, 'test 3', 3, 'TESTSESSION', '2017-06-11 07:41:48', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_230_berita`
--

CREATE TABLE IF NOT EXISTS `dplega_230_berita` (
`idData` int(11) NOT NULL,
  `judulBerita` varchar(100) NOT NULL,
  `deskripsi` text NOT NULL,
  `urlGambar` varchar(40) DEFAULT NULL,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_900_logactivities`
--

CREATE TABLE IF NOT EXISTS `dplega_900_logactivities` (
`idData` int(11) NOT NULL,
  `activity` text NOT NULL,
  `status` varchar(7) NOT NULL COMMENT 'SUCCESS/FAILED/PENDING',
  `message` text NOT NULL,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_900_logactivities_temp`
--

CREATE TABLE IF NOT EXISTS `dplega_900_logactivities_temp` (
`idData` int(11) NOT NULL,
  `activity` text NOT NULL,
  `status` varchar(7) NOT NULL COMMENT 'SUCCESS/FAILED/PENDING',
  `message` text NOT NULL,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_901_notifications`
--

CREATE TABLE IF NOT EXISTS `dplega_901_notifications` (
`idData` int(11) NOT NULL,
  `deskripsi` text NOT NULL,
  `waktu` datetime NOT NULL,
  `targetUser` varchar(20) NOT NULL,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_910_user`
--

CREATE TABLE IF NOT EXISTS `dplega_910_user` (
`idData` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `jabatan` varchar(100) DEFAULT NULL,
  `alamat` varchar(100) DEFAULT NULL,
  `noRt` varchar(3) DEFAULT NULL,
  `noRw` varchar(3) DEFAULT NULL,
  `kodeKelurahan` char(2) DEFAULT NULL,
  `kodeKecamatan` char(2) DEFAULT NULL,
  `kodeWilayah` char(2) DEFAULT NULL,
  `kodeProvinsi` char(2) DEFAULT NULL,
  `noTelp` varchar(16) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `urlGambar` varchar(40) DEFAULT NULL,
  `userLevel` int(11) NOT NULL,
  `statusActive` int(11) NOT NULL,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_911_useraccess`
--

CREATE TABLE IF NOT EXISTS `dplega_911_useraccess` (
  `idData` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `idApps` int(11) NOT NULL,
  `statusAktif` int(11) NOT NULL DEFAULT '1',
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_912_apps`
--

CREATE TABLE IF NOT EXISTS `dplega_912_apps` (
`idData` int(11) NOT NULL,
  `idApps` varchar(4) NOT NULL,
  `appsName` varchar(100) NOT NULL,
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dplega_000_lembaga`
--
ALTER TABLE `dplega_000_lembaga`
 ADD PRIMARY KEY (`noRegistrasi`);

--
-- Indexes for table `dplega_000_lembaga_temp`
--
ALTER TABLE `dplega_000_lembaga_temp`
 ADD PRIMARY KEY (`noRegistrasi`);

--
-- Indexes for table `dplega_001_sejarah`
--
ALTER TABLE `dplega_001_sejarah`
 ADD PRIMARY KEY (`idData`);

--
-- Indexes for table `dplega_001_sejarah_temp`
--
ALTER TABLE `dplega_001_sejarah_temp`
 ADD PRIMARY KEY (`idData`);

--
-- Indexes for table `dplega_002_kepengurusan`
--
ALTER TABLE `dplega_002_kepengurusan`
 ADD PRIMARY KEY (`idData`);

--
-- Indexes for table `dplega_002_kepengurusan_temp`
--
ALTER TABLE `dplega_002_kepengurusan_temp`
 ADD PRIMARY KEY (`idData`);

--
-- Indexes for table `dplega_003_usaha`
--
ALTER TABLE `dplega_003_usaha`
 ADD PRIMARY KEY (`idData`);

--
-- Indexes for table `dplega_003_usaha_temp`
--
ALTER TABLE `dplega_003_usaha_temp`
 ADD PRIMARY KEY (`idData`);

--
-- Indexes for table `dplega_005_koleksi`
--
ALTER TABLE `dplega_005_koleksi`
 ADD PRIMARY KEY (`idData`);

--
-- Indexes for table `dplega_005_koleksi_temp`
--
ALTER TABLE `dplega_005_koleksi_temp`
 ADD PRIMARY KEY (`idData`);

--
-- Indexes for table `dplega_006_prestasi`
--
ALTER TABLE `dplega_006_prestasi`
 ADD PRIMARY KEY (`idData`);

--
-- Indexes for table `dplega_006_prestasi_temp`
--
ALTER TABLE `dplega_006_prestasi_temp`
 ADD PRIMARY KEY (`idData`);

--
-- Indexes for table `dplega_007_visualisasiusaha`
--
ALTER TABLE `dplega_007_visualisasiusaha`
 ADD PRIMARY KEY (`idData`);

--
-- Indexes for table `dplega_007_visualisasiusaha_temp`
--
ALTER TABLE `dplega_007_visualisasiusaha_temp`
 ADD PRIMARY KEY (`idData`);

--
-- Indexes for table `dplega_008_visualisasisarana`
--
ALTER TABLE `dplega_008_visualisasisarana`
 ADD PRIMARY KEY (`idData`);

--
-- Indexes for table `dplega_008_visualisasisarana_temp`
--
ALTER TABLE `dplega_008_visualisasisarana_temp`
 ADD PRIMARY KEY (`idData`);

--
-- Indexes for table `dplega_009_legalitas`
--
ALTER TABLE `dplega_009_legalitas`
 ADD PRIMARY KEY (`idData`);

--
-- Indexes for table `dplega_009_legalitas_temp`
--
ALTER TABLE `dplega_009_legalitas_temp`
 ADD PRIMARY KEY (`idData`);

--
-- Indexes for table `dplega_010_riwayatbantuan`
--
ALTER TABLE `dplega_010_riwayatbantuan`
 ADD PRIMARY KEY (`idData`);

--
-- Indexes for table `dplega_010_riwayatbantuan_temp`
--
ALTER TABLE `dplega_010_riwayatbantuan_temp`
 ADD PRIMARY KEY (`idData`);

--
-- Indexes for table `dplega_011_hirarkilembaga`
--
ALTER TABLE `dplega_011_hirarkilembaga`
 ADD PRIMARY KEY (`idData`);

--
-- Indexes for table `dplega_011_hirarkilembaga_temp`
--
ALTER TABLE `dplega_011_hirarkilembaga_temp`
 ADD PRIMARY KEY (`idData`);

--
-- Indexes for table `dplega_100_provinsi`
--
ALTER TABLE `dplega_100_provinsi`
 ADD PRIMARY KEY (`kodeProvinsi`);

--
-- Indexes for table `dplega_101_wilayah`
--
ALTER TABLE `dplega_101_wilayah`
 ADD PRIMARY KEY (`kodeWilayah`), ADD KEY `kodeProvinsi` (`kodeProvinsi`);

--
-- Indexes for table `dplega_102_kecamatan`
--
ALTER TABLE `dplega_102_kecamatan`
 ADD PRIMARY KEY (`kodeKecamatan`), ADD KEY `kodeWilayah` (`kodeWilayah`);

--
-- Indexes for table `dplega_103_kelurahan`
--
ALTER TABLE `dplega_103_kelurahan`
 ADD PRIMARY KEY (`kodeKelurahan`), ADD KEY `kodeKecamatan` (`kodeKecamatan`);

--
-- Indexes for table `dplega_200_bentuklembaga`
--
ALTER TABLE `dplega_200_bentuklembaga`
 ADD PRIMARY KEY (`kodeBentukLembaga`);

--
-- Indexes for table `dplega_201_persyaratan`
--
ALTER TABLE `dplega_201_persyaratan`
 ADD PRIMARY KEY (`kodePersyaratan`);

--
-- Indexes for table `dplega_210_bidanggerak`
--
ALTER TABLE `dplega_210_bidanggerak`
 ADD PRIMARY KEY (`kodeBidangGerak`);

--
-- Indexes for table `dplega_220_grupverifikasi`
--
ALTER TABLE `dplega_220_grupverifikasi`
 ADD PRIMARY KEY (`kodeGrupVerifikasi`);

--
-- Indexes for table `dplega_221_verifikasi`
--
ALTER TABLE `dplega_221_verifikasi`
 ADD PRIMARY KEY (`kodeVerifikasi`), ADD KEY `kodeGrupVerifikasi` (`kodeGrupVerifikasi`);

--
-- Indexes for table `dplega_230_berita`
--
ALTER TABLE `dplega_230_berita`
 ADD PRIMARY KEY (`idData`);

--
-- Indexes for table `dplega_900_logactivities`
--
ALTER TABLE `dplega_900_logactivities`
 ADD PRIMARY KEY (`idData`);

--
-- Indexes for table `dplega_900_logactivities_temp`
--
ALTER TABLE `dplega_900_logactivities_temp`
 ADD PRIMARY KEY (`idData`);

--
-- Indexes for table `dplega_901_notifications`
--
ALTER TABLE `dplega_901_notifications`
 ADD PRIMARY KEY (`idData`);

--
-- Indexes for table `dplega_910_user`
--
ALTER TABLE `dplega_910_user`
 ADD PRIMARY KEY (`idData`), ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `dplega_911_useraccess`
--
ALTER TABLE `dplega_911_useraccess`
 ADD PRIMARY KEY (`idData`);

--
-- Indexes for table `dplega_912_apps`
--
ALTER TABLE `dplega_912_apps`
 ADD PRIMARY KEY (`idData`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dplega_001_sejarah`
--
ALTER TABLE `dplega_001_sejarah`
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `dplega_001_sejarah_temp`
--
ALTER TABLE `dplega_001_sejarah_temp`
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT for table `dplega_002_kepengurusan`
--
ALTER TABLE `dplega_002_kepengurusan`
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `dplega_002_kepengurusan_temp`
--
ALTER TABLE `dplega_002_kepengurusan_temp`
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `dplega_003_usaha`
--
ALTER TABLE `dplega_003_usaha`
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `dplega_003_usaha_temp`
--
ALTER TABLE `dplega_003_usaha_temp`
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `dplega_005_koleksi`
--
ALTER TABLE `dplega_005_koleksi`
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `dplega_005_koleksi_temp`
--
ALTER TABLE `dplega_005_koleksi_temp`
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `dplega_006_prestasi`
--
ALTER TABLE `dplega_006_prestasi`
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `dplega_006_prestasi_temp`
--
ALTER TABLE `dplega_006_prestasi_temp`
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `dplega_007_visualisasiusaha`
--
ALTER TABLE `dplega_007_visualisasiusaha`
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `dplega_007_visualisasiusaha_temp`
--
ALTER TABLE `dplega_007_visualisasiusaha_temp`
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `dplega_008_visualisasisarana`
--
ALTER TABLE `dplega_008_visualisasisarana`
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `dplega_008_visualisasisarana_temp`
--
ALTER TABLE `dplega_008_visualisasisarana_temp`
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `dplega_009_legalitas`
--
ALTER TABLE `dplega_009_legalitas`
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `dplega_009_legalitas_temp`
--
ALTER TABLE `dplega_009_legalitas_temp`
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `dplega_010_riwayatbantuan`
--
ALTER TABLE `dplega_010_riwayatbantuan`
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `dplega_010_riwayatbantuan_temp`
--
ALTER TABLE `dplega_010_riwayatbantuan_temp`
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `dplega_011_hirarkilembaga`
--
ALTER TABLE `dplega_011_hirarkilembaga`
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `dplega_011_hirarkilembaga_temp`
--
ALTER TABLE `dplega_011_hirarkilembaga_temp`
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `dplega_200_bentuklembaga`
--
ALTER TABLE `dplega_200_bentuklembaga`
MODIFY `kodeBentukLembaga` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `dplega_201_persyaratan`
--
ALTER TABLE `dplega_201_persyaratan`
MODIFY `kodePersyaratan` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `dplega_210_bidanggerak`
--
ALTER TABLE `dplega_210_bidanggerak`
MODIFY `kodeBidangGerak` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `dplega_220_grupverifikasi`
--
ALTER TABLE `dplega_220_grupverifikasi`
MODIFY `kodeGrupVerifikasi` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `dplega_221_verifikasi`
--
ALTER TABLE `dplega_221_verifikasi`
MODIFY `kodeVerifikasi` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `dplega_230_berita`
--
ALTER TABLE `dplega_230_berita`
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `dplega_900_logactivities`
--
ALTER TABLE `dplega_900_logactivities`
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `dplega_900_logactivities_temp`
--
ALTER TABLE `dplega_900_logactivities_temp`
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `dplega_901_notifications`
--
ALTER TABLE `dplega_901_notifications`
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `dplega_910_user`
--
ALTER TABLE `dplega_910_user`
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `dplega_912_apps`
--
ALTER TABLE `dplega_912_apps`
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT;
--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `dplega_101_wilayah`
--
ALTER TABLE `dplega_101_wilayah`
ADD CONSTRAINT `dplega_101_wilayah_ibfk_1` FOREIGN KEY (`kodeProvinsi`) REFERENCES `dplega_100_provinsi` (`kodeProvinsi`);

--
-- Ketidakleluasaan untuk tabel `dplega_102_kecamatan`
--
ALTER TABLE `dplega_102_kecamatan`
ADD CONSTRAINT `dplega_102_kecamatan_ibfk_1` FOREIGN KEY (`kodeWilayah`) REFERENCES `dplega_101_wilayah` (`kodeWilayah`);

--
-- Ketidakleluasaan untuk tabel `dplega_103_kelurahan`
--
ALTER TABLE `dplega_103_kelurahan`
ADD CONSTRAINT `dplega_103_kelurahan_ibfk_1` FOREIGN KEY (`kodeKecamatan`) REFERENCES `dplega_102_kecamatan` (`kodeKecamatan`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
