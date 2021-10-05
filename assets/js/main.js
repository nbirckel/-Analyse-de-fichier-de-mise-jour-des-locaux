function parse_array ()
{
  var newArray=[];
  var errors ="";
  var file = document.getElementById("file").files[0];
  if (!file) {
	resultats ='<p class="file-error-center"><i class="em-svg em-warning" aria-role="presentation" aria-label="WARNING SIGN"></i> Choisissez un fichier ! <i class="em-svg em-warning" aria-role="presentation" aria-label="WARNING SIGN"></i></p>';
	 document.getElementById("result").innerHTML=resultats;
    return;
} else if(file["type"] === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
	resultats ='<p class="file-error-center"><i class="em-svg em-warning" aria-role="presentation" aria-label="WARNING SIGN"></i> Format XLS non supporté, convertissez votre fichier en texte Unicode ou CSV utf-8. <i class="em-svg em-warning" aria-role="presentation" aria-label="WARNING SIGN"></i></p>';
	 document.getElementById("result").innerHTML=resultats;
	 return;
} else {
	parseMe(file, doStuff);
  }
}
function parseMe(url, callBack){
	console.log('Running analyzis..');
    Papa.parse(url, {
		header: true,
		encoding: "UTF-8",
		skipEmptyLines:true,
		worker:true,
        complete: function(results) {
        callBack(results);
        }
    });
}
function doStuff(data){
    newArray=data['data'];
	//console.log( newArray);
	var rensArr =[];
	var list_type_undef='';
	var list_usage_undef='';
	var list_capa_undef='';
	var list_couple_error ='';
	for (let i=0; i < newArray.length; i++){
		if (newArray[i]['TYPE_PIECE'] === "REN-A renseigner" || newArray[i]['TYPE_PIECE'] === "000-A renseigner"){
			newArray[i]['ERREUR'] = "type non défini";
			rensArr.push(newArray[i]);
		} else if (!newArray[i]['USAGE_PIECE'] || newArray[i]['USAGE_PIECE']==="01-à renseigner"){
			newArray[i]['ERREUR'] = "Usage non défini";
			rensArr.push(newArray[i]);
		}else if((newArray[i]['TYPE_PIECE'] === "120-Salle de TP, Laboratoires, Atelier" || newArray[i]['TYPE_PIECE'] === "116-Salle banalisée" || newArray[i]['TYPE_PIECE'] === "117-Amphithéâtre" ) && ((newArray[i]['CAPACITE_REELLE'] <= 1 || !newArray[i]['CAPACITE_REELLE'] )) &&newArray[i]['USAGE_PIECE'] === "005-enseignement" ){
			newArray[i]['ERREUR'] = "Capacité réelle éronnée";
			rensArr.push(newArray[i]);
		};
		switch(newArray[i]['USAGE_PIECE']){
			case "002-administration":
				if(!(newArray[i]['TYPE_PIECE'] === "001-Bureau fermé, Open space" || newArray[i]['TYPE_PIECE'] === "002-Salle photocopieuse, Reprographie légère" || newArray[i]['TYPE_PIECE'] === "003-Placard, Rangement" || newArray[i]['TYPE_PIECE'] === "004-Salle d'attente à usage exclusif de l'occupant" || newArray[i]['TYPE_PIECE'] === "021-Salle de réunion, Salle de séminaire"  || newArray[i]['TYPE_PIECE'] === "022-Salle d'équipe, salle de projet " || newArray[i]['TYPE_PIECE'] === "023-Salle de formation à destination du pers" || newArray[i]['TYPE_PIECE'] === "024-Salle de pause, de repos, de détente" || newArray[i]['TYPE_PIECE'] === "027-Salle de pause, de repos, de détente, lounge" || newArray[i]['TYPE_PIECE'] === "028-Salle de réception (yc salle d'honneur)" || newArray[i]['TYPE_PIECE'] === "041-Dégagement, circulation interne"  || newArray[i]['TYPE_PIECE'] === '042-Vacant' || newArray[i]['TYPE_PIECE'] === "043-Salle d'archives" || newArray[i]['TYPE_PIECE'] === "044-Salle serveur" || newArray[i]['TYPE_PIECE'] === "113-Salle aveugle" || newArray[i]['TYPE_PIECE'] === "114-Accueil, Attente, Orientation, Atrium" || newArray[i]['TYPE_PIECE'] === "118-Espaces verts intérieurs" || newArray[i]['TYPE_PIECE'] === "120-Salle de TP, Laboratoires, Atelier"  || newArray[i]['TYPE_PIECE'] === "151-Local gardiennage, Poste de garde"  )){
				newArray[i]['ERREUR'] = "couple typologie/usage erroné";
				rensArr.push(newArray[i]);
				};
				break;
			case "004-documentation":
				if(!(newArray[i]['TYPE_PIECE'] === "001-Bureau fermé, Open space" || newArray[i]['TYPE_PIECE'] === "002-Salle photocopieuse, Reprographie légère" || newArray[i]['TYPE_PIECE'] === "003-Placard, Rangement" || newArray[i]['TYPE_PIECE'] === "004-Salle d'attente à usage exclusif de l'occupant" || newArray[i]['TYPE_PIECE'] === "021-Salle de réunion, Salle de séminaire"  || newArray[i]['TYPE_PIECE'] === "022-Salle d'équipe, salle de projet " || newArray[i]['TYPE_PIECE'] === "023-Salle de formation à destination du pers" || newArray[i]['TYPE_PIECE'] === "024-Salle de pause, de repos, de détente" || newArray[i]['TYPE_PIECE'] === "027-Salle de pause, de repos, de détente, lounge" || newArray[i]['TYPE_PIECE'] === "028-Salle de réception (yc salle d'honneur)" || newArray[i]['TYPE_PIECE'] === "041-Dégagement, circulation interne"  || newArray[i]['TYPE_PIECE'] === '042-Vacant' || newArray[i]['TYPE_PIECE'] === "043-Salle d'archives" || newArray[i]['TYPE_PIECE'] === "044-Salle serveur" || newArray[i]['TYPE_PIECE'] === "113-Salle aveugle" || newArray[i]['TYPE_PIECE'] === "114-Accueil, Attente, Orientation, Atrium" || newArray[i]['TYPE_PIECE'] === "118-Espaces verts intérieurs" || newArray[i]['TYPE_PIECE'] === "152-Local spécifique pour services généraux" || newArray[i]['TYPE_PIECE'] === "134-Salle multimédia" || newArray[i]['TYPE_PIECE'] === "132-Salle d'exposition, Showroom" || newArray[i]['TYPE_PIECE'] === "131-Magasin de bibliothèque" || newArray[i]['TYPE_PIECE'] === "130-Bibliothèque" )){
				newArray[i]['ERREUR'] = "couple typologie/usage erroné";
				rensArr.push(newArray[i]);
				};
				break;
			case "011-recherche":
				if(!(newArray[i]['TYPE_PIECE'] === "001-Bureau fermé, Open space" || newArray[i]['TYPE_PIECE'] === "002-Salle photocopieuse, Reprographie légère" || newArray[i]['TYPE_PIECE'] === "003-Placard, Rangement" || newArray[i]['TYPE_PIECE'] === "004-Salle d'attente à usage exclusif de l'occupant" || newArray[i]['TYPE_PIECE'] === "021-Salle de réunion, Salle de séminaire"  || newArray[i]['TYPE_PIECE'] === "022-Salle d'équipe, salle de projet " || newArray[i]['TYPE_PIECE'] === "023-Salle de formation à destination du pers" || newArray[i]['TYPE_PIECE'] === "024-Salle de pause, de repos, de détente" || newArray[i]['TYPE_PIECE'] === "027-Salle de pause, de repos, de détente, lounge" || newArray[i]['TYPE_PIECE'] === "028-Salle de réception (yc salle d'honneur)" || newArray[i]['TYPE_PIECE'] === "041-Dégagement, circulation interne"  || newArray[i]['TYPE_PIECE'] === '042-Vacant' || newArray[i]['TYPE_PIECE'] === "043-Salle d'archives" || newArray[i]['TYPE_PIECE'] === "044-Salle serveur"
				|| newArray[i]['TYPE_PIECE'] === "211-Local technique situé en étage"
				|| newArray[i]['TYPE_PIECE'] === "311-Local technique comble et sous-sol"
				|| newArray[i]['TYPE_PIECE'] === "120-Salle de TP, Laboratoires, Atelier"
				|| newArray[i]['TYPE_PIECE'] === "125-Locaux produits et déchets spécifiques (Nucléaire, Biologique, Chimique)"
				|| newArray[i]['TYPE_PIECE'] === "130-Bibliothèque"
				|| newArray[i]['TYPE_PIECE'] === "131-Magasin de bibliothèque"
				|| newArray[i]['TYPE_PIECE'] === "124-Animalerie"
				|| newArray[i]['TYPE_PIECE'] === "132-Salle d'exposition, Showroom"
				|| newArray[i]['TYPE_PIECE'] === "133-Halle de technologie"

				)){
				newArray[i]['ERREUR'] = "couple typologie/usage erroné";
				rensArr.push(newArray[i]);
				};
				break;
			case "003-circulation":
				if(!(newArray[i]['TYPE_PIECE'] === "041-Dégagement, Circulation interne" ||  newArray[i]['TYPE_PIECE'] === "111-Circulation primaire, esc, asc (démar.)" ||  newArray[i]['TYPE_PIECE'] === "192-Palier d'étage" ||  newArray[i]['TYPE_PIECE'] === "324-Coursive" ||  newArray[i]['TYPE_PIECE'] === "114-Accueil, Attente, Orientation, Atrium" ||  newArray[i]['TYPE_PIECE'] === "413-Rampes d'accès" )){
				newArray[i]['ERREUR'] = "couple typologie/usage erroné";
				rensArr.push(newArray[i]);
				};
				break;
			case "007-inexploitable":
				if(!(newArray[i]['TYPE_PIECE'] === "301-Combles et Sous Sol < Hauteur de 1,80m" ||  newArray[i]['TYPE_PIECE'] === "302-Comble non aménageable" ||  newArray[i]['TYPE_PIECE'] === "304-Cave et sous sol sans ouverture sur ext." ||  newArray[i]['TYPE_PIECE'] === "310-Hauteur < 1,80m (sous les escaliers,¿)" ||  newArray[i]['TYPE_PIECE'] === "321-Surface non close en RDC" ||  newArray[i]['TYPE_PIECE'] === "322-Balcon"
				||  newArray[i]['TYPE_PIECE'] === "401-Vide tremis Escalier" 
				||  newArray[i]['TYPE_PIECE'] === "402-Vide Ascenseur" 
				||  newArray[i]['TYPE_PIECE'] === "403-Vide Monte Charge" 
				||  newArray[i]['TYPE_PIECE'] === "500-Vide" 
				||  newArray[i]['TYPE_PIECE'] === "324-Coursive" 
				)){
				newArray[i]['ERREUR'] = "couple typologie/usage erroné";
				rensArr.push(newArray[i]);
				};
				break;
			case "005-enseignement":
				if(!(newArray[i]['TYPE_PIECE'] === "001-Bureau fermé, Open space" || newArray[i]['TYPE_PIECE'] === "002-Salle photocopieuse, Reprographie légère" || newArray[i]['TYPE_PIECE'] === "003-Placard, Rangement" || newArray[i]['TYPE_PIECE'] === "004-Salle d'attente à usage exclusif de l'occupant" || newArray[i]['TYPE_PIECE'] === "021-Salle de réunion, Salle de séminaire"  || newArray[i]['TYPE_PIECE'] === "022-Salle d'équipe, salle de projet " || newArray[i]['TYPE_PIECE'] === "023-Salle de formation à destination du pers" || newArray[i]['TYPE_PIECE'] === "024-Salle de pause, de repos, de détente" || newArray[i]['TYPE_PIECE'] === "027-Salle de pause, de repos, de détente, lounge" || newArray[i]['TYPE_PIECE'] === "028-Salle de réception (yc salle d'honneur)" || newArray[i]['TYPE_PIECE'] === "041-Dégagement, circulation interne"  || newArray[i]['TYPE_PIECE'] === '042-Vacant' || newArray[i]['TYPE_PIECE'] === "043-Salle d'archives" || newArray[i]['TYPE_PIECE'] === "044-Salle serveur"
				|| newArray[i]['TYPE_PIECE'] === "103-Local sportif"
				|| newArray[i]['TYPE_PIECE'] === "104-Vestiaire, Douche"
				|| newArray[i]['TYPE_PIECE'] === "105-Activités culturelles, sociales, studio"
				|| newArray[i]['TYPE_PIECE'] === "113-Salle aveugle"
				|| newArray[i]['TYPE_PIECE'] === "116-Salle banalisée"
				|| newArray[i]['TYPE_PIECE'] === "117-Amphithéâtre"
				|| newArray[i]['TYPE_PIECE'] === "120-Salle de TP, Laboratoires, Atelier"
				|| newArray[i]['TYPE_PIECE'] === "130-Bibliothèque"
				|| newArray[i]['TYPE_PIECE'] === "131-Magasin de bibliothèque"
				|| newArray[i]['TYPE_PIECE'] === "133-Halle de technologie"
				|| newArray[i]['TYPE_PIECE'] === "134-Salle multimédia"
				|| newArray[i]['TYPE_PIECE'] === "044-Salle serveur"
				)){
				newArray[i]['ERREUR'] = "couple typologie/usage erroné";
				rensArr.push(newArray[i]);
				};
				break;
			case "018-vie sociale":
				if(!(newArray[i]['TYPE_PIECE'] === "001-Bureau fermé, Open space" || newArray[i]['TYPE_PIECE'] === "002-Salle photocopieuse, Reprographie légère" || newArray[i]['TYPE_PIECE'] === "003-Placard, Rangement" || newArray[i]['TYPE_PIECE'] === "004-Salle d'attente à usage exclusif de l'occupant" || newArray[i]['TYPE_PIECE'] === "021-Salle de réunion, Salle de séminaire"  || newArray[i]['TYPE_PIECE'] === "022-Salle d'équipe, salle de projet " || newArray[i]['TYPE_PIECE'] === "023-Salle de formation à destination du pers" || newArray[i]['TYPE_PIECE'] === "024-Salle de pause, de repos, de détente" || newArray[i]['TYPE_PIECE'] === "027-Salle de pause, de repos, de détente, lounge" || newArray[i]['TYPE_PIECE'] === "028-Salle de réception (yc salle d'honneur)" || newArray[i]['TYPE_PIECE'] === "041-Dégagement, circulation interne"  || newArray[i]['TYPE_PIECE'] === '042-Vacant' || newArray[i]['TYPE_PIECE'] === "043-Salle d'archives" || newArray[i]['TYPE_PIECE'] === "044-Salle serveur"
				|| newArray[i]['TYPE_PIECE'] === "103-Local sportif"
				|| newArray[i]['TYPE_PIECE'] === "104-Vestiaire, Douche"
				|| newArray[i]['TYPE_PIECE'] === "105-Activités culturelles, sociales, studio"
				|| newArray[i]['TYPE_PIECE'] === "101-Local syndical"
				|| newArray[i]['TYPE_PIECE'] === "102-Assistance sociale, Infirmerie"
				)){
				newArray[i]['ERREUR'] = "couple typologie/usage erroné";
				rensArr.push(newArray[i]);
				};
				break;
			case "012-restauration":
				if(!(newArray[i]['TYPE_PIECE'] === "161-Restaurant, Réfectoire" ||  newArray[i]['TYPE_PIECE'] === "162-Cafétéria, Cuisine, Kitchenette"  )){
				newArray[i]['ERREUR'] = "couple typologie/usage erroné";
				rensArr.push(newArray[i]);
				};
				break;
			case "013-sanitaire":
				if(!(newArray[i]['TYPE_PIECE'] === "104-Vestiaire, Douche" ||  newArray[i]['TYPE_PIECE'] === "112-Sanitaire"  )){
				newArray[i]['ERREUR'] = "couple typologie/usage erroné";
				rensArr.push(newArray[i]);
				};
				break;
			case "017-toiture terrasse":
				if(!(newArray[i]['TYPE_PIECE'] === "341-Toiture terrasse accessible ou non")){
				newArray[i]['ERREUR'] = "couple typologie/usage erroné";
				rensArr.push(newArray[i]);
				};
				break;
			case "010-parking":
				if(!(newArray[i]['TYPE_PIECE'] === "331-Aire de Stationnement" ||  newArray[i]['TYPE_PIECE'] === "332-Aire de manoeuvre" || newArray[i]['TYPE_PIECE'] === "334-Rampe d'accès au parking"  )){
				newArray[i]['ERREUR'] = "couple typologie/usage erroné";
				rensArr.push(newArray[i]);
				};
				break;
			case "014-sans fonction":
				if(!(newArray[i]['TYPE_PIECE'] === "042-Vacant" ||  newArray[i]['TYPE_PIECE'] === "194-Local non aménagé"  )){
				newArray[i]['ERREUR'] = "couple typologie/usage erroné";
				rensArr.push(newArray[i]);
				};
				break;
			case "006-hébergement":
				if(!(newArray[i]['TYPE_PIECE'] === "172-Logement pour Utilité de Service ou NAS" ||  newArray[i]['TYPE_PIECE'] === "176-Autres hébergements UL"  )){
				newArray[i]['ERREUR'] = "couple typologie/usage erroné";
				rensArr.push(newArray[i]);
				};
				break;
			case "016-technique":
				if(!(newArray[i]['TYPE_PIECE'] === "313-Local tech. comble ss-sol fonct. bat" ||  newArray[i]['TYPE_PIECE'] === "212-Local technique en étage fonct. batiment"  )){
				newArray[i]['ERREUR'] = "couple typologie/usage erroné";
				rensArr.push(newArray[i]);
				};
				break;
			case "008-logistique":
				if(!(newArray[i]['TYPE_PIECE'] === "152-Local spécifique pour services généraux" ||  newArray[i]['TYPE_PIECE'] === "153-Imprimerie, Reprographie centrale"
					||  newArray[i]['TYPE_PIECE'] === "154-Zone de réception, Local courrier, chauf"
					||  newArray[i]['TYPE_PIECE'] === "155-Atelier de maintenance"
					)){
				newArray[i]['ERREUR'] = "couple typologie/usage erroné";
				rensArr.push(newArray[i]);
				};
				break;
			case "015-sport":
				if(!(newArray[i]['TYPE_PIECE'] === "001-Bureau fermé, Open space" || newArray[i]['TYPE_PIECE'] === "002-Salle photocopieuse, Reprographie légère" || newArray[i]['TYPE_PIECE'] === "003-Placard, Rangement" || newArray[i]['TYPE_PIECE'] === "004-Salle d'attente à usage exclusif de l'occupant" || newArray[i]['TYPE_PIECE'] === "021-Salle de réunion, Salle de séminaire"  || newArray[i]['TYPE_PIECE'] === "022-Salle d'équipe, salle de projet " || newArray[i]['TYPE_PIECE'] === "023-Salle de formation à destination du pers" || newArray[i]['TYPE_PIECE'] === "024-Salle de pause, de repos, de détente" || newArray[i]['TYPE_PIECE'] === "027-Salle de pause, de repos, de détente, lounge" || newArray[i]['TYPE_PIECE'] === "028-Salle de réception (yc salle d'honneur)" || newArray[i]['TYPE_PIECE'] === "041-Dégagement, circulation interne"  || newArray[i]['TYPE_PIECE'] === '042-Vacant' || newArray[i]['TYPE_PIECE'] === "043-Salle d'archives" || newArray[i]['TYPE_PIECE'] === "044-Salle serveur"
				|| newArray[i]['TYPE_PIECE'] === "103-Local sportif"
				|| newArray[i]['TYPE_PIECE'] === "104-Vestiaire, Douche"  )){
				newArray[i]['ERREUR'] = "couple typologie/usage erroné";
				rensArr.push(newArray[i]);
				};
				break;
			default:;
			break;
		}

	};
	err = rensArr;
	if (rensArr.length >0){
	for (let i=0; i < rensArr.length; i++){
		if(rensArr[i]["ERREUR"]=== "type non défini"){
		list_type_undef +='<li><i class="em-svg em-office" aria-role="presentation" aria-label="OFFICE BUILDING"></i> : <strong> '+rensArr[i]["Bâtiment"]+'</strong> étage : '+rensArr[i]["NOM_ETAGE"]+' nom de la pièce: '+rensArr[i]["NOM_PIECE"]+' numéro interne:'+rensArr[i]["NUMERO_INTERNE_PIECE"]+'</li>';
	} else if(rensArr[i]['ERREUR'] === "Usage non défini"){
		list_usage_undef +='<li><i class="em-svg em-office" aria-role="presentation" aria-label="OFFICE BUILDING"></i> : <strong> '+rensArr[i]["Bâtiment"]+'</strong> étage : '+rensArr[i]["NOM_ETAGE"]+' nom de la pièce: '+rensArr[i]["NOM_PIECE"]+' numéro interne:'+rensArr[i]["NUMERO_INTERNE_PIECE"]+'</li>';
	}else if(rensArr[i]['ERREUR'] === "Capacité réelle éronnée"){
		list_capa_undef +='<li><i class="em-svg em-office" aria-role="presentation" aria-label="OFFICE BUILDING"></i> : <strong> '+rensArr[i]["Bâtiment"]+'</strong> étage : '+rensArr[i]["NOM_ETAGE"]+' type de pièce : '+rensArr[i]['TYPE_PIECE']+' nom de la pièce: '+rensArr[i]["NOM_PIECE"]+' numéro interne:'+rensArr[i]["NUMERO_INTERNE_PIECE"]+'</li>';
	}else if(rensArr[i]['ERREUR'] === "couple typologie/usage erroné"){
		list_couple_error +='<li><i class="em-svg em-office" aria-role="presentation" aria-label="OFFICE BUILDING"></i> : <strong> '+rensArr[i]["Bâtiment"]+'</strong> étage : '+rensArr[i]["NOM_ETAGE"]+' type de pièce : '+rensArr[i]['TYPE_PIECE']+' nom de la pièce: '+rensArr[i]["NOM_PIECE"]+' numéro interne:'+rensArr[i]["NUMERO_INTERNE_PIECE"]+'Usage : '+rensArr[i]['USAGE_PIECE']+'</li>';
	}
	resultats ='<h1><i class="em-svg em-scream" aria-role="presentation" aria-label="FACE SCREAMING IN FEAR"></i> </h1><h2>Résultats d\'analyse de '+file.files[0].name+'</h2>';
	resultats +='<p>Nombre de lignes : <strong> '+newArray.length+'</strong></p>Nombre d\'erreurs : <strong> '+rensArr.length+'</strong></p></p>taux d\'erreur : <strong> '+(rensArr.length/newArray.length)*100+'%</strong></p>';
	resultats +='<input type="button" class="btn" value="Télécharger le fichier CSV des erreurs" onclick="downloadCSV()">'
	#resultats +='<nav>';
	#if(list_type_undef !== ''){resultats +='<a href="#typo">typologie</a>'};
	#if(list_usage_undef !== ''){resultats +='<a href="#usage">usage</a>'};
	#if(list_capa_undef !== ''){resultats +='<a href="#capa">Capacité</a>'};
	#if(list_couple_error !== ''){resultats +='<a href="#couple">Couple typo/usage</a>'};
	#resultats+='</nav>';
	if(list_type_undef !== ''){
	resultats +='<h3 id="typo">Erreur(s) de typologie non défini :</h3>';
	resultats +='<ul>'+list_type_undef+'</ul>';};
	if(list_usage_undef !== ''){
	resultats +='<h3 id="usage">Erreur(s) d\'usage non défini</h3>';
	resultats +='<ul>'+list_usage_undef+'</ul>';};
	if(list_capa_undef !== ''){
	resultats +='<h3 id="capa">Erreur(s) de capacité réelle</h3>';
	resultats +='<ul>'+list_capa_undef+'</ul>';};
	if(list_couple_error !== ''){
	resultats +='<h3 id="couple">Erreur(s) de couple typo/usage</h3>';
	resultats +='<ul>'+list_couple_error+'</ul>';};
	document.getElementById("result").innerHTML=resultats;
	 }}else { 
	 resultats ='<h1><i class="em-svg em-trophy" aria-role="presentation" aria-label="trophy"></i></h1><h2>Résultats d\'analyse de '+file.files[0].name+'</h2>';
	 resultats +='<p>Nombre de lignes : <strong> '+newArray.length+'</strong></p>Nombre d\'erreurs : <strong> '+rensArr.length+'</strong></p></p>taux d\'erreur : <strong> '+(rensArr.length/newArray.length)*100+'%</strong></p>';
	 resultats +='<p><i class="em em-clap" aria-role="presentation" aria-label="ClAP"></i> All Good ! <i class="em em-clap" aria-role="presentation" aria-label="ClAP"></i></p>';
	 document.getElementById("result").innerHTML=resultats;
	 }; 
}
function downloadCSV()
{    var csv = Papa.unparse(err);

    var csvData = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    var csvURL =  null;
    if (navigator.msSaveBlob)
    {
        csvURL = navigator.msSaveBlob(csvData, 'erreurs.txt');
    }
    else
    {
        csvURL = window.URL.createObjectURL(csvData);
    }

    var tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', 'erreurs.txt');
    tempLink.click();
}

