# Objectif du script
L'objectif du script est de vérifier dans les jeux de données extraits via les requêtes Ensemble de pièces ou Requête de mise à jour des locaux d'Abyla : 

* l'absence de pièce ayant pour typologie "REN-A renseigner" ou "000-A renseigner" ,
* l'absence de pièce sans usage ou ayant comme usage "01-à renseigner",
* l'absence de pièce d'usage "005-enseignement" sans capacité de salle renseignée (vide ou <= 1)
* l'absence d'erreur de couple typologie/usage

Et le cas échéant de fournir un fichier csv des pièces ne passant pas le test.

A quelle(s) occasion(s) utiliser ce script

* en préparation d'une visite sur site ou d'un bâtiment pour connaitre les points d'attention lors de la visite,
* lors des campagne de fiabilisation pour tester les fichiers remontés par les sites avant d'insérer les données dans le SIP Abyla,
