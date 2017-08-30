-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 28 Agu 2017 pada 09.19
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
  `langitude` varchar(255) DEFAULT NULL,
  `latitude` varchar(255) NOT NULL,
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
  `langitude` varchar(255) DEFAULT NULL,
  `latitude` varchar(255) NOT NULL,
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

INSERT INTO `dplega_000_lembaga_temp` (`noRegistrasi`, `nama`, `alamat`, `noRt`, `noRw`, `kodeKelurahan`, `kodeKecamatan`, `kodeWilayah`, `kodeProvinsi`, `langitude`, `latitude`, `noTelp`, `email`, `mediaSosial`, `kodeBentukLembaga`, `kodeBidangGerak`, `jumlahPengurus`, `noNpwp`, `visiLembaga`, `misiLembaga`, `organisasiAfiliasi`, `catatanLain`, `statusAktif`, `urlGambarLogo`, `createdBy`, `createdDate`, `changedBy`, `changedDate`) VALUES
('00030200001', 'Megantara Narapadya', 'Jl. Sesame', '12', '12', '03', '02', '03', '00', '12.507724100000019', '41.8911684', '09876543212', 'megan@email.com', '', 9, 0, 0, '', '', '', '', '', '1', NULL, 'TESTSESSION', '2017-08-27 22:53:42', 'TESTSESSION', '2017-08-27 22:57:02');

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
  `jenisUsaha` varchar(100) DEFAULT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

--
-- Dumping data untuk tabel `dplega_008_visualisasisarana_temp`
--

INSERT INTO `dplega_008_visualisasisarana_temp` (`idData`, `noRegistrasi`, `urlGambar`, `deskripsi`, `createdBy`, `createdDate`, `changedBy`, `changedDate`) VALUES
(23, '00030200001', '00030200001_23_sapra.jpg', 'tes', 'TESTSESSION', '2017-08-27 23:24:23', NULL, NULL);

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
  `deskripsi` text NOT NULL,
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
  `deskripsi` text NOT NULL,
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
('04', 'Jawa Timur', 'TESTSESSION', '2017-06-11 03:26:35', NULL, NULL);

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
('03', '00', 'Kota Bandung', 'TESTSESSION', '0000-00-00 00:00:00', NULL, NULL),
('04', '00', 'Soreang', 'TESTSESSION', '0000-00-00 00:00:00', NULL, NULL),
('05', '00', 'Cimahi', 'TESTSESSION', '0000-00-00 00:00:00', NULL, NULL);

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
('03', '03', 'Kecamatan A', 'TESTSESSION', '2017-08-25 03:54:42', NULL, NULL),
('04', '03', 'Kecamatan B', 'TESTSESSION', '2017-08-25 03:55:06', NULL, NULL);

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
('04', '03', 'Kelurahan A', 'TESTSESSION', '2017-08-25 03:55:22', NULL, NULL),
('05', '04', 'Kecamatan B', 'TESTSESSION', '2017-08-25 03:55:52', NULL, NULL);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=17 ;

--
-- Dumping data untuk tabel `dplega_200_bentuklembaga`
--

INSERT INTO `dplega_200_bentuklembaga` (`kodeBentukLembaga`, `namaBentukLembaga`, `deskripsi`, `urlGambar`, `createdBy`, `createdDate`, `changedBy`, `changedDate`) VALUES
(9, 'Yayasan', 'Suatu badan hukum yang mempunyai maksud dan tujuan bersifat sosial, keagamaan dan kemanusiaan, didirikan dengan memperhatikan persyaratan formal yang ditentukan dalam undang-undang.', 'icon-1.png', 'TESTSESSION', '2017-08-24 12:21:33', NULL, NULL),
(10, 'Perkumpulan', 'Suatu badan hukum yang merupakan kumpulan orang, didirikan untuk mewujudkan kesamaan maksud dan tujuan tertentu dibidang sosial, kegamaan, dan kemanusiaan dan tidak membagikan keuntungan kepada anggotanya.', 'icon-2.png', 'TESTSESSION', '2017-08-24 12:22:10', NULL, NULL),
(11, 'Pondok Pesantren', 'Sebuah pendidikan tradisional yang para siswanya tinggal bersama dan belajar dibawah bimbingan guru yang lebih dikenal dengan sebutan kiai dan mempunyai asrama untuk tempat menginap santri.', 'icon-3.png', 'TESTSESSION', '2017-08-24 12:22:28', NULL, NULL),
(12, 'Madrasah Ibtidaiyah', 'Jenjang paling dasar pada pendidikan formal di Indonesia, setara dengan Sekolah Dasar, yang pengelolaannya dilakukan oleh Kementrian Agama.', 'icon-4.png', 'TESTSESSION', '2017-08-24 12:22:45', NULL, NULL),
(13, 'Madrasah Tsanawiyah', 'Jenjang dasar pada pendidikan formal di Indonesia , setara dengan Sekolah Menengah Pertama, yang pengelolaannya dilakukan oleh Departemen Agama.', 'icon-5.png', 'TESTSESSION', '2017-08-24 12:23:04', NULL, NULL),
(14, 'Madrasah Aliyah', 'Jenjang pendidikan menengah pada pendidikan formal di Indonesia, setara dengan Sekolah Menengah Atas, yang pengelolaannya dilakukan oleh Kementrian Agama.', 'icon-6.png', 'TESTSESSION', '2017-08-24 12:23:21', NULL, NULL),
(15, 'Perguruan Tinggi', 'Satuan pendidikan penyelengara pendidikan tinggi. Peserta didik perguruan tinggi disebut Mahasiswa, sedangkan pendidik perguruan tinggi disebut Dosen.', 'icon-7.png', 'TESTSESSION', '2017-08-24 12:24:58', NULL, NULL),
(16, 'RA', 'Jenjang pendidikan anak usia dini (yakni usia 6 tahun atau dibawahnya) dalam bentuk pendidikan formal, dibawah Kementrian Agama.', 'icon-1.png', 'TESTSESSION', '2017-08-24 12:25:15', NULL, NULL);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data untuk tabel `dplega_201_persyaratan`
--

INSERT INTO `dplega_201_persyaratan` (`kodePersyaratan`, `kodeBentukLembaga`, `namaPersyaratan`, `createdBy`, `createdDate`, `changedBy`, `changerdDate`) VALUES
(3, 3, 'asdasdasdasd', 'TESTSESSION', '2017-06-12 00:30:15', NULL, NULL),
(4, 2, 'ini legalitas', 'TESTSESSION', '2017-08-16 12:04:20', NULL, NULL),
(5, 2, 'ini juga legalitas', 'TESTSESSION', '2017-08-16 12:04:39', NULL, NULL),
(6, 8, 'c', 'TESTSESSION', '2017-08-20 10:48:09', NULL, NULL),
(7, 10, 'Akta Notaris', 'TESTSESSION', '2017-08-24 22:03:51', NULL, NULL),
(8, 10, 'SK Kemenhumkan', 'TESTSESSION', '2017-08-24 22:05:24', NULL, NULL),
(9, 9, 'Akta Notaris', 'TESTSESSION', '2017-08-24 22:26:16', NULL, NULL),
(10, 9, 'SK Kemenhumkam', 'TESTSESSION', '2017-08-24 22:26:30', NULL, NULL);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data untuk tabel `dplega_220_grupverifikasi`
--

INSERT INTO `dplega_220_grupverifikasi` (`kodeGrupVerifikasi`, `namaGrupVerifikasi`, `createdBy`, `createdDate`, `changedBy`, `changedDate`) VALUES
(7, 'Fisik', 'TESTSESSION', '2017-08-25 03:58:43', NULL, NULL),
(8, 'KOBONG', 'TESTSESSION', '2017-08-25 03:58:54', NULL, NULL);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data untuk tabel `dplega_221_verifikasi`
--

INSERT INTO `dplega_221_verifikasi` (`kodeVerifikasi`, `namaVerifikasi`, `kodeGrupVerifikasi`, `createdBy`, `createdDate`, `changedBy`, `changedDate`) VALUES
(4, 'Copy bukti kepemilikan atau Penguasaan atas tanah', 7, 'TESTSESSION', '2017-08-25 03:59:49', NULL, NULL),
(5, 'Copy ijin operasional dari kemenag kab/kota', 8, 'TESTSESSION', '2017-08-25 04:00:37', NULL, NULL);

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
  `noRegistrasi` char(11) NOT NULL,
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=43 ;

--
-- Dumping data untuk tabel `dplega_910_user`
--

INSERT INTO `dplega_910_user` (`idData`, `noRegistrasi`, `nama`, `jabatan`, `alamat`, `noRt`, `noRw`, `kodeKelurahan`, `kodeKecamatan`, `kodeWilayah`, `kodeProvinsi`, `noTelp`, `email`, `username`, `password`, `urlGambar`, `userLevel`, `statusActive`, `createdBy`, `createdDate`, `changedBy`, `changedDate`) VALUES
(1, '', 'Administrator', '-', '-', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'avatar-default.jpg', 7, 1, 'SESSION TEST', '2017-08-25 03:09:45', NULL, NULL),
(2, '', 'Cecep Rohendi', '-', '-', NULL, NULL, NULL, NULL, NULL, NULL, '-', '-', 'cecep', 'aff738ac6681f847310d38af54327734', 'avatar-default.jpg', 3, 1, 'SESSION TEST', '2017-08-25 03:11:17', NULL, NULL),
(3, '', 'PAH', '-', '-', NULL, NULL, NULL, NULL, NULL, NULL, '-', '-', 'pah', 'ab7136ba08704e4eb4a19169e1a26695', NULL, 2, 1, 'SESSION TEST', '2017-08-25 03:12:09', NULL, NULL),
(4, '00030200110', 'Syncard Tech.', '-', '-', NULL, NULL, NULL, NULL, NULL, NULL, '-', '-', 'syncard', 'cd57a97415ba9b7b75d22fe10d0e0a9d', 'avatar-default.jpg', 1, 1, 'SESSION TEST', '2017-08-25 03:13:39', NULL, NULL),
(42, '', 'Cecep', '', '', '', '', '', '', '', '', '', 'cecep@gmail.com', 'cecepr', '202cb962ac59075b964b07152d234b70', 'cecepr_avatar.jpg', 2, 0, 'TESTSESSION', '2017-08-28 12:37:53', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `dplega_911_useraccess`
--

CREATE TABLE IF NOT EXISTS `dplega_911_useraccess` (
`idData` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `idApps` int(11) NOT NULL,
  `module` varchar(100) NOT NULL,
  `lihat` char(1) NOT NULL DEFAULT '0' COMMENT '0: non aktif; 1: aktif',
  `tambah` char(1) NOT NULL DEFAULT '0' COMMENT '0: non aktif; 1: aktif',
  `ubah` char(1) NOT NULL DEFAULT '0' COMMENT '0: non aktif; 1: aktif',
  `hapus` char(1) NOT NULL DEFAULT '0' COMMENT '0: non aktif; 1: aktif',
  `statusAktif` int(11) NOT NULL DEFAULT '1',
  `createdBy` varchar(20) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changedBy` varchar(20) DEFAULT NULL,
  `changedDate` datetime DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=44 ;

--
-- Dumping data untuk tabel `dplega_911_useraccess`
--

INSERT INTO `dplega_911_useraccess` (`idData`, `username`, `idApps`, `module`, `lihat`, `tambah`, `ubah`, `hapus`, `statusAktif`, `createdBy`, `createdDate`, `changedBy`, `changedDate`) VALUES
(1, 'syncard', 1, '', '0', '0', '0', '0', 1, 'SESSION TEST', '2017-08-25 03:15:54', NULL, NULL),
(7, 'admin', 1, '', '0', '0', '0', '0', 1, 'SESSION TEST', '2017-08-25 03:18:48', NULL, NULL),
(38, 'cecepr', 1, 'kelembagaan', '1', '0', '0', '0', 1, 'TESTSESSION', '2017-08-28 12:37:53', NULL, NULL),
(39, 'cecepr', 1, 'lingkupArea', '1', '0', '0', '0', 1, 'TESTSESSION', '2017-08-28 12:37:53', NULL, NULL),
(40, 'cecepr', 1, 'pengaturanKelembagaan', '1', '0', '0', '0', 1, 'TESTSESSION', '2017-08-28 12:37:53', NULL, NULL),
(41, 'cecepr', 1, 'pengaturanVerifikasi', '1', '0', '0', '0', 1, 'TESTSESSION', '2017-08-28 12:37:53', NULL, NULL),
(42, 'cecepr', 1, 'berita', '1', '0', '0', '0', 1, 'TESTSESSION', '2017-08-28 12:37:53', NULL, NULL),
(43, 'cecepr', 1, 'konfigurasi', '1', '0', '0', '0', 1, 'TESTSESSION', '2017-08-28 12:37:53', NULL, NULL);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data untuk tabel `dplega_912_apps`
--

INSERT INTO `dplega_912_apps` (`idData`, `idApps`, `appsName`, `createdBy`, `createdDate`, `changedBy`, `changedDate`) VALUES
(1, 'DPLG', 'Akses ke dplega 2.0', 'SESSION TEST', '2017-08-25 03:06:12', NULL, NULL);

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
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `dplega_002_kepengurusan`
--
ALTER TABLE `dplega_002_kepengurusan`
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `dplega_002_kepengurusan_temp`
--
ALTER TABLE `dplega_002_kepengurusan_temp`
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT;
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
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT;
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
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=24;
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
MODIFY `kodeBentukLembaga` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `dplega_201_persyaratan`
--
ALTER TABLE `dplega_201_persyaratan`
MODIFY `kodePersyaratan` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `dplega_210_bidanggerak`
--
ALTER TABLE `dplega_210_bidanggerak`
MODIFY `kodeBidangGerak` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `dplega_220_grupverifikasi`
--
ALTER TABLE `dplega_220_grupverifikasi`
MODIFY `kodeGrupVerifikasi` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `dplega_221_verifikasi`
--
ALTER TABLE `dplega_221_verifikasi`
MODIFY `kodeVerifikasi` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
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
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=43;
--
-- AUTO_INCREMENT for table `dplega_911_useraccess`
--
ALTER TABLE `dplega_911_useraccess`
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=44;
--
-- AUTO_INCREMENT for table `dplega_912_apps`
--
ALTER TABLE `dplega_912_apps`
MODIFY `idData` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
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
