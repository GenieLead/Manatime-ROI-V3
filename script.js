function calculateQuote() {
    const numEmployeesQuote = parseInt(document.getElementById('num-employees-quote').value);
    const modules = document.querySelectorAll('input[name="modules"]:checked');
    const moduleCost = 1.4;
    const integrationCostPer10Employees = 199;

    if (isNaN(numEmployeesQuote) || modules.length === 0) {
        document.getElementById('quote-result').innerHTML = `
            <h2>Erreur</h2>
            <p>Veuillez remplir tous les champs correctement et sélectionner au moins un module.</p>
        `;
        return;
    }

    const descriptions = {
        'Module Congés & absences': `Abonnement à 1.4 €/mois/Utilisateur sur 12 mois

- Dépôt des congés et absences 
- Validation des demandes en ligne 
- Accès au planning 
- Consultation des soldes en ligne 
- Export des données pour l'édition des bulletins de paie`,
        'Module Heure supp/récup': `Abonnement à 1.4 €/mois/Utilisateur sur 12 mois

- Déclaration des heures supplémentaires en ligne 
- Validation des demandes en ligne 
- Gestion de la récupération des heures de repos 
- Gestion du paiement des heures supplémentaires 
- Export des données`,
        'Module Gestion du temps & des activités': `Abonnement à 1.4 €/mois/Utilisateur sur 12 mois

- Déclaration du temps de travail (déclaratif ou badgeuse dématérialisée géolocalisée) 
- Validation du temps de travail par le manager 
- Suivi du temps de travail 
- Mesure de rentabilité des projets 
- Export des données`,
        'Module GED - Gestion des documents et fiches de paies': `Abonnement à 1.4 €/mois/Utilisateur sur 12 mois

- Dépôt des documents en ligne (Contrat de travail, règlement d'intérieur...) 
- Classement des documents en ligne 
- Accès aux documents par service ou par utilisateur 
- Reconnaissance et découpage des bulletins de paies 
- Distribution automatique des bulletins de paie`,
        'Module Notes de frais': `Abonnement à 1.4 €/mois/Utilisateur sur 12 mois

- Dépôt des notes de frais 
- Tableau de bord et historique des notes de frais 
- Validation des notes de frais 
- Reconnaissance automatique des caractères (OCR) 
- Export des données`
    };

    let totalCost = 0;
    let moduleDetails = '';
    modules.forEach(module => {
        const moduleName = module.value;
        const moduleAnnualCost = moduleCost * 12;
        const moduleTotalCost = moduleAnnualCost * numEmployeesQuote;
        totalCost += moduleTotalCost;

        moduleDetails += `
            <tr>
                <td>${moduleName}<br><span class="module-description">${descriptions[moduleName]}</span></td>
                <td>${numEmployeesQuote}</td>
                <td>€${moduleAnnualCost.toFixed(2)}</td>
                <td>€${moduleTotalCost.toFixed(2)}</td>
            </tr>
        `;
    });

    const integrationDescription = `Frais d'intégration<br><span class="module-description">Intégration complète des données sur la plateforme par nos techniciens intégrateurs :

- Mise en place des utilisateurs 
- Création des accès (Id+MDP) 
- Mise à jour des soldes 
- Vérification des intégrations conformes au fichier reçu</span>`;
    
    const integrationCost = Math.ceil(numEmployeesQuote / 10) * integrationCostPer10Employees;
    totalCost += integrationCost;

    document.getElementById('quote-result').innerHTML = `
        <h2>Devis en HT</h2>
        <table>
            <thead>
                <tr>
                    <th>Article & Description</th>
                    <th>Quantité</th>
                    <th>Taux</th>
                    <th>Montant</th>
                </tr>
            </thead>
            <tbody>
                ${moduleDetails}
                <tr>
                    <td>${integrationDescription}</td>
                    <td>${Math.ceil(numEmployeesQuote / 10)}</td>
                    <td>€199</td>
                    <td>€${integrationCost.toFixed(2)}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3"><strong>Total en HT:</strong></td>
                    <td><strong>€${totalCost.toFixed(2)}</strong></td>
                </tr>
            </tfoot>
        </table>
        <h2>Compris dans votre abonnement</h2>
        <p>Dans tous nos abonnements ManaTime vous profitez de services et modules supplémentaires :</p>
        <ul>
            <li>Assistance et maintenance incluse</li>
            <li>Ligne directe d'un conseiller clientèle et d'un conseiller technique affiliés à votre compte</li>
            <li>Module entretien</li>
            <li>Module évènement</li>
            <li>Module suivi RH</li>
            <li>Module Élément variable de paie</li>
        </ul>
    `;

    return totalCost;
}

function calculateROI() {
    const numEmployeesQuote = parseInt(document.getElementById('num-employees-quote').value);
    const totalCost = calculateQuote();
    const numHR = parseInt(document.getElementById('num-hr').value);
    const hoursAdmin = parseInt(document.getElementById('hours-admin').value);
    const errorRate = parseFloat(document.getElementById('error-rate').value) / 100;
    const costPerHour = parseFloat(document.getElementById('cost-per-hour').value);
    const payroll = parseFloat(document.getElementById('payroll').value);

    if (isNaN(numEmployeesQuote) || isNaN(totalCost) || isNaN(numHR) || isNaN(hoursAdmin) || isNaN(errorRate) || isNaN(costPerHour) || isNaN(payroll)) {
        document.getElementById('result').innerHTML = `
            <h2>Erreur</h2>
            <p>Veuillez remplir tous les champs correctement.</p>
        `;
        return;
    }

    const adminHoursSaved = hoursAdmin * 52;
    const costSavedByAutomation = adminHoursSaved * costPerHour;
    const errorCostSaved = payroll * errorRate;

    const totalSIRHCost = totalCost;

    const totalSavings = costSavedByAutomation + errorCostSaved;
    const roi = (totalSavings - totalSIRHCost) / totalSIRHCost * 100;

    document.getElementById('result').innerHTML = `
        <h2>Résultats du ROI</h2>
        <p>Économies réalisées grâce à l'automatisation : €${costSavedByAutomation.toFixed(2)}</p>
        <p>Économies réalisées grâce à la réduction des erreurs : €${errorCostSaved.toFixed(2)}</p>
        <p>Coût total du SIRH : €${totalSIRHCost.toFixed(2)}</p>
        <p>ROI : ${roi.toFixed(2)}%</p>
    `;

    document.getElementById('explanation').innerHTML = `
        <h2>Explication du Calcul du ROI</h2>
        <p>Le ROI (Retour sur Investissement) est calculé en utilisant la formule suivante :</p>
        <p><strong>ROI = (Économies Réalisées - Coût du SIRH) / Coût du SIRH * 100</strong></p>
        <p>Voici comment nous avons déterminé chaque valeur :</p>
        <ul>
            <li><strong>Économies réalisées grâce à l'automatisation</strong> : Nombre d'heures administratives économisées par semaine multiplié par le coût horaire des professionnels RH, puis multiplié par 52 semaines.</li>
            <li><strong>Économies réalisées grâce à la réduction des erreurs</strong> : Masse salariale annuelle multipliée par le taux d'erreur (en pourcentage).</li>
            <li><strong>Coût total du SIRH</strong> : Coût total du devis obtenu.</li>
            <li><strong>ROI</strong> : (Total des économies réalisées moins le coût total du SIRH) divisé par le coût total du SIRH, le tout multiplié par 100 pour obtenir un pourcentage.</li>
        </ul>
        <h2>Autres Retours sur Investissement</h2>
        <p>En plus des économies calculables, l'implémentation d'un SIRH apporte de nombreux autres avantages :</p>
        <ul>
            <li><strong>Amélioration de la marque employeur</strong> : Une gestion RH moderne et efficace attire et retient les talents.</li>
            <li><strong>Amélioration de l'engagement des employés</strong> : Des processus simplifiés et une meilleure communication augmentent la satisfaction des employés.</li>
            <li><strong>Meilleure conformité</strong> : Réduction des risques de non-conformité grâce à une gestion centralisée et automatisée.</li>
            <li><strong>Prise de décision éclairée</strong> : Accès à des données précises et en temps réel pour des décisions stratégiques plus informées.</li>
            <li><strong>Réduction du turnover</strong> : Un meilleur environnement de travail contribue à réduire le taux de rotation du personnel.</li>
        </ul>
    `;
}
