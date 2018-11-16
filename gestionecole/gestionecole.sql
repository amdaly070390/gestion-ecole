-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Client :  127.0.0.1
-- Généré le :  Mer 14 Novembre 2018 à 16:18
-- Version du serveur :  5.7.14
-- Version de PHP :  7.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `gestionecole`
--

-- --------------------------------------------------------

--
-- Structure de la table `classe`
--

CREATE TABLE `classe` (
  `Id` int(11) NOT NULL,
  `NomCla` varchar(30) NOT NULL,
  `DescriptionCla` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `classe`
--

INSERT INTO `classe` (`Id`, `NomCla`, `DescriptionCla`) VALUES
(1, 'Terminale S1', 'C\'est la classe de la terminale scientifique'),
(2, 'Terminale S2', 'C\'est la classe de la terminale Scientifique 2'),
(3, 'Terminale L2', 'C&#39;est une classe litteraire'),
(4, 'Terminale Gestion', 'C&#39;est une classe de gestion'),
(5, 'Terminale L&#39;', 'Classe ...'),
(6, 'Classe TesT', 'Testt'),
(7, 'Test', 'ceci est un test');

-- --------------------------------------------------------

--
-- Structure de la table `eleve`
--

CREATE TABLE `eleve` (
  `Id` int(11) NOT NULL,
  `NomEl` varchar(30) NOT NULL,
  `PrenomEl` varchar(30) NOT NULL,
  `DateNaisEl` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `eleve`
--

INSERT INTO `eleve` (`Id`, `NomEl`, `PrenomEl`, `DateNaisEl`) VALUES
(1, 'Moussa', 'Diop', '2018-11-15'),
(2, 'Abdou', 'Mbow', '2018-11-14');

-- --------------------------------------------------------

--
-- Structure de la table `inscription`
--

CREATE TABLE `inscription` (
  `Id` int(11) NOT NULL,
  `DateInscription` datetime NOT NULL,
  `Eleve` int(11) NOT NULL,
  `Classe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `inscription`
--

INSERT INTO `inscription` (`Id`, `DateInscription`, `Eleve`, `Classe`) VALUES
(1, '2018-11-15 00:00:00', 1, 2),
(2, '2018-11-22 00:00:00', 2, 4);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `classe`
--
ALTER TABLE `classe`
  ADD PRIMARY KEY (`Id`);

--
-- Index pour la table `eleve`
--
ALTER TABLE `eleve`
  ADD PRIMARY KEY (`Id`);

--
-- Index pour la table `inscription`
--
ALTER TABLE `inscription`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Eleve` (`Eleve`),
  ADD KEY `Classe` (`Classe`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `classe`
--
ALTER TABLE `classe`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT pour la table `eleve`
--
ALTER TABLE `eleve`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `inscription`
--
ALTER TABLE `inscription`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `inscription`
--
ALTER TABLE `inscription`
  ADD CONSTRAINT `inscription_ibfk_1` FOREIGN KEY (`Eleve`) REFERENCES `eleve` (`Id`),
  ADD CONSTRAINT `inscription_ibfk_2` FOREIGN KEY (`Classe`) REFERENCES `classe` (`Id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
